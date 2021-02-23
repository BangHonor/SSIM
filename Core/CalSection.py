from flask import Flask, render_template,request      
import simplejson,json,sys
global dict1
#========================================================================================= 
app = Flask(__name__)
@app.route("/cal",methods=['POST','GET'])
def ReadJSON():
   #省略计算理论部分
    return json.dumps({"A":A,"Iy":Iy,"Iz":Iz,"J":J,"Iw":Iw,"yc":yc,"zc":zc,"betay":betay,"betaz":betaz,"betaw":betaw,"Iyz":Iyz}) 
#=========================================================================================
if __name__ == "__main__":
    # 启动, 启动后访问 http://127.0.0.1:5858 查看
    app.run(debug=True,host='127.0.0.1', port=5858)  


