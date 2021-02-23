
        //划分左中右
    var left, center, right, width;

        window.onload = function () {
        left = $('left');
            center = $('center');
            right = $('right');
            onresize();
        };
        window.onresize = function () {
            try {
        width = document.body.clientWidth;
                center.style.width = (width - left.clientWidth - right.clientWidth - 0) + "px";
            } catch (e) {
        //小于0会报错
    }
        };

        function $(id) {
            return document.getElementById(id);
        }


            //editor
            window.URL = window.URL || window.webkitURL;
            window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder;

            Number.prototype.format = function () {
                return this.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
            };

            //

            var editor = new Editor();//接下来所有基于editor的操作都要用这个对象实现

            var viewport = new Viewport(editor);
            document.body.appendChild(viewport.dom);

            var toolbar = new Toolbar(editor);
            document.body.appendChild(toolbar.dom);//工具栏

            var script = new Script(editor);
            document.body.appendChild(script.dom);

            var player = new Player(editor);
            document.body.appendChild(player.dom);

            var sidebar = new Sidebar(editor);
            document.body.appendChild(sidebar.dom);//侧边栏

            var menubar = new Menubar(editor);
            document.body.appendChild(menubar.dom);


            //

            editor.storage.init(function () {

        editor.storage.get(function (state) {

            if (isLoadingFromHash) return;

            if (state !== undefined) {

                editor.fromJSON(state);

            }

            var selected = editor.config.getKey('selected');

            if (selected !== undefined) {

                editor.selectByUuid(selected);

            }

        });

                //

                var timeout;

                function saveState(scene) {

                    if (editor.config.getKey('autosave') === false) {

                        return;

                    }

                    clearTimeout(timeout);

                    timeout = setTimeout(function () {

        editor.signals.savingStarted.dispatch();

                        timeout = setTimeout(function () {

        editor.storage.set(editor.toJSON());

                            editor.signals.savingFinished.dispatch();

                        }, 100);

                    }, 1000);

                };

                var signals = editor.signals;

                signals.geometryChanged.add(saveState);
                signals.objectAdded.add(saveState);
                signals.objectChanged.add(saveState);
                signals.objectRemoved.add(saveState);
                signals.materialChanged.add(saveState);
                signals.sceneBackgroundChanged.add(saveState);
                signals.sceneFogChanged.add(saveState);
                signals.sceneGraphChanged.add(saveState);
                signals.scriptChanged.add(saveState);
                signals.historyChanged.add(saveState);

            });

            //

            document.addEventListener('dragover', function (event) {

        event.preventDefault();
                event.dataTransfer.dropEffect = 'copy';

            }, false);

            document.addEventListener('drop', function (event) {

        event.preventDefault();

                editor.loader.loadFiles(event.dataTransfer.files);

            }, false);

            function onWindowResize(event) {

        editor.signals.windowResize.dispatch();

            }

            window.addEventListener('resize', onWindowResize, false);

            onWindowResize();

            //

            var isLoadingFromHash = false;
            var hash = window.location.hash;

            if (hash.substr(1, 5) === 'file=') {

                var file = hash.substr(6);

                if (confirm('Any unsaved data will be lost. Are you sure?')) {

                    var loader = new THREE.FileLoader();
                    loader.crossOrigin = '';
                    loader.load(file, function (text) {

        editor.clear();
                        editor.fromJSON(JSON.parse(text));

                    });

                    isLoadingFromHash = true;

                }

            }

            // ServiceWorker

            if ('serviceWorker' in navigator) {

                try {

        navigator.serviceWorker.register('./Editor/editor/sw.js');

                } catch (error) {

    }

            }

            /*
            window.addEventListener( 'message', function ( event ) {

        editor.clear();
                editor.fromJSON( event.data );

            }, false );
            */
