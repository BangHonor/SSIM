#========================================================================================= 
ProgrameName= " Wapring Element for General Sections" 
DeveloperName=" Developed by: Siwei Liu & Liang Chen" 
RevisedDate=  " Last Revised: July 10, 2017" 
#=========================================================================================
#Import standard libraries
import os; from os import listdir, getcwd; from os.path import isfile, join
import json #JSON Library for handling input and output
import numpy as np; from numpy import linalg as LA #NumPy for vectors and matrix solver
from itertools import zip_longest #For establishing dictionary 
from scipy.sparse import coo_matrix #Most efficient storage format for sparse matrix
import math #Basic math operations
import datetime #For recording time
from scipy import linalg as LA #For solving eigen-equations
#=========================================================================================
#Class list
class Node: 
    Count=0; ID=[]; Y,Z,ncseg={},{},{}
    def Initialize(tNodCount):
        Node.yo=np.zeros(tNodCount)
        Node.zo=np.zeros(tNodCount)
        Node.w=np.zeros(tNodCount)
class Segment: 
    Count=0; ID=[]; I,J={},{}; t={}
    def Initialize(tSegCount):
        Segment.L=np.zeros(tSegCount)
        Segment.A=np.zeros(tSegCount)
        Segment.wi=np.zeros(tSegCount)
        Segment.wj=np.zeros(tSegCount)
class OutResult: FileName="";Folder="";
#=========================================================================================
#Read data file from JSON format, 
def ReadJSON():
    print("The following files are found. Please enter a file name to execute:")
    JSONScript = os.getcwd()+"/Examples/"   #当前工作目录
    OutResult.Folder=os.getcwd()+"/"
    files=[ f for f in listdir(JSONScript) if isfile(join(JSONScript,f)) ]
    print(files)
    FileName=input(">>")
    while not ( FileName in files):
        print("File is not found, please enter the file name from the list")
        FileName=input(">>")
    OutResult.FileName=FileName
    f = open(JSONScript + FileName,'r')
    return f.read()
def ReadData():
    DataIn=json.loads(ReadJSON())#里面是字符串，加载字符串为字典
    #Decode JSON data
    ReadNode(np.array(DataIn["NODE"]))
    ReadSegment(np.array(DataIn["SEGMENT"]))
    return
#Read Node Information
def ReadNode(NodeInfo):
    Node.Count=len(NodeInfo)
    Node.ID=dict(zip_longest(NodeInfo[:,0], np.arange(Node.Count)))
    Node.Y=dict(zip_longest(NodeInfo[:,0], NodeInfo[:,1]))
    Node.Z=dict(zip_longest(NodeInfo[:,0], NodeInfo[:,2]))
    Node.ncseg=dict(zip_longest(NodeInfo[:,0], NodeInfo[:,3]))
    return
#Read Segment Information
def ReadSegment(MembInfo):
    Segment.Count=len(MembInfo)
    Segment.ID=dict(zip_longest(MembInfo[:,0], np.arange(Segment.Count)))
    Segment.I=dict(zip_longest(MembInfo[:,0], MembInfo[:,1]))
    Segment.J=dict(zip_longest(MembInfo[:,0], MembInfo[:,2]))
    Segment.t=dict(zip_longest(MembInfo[:,0], MembInfo[:,3]))
    return  
#========================================================================================= 

#=========================================================================================
def Main():
    StartTime=datetime.datetime.now()
    print("-----------------------------------------------------------------------------")
    print(ProgrameName);print(DeveloperName);print(RevisedDate)
    print("-----------------------------------------------------------------------------")
    ReadData()#Import data from JSON file
    #Open memory for variables
    Segment.Initialize(Segment.Count)
    Node.Initialize(Node.Count)
    #Initilize  
    A=0.0
    Iy=0.0
    Iz=0.0
    Iyz=0.0
    J=0.0
    Iwy=0.0
    Iwz=0.0
    Iw=0.0
    betay=0.0
    betaz=0.0
    betaw=0.0
    #Initilize Segment 
    AY=0.0     #A*Y
    AZ=0.0     #A*Z  
    for ii in Segment.ID:
        tI=Segment.I[ii]; tJ=Segment.J[ii];
        tY1=Node.Y[tI]; tY2=Node.Y[tJ];
        tZ1=Node.Z[tI]; tZ2=Node.Z[tJ];
        Segment.L[Segment.ID[ii]]=math.sqrt((tY2-tY1)**2+(tZ2-tZ1)**2)
        Segment.A[Segment.ID[ii]]=Segment.L[Segment.ID[ii]]*Segment.t[ii]
        A=A+Segment.A[Segment.ID[ii]]
        AY=AY+Segment.A[Segment.ID[ii]]*(tY1+tY2)/2
        AZ=AZ+Segment.A[Segment.ID[ii]]*(tZ1+tZ2)/2
    #coordinate of geo center
    Ygo=AY/A
    Zgo=AZ/A
    #new node coordinate
    for ii in Node.ID:
        tNID=Node.ID[ii]
        Node.yo[tNID]=Node.Y[ii]-Ygo; Node.zo[tNID]=Node.Z[ii]-Zgo;
    #Calculate the second moment of area    
    for ii in Segment.ID:
        tMID=Segment.ID[ii]
        tI=Segment.I[ii]; tJ=Segment.J[ii];
        tNIDi=Node.ID[tI];tNIDj=Node.ID[tJ]
        tY1=Node.yo[tNIDi]; tY2=Node.yo[tNIDj];
        tZ1=Node.zo[tNIDi]; tZ2=Node.zo[tNIDj];
        if (tY1-tY2)==0:
            Iz=Iz+Segment.A[tMID]*tY1**2
        else:
            Iz=Iz+Segment.L[tMID]/abs(tY1-tY2)*Segment.t[ii]*abs(tY1**3-tY2**3)/3
        if (tZ1-tZ2)==0:
            Iy=Iy+Segment.A[tMID]*tZ1**2
        else:
            Iy=Iy+Segment.L[tMID]/abs(tZ1-tZ2)*Segment.t[ii]*abs(tZ1**3-tZ2**3)/3
        Iyz=Iyz+Segment.L[tMID]/6*Segment.t[ii]*(2*tY1*tZ1+tY1*tZ2+tY2*tZ1+2*tY2*tZ2)
        
        J=J+Segment.L[tMID]/3*Segment.t[ii]**3
    #calculate w of each node
    #set w to -10000
    for ii in Node.ID:
        tNID=Node.ID[ii]
        Node.w[tNID]=-10000 
    #pick a start point
    for ii in Node.ID:
        if Node.ncseg[ii]==1:
            Ai=ii  
            break
    tNID=Node.ID[Ai]
    Node.w[tNID]=0
    tyc=0
    tzc=0
    n=0
    while n<Segment.Count:
        for ii in Segment.ID:
            tMID=Segment.ID[ii]
            tI=Segment.I[ii]; tJ=Segment.J[ii];
            tNIDi=Node.ID[tI];tNIDj=Node.ID[tJ]
            if Node.w[tNIDi]==-10000:
                if Node.w[tNIDj]!=-10000:
                    tY2=Node.yo[tNIDi]; tY1=Node.yo[tNIDj];
                    tZ2=Node.zo[tNIDi]; tZ1=Node.zo[tNIDj];
                    Node.w[tNIDi]=Node.w[tNIDj]+((tY2-tY1)*(tzc-tZ1)-(tyc-tY1)*(tZ2-tZ1))
                    n=n+1
                else:
                    continue
            else:
                if Node.w[tNIDj]==-10000:
                    tY1=Node.yo[tNIDi]; tY2=Node.yo[tNIDj];
                    tZ1=Node.zo[tNIDi]; tZ2=Node.zo[tNIDj];
                    
                    Node.w[tNIDj]=Node.w[tNIDi]+((tY2-tY1)*(tzc-tZ1)-(tyc-tY1)*(tZ2-tZ1))
                    n=n+1  
    #calculate yc zc
    for ii in Segment.ID:
        tMID=Segment.ID[ii]
        tI=Segment.I[ii]; tJ=Segment.J[ii];
        tNIDi=Node.ID[tI];tNIDj=Node.ID[tJ]
        tY1=Node.yo[tNIDi]; tY2=Node.yo[tNIDj];
        tZ1=Node.zo[tNIDi]; tZ2=Node.zo[tNIDj];
        tW1=Node.w[tNIDi]; tW2=Node.w[tNIDj];
        Iwy=Iwy+Segment.L[tMID]/6*Segment.t[ii]*((tW1)*(tY2+2*tY1)+(tW2)*(tY1+2*tY2))
        Iwz=Iwz+Segment.L[tMID]/6*Segment.t[ii]*((tW1)*(tZ2+2*tZ1)+(tW2)*(tZ1+2*tZ2))        
    yc=(Iz*Iwz-Iyz*Iwy)/(Iy*Iz-Iyz**2)
    zc=-(Iy*Iwy-Iyz*Iwz)/(Iy*Iz-Iyz**2) 
    #calculate new w of each node
    #set w to -10000
    for ii in Node.ID:
        tNID=Node.ID[ii]
        Node.w[tNID]=-10000 
    #pick a start point
    tNID=Node.ID[Ai]
    Node.w[tNID]=0
    tyc=yc
    tzc=zc
    n=0
    while n<Segment.Count:
        for ii in Segment.ID:
            tMID=Segment.ID[ii]
            tI=Segment.I[ii]; tJ=Segment.J[ii];
            tNIDi=Node.ID[tI];tNIDj=Node.ID[tJ]
            if Node.w[tNIDi]==-10000:
                if Node.w[tNIDj]!=-10000:
                    tY2=Node.yo[tNIDi]; tY1=Node.yo[tNIDj];
                    tZ2=Node.zo[tNIDi]; tZ1=Node.zo[tNIDj];
                    
                    Node.w[tNIDi]=Node.w[tNIDj]+(tY2-tY1)*(tzc-tZ1)-(tyc-tY1)*(tZ2-tZ1)
                    n=n+1
                else:
                    continue
            else:
                if Node.w[tNIDj]==-10000:
                    tY1=Node.yo[tNIDi]; tY2=Node.yo[tNIDj];
                    tZ1=Node.zo[tNIDi]; tZ2=Node.zo[tNIDj];
                    
                    Node.w[tNIDj]=Node.w[tNIDi]+(tY2-tY1)*(tzc-tZ1)-(tyc-tY1)*(tZ2-tZ1)
                    n=n+1
    #calculate wn of each node
    twn=0.0
    for ii in Segment.ID:
        tMID=Segment.ID[ii]
        tI=Segment.I[ii]; tJ=Segment.J[ii];
        tNIDi=Node.ID[tI];tNIDj=Node.ID[tJ]
        tW1=Node.w[tNIDi]; tW2=Node.w[tNIDj];
        twn=twn+(tW1+tW2)/2*Segment.A[tMID]
    for ii in Node.ID:
        tNID=Node.ID[ii]
        Node.w[tNID]=twn/A-Node.w[tNID]
    #calculate Iw  beta
    for ii in Segment.ID:
        tMID=Segment.ID[ii]
        tI=Segment.I[ii]; tJ=Segment.J[ii];
        tNIDi=Node.ID[tI];tNIDj=Node.ID[tJ]
        tY1=Node.yo[tNIDi]; tY2=Node.yo[tNIDj];
        tZ1=Node.zo[tNIDi]; tZ2=Node.zo[tNIDj];
        tW1=Node.w[tNIDi]; tW2=Node.w[tNIDj];
        Iw=Iw+Segment.L[tMID]*Segment.t[ii]*(tW1*tW2+(tW1-tW2)**2/3)
        if tY1-tY2==0:
            betaz=betaz+Segment.t[ii]*(tY1**3*abs(tZ1-tZ2)+tY1/3*abs(tZ1**3-tZ2**3))
            
            if tZ1>tZ2: 
                betay=betay+Segment.t[ii]*((tZ1**4-tZ2**4)/4+tY1**2/2*(tZ1**2-tZ2**2))
                betaw=betaw+(Segment.t[ii]*(tZ1 - tZ2)*(tW1*(6*tY1**2 + 3*tZ1**2 + 2*tZ1*tZ2 + tZ2**2) + tW2*(6*tY1**2 + tZ1**2 + 2*tZ1*tZ2 + 3*tZ2**2)))/12.
            else:
                betay=betay+Segment.t[ii]*((tZ2**4-tZ1**4)/4+tY1**2/2*(tZ2**2-tZ1**2))
                betaw=betaw-(Segment.t[ii]*(tZ1 - tZ2)*(tW1*(6*tY1**2 + 3*tZ1**2 + 2*tZ1*tZ2 + tZ2**2) + tW2*(6*tY1**2 + tZ1**2 + 2*tZ1*tZ2 + 3*tZ2**2)))/12.
        else:
            #betay=betay+Segment.t[ii]*(tZ1**3*abs(tY1-tY2)+tZ1/3*abs(tY1**3-tY2**3))
            if tZ1-tZ2==0:
                betay=betay+Segment.t[ii]*(tZ1**3*abs(tY1-tY2)+tZ1/3*abs(tY1**3-tY2**3))
                if tY1>tY2: 
                    betaz=betaz+Segment.t[ii]*((tY1**4-tY2**4)/4+tZ1**2/2*(tY1**2-tY2**2))
                    betaw=betaw+(Segment.t[ii]*(tY1 - tY2)*(tW1*(3*tY1**2 + 2*tY1*tY2 + tY2**2 + 6*tZ1**2) + tW2*(tY1**2 + 2*tY1*tY2 + 3*tY2**2 + 6*tZ1**2)))/12.
                else:
                    betaz=betaz+Segment.t[ii]*((tY2**4-tY1**4)/4+tZ1**2/2*(tY2**2-tY1**2))
                    betaw=betaw-(Segment.t[ii]*(tY1 - tY2)*(tW1*(3*tY1**2 + 2*tY1*tY2 + tY2**2 + 6*tZ1**2) + tW2*(tY1**2 + 2*tY1*tY2 + 3*tY2**2 + 6*tZ1**2)))/12.               
            else:
                betaz=betaz+(Segment.L[tMID]*Segment.t[ii]*(3*tY1**3 + 3*tY1**2*tY2 + tY1*(3*tY2**2 + 3*tZ1**2 + 2*tZ1*tZ2 + tZ2**2) + tY2*(3*tY2**2 + tZ1**2 + 2*tZ1*tZ2 + 3*tZ2**2)))/12.
                betay=betay+(Segment.L[tMID]*Segment.t[ii]*(2*tY1*tY2*(tZ1 + tZ2) + tY1**2*(3*tZ1 + tZ2) + tY2**2*(tZ1 + 3*tZ2) +   3*(tZ1 + tZ2)*(tZ1**2 + tZ2**2)))/12.
                betaw=betaw-(Segment.L[tMID]*Segment.t[ii]*(tW1*(3*tY1**2 + 2*tY1*tY2 + tY2**2 + 3*tZ1**2 + 2*tZ1*tZ2 + tZ2**2)+tW2*(tY1**2 + 2*tY1*tY2 + 3*tY2**2 + tZ1**2 + 2*tZ1*tZ2 + 3*tZ2**2)))/12.      
        #betaz=betaz+(Segment.L[tMID]*Segment.t[ii]*(2*tY1*tY2*(tZ1 + tZ2) + tY1**2*(3*tZ1 + tZ2) + tY2**2*(tZ1 + 3*tZ2) +   3*(tZ1 + tZ2)*(tZ1**2 + tZ2**2)))/12.
        #betaz=betaz+(-3*tY1**4+3*tY2**4+abs(tY1-tY2)*(2*tZ1*tZ2*(tY1+tY2)+tZ1**2*(3*tY1+tY2)+tZ2**2*(tY1+3*tY2)))/12.
        #betaw=betaw-(Segment.L[tMID]*Segment.t[ii]*(tW1*(3*tY1**2 + 2*tY1*tY2 + tY2**2 + 3*tZ1**2 + 2*tZ1*tZ2 + tZ2**2)+tW2*(tY1**2 + 2*tY1*tY2 + 3*tY2**2 + tZ1**2 + 2*tZ1*tZ2 + 3*tZ2**2)))/12.
    betay=betay/Iy-2*zc
    betaz=betaz/Iz-2*yc
    betaw=betaw/Iw
    #output
    print("A= ","%.10f"%A)
    print("Iy= ","%.15f"%Iy)
    print("Iz= ","%.15f"%Iz)
    print("J= ","%.15f"%J)
    print("Iw= ","%.15f"%Iw)
    print("yc= ","%.15f"%yc)
    print("zc= ","%.15f"%zc)
    print("betay= ","%.15f"%betay)
    print("betaz= ","%.15f"%betaz)
    print("betaw= ","%.15f"%betaw)
    Time=datetime.datetime.now()-StartTime
    print("-----------------------------------------------------------------------------")
    print("Run time=",Time.microseconds, " µs (","%.4f"%(Time.microseconds/1000000)," s)")
    print("-----------------------------------------------------------------------------")
    return
#=========================================================================================
if __name__ == '__main__':
    Main()
#=========================================================================================
# END OF PROGRAM
#==============================