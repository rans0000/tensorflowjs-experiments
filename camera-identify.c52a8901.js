let e,t,r;function a(e,t,r,a){Object.defineProperty(e,t,{get:r,set:a,enumerable:!0,configurable:!0})}function n(e,t){return Object.keys(t).forEach(function(r){"default"===r||"__esModule"===r||Object.prototype.hasOwnProperty.call(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[r]}})}),e}var s,o,i,l,u,p,d,c,h=globalThis,f={},m={},g=h.parcelRequiread69;null==g&&((g=function(e){if(e in f)return f[e].exports;if(e in m){var t=m[e];delete m[e];var r={id:e,exports:{}};return f[e]=r,t.call(r.exports,r,r.exports),r.exports}var a=Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,t){m[e]=t},h.parcelRequiread69=g);var x=g.register;x("40l72",function(e,t){a(e.exports,"GraphModel",()=>g("bVQtG").GraphModel),a(e.exports,"loadGraphModel",()=>g("bVQtG").loadGraphModel),a(e.exports,"loadGraphModelSync",()=>g("bVQtG").loadGraphModelSync),a(e.exports,"deregisterOp",()=>g("dWfqP").deregisterOp),a(e.exports,"registerOp",()=>g("dWfqP").registerOp),a(e.exports,"version_converter",()=>g("1SddR").version),g("1DtTd"),g("bVQtG"),g("dWfqP"),g("1SddR")}),x("1DtTd",function(e,t){g("i64bB"),(0,g("ibsdL").env)().registerFlag("KEEP_INTERMEDIATE_TENSORS",()=>!1,e=>{e&&console.warn("Keep intermediate tensors is ON. This will print the values of all intermediate tensors during model inference. Not all models support this mode. For details, check e2e/benchmarks/ model_config.js. This significantly impacts performance.")})}),x("i64bB",function(e,t){g("99KqI");var r=g("5KHy0"),a=g("6th4t");(0,r.registerOptimizers)(),n(e.exports,a)}),x("99KqI",function(e,t){var r=g("38WwN");g("dcHSK"),g("1MXhU"),g("lhiTQ");var a=g("iG87S"),n=g("inFmq"),s=g("5TuCW"),o=g("bSp5U"),i=g("9jCh7");(0,r.getOrMakeEngine)();let l={buffer:a.buffer,cast:n.cast,clone:s.clone,print:o.print};(0,i.setOpHandler)(l)}),x("38WwN",function(e,t){a(e.exports,"ENGINE",()=>v),a(e.exports,"getOrMakeEngine",()=>b);var r=g("fJqML"),n=g("ibsdL"),s=g("grcJs"),o=g("hl418"),i=g("eky5o"),l=g("cgHNs"),u=g("8XpwP"),p=g("8zD9D"),d=g("9jCh7"),c=g("3w4Rg"),h=g("8cCb2"),f=g("jjNRA");function m(e){return null!=e.kernelName}class x{constructor(){this.registeredVariables={},this.nextTapeNodeId=0,this.numBytes=0,this.numTensors=0,this.numStringTensors=0,this.numDataBuffers=0,this.gradientDepth=0,this.kernelDepth=0,this.scopeStack=[],this.numDataMovesStack=[],this.nextScopeId=0,this.tensorInfo=new WeakMap,this.profiling=!1,this.activeProfile={newBytes:0,newTensors:0,peakBytes:0,kernels:[],result:null,get kernelNames(){return Array.from(new Set(this.kernels.map(e=>e.name)))}}}dispose(){for(let e in this.registeredVariables)this.registeredVariables[e].dispose()}}class y{constructor(e){this.ENV=e,this.registry={},this.registryFactory={},this.pendingBackendInitId=0,this.state=new x}async ready(){if(null!=this.pendingBackendInit)return this.pendingBackendInit.then(()=>{});if(null!=this.backendInstance)return;let e=this.getSortedBackends();for(let t=0;t<e.length;t++){let r=e[t];if(await this.initializeBackend(r).success)return void await this.setBackend(r)}throw Error("Could not initialize any backends, all backend initializations failed.")}get backend(){if(null!=this.pendingBackendInit)throw Error(`Backend '${this.backendName}' has not yet been initialized. Make sure to await tf.ready() or await tf.setBackend() before calling other methods`);if(null==this.backendInstance){let{name:e,asyncInit:t}=this.initializeBackendsAndReturnBest();if(t)throw Error(`The highest priority backend '${e}' has not yet been initialized. Make sure to await tf.ready() or await tf.setBackend() before calling other methods`);this.setBackend(e)}return this.backendInstance}backendNames(){return Object.keys(this.registryFactory)}findBackend(e){if(!(e in this.registry))if(!(e in this.registryFactory))return null;else{let{asyncInit:t}=this.initializeBackend(e);if(t)return null}return this.registry[e]}findBackendFactory(e){return e in this.registryFactory?this.registryFactory[e].factory:null}registerBackend(e,t,r=1){return e in this.registryFactory?(l.warn(`${e} backend was already registered. Reusing existing backend factory.`),!1):(this.registryFactory[e]={factory:t,priority:r},!0)}async setBackend(e){if(null==this.registryFactory[e])throw Error(`Backend name '${e}' not found in registry`);if(this.backendName=e,null==this.registry[e]){this.backendInstance=null;let{success:t,asyncInit:r}=this.initializeBackend(e);if(!(r?await t:t))return!1}return this.backendInstance=this.registry[e],this.setupRegisteredKernels(),this.profiler=new(0,u.Profiler)(this.backendInstance),!0}setupRegisteredKernels(){(0,i.getKernelsForBackend)(this.backendName).forEach(e=>{null!=e.setupFunc&&e.setupFunc(this.backendInstance)})}disposeRegisteredKernels(e){(0,i.getKernelsForBackend)(e).forEach(t=>{null!=t.disposeFunc&&t.disposeFunc(this.registry[e])})}initializeBackend(e){let t=this.registryFactory[e];if(null==t)throw Error(`Cannot initialize backend ${e}, no registration found.`);try{let a=t.factory();if(!a||a instanceof r.KernelBackend||"function"!=typeof a.then)return this.registry[e]=a,{success:!0,asyncInit:!1};{let t=++this.pendingBackendInitId,r=a.then(r=>!(t<this.pendingBackendInitId)&&(this.registry[e]=r,this.pendingBackendInit=null,!0)).catch(r=>!(t<this.pendingBackendInitId)&&(this.pendingBackendInit=null,l.warn(`Initialization of backend ${e} failed`),l.warn(r.stack||r.message),!1));return this.pendingBackendInit=r,{success:r,asyncInit:!0}}}catch(t){return l.warn(`Initialization of backend ${e} failed`),l.warn(t.stack||t.message),{success:!1,asyncInit:!1}}}removeBackend(e){if(!(e in this.registryFactory))throw Error(`${e} backend not found in registry`);this.backendName===e&&null!=this.pendingBackendInit&&this.pendingBackendInitId++,e in this.registry&&(this.disposeRegisteredKernels(e),this.registry[e].dispose(),delete this.registry[e]),delete this.registryFactory[e],this.backendName===e&&(this.pendingBackendInit=null,this.backendName=null,this.backendInstance=null)}getSortedBackends(){if(0===Object.keys(this.registryFactory).length)throw Error("No backend found in registry.");return Object.keys(this.registryFactory).sort((e,t)=>this.registryFactory[t].priority-this.registryFactory[e].priority)}initializeBackendsAndReturnBest(){let e=this.getSortedBackends();for(let t=0;t<e.length;t++){let r=e[t],{success:a,asyncInit:n}=this.initializeBackend(r);if(n||a)return{name:r,asyncInit:n}}throw Error("Could not initialize any backends, all backend initializations failed.")}moveData(e,t){let r=this.state.tensorInfo.get(t),a=r.backend,n=this.readSync(t),s=a.refCount(t);a.disposeData(t,!0),r.backend=e,e.move(t,n,r.shape,r.dtype,s),this.shouldCheckForMemLeaks()&&this.state.numDataMovesStack[this.state.numDataMovesStack.length-1]++}tidy(e,t){let r,a=null;if(null==t){if("function"!=typeof e)throw Error("Please provide a function to tidy()");t=e}else{if("string"!=typeof e&&!(e instanceof String))throw Error("When calling with two arguments, the first argument to tidy() must be a string");if("function"!=typeof t)throw Error("When calling with two arguments, the 2nd argument to tidy() must be a function");a=e}return this.scopedRun(()=>this.startScope(a),()=>this.endScope(r),()=>((r=t())instanceof Promise&&console.error("Cannot return a Promise inside of tidy."),r))}scopedRun(e,t,r){e();try{let e=r();return t(),e}catch(e){throw t(),e}}nextTensorId(){return y.nextTensorId++}nextVariableId(){return y.nextVariableId++}clone(e){let t=v.runKernel(o.Identity,{x:e});return this.addTapeNode(this.state.activeScope.name,{x:e},[t],e=>({x:()=>v.runKernel(o.Cast,{x:e},{dtype:"float32"})}),[],{}),t}runKernel(e,t,r){if(null==this.backendName&&this.backend,null==(0,i.getKernel)(e,this.backendName))throw Error(`Kernel '${e}' not registered for backend '${this.backendName}'`);return this.runKernelFunc({kernelName:e,inputs:t,attrs:r})}shouldCheckForMemLeaks(){return this.ENV.getBool("IS_TEST")}checkKernelForMemLeak(e,t,r){let a=this.backend.numDataIds(),n=0;r.forEach(e=>{n+="complex64"===e.dtype?3:1});let s=this.state.numDataMovesStack[this.state.numDataMovesStack.length-1],o=a-t-n-s;if(o>0)throw Error(`Backend '${this.backendName}' has an internal memory leak (${o} data ids) after running '${e}'`)}runKernelFunc(e){let t,r,a,n,s=[],o=this.isTapeOn(),l=this.state.numBytes,u=this.state.numTensors;this.shouldCheckForMemLeaks()&&this.state.numDataMovesStack.push(0),null==this.backendName&&this.backend;let p=m(e)?e.kernelName:null!=this.state.activeScope?this.state.activeScope.name:"";if(m(e)){let{kernelName:t,inputs:n,attrs:l}=e;null==this.backendName&&this.backend;let u=(0,i.getKernel)(t,this.backendName);h.assert(null!=u,()=>`Cannot find registered kernel '${t}' for backend '${this.backendName}'`),r=()=>{let e=this.backend.numDataIds(),r=Array.isArray(a=u.kernelFunc({inputs:n,attrs:l,backend:this.backend}))?a:[a];this.shouldCheckForMemLeaks()&&this.checkKernelForMemLeak(t,e,r);let i=r.map(e=>null!=e.rank?e:this.makeTensorFromTensorInfo(e));if(o){let e=this.getTensorsForGradient(t,n,i);s=this.saveTensorsForBackwardMode(e)}return i}}else{let{forwardFunc:t}=e,n=e=>{o&&(s=e.map(e=>this.keep(this.clone(e))))};r=()=>{let e=this.backend.numDataIds(),r=Array.isArray(a=this.tidy(()=>t(this.backend,n)))?a:[a];return this.shouldCheckForMemLeaks()&&this.checkKernelForMemLeak(p,e,r),r}}let{inputs:d,attrs:c}=e,f=m(e)?null:e.backwardsFunc;return this.scopedRun(()=>this.state.kernelDepth++,()=>this.state.kernelDepth--,()=>{this.ENV.getBool("DEBUG")||this.state.profiling?(n=this.profiler.profileKernel(p,d,()=>r()),this.ENV.getBool("DEBUG")&&this.profiler.logKernelProfile(n),t=n.outputs):t=r()}),o&&this.addTapeNode(p,d,t,f,s,c),this.state.profiling&&this.state.activeProfile.kernels.push({name:p,bytesAdded:this.state.numBytes-l,totalBytesSnapshot:this.state.numBytes,tensorsAdded:this.state.numTensors-u,totalTensorsSnapshot:this.state.numTensors,inputShapes:Object.keys(d).map(e=>null!=d[e]?d[e].shape:null),outputShapes:t.map(e=>e.shape),kernelTimeMs:n.timeMs,extraInfo:n.extraInfo}),Array.isArray(a)?t:t[0]}saveTensorsForBackwardMode(e){return e.map(e=>this.keep(this.clone(e)))}getTensorsForGradient(e,t,r){let a=(0,i.getGradient)(e);if(null!=a){let e,n=a.inputsToSave||[],s=a.outputsToSave||[];a.saveAllInputs?(h.assert(Array.isArray(t),()=>"saveAllInputs is true, expected inputs to be an array."),e=Object.keys(t).map(e=>t[e])):e=n.map(e=>t[e]);let o=r.filter((e,t)=>s[t]);return e.concat(o)}return[]}makeTensor(e,t,r,a){if(null==e)throw Error("Values passed to engine.makeTensor() are null");r=r||"float32",a=a||this.backend;let n=e;"string"===r&&h.isString(e[0])&&(n=e.map(e=>f.encodeString(e)));let s=a.write(n,t,r),o=new(0,d.Tensor)(t,r,s,this.nextTensorId());if(this.trackTensor(o,a),"string"===r){let e=this.state.tensorInfo.get(s),t=(0,h.bytesFromStringArray)(n);this.state.numBytes+=t-e.bytes,e.bytes=t}return o}makeTensorFromDataId(e,t,r,a){let n={dataId:e,shape:t,dtype:r=r||"float32"};return this.makeTensorFromTensorInfo(n,a)}makeTensorFromTensorInfo(e,t){let{dataId:r,shape:a,dtype:n}=e,s=new(0,d.Tensor)(a,n,r,this.nextTensorId());return this.trackTensor(s,t),s}makeVariable(e,t=!0,r,a){r=r||this.nextVariableId().toString(),null!=a&&a!==e.dtype&&(e=e.cast(a));let n=new(0,d.Variable)(e,t,r,this.nextTensorId());if(null!=this.state.registeredVariables[n.name])throw Error(`Variable with name ${n.name} was already registered`);return this.state.registeredVariables[n.name]=n,this.incRef(n,this.backend),n}trackTensor(e,t){this.state.numTensors++,"string"===e.dtype&&this.state.numStringTensors++;let r=0;"complex64"!==e.dtype&&"string"!==e.dtype&&(r=e.size*h.bytesPerElement(e.dtype)),this.state.numBytes+=r,this.state.tensorInfo.has(e.dataId)||(this.state.numDataBuffers++,this.state.tensorInfo.set(e.dataId,{backend:t||this.backend,dtype:e.dtype,shape:e.shape,bytes:r})),e instanceof d.Variable||this.track(e)}incRef(e,t){this.trackTensor(e,t),this.backend.incRef(e.dataId)}removeDataId(e,t){this.state.tensorInfo.has(e)&&this.state.tensorInfo.get(e).backend===t&&(this.state.tensorInfo.delete(e),this.state.numDataBuffers--)}disposeTensor(e){if(!this.state.tensorInfo.has(e.dataId))return;let t=this.state.tensorInfo.get(e.dataId);if(this.state.numTensors--,"string"===e.dtype&&(this.state.numStringTensors--,this.state.numBytes-=t.bytes),"complex64"!==e.dtype&&"string"!==e.dtype){let t=e.size*h.bytesPerElement(e.dtype);this.state.numBytes-=t}t.backend.disposeData(e.dataId)&&this.removeDataId(e.dataId,t.backend)}disposeVariables(){for(let e in this.state.registeredVariables){let t=this.state.registeredVariables[e];this.disposeVariable(t)}}disposeVariable(e){this.disposeTensor(e),null!=this.state.registeredVariables[e.name]&&delete this.state.registeredVariables[e.name]}memory(){let e=this.backend.memory();return e.numTensors=this.state.numTensors,e.numDataBuffers=this.state.numDataBuffers,e.numBytes=this.state.numBytes,this.state.numStringTensors>0&&(e.unreliable=!0,null==e.reasons&&(e.reasons=[]),e.reasons.push("Memory usage by string tensors is approximate (2 bytes per character)")),e}async profile(e){this.state.profiling=!0;let t=this.state.numBytes,r=this.state.numTensors;for(let a of(this.state.activeProfile.kernels=[],this.state.activeProfile.result=await e(),this.state.profiling=!1,this.state.activeProfile.peakBytes=Math.max(...this.state.activeProfile.kernels.map(e=>e.totalBytesSnapshot)),this.state.activeProfile.newBytes=this.state.numBytes-t,this.state.activeProfile.newTensors=this.state.numTensors-r,this.state.activeProfile.kernels))a.kernelTimeMs=await a.kernelTimeMs,a.extraInfo=await a.extraInfo;return this.state.activeProfile}isTapeOn(){return this.state.gradientDepth>0&&0===this.state.kernelDepth}addTapeNode(e,t,r,a,n,s){let o={id:this.state.nextTapeNodeId++,kernelName:e,inputs:t,outputs:r,saved:n},l=(0,i.getGradient)(e);null!=l&&(a=l.gradFunc),null!=a&&(o.gradient=e=>(e=e.map((e,t)=>{if(null==e){let e=r[t],a=h.makeZerosTypedArray(e.size,e.dtype);return this.makeTensor(a,e.shape,e.dtype)}return e}),a(e.length>1?e:e[0],n,s))),this.state.activeTape.push(o)}keep(e){return e.kept=!0,e}startTape(){0===this.state.gradientDepth&&(this.state.activeTape=[]),this.state.gradientDepth++}endTape(){this.state.gradientDepth--}startScope(e){let t={track:[],name:"unnamed scope",id:this.state.nextScopeId++};e&&(t.name=e),this.state.scopeStack.push(t),this.state.activeScope=t}endScope(e){let t=(0,c.getTensorsInContainer)(e),r=new Set(t.map(e=>e.id));for(let e=0;e<this.state.activeScope.track.length;e++){let t=this.state.activeScope.track[e];t.kept||r.has(t.id)||t.dispose()}let a=this.state.scopeStack.pop();this.state.activeScope=0===this.state.scopeStack.length?null:this.state.scopeStack[this.state.scopeStack.length-1],t.forEach(e=>{e.kept||e.scopeId!==a.id||this.track(e)})}gradients(e,t,r,a=!1){if(h.assert(t.length>0,()=>"gradients() received an empty list of xs."),null!=r&&"float32"!==r.dtype)throw Error(`dy must have 'float32' dtype, but has '${r.dtype}'`);let n=this.scopedRun(()=>this.startTape(),()=>this.endTape(),()=>this.tidy("forward",e));h.assert(n instanceof d.Tensor,()=>"The result y returned by f() must be a tensor.");let s=(0,p.getFilteredNodesXToY)(this.state.activeTape,t,n);if(!a&&0===s.length&&t.length>0)throw Error("Cannot compute gradient of y=f(x) with respect to x. Make sure that the f you passed encloses all operations that lead from x to y.");return this.tidy("backward",()=>{let e={};e[n.id]=null==r?function(e){let t=(0,h.makeOnesTypedArray)((0,h.sizeFromShape)(e),"float32");return v.makeTensor(t,e,"float32")}(n.shape):r,(0,p.backpropagateGradients)(e,s,e=>this.tidy(e),N);let a=t.map(t=>e[t.id]);return 0===this.state.gradientDepth&&(this.state.activeTape.forEach(e=>{for(let t of e.saved)t.dispose()}),this.state.activeTape=null),{value:n,grads:a}})}customGrad(e){return h.assert(h.isFunction(e),()=>"The f passed in customGrad(f) must be a function."),(...t)=>{let r;h.assert(t.every(e=>e instanceof d.Tensor),()=>"The args passed in customGrad(f)(x1, x2,...) must all be tensors");let a={};return t.forEach((e,t)=>{a[t]=e}),this.runKernelFunc({forwardFunc:(a,n)=>(r=e(...t,n),h.assert(r.value instanceof d.Tensor,()=>"The function f passed in customGrad(f) must return an object where `obj.value` is a tensor"),h.assert(h.isFunction(r.gradFunc),()=>"The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function."),r.value),backwardsFunc:(e,a)=>{let n=r.gradFunc(e,a),s=Array.isArray(n)?n:[n];h.assert(s.length===t.length,()=>"The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function that returns the same number of tensors as inputs passed to f(...)."),h.assert(s.every(e=>e instanceof d.Tensor),()=>"The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function that returns a list of only tensors.");let o={};return s.forEach((e,t)=>{o[t]=()=>e}),o},inputs:a})}}readSync(e){return this.state.tensorInfo.get(e).backend.readSync(e)}read(e){return this.state.tensorInfo.get(e).backend.read(e)}readToGPU(e,t){return this.state.tensorInfo.get(e).backend.readToGPU(e,t)}async time(e){let t=(0,f.now)(),r=await this.backend.time(e);return r.wallMs=(0,f.now)()-t,r}track(e){return null!=this.state.activeScope&&(e.scopeId=this.state.activeScope.id,this.state.activeScope.track.push(e)),e}get registeredVariables(){return this.state.registeredVariables}reset(){for(let e in this.pendingBackendInitId++,this.state.dispose(),this.ENV.reset(),this.state=new x,this.registry)this.disposeRegisteredKernels(e),this.registry[e].dispose(),delete this.registry[e];this.backendName=null,this.backendInstance=null,this.pendingBackendInit=null}}function b(){let e=(0,s.getGlobalNamespace)();if(null==e._tfengine){let t=new(0,n.Environment)(e);e._tfengine=new y(t)}return(0,n.setEnvironmentGlobal)(e._tfengine.ENV),(0,d.setTensorTracker)(()=>e._tfengine),e._tfengine}y.nextTensorId=0,y.nextVariableId=0;let v=b();function N(e,t){return v.runKernel(o.Add,{a:e,b:t})}}),x("fJqML",function(e,t){a(e.exports,"DataStorage",()=>r),a(e.exports,"KernelBackend",()=>n);class r{constructor(e,t){this.backend=e,this.dataMover=t,this.data=new WeakMap,this.dataIdsCount=0}get(e){return this.data.has(e)||this.dataMover.moveData(this.backend,e),this.data.get(e)}set(e,t){this.dataIdsCount++,this.data.set(e,t)}has(e){return this.data.has(e)}delete(e){return this.dataIdsCount--,this.data.delete(e)}numDataIds(){return this.dataIdsCount}}class n{refCount(e){return s("refCount")}incRef(e){return s("incRef")}timerAvailable(){return!0}time(e){return s("time")}read(e){return s("read")}readSync(e){return s("readSync")}readToGPU(e,t){return s("readToGPU")}numDataIds(){return s("numDataIds")}disposeData(e,t){return s("disposeData")}write(e,t,r){return s("write")}move(e,t,r,a,n){return s("move")}createTensorFromGPUData(e,t,r){return s("createTensorFromGPUData")}memory(){return s("memory")}floatPrecision(){return s("floatPrecision")}epsilon(){return 32===this.floatPrecision()?1e-7:1e-4}dispose(){return s("dispose")}}function s(e){throw Error(`'${e}' not yet implemented or not found in the registry. This kernel may not be supported by the tfjs backend you have chosen`)}}),x("ibsdL",function(e,t){a(e.exports,"Environment",()=>s),a(e.exports,"env",()=>i),a(e.exports,"ENV",()=>l),a(e.exports,"setEnvironmentGlobal",()=>u);var r=g("8cCb2");let n="tfjsflags";class s{constructor(e){this.global=e,this.flags={},this.flagRegistry={},this.urlFlags={},this.getQueryParams=o,this.populateURLFlags()}setPlatform(e,t){null==this.platform||l.getBool("IS_TEST")||l.getBool("PROD")||console.warn(`Platform ${this.platformName} has already been set. Overwriting the platform with ${e}.`),this.platformName=e,this.platform=t}registerFlag(e,t,r){if(this.flagRegistry[e]={evaluationFn:t,setHook:r},null!=this.urlFlags[e]){let t=this.urlFlags[e];l.getBool("IS_TEST")||l.getBool("PROD")||console.warn(`Setting feature override from URL ${e}: ${t}.`),this.set(e,t)}}async getAsync(e){return e in this.flags||(this.flags[e]=await this.evaluateFlag(e)),this.flags[e]}get(e){if(e in this.flags)return this.flags[e];let t=this.evaluateFlag(e);if((0,r.isPromise)(t))throw Error(`Flag ${e} cannot be synchronously evaluated. Please use getAsync() instead.`);return this.flags[e]=t,this.flags[e]}getNumber(e){return this.get(e)}getBool(e){return this.get(e)}getString(e){return this.get(e)}getFlags(){return this.flags}get features(){return this.flags}set(e,t){if(null==this.flagRegistry[e])throw Error(`Cannot set flag ${e} as it has not been registered.`);this.flags[e]=t,null!=this.flagRegistry[e].setHook&&this.flagRegistry[e].setHook(t)}evaluateFlag(e){if(null==this.flagRegistry[e])throw Error(`Cannot evaluate flag '${e}': no evaluation function found.`);return this.flagRegistry[e].evaluationFn()}setFlags(e){this.flags=Object.assign({},e)}reset(){this.flags={},this.urlFlags={},this.populateURLFlags()}populateURLFlags(){if(void 0===this.global||void 0===this.global.location||void 0===this.global.location.search)return;let e=this.getQueryParams(this.global.location.search);n in e&&e[n].split(",").forEach(e=>{let[t,r]=e.split(":");this.urlFlags[t]=function(e,t){let r=t.toLowerCase();return"true"===r||"false"===r?"true"===r:`${+r}`===r?+r:t}(0,r)})}}function o(e){let t={};return e.replace(/[?&]([^=?&]+)(?:=([^&]*))?/g,(e,...r)=>{var a,n,s;return a=t,n=r[0],s=r[1],a[decodeURIComponent(n)]=decodeURIComponent(s||""),r.join("=")}),t}function i(){return l}let l=null;function u(e){l=e}}),x("8cCb2",function(e,t){function r(e){let t=e.length,r=0;for(;t>0;)r=Math.random()*t|0,i(e,--t,r)}function n(e,t){if(e.length!==t.length)throw Error(`Array sizes must match to be shuffled together First array length was ${e.length}Second array length was ${t.length}`);let r=e.length,a=0;for(;r>0;)a=Math.random()*r|0,i(e,--r,a),i(t,r,a)}function s(e,t,r){return Math.max(e,Math.min(t,r))}function o(e){return e%2==0?e:e+1}function i(e,t,r){let a=e[t];e[t]=e[r],e[r]=a}function l(e){let t=0;for(let r=0;r<e.length;r++)t+=e[r];return t}function u(e,t){let r=Math.random();return t*r+(1-r)*e}function p(e,t){let r=0;for(let a=0;a<e.length;a++){let n=Number(e[a])-Number(t[a]);r+=n*n}return r}function d(e,t){if(!e)throw Error("string"==typeof t?t:t())}function c(e,t,r=""){d(x(e,t),()=>r+` Shapes ${e} and ${t} must match`)}function h(e){d(null!=e,()=>"The input to the tensor constructor must be a non-null value.")}function f(e){if(0===e.length)return 1;let t=e[0];for(let r=1;r<e.length;r++)t*=e[r];return t}function m(e){return 0===e.length}function g(e,t){if(e===t)return!0;if(null==e||null==t||e.length!==t.length)return!1;for(let r=0;r<e.length;r++)if(null!==e[r]&&null!==t[r]&&e[r]!==t[r])return!1;return!0}function x(e,t){if(e===t)return!0;if(null==e||null==t||e.length!==t.length)return!1;for(let r=0;r<e.length;r++)if(e[r]!==t[r])return!1;return!0}function y(e){return e%1==0}function b(e){if(null!=Math.tanh)return Math.tanh(e);if(e===1/0)return 1;{if(e===-1/0)return -1;let t=Math.exp(2*e);return(t-1)/(t+1)}}function v(e){let t=Math.ceil(Math.sqrt(e));return[t,Math.ceil(e/t)]}function N(e){let t=new Uint32Array(e);for(let r=0;r<e;++r)t[r]=r;return r(t),t}function k(e,t){return t<=e.length?e:e+" ".repeat(t-e.length)}function T(e,t=e=>0,r,a){return new Promise((n,s)=>{let o=0,i=()=>{if(e())return void n();let l=t(++o);if(null!=r&&o>=r)return void s();null!=a?a(i,l):setTimeout(i,l)};i()})}function S(e,t){let r=1,a=-1;for(let t=0;t<e.length;++t)if(e[t]>=0)r*=e[t];else if(-1===e[t]){if(-1!==a)throw Error(`Shapes can only have 1 implicit size. Found -1 at dim ${a} and dim ${t}`);a=t}else if(e[t]<0)throw Error(`Shapes can not be < 0. Found ${e[t]} at dim ${t}`);if(-1===a){if(t>0&&t!==r)throw Error(`Size(${t}) must match the product of shape ${e}`);return e}if(0===r)throw Error(`Cannot infer the missing size in [${e}] when there are 0 elements`);if(t%r!=0)throw Error(`The implicit shape can't be a fractional number. Got ${t} / ${r}`);let n=e.slice();return n[a]=t/r,n}function I(e,t){let r=t.length;return d((e=null==e?t.map((e,t)=>t):[].concat(e)).every(e=>e>=-r&&e<r),()=>`All values in axis param must be in range [-${r}, ${r}) but got axis ${e}`),d(e.every(e=>y(e)),()=>`All values in axis param must be integers but got axis ${e}`),e.map(e=>e<0?r+e:e)}function w(e,t){let r=[],a=[],n=null!=t&&Array.isArray(t)&&0===t.length,s=null==t||n?null:I(t,e).sort(),o=0;for(let t=0;t<e.length;++t){if(null!=s){if(s[o]===t&&1!==e[t])throw Error(`Can't squeeze axis ${t} since its dim '${e[t]}' is not 1`);(null==s[o]||s[o]>t)&&1===e[t]&&(r.push(e[t]),a.push(t)),s[o]<=t&&o++}1!==e[t]&&(r.push(e[t]),a.push(t))}return{newShape:r,keptDims:a}}function C(e,t){return E(e,t)}function E(e,t){let r=null;if(null==e||"float32"===e)r=new Float32Array(t);else if("int32"===e)r=new Int32Array(t);else if("bool"===e)r=new Uint8Array(t);else if("string"===e)r=Array(t);else throw Error(`Unknown data type ${e}`);return r}function A(e,t){for(let r=0;r<e.length;r++){let a=e[r];if(isNaN(a)||!isFinite(a))throw Error(`A tensor of type ${t} being uploaded contains ${a}.`)}}function $(e){return"bool"===e||"complex64"===e||"float32"===e||"int32"===e||"string"===e}function R(e,t){return"complex64"!==t&&("float32"!==t||"complex64"===e)&&("int32"!==t||"float32"===e||"complex64"===e)&&("bool"!==t||"bool"!==e)}function P(e){if("float32"===e||"int32"===e)return 4;if("complex64"===e)return 8;if("bool"===e)return 1;throw Error(`Unknown dtype ${e}`)}function B(e){if(null==e)return 0;let t=0;return e.forEach(e=>t+=e.length),t}function F(e){return"string"==typeof e||e instanceof String}function O(e){return"boolean"==typeof e}function M(e){return"number"==typeof e}function D(e){return!!(e&&e.constructor&&e.call&&e.apply)}function _(e,t){for(let r=t;r<e;++r)if(e%r==0)return r;return e}function L(e){let t=e.length;if(t<2)return[];let r=Array(t-1);r[t-2]=e[t-1];for(let a=t-3;a>=0;--a)r[a]=r[a+1]*e[a+1];return r}function V(e,t,r=!1){if(0===e.length)return t[0];let a=e.reduce((e,t)=>e*t)*(r?2:1);if(0===a)return[];if(a!==t.length)throw Error(`[${e}] does not match the input size ${t.length}${r?" for a complex tensor":""}.`);return function e(t,r,a,n=!1){let s=[];if(1===r.length){let e=r[0]*(n?2:1);for(let r=0;r<e;r++)s[r]=a[t+r]}else{let o=r[0],i=r.slice(1),l=i.reduce((e,t)=>e*t)*(n?2:1);for(let r=0;r<o;r++)s[r]=e(t+r*l,i,a,n)}return s}(0,e,t,r)}function G(e,t){if(Array.isArray(e))return e;if("float32"===t)return e instanceof Float32Array?e:new Float32Array(e);if("int32"===t)return e instanceof Int32Array?e:new Int32Array(e);if("bool"===t||"string"===t)return Uint8Array.from(new Int32Array(e));throw Error(`Unknown dtype ${t}`)}function W(e,t){let r=z(e,t);for(let e=0;e<r.length;e++)r[e]=1;return r}function z(e,t){if(null==t||"float32"===t||"complex64"===t)return new Float32Array(e);if("int32"===t)return new Int32Array(e);if("bool"===t)return new Uint8Array(e);throw Error(`Unknown data type ${t}`)}function j(e,t){let r=e.reduce((e,t)=>e*t,1);if(null==t||"float32"===t)return V(e,new Float32Array(r));if("int32"===t)return V(e,new Int32Array(r));if("bool"===t)return V(e,new Uint8Array(r));throw Error(`Unknown data type ${t}`)}function U(e){e.forEach(t=>{d(Number.isInteger(t)&&t>=0,()=>`Tensor must have a shape comprised of positive integers but got shape [${e}].`)})}function q(e,t,r){if(0===t)return 0;if(1===t)return e[0];let a=e[e.length-1];for(let t=0;t<e.length-1;++t)a+=r[t]*e[t];return a}function H(e,t,r){if(0===t)return[];if(1===t)return[e];let a=Array(t);for(let t=0;t<a.length-1;++t)a[t]=Math.floor(e/r[t]),e-=a[t]*r[t];return a[a.length-1]=e,a}function K(e){return e&&e.then&&"function"==typeof e.then}a(e.exports,"shuffle",()=>r),a(e.exports,"swap",()=>i),a(e.exports,"shuffleCombo",()=>n),a(e.exports,"clamp",()=>s),a(e.exports,"nearestLargerEven",()=>o),a(e.exports,"sum",()=>l),a(e.exports,"randUniform",()=>u),a(e.exports,"distSquared",()=>p),a(e.exports,"assert",()=>d),a(e.exports,"assertShapesMatch",()=>c),a(e.exports,"arraysEqual",()=>x),a(e.exports,"assertNonNull",()=>h),a(e.exports,"sizeFromShape",()=>f),a(e.exports,"isScalarShape",()=>m),a(e.exports,"arraysEqualWithNull",()=>g),a(e.exports,"isInt",()=>y),a(e.exports,"tanh",()=>b),a(e.exports,"sizeToSquarishShape",()=>v),a(e.exports,"createShuffledIndices",()=>N),a(e.exports,"rightPad",()=>k),a(e.exports,"repeatedTry",()=>T),a(e.exports,"inferFromImplicitShape",()=>S),a(e.exports,"parseAxisParam",()=>I),a(e.exports,"squeezeShape",()=>w),a(e.exports,"getTypedArrayFromDType",()=>C),a(e.exports,"getArrayFromDType",()=>E),a(e.exports,"checkConversionForErrors",()=>A),a(e.exports,"isValidDtype",()=>$),a(e.exports,"hasEncodingLoss",()=>R),a(e.exports,"bytesPerElement",()=>P),a(e.exports,"bytesFromStringArray",()=>B),a(e.exports,"isString",()=>F),a(e.exports,"isBoolean",()=>O),a(e.exports,"isNumber",()=>M),a(e.exports,"inferDtype",()=>function e(t){if(Array.isArray(t))return e(t[0]);if(t instanceof Float32Array);else if(t instanceof Int32Array||t instanceof Uint8Array||t instanceof Uint8ClampedArray)return"int32";else if(M(t));else if(F(t))return"string";else if(O(t))return"bool";return"float32"}),a(e.exports,"isFunction",()=>D),a(e.exports,"nearestDivisor",()=>_),a(e.exports,"computeStrides",()=>L),a(e.exports,"toNestedArray",()=>V),a(e.exports,"convertBackendValuesAndArrayBuffer",()=>G),a(e.exports,"makeOnesTypedArray",()=>W),a(e.exports,"makeZerosTypedArray",()=>z),a(e.exports,"makeZerosNestedTypedArray",()=>j),a(e.exports,"assertNonNegativeIntegerDimensions",()=>U),a(e.exports,"locToIndex",()=>q),a(e.exports,"indexToLoc",()=>H),a(e.exports,"isPromise",()=>K)}),x("grcJs",function(e,t){let r;a(e.exports,"getGlobalNamespace",()=>s),a(e.exports,"getGlobal",()=>o);var n=g("hPtJY");function s(){if(null==r){let e;if("undefined"!=typeof window)e=window;else if(void 0!==h)e=h;else if(void 0!==n)e=n;else if("undefined"!=typeof self)e=self;else throw Error("Could not find a global object");r=e}return r}function o(e,t){let r=function(){let e=s();return null==e._tfGlobals&&(e._tfGlobals=new Map),e._tfGlobals}();if(r.has(e))return r.get(e);{let a=t();return r.set(e,a),r.get(e)}}}),x("hPtJY",function(e,t){var r,a,n,s=e.exports={};function o(){throw Error("setTimeout has not been defined")}function i(){throw Error("clearTimeout has not been defined")}try{r="function"==typeof setTimeout?setTimeout:o}catch(e){r=o}try{a="function"==typeof clearTimeout?clearTimeout:i}catch(e){a=i}function l(e){if(r===setTimeout)return setTimeout(e,0);if((r===o||!r)&&setTimeout)return r=setTimeout,setTimeout(e,0);try{return r(e,0)}catch(t){try{return r.call(null,e,0)}catch(t){return r.call(this,e,0)}}}var u=[],p=!1,d=-1;function c(){p&&n&&(p=!1,n.length?u=n.concat(u):d=-1,u.length&&h())}function h(){if(!p){var e=l(c);p=!0;for(var t=u.length;t;){for(n=u,u=[];++d<t;)n&&n[d].run();d=-1,t=u.length}n=null,p=!1,function(e){if(a===clearTimeout)return clearTimeout(e);if((a===i||!a)&&clearTimeout)return a=clearTimeout,clearTimeout(e);try{a(e)}catch(t){try{return a.call(null,e)}catch(t){return a.call(this,e)}}}(e)}}function f(e,t){this.fun=e,this.array=t}function m(){}s.nextTick=function(e){var t=Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)t[r-1]=arguments[r];u.push(new f(e,t)),1!==u.length||p||l(h)},f.prototype.run=function(){this.fun.apply(null,this.array)},s.title="browser",s.browser=!0,s.env={},s.argv=[],s.version="",s.versions={},s.on=m,s.addListener=m,s.once=m,s.off=m,s.removeListener=m,s.removeAllListeners=m,s.emit=m,s.prependListener=m,s.prependOnceListener=m,s.listeners=function(e){return[]},s.binding=function(e){throw Error("process.binding is not supported")},s.cwd=function(){return"/"},s.chdir=function(e){throw Error("process.chdir is not supported")},s.umask=function(){return 0}}),x("hl418",function(e,t){a(e.exports,"Abs",()=>r),a(e.exports,"Acos",()=>n),a(e.exports,"Acosh",()=>s),a(e.exports,"Add",()=>o),a(e.exports,"AddN",()=>i),a(e.exports,"All",()=>l),a(e.exports,"Any",()=>u),a(e.exports,"ArgMax",()=>p),a(e.exports,"ArgMin",()=>d),a(e.exports,"Asin",()=>c),a(e.exports,"Asinh",()=>h),a(e.exports,"Atan",()=>f),a(e.exports,"Atanh",()=>m),a(e.exports,"Atan2",()=>g),a(e.exports,"AvgPool",()=>x),a(e.exports,"AvgPoolGrad",()=>y),a(e.exports,"AvgPool3D",()=>b),a(e.exports,"AvgPool3DGrad",()=>v),a(e.exports,"BatchMatMul",()=>N),a(e.exports,"BatchToSpaceND",()=>k),a(e.exports,"Bincount",()=>T),a(e.exports,"BitwiseAnd",()=>S),a(e.exports,"BroadcastTo",()=>I),a(e.exports,"BroadcastArgs",()=>w),a(e.exports,"Cast",()=>C),a(e.exports,"Ceil",()=>E),a(e.exports,"ClipByValue",()=>A),a(e.exports,"Complex",()=>$),a(e.exports,"ComplexAbs",()=>R),a(e.exports,"Concat",()=>P),a(e.exports,"Conv2D",()=>B),a(e.exports,"Conv2DBackpropFilter",()=>F),a(e.exports,"Conv2DBackpropInput",()=>O),a(e.exports,"Conv3D",()=>M),a(e.exports,"Conv3DBackpropFilterV2",()=>D),a(e.exports,"Conv3DBackpropInputV2",()=>_),a(e.exports,"Cos",()=>L),a(e.exports,"Cosh",()=>V),a(e.exports,"Cumprod",()=>G),a(e.exports,"Cumsum",()=>W),a(e.exports,"CropAndResize",()=>z),a(e.exports,"DenseBincount",()=>j),a(e.exports,"DepthToSpace",()=>U),a(e.exports,"DepthwiseConv2dNative",()=>q),a(e.exports,"DepthwiseConv2dNativeBackpropFilter",()=>H),a(e.exports,"DepthwiseConv2dNativeBackpropInput",()=>K),a(e.exports,"Diag",()=>X),a(e.exports,"Dilation2D",()=>Z),a(e.exports,"Dilation2DBackpropInput",()=>Y),a(e.exports,"Dilation2DBackpropFilter",()=>Q),a(e.exports,"Draw",()=>J),a(e.exports,"RealDiv",()=>ee),a(e.exports,"Einsum",()=>et),a(e.exports,"Elu",()=>er),a(e.exports,"EluGrad",()=>ea),a(e.exports,"Erf",()=>en),a(e.exports,"Equal",()=>es),a(e.exports,"Exp",()=>eo),a(e.exports,"ExpandDims",()=>ei),a(e.exports,"Expm1",()=>el),a(e.exports,"FFT",()=>eu),a(e.exports,"Fill",()=>ep),a(e.exports,"FlipLeftRight",()=>ed),a(e.exports,"Floor",()=>ec),a(e.exports,"FloorDiv",()=>eh),a(e.exports,"FusedBatchNorm",()=>ef),a(e.exports,"GatherV2",()=>em),a(e.exports,"GatherNd",()=>eg),a(e.exports,"Greater",()=>ex),a(e.exports,"GreaterEqual",()=>ey),a(e.exports,"Identity",()=>eb),a(e.exports,"IFFT",()=>ev),a(e.exports,"Imag",()=>eN),a(e.exports,"IsFinite",()=>ek),a(e.exports,"IsInf",()=>eT),a(e.exports,"IsNan",()=>eS),a(e.exports,"LeakyRelu",()=>eI),a(e.exports,"Less",()=>ew),a(e.exports,"LessEqual",()=>eC),a(e.exports,"LinSpace",()=>eE),a(e.exports,"Log",()=>eA),a(e.exports,"Log1p",()=>e$),a(e.exports,"LogicalAnd",()=>eR),a(e.exports,"LogicalNot",()=>eP),a(e.exports,"LogicalOr",()=>eB),a(e.exports,"LogicalXor",()=>eF),a(e.exports,"LogSoftmax",()=>eO),a(e.exports,"LowerBound",()=>eM),a(e.exports,"LRN",()=>eD),a(e.exports,"LRNGrad",()=>e_),a(e.exports,"MatrixBandPart",()=>eL),a(e.exports,"Max",()=>eV),a(e.exports,"Maximum",()=>eG),a(e.exports,"MaxPool",()=>eW),a(e.exports,"MaxPoolGrad",()=>ez),a(e.exports,"MaxPool3D",()=>ej),a(e.exports,"MaxPool3DGrad",()=>eU),a(e.exports,"MaxPoolWithArgmax",()=>eq),a(e.exports,"Mean",()=>eH),a(e.exports,"Min",()=>eK),a(e.exports,"Minimum",()=>eX),a(e.exports,"MirrorPad",()=>eZ),a(e.exports,"Mod",()=>eY),a(e.exports,"Multinomial",()=>eQ),a(e.exports,"Multiply",()=>eJ),a(e.exports,"Neg",()=>e0),a(e.exports,"NotEqual",()=>e1),a(e.exports,"NonMaxSuppressionV3",()=>e2),a(e.exports,"NonMaxSuppressionV4",()=>e4),a(e.exports,"NonMaxSuppressionV5",()=>e3),a(e.exports,"OnesLike",()=>e8),a(e.exports,"OneHot",()=>e6),a(e.exports,"Pack",()=>e5),a(e.exports,"PadV2",()=>e7),a(e.exports,"Pool",()=>e9),a(e.exports,"Pow",()=>te),a(e.exports,"Prelu",()=>tt),a(e.exports,"Prod",()=>tr),a(e.exports,"RaggedGather",()=>ta),a(e.exports,"RaggedRange",()=>tn),a(e.exports,"RaggedTensorToTensor",()=>ts),a(e.exports,"Range",()=>to),a(e.exports,"Real",()=>ti),a(e.exports,"Reciprocal",()=>tl),a(e.exports,"Relu",()=>tu),a(e.exports,"Reshape",()=>tp),a(e.exports,"ResizeNearestNeighbor",()=>td),a(e.exports,"ResizeNearestNeighborGrad",()=>tc),a(e.exports,"ResizeBilinear",()=>th),a(e.exports,"ResizeBilinearGrad",()=>tf),a(e.exports,"Relu6",()=>tm),a(e.exports,"Reverse",()=>tg),a(e.exports,"Round",()=>tx),a(e.exports,"Rsqrt",()=>ty),a(e.exports,"ScatterNd",()=>tb),a(e.exports,"TensorScatterUpdate",()=>tv),a(e.exports,"SearchSorted",()=>tN),a(e.exports,"Select",()=>tk),a(e.exports,"Selu",()=>tT),a(e.exports,"Slice",()=>tS),a(e.exports,"Sin",()=>tI),a(e.exports,"Sinh",()=>tw),a(e.exports,"Sign",()=>tC),a(e.exports,"Sigmoid",()=>tE),a(e.exports,"Softplus",()=>tA),a(e.exports,"Sqrt",()=>t$),a(e.exports,"Sum",()=>tR),a(e.exports,"SpaceToBatchND",()=>tP),a(e.exports,"SplitV",()=>tB),a(e.exports,"Softmax",()=>tF),a(e.exports,"SparseFillEmptyRows",()=>tO),a(e.exports,"SparseReshape",()=>tM),a(e.exports,"SparseSegmentMean",()=>tD),a(e.exports,"SparseSegmentSum",()=>t_),a(e.exports,"SparseToDense",()=>tL),a(e.exports,"SquaredDifference",()=>tV),a(e.exports,"Square",()=>tG),a(e.exports,"StaticRegexReplace",()=>tW),a(e.exports,"StridedSlice",()=>tz),a(e.exports,"StringNGrams",()=>tj),a(e.exports,"StringSplit",()=>tU),a(e.exports,"StringToHashBucketFast",()=>tq),a(e.exports,"Sub",()=>tH),a(e.exports,"Tan",()=>tK),a(e.exports,"Tanh",()=>tX),a(e.exports,"Tile",()=>tZ),a(e.exports,"TopK",()=>tY),a(e.exports,"Transform",()=>tQ),a(e.exports,"Transpose",()=>tJ),a(e.exports,"Unique",()=>t0),a(e.exports,"Unpack",()=>t1),a(e.exports,"UnsortedSegmentSum",()=>t2),a(e.exports,"UpperBound",()=>t4),a(e.exports,"ZerosLike",()=>t3),a(e.exports,"Step",()=>t8),a(e.exports,"FromPixels",()=>t6),a(e.exports,"RotateWithOffset",()=>t5),a(e.exports,"_FusedMatMul",()=>t7),a(e.exports,"FusedConv2D",()=>t9),a(e.exports,"FusedDepthwiseConv2D",()=>re);let r="Abs",n="Acos",s="Acosh",o="Add",i="AddN",l="All",u="Any",p="ArgMax",d="ArgMin",c="Asin",h="Asinh",f="Atan",m="Atanh",g="Atan2",x="AvgPool",y="AvgPoolGrad",b="AvgPool3D",v="AvgPool3DGrad",N="BatchMatMul",k="BatchToSpaceND",T="Bincount",S="BitwiseAnd",I="BroadcastTo",w="BroadcastArgs",C="Cast",E="Ceil",A="ClipByValue",$="Complex",R="ComplexAbs",P="Concat",B="Conv2D",F="Conv2DBackpropFilter",O="Conv2DBackpropInput",M="Conv3D",D="Conv3DBackpropFilterV2",_="Conv3DBackpropInputV2",L="Cos",V="Cosh",G="Cumprod",W="Cumsum",z="CropAndResize",j="DenseBincount",U="DepthToSpace",q="DepthwiseConv2dNative",H="DepthwiseConv2dNativeBackpropFilter",K="DepthwiseConv2dNativeBackpropInput",X="Diag",Z="Dilation2D",Y="Dilation2DBackpropInput",Q="Dilation2DBackpropFilter",J="Draw",ee="RealDiv",et="Einsum",er="Elu",ea="EluGrad",en="Erf",es="Equal",eo="Exp",ei="ExpandDims",el="Expm1",eu="FFT",ep="Fill",ed="FlipLeftRight",ec="Floor",eh="FloorDiv",ef="FusedBatchNorm",em="GatherV2",eg="GatherNd",ex="Greater",ey="GreaterEqual",eb="Identity",ev="IFFT",eN="Imag",ek="IsFinite",eT="IsInf",eS="IsNan",eI="LeakyRelu",ew="Less",eC="LessEqual",eE="LinSpace",eA="Log",e$="Log1p",eR="LogicalAnd",eP="LogicalNot",eB="LogicalOr",eF="LogicalXor",eO="LogSoftmax",eM="LowerBound",eD="LRN",e_="LRNGrad",eL="MatrixBandPart",eV="Max",eG="Maximum",eW="MaxPool",ez="MaxPoolGrad",ej="MaxPool3D",eU="MaxPool3DGrad",eq="MaxPoolWithArgmax",eH="Mean",eK="Min",eX="Minimum",eZ="MirrorPad",eY="Mod",eQ="Multinomial",eJ="Multiply",e0="Neg",e1="NotEqual",e2="NonMaxSuppressionV3",e4="NonMaxSuppressionV4",e3="NonMaxSuppressionV5",e8="OnesLike",e6="OneHot",e5="Pack",e7="PadV2",e9="Pool",te="Pow",tt="Prelu",tr="Prod",ta="RaggedGather",tn="RaggedRange",ts="RaggedTensorToTensor",to="Range",ti="Real",tl="Reciprocal",tu="Relu",tp="Reshape",td="ResizeNearestNeighbor",tc="ResizeNearestNeighborGrad",th="ResizeBilinear",tf="ResizeBilinearGrad",tm="Relu6",tg="Reverse",tx="Round",ty="Rsqrt",tb="ScatterNd",tv="TensorScatterUpdate",tN="SearchSorted",tk="Select",tT="Selu",tS="Slice",tI="Sin",tw="Sinh",tC="Sign",tE="Sigmoid",tA="Softplus",t$="Sqrt",tR="Sum",tP="SpaceToBatchND",tB="SplitV",tF="Softmax",tO="SparseFillEmptyRows",tM="SparseReshape",tD="SparseSegmentMean",t_="SparseSegmentSum",tL="SparseToDense",tV="SquaredDifference",tG="Square",tW="StaticRegexReplace",tz="StridedSlice",tj="StringNGrams",tU="StringSplit",tq="StringToHashBucketFast",tH="Sub",tK="Tan",tX="Tanh",tZ="Tile",tY="TopK",tQ="Transform",tJ="Transpose",t0="Unique",t1="Unpack",t2="UnsortedSegmentSum",t4="UpperBound",t3="ZerosLike",t8="Step",t6="FromPixels",t5="RotateWithOffset",t7="_FusedMatMul",t9="FusedConv2D",re="FusedDepthwiseConv2D"}),x("eky5o",function(e,t){a(e.exports,"getKernel",()=>l),a(e.exports,"getGradient",()=>u),a(e.exports,"getKernelsForBackend",()=>p),a(e.exports,"registerKernel",()=>d),a(e.exports,"registerGradient",()=>c),a(e.exports,"unregisterKernel",()=>h),a(e.exports,"unregisterGradient",()=>f),a(e.exports,"copyRegisteredKernels",()=>m);var r=g("ibsdL"),n=g("grcJs"),s=g("cgHNs");let o=(0,n.getGlobal)("kernelRegistry",()=>new Map),i=(0,n.getGlobal)("gradRegistry",()=>new Map);function l(e,t){let r=x(e,t);return o.get(r)}function u(e){return i.get(e)}function p(e){let t=o.entries(),r=[];for(;;){let{done:a,value:n}=t.next();if(a)break;let[s,o]=n,[i]=s.split("_");i===e&&r.push(o)}return r}function d(e){let{kernelName:t,backendName:r}=e,a=x(t,r);o.has(a)&&s.warn(`The kernel '${t}' for backend '${r}' is already registered`),o.set(a,e)}function c(e){let{kernelName:t}=e;i.has(t)&&(0,r.env)().getBool("DEBUG")&&s.warn(`Overriding the gradient for '${t}'`),i.set(t,e)}function h(e,t){let r=x(e,t);if(!o.has(r))throw Error(`The kernel '${e}' for backend '${t}' is not registered`);o.delete(r)}function f(e){if(!i.has(e))throw Error(`The gradient '${e}' for backend is not registered`);i.delete(e)}function m(e,t){p(e).forEach(e=>{d(Object.assign({},e,{backendName:t}))})}function x(e,t){return`${t}_${e}`}}),x("cgHNs",function(e,t){a(e.exports,"warn",()=>n),a(e.exports,"log",()=>s);var r=g("ibsdL");function n(...e){(0,r.env)().getBool("IS_TEST")||(0,r.env)().getBool("PROD")||console.warn(...e)}function s(...e){(0,r.env)().getBool("IS_TEST")||(0,r.env)().getBool("PROD")||console.log(...e)}}),x("8XpwP",function(e,t){a(e.exports,"Profiler",()=>o);var r=g("ibsdL"),n=g("jjNRA"),s=g("8cCb2");class o{constructor(e,t){this.backendTimer=e,this.logger=t,null==t&&(this.logger=new i)}profileKernel(e,t,a){let s,o,i=()=>{s=a()},l=n.now();if(this.backendTimer.timerAvailable())o=this.backendTimer.time(i);else{for(let e of(i(),s))e.dataSync();o=Promise.resolve({kernelMs:n.now()-l})}if((0,r.env)().getBool("CHECK_COMPUTATION_FOR_ERRORS"))for(let t=0;t<s.length;t++){let r=s[t];r.data().then(t=>{!function(e,t,r){if("float32"===t)for(let t=0;t<e.length;t++){let a=e[t];if(isNaN(a)||!isFinite(a))return console.warn(`Found ${a} in the result of '${r}'`),!0}}(t,r.dtype,e)})}return{kernelName:e,outputs:s,inputs:t,timeMs:o.then(e=>e.kernelMs),extraInfo:o.then(e=>null!=e.getExtraProfileInfo?e.getExtraProfileInfo():"")}}logKernelProfile(e){let{kernelName:t,outputs:r,timeMs:a,inputs:n,extraInfo:s}=e;r.forEach(e=>{Promise.all([e.data(),a,s]).then(r=>{this.logger.logKernelProfile(t,e,r[0],r[1],n,r[2])})})}}class i{logKernelProfile(e,t,r,a,n,o){let i="number"==typeof a?s.rightPad(`${a}ms`,9):a.error,l=s.rightPad(e,25),u=t.rank,p=t.size,d=s.rightPad(t.shape.toString(),14),c="";for(let e in n){let r=n[e];if(null!=r){let a=r.shape||t.shape,n=a.length;c+=`${e}: ${n}D ${n>0?a:""} `}}console.log(`%c${l}	%c${i}	%c${u}D ${d}	%c${p}	%c${c}	%c${o}`,"font-weight:bold","color:red","color:blue","color: orange","color: green","color: steelblue")}}}),x("jjNRA",function(e,t){a(e.exports,"createScalarValue",()=>l),a(e.exports,"encodeString",()=>c),a(e.exports,"toTypedArray",()=>u),a(e.exports,"flatten",()=>m),a(e.exports,"now",()=>p),a(e.exports,"fetch",()=>d),a(e.exports,"decodeString",()=>h),a(e.exports,"isTypedArray",()=>f);var r=g("ibsdL"),s=g("6LqZS"),o=g("8cCb2"),i=g("dI8yQ");function l(e,t){return"string"===t?c(e):u([e],t)}function u(e,t){var a;if("string"===t)throw Error("Cannot convert a string[] to a TypedArray");if(Array.isArray(e)&&(e=m(e)),(0,r.env)().getBool("DEBUG")&&o.checkConversionForErrors(e,t),(a=e)instanceof Float32Array&&"float32"===t||a instanceof Int32Array&&"int32"===t||a instanceof Uint8Array&&"bool"===t)return e;if(null==t||"float32"===t||"complex64"===t)return new Float32Array(e);if("int32"===t)return new Int32Array(e);if("bool"===t){let t=new Uint8Array(e.length);for(let r=0;r<t.length;++r)0!==Math.round(e[r])&&(t[r]=1);return t}throw Error(`Unknown data type ${t}`)}function p(){return(0,r.env)().platform.now()}function d(e,t){return(0,r.env)().platform.fetch(e,t)}function c(e,t="utf-8"){return t=t||"utf-8",(0,r.env)().platform.encode(e,t)}function h(e,t="utf-8"){return t=t||"utf-8",(0,r.env)().platform.decode(e,t)}function f(e){return null!=(0,r.env)().platform.isTypedArray?(0,r.env)().platform.isTypedArray(e):(0,s.isTypedArrayBrowser)(e)}function m(e,t=[],r=!1){if(null==t&&(t=[]),"boolean"==typeof e||"number"==typeof e||"string"==typeof e||o.isPromise(e)||null==e||f(e)&&r)t.push(e);else if(Array.isArray(e)||f(e))for(let a=0;a<e.length;++a)m(e[a],t,r);else{let a=-1;for(let t of Object.keys(e))/^([1-9]+[0-9]*|0)$/.test(t)&&(a=Math.max(a,Number(t)));for(let n=0;n<=a;n++)m(e[n],t,r)}return t}n(e.exports,o),n(e.exports,i)}),x("6LqZS",function(e,t){a(e.exports,"isTypedArrayBrowser",()=>r);function r(e){return e instanceof Float32Array||e instanceof Int32Array||e instanceof Uint8Array||e instanceof Uint8ClampedArray}}),x("dI8yQ",function(e,t){a(e.exports,"hexToLong",()=>s),a(e.exports,"fingerPrint64",()=>m);var r=g("iPWI7");let n=r.default||r;function s(e){return n.fromString(e,!0,16)}let o=s("c3a5c85c97cb3127"),i=s("b492b66fbe98f273"),l=s("9ae16a3b2f90404f");function u(e){return e.xor(e.shru(47))}function p(e,t,r){let a=e.slice(t,t+r);return n.fromBytes(Array.from(a),!0,!0)}function d(e,t){return p(e,t,8)}function c(e,t){return 0===t?e:e.shru(t).or(e.shl(64-t))}function h(e,t,r=s("9ddfea08eb382d69")){let a=e.xor(t).mul(r);a=a.xor(a.shru(47));let n=t.xor(a).mul(r);return(n=n.xor(n.shru(47))).mul(r)}function f(e,t,r,a){return function(e,t,r,a,n,s){n=n.add(e),s=c(s.add(n).add(a),21);let o=n;return n=(n=n.add(t)).add(r),s=s.add(c(n,44)),[n.add(a),s.add(o)]}(d(e,t),d(e,t+8),d(e,t+16),d(e,t+24),r,a)}function m(e,t=e.length){let r=n.fromNumber(81,!0);if(t<=32)if(t<=16)return function(e,t=e.length){if(t>=8){let r=l.add(2*t),a=d(e,0).add(l),n=d(e,t-8);return h(c(n,37).mul(r).add(a),c(a,25).add(n).mul(r),r)}if(t>=4){let r=l.add(2*t);return h(p(e,0,4).shl(3).add(t),p(e,t-4,4),r)}if(t>0){let r=e[0],a=e[t>>1],n=e[t-1];return u(l.mul(r+(a<<8)).xor(o.mul(t+(n<<2)))).mul(l)}return l}(e,t);else return function(e,t=e.length){let r=l.add(2*t),a=d(e,0).mul(i),n=d(e,8),s=d(e,t-8).mul(r),o=d(e,t-16).mul(l);return h(c(a.add(n),43).add(c(s,30)).add(o),a.add(c(n.add(l),18)).add(s),r)}(e,t);if(t<=64)return function(e,t=e.length){let r=l.add(2*t),a=d(e,0).mul(l),n=d(e,8),s=d(e,t-8).mul(r),o=d(e,t-16).mul(l),i=c(a.add(n),43).add(c(s,30)).add(o),u=h(i,a.add(c(n.add(l),18)).add(s),r),p=d(e,16).mul(r),f=d(e,24),m=i.add(d(e,t-32)).mul(r),g=u.add(d(e,t-24)).mul(r);return h(c(p.add(f),43).add(c(m,30)).add(g),p.add(c(f.add(a),18)).add(m),r)}(e,t);let a=r,s=r.mul(i).add(113),g=u(s.mul(l).add(113)).mul(l),x=[n.UZERO,n.UZERO],y=[n.UZERO,n.UZERO];a=a.mul(l).add(d(e,0));let b=0,v=(t-1>>6)*64,N=v+(t-1&63)-63;do a=c(a.add(s).add(x[0]).add(d(e,b+8)),37).mul(i),s=c(s.add(x[1]).add(d(e,b+48)),42).mul(i),a=a.xor(y[1]),s=s.add(x[0]).add(d(e,b+40)),g=c(g.add(y[0]),33).mul(i),x=f(e,b,x[1].mul(i),a.add(y[0])),y=f(e,b+32,g.add(y[1]),s.add(d(e,b+16))),[g,a]=[a,g],b+=64;while(b!==v)let k=i.add(g.and(255).shl(1));return b=N,y[0]=y[0].add(t-1&63),x[0]=x[0].add(y[0]),y[0]=y[0].add(x[0]),a=c(a.add(s).add(x[0]).add(d(e,b+8)),37).mul(k),s=c(s.add(x[1]).add(d(e,b+48)),42).mul(k),a=a.xor(y[1].mul(9)),s=s.add(x[0].mul(9).add(d(e,b+40))),g=c(g.add(y[0]),33).mul(k),x=f(e,b,x[1].mul(k),a.add(y[0])),y=f(e,b+32,g.add(y[1]),s.add(d(e,b+16))),[g,a]=[a,g],h(h(x[0],y[0],k).add(u(s).mul(o)).add(g),h(x[1],y[1],k).add(a),k)}}),x("iPWI7",function(e,t){e.exports=a;var r=null;try{r=new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([0,97,115,109,1,0,0,0,1,13,2,96,0,1,127,96,4,127,127,127,127,1,127,3,7,6,0,1,1,1,1,1,6,6,1,127,1,65,0,11,7,50,6,3,109,117,108,0,1,5,100,105,118,95,115,0,2,5,100,105,118,95,117,0,3,5,114,101,109,95,115,0,4,5,114,101,109,95,117,0,5,8,103,101,116,95,104,105,103,104,0,0,10,191,1,6,4,0,35,0,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,126,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,127,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,128,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,129,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,130,34,4,66,32,135,167,36,0,32,4,167,11])),{}).exports}catch(e){}function a(e,t,r){this.low=0|e,this.high=0|t,this.unsigned=!!r}function n(e){return!0===(e&&e.__isLong__)}a.prototype.__isLong__,Object.defineProperty(a.prototype,"__isLong__",{value:!0}),a.isLong=n;var s={},o={};function i(e,t){var r,a,n;if(t)return(e>>>=0,(n=0<=e&&e<256)&&(a=o[e]))?a:(r=u(e,(0|e)<0?-1:0,!0),n&&(o[e]=r),r);return(e|=0,(n=-128<=e&&e<128)&&(a=s[e]))?a:(r=u(e,e<0?-1:0,!1),n&&(s[e]=r),r)}function l(e,t){if(isNaN(e))return t?y:x;if(t){if(e<0)return y;if(e>=f)return T}else{if(e<=-m)return S;if(e+1>=m)return k}return e<0?l(-e,t).neg():u(e%h|0,e/h|0,t)}function u(e,t,r){return new a(e,t,r)}a.fromInt=i,a.fromNumber=l,a.fromBits=u;var p=Math.pow;function d(e,t,r){if(0===e.length)throw Error("empty string");if("NaN"===e||"Infinity"===e||"+Infinity"===e||"-Infinity"===e)return x;if("number"==typeof t?(r=t,t=!1):t=!!t,(r=r||10)<2||36<r)throw RangeError("radix");if((a=e.indexOf("-"))>0)throw Error("interior hyphen");if(0===a)return d(e.substring(1),t,r).neg();for(var a,n=l(p(r,8)),s=x,o=0;o<e.length;o+=8){var i=Math.min(8,e.length-o),u=parseInt(e.substring(o,o+i),r);if(i<8){var c=l(p(r,i));s=s.mul(c).add(l(u))}else s=(s=s.mul(n)).add(l(u))}return s.unsigned=t,s}function c(e,t){return"number"==typeof e?l(e,t):"string"==typeof e?d(e,t):u(e.low,e.high,"boolean"==typeof t?t:e.unsigned)}a.fromString=d,a.fromValue=c;var h=0x100000000,f=0xffffffffffffffff,m=0x8000000000000000,g=i(0x1000000),x=i(0);a.ZERO=x;var y=i(0,!0);a.UZERO=y;var b=i(1);a.ONE=b;var v=i(1,!0);a.UONE=v;var N=i(-1);a.NEG_ONE=N;var k=u(-1,0x7fffffff,!1);a.MAX_VALUE=k;var T=u(-1,-1,!0);a.MAX_UNSIGNED_VALUE=T;var S=u(0,-0x80000000,!1);a.MIN_VALUE=S;var I=a.prototype;I.toInt=function(){return this.unsigned?this.low>>>0:this.low},I.toNumber=function(){return this.unsigned?(this.high>>>0)*h+(this.low>>>0):this.high*h+(this.low>>>0)},I.toString=function(e){if((e=e||10)<2||36<e)throw RangeError("radix");if(this.isZero())return"0";if(this.isNegative())if(!this.eq(S))return"-"+this.neg().toString(e);else{var t=l(e),r=this.div(t),a=r.mul(t).sub(this);return r.toString(e)+a.toInt().toString(e)}for(var n=l(p(e,6),this.unsigned),s=this,o="";;){var i=s.div(n),u=(s.sub(i.mul(n)).toInt()>>>0).toString(e);if((s=i).isZero())return u+o;for(;u.length<6;)u="0"+u;o=""+u+o}},I.getHighBits=function(){return this.high},I.getHighBitsUnsigned=function(){return this.high>>>0},I.getLowBits=function(){return this.low},I.getLowBitsUnsigned=function(){return this.low>>>0},I.getNumBitsAbs=function(){if(this.isNegative())return this.eq(S)?64:this.neg().getNumBitsAbs();for(var e=0!=this.high?this.high:this.low,t=31;t>0&&(e&1<<t)==0;t--);return 0!=this.high?t+33:t+1},I.isZero=function(){return 0===this.high&&0===this.low},I.eqz=I.isZero,I.isNegative=function(){return!this.unsigned&&this.high<0},I.isPositive=function(){return this.unsigned||this.high>=0},I.isOdd=function(){return(1&this.low)==1},I.isEven=function(){return(1&this.low)==0},I.equals=function(e){return n(e)||(e=c(e)),(this.unsigned===e.unsigned||this.high>>>31!=1||e.high>>>31!=1)&&this.high===e.high&&this.low===e.low},I.eq=I.equals,I.notEquals=function(e){return!this.eq(e)},I.neq=I.notEquals,I.ne=I.notEquals,I.lessThan=function(e){return 0>this.comp(e)},I.lt=I.lessThan,I.lessThanOrEqual=function(e){return 0>=this.comp(e)},I.lte=I.lessThanOrEqual,I.le=I.lessThanOrEqual,I.greaterThan=function(e){return this.comp(e)>0},I.gt=I.greaterThan,I.greaterThanOrEqual=function(e){return this.comp(e)>=0},I.gte=I.greaterThanOrEqual,I.ge=I.greaterThanOrEqual,I.compare=function(e){if(n(e)||(e=c(e)),this.eq(e))return 0;var t=this.isNegative(),r=e.isNegative();return t&&!r?-1:!t&&r?1:this.unsigned?e.high>>>0>this.high>>>0||e.high===this.high&&e.low>>>0>this.low>>>0?-1:1:this.sub(e).isNegative()?-1:1},I.comp=I.compare,I.negate=function(){return!this.unsigned&&this.eq(S)?S:this.not().add(b)},I.neg=I.negate,I.add=function(e){n(e)||(e=c(e));var t,r,a=this.high>>>16,s=65535&this.high,o=this.low>>>16,i=65535&this.low,l=e.high>>>16,p=65535&e.high,d=e.low>>>16,h=65535&e.low,f=0,m=0;return t=0+((r=0+(i+h))>>>16),r&=65535,t+=o+d,m+=t>>>16,t&=65535,m+=s+p,f+=m>>>16,m&=65535,f+=a+l,u(t<<16|r,(f&=65535)<<16|m,this.unsigned)},I.subtract=function(e){return n(e)||(e=c(e)),this.add(e.neg())},I.sub=I.subtract,I.multiply=function(e){if(this.isZero())return x;if(n(e)||(e=c(e)),r)return u(r.mul(this.low,this.high,e.low,e.high),r.get_high(),this.unsigned);if(e.isZero())return x;if(this.eq(S))return e.isOdd()?S:x;if(e.eq(S))return this.isOdd()?S:x;if(this.isNegative())if(e.isNegative())return this.neg().mul(e.neg());else return this.neg().mul(e).neg();if(e.isNegative())return this.mul(e.neg()).neg();if(this.lt(g)&&e.lt(g))return l(this.toNumber()*e.toNumber(),this.unsigned);var t,a,s=this.high>>>16,o=65535&this.high,i=this.low>>>16,p=65535&this.low,d=e.high>>>16,h=65535&e.high,f=e.low>>>16,m=65535&e.low,y=0,b=0;return t=0+((a=0+p*m)>>>16),a&=65535,t+=i*m,b+=t>>>16,t&=65535,t+=p*f,b+=t>>>16,t&=65535,b+=o*m,y+=b>>>16,b&=65535,b+=i*f,y+=b>>>16,b&=65535,b+=p*h,y+=b>>>16,b&=65535,y+=s*m+o*f+i*h+p*d,u(t<<16|a,(y&=65535)<<16|b,this.unsigned)},I.mul=I.multiply,I.divide=function(e){if(n(e)||(e=c(e)),e.isZero())throw Error("division by zero");if(r){var t,a,s;return this.unsigned||-0x80000000!==this.high||-1!==e.low||-1!==e.high?u((this.unsigned?r.div_u:r.div_s)(this.low,this.high,e.low,e.high),r.get_high(),this.unsigned):this}if(this.isZero())return this.unsigned?y:x;if(this.unsigned){if(e.unsigned||(e=e.toUnsigned()),e.gt(this))return y;if(e.gt(this.shru(1)))return v;s=y}else{if(this.eq(S))if(e.eq(b)||e.eq(N))return S;else return e.eq(S)?b:(t=this.shr(1).div(e).shl(1)).eq(x)?e.isNegative()?b:N:(a=this.sub(e.mul(t)),s=t.add(a.div(e)));if(e.eq(S))return this.unsigned?y:x;if(this.isNegative())return e.isNegative()?this.neg().div(e.neg()):this.neg().div(e).neg();if(e.isNegative())return this.div(e.neg()).neg();s=x}for(a=this;a.gte(e);){for(var o=Math.ceil(Math.log(t=Math.max(1,Math.floor(a.toNumber()/e.toNumber())))/Math.LN2),i=o<=48?1:p(2,o-48),d=l(t),h=d.mul(e);h.isNegative()||h.gt(a);)t-=i,h=(d=l(t,this.unsigned)).mul(e);d.isZero()&&(d=b),s=s.add(d),a=a.sub(h)}return s},I.div=I.divide,I.modulo=function(e){return(n(e)||(e=c(e)),r)?u((this.unsigned?r.rem_u:r.rem_s)(this.low,this.high,e.low,e.high),r.get_high(),this.unsigned):this.sub(this.div(e).mul(e))},I.mod=I.modulo,I.rem=I.modulo,I.not=function(){return u(~this.low,~this.high,this.unsigned)},I.and=function(e){return n(e)||(e=c(e)),u(this.low&e.low,this.high&e.high,this.unsigned)},I.or=function(e){return n(e)||(e=c(e)),u(this.low|e.low,this.high|e.high,this.unsigned)},I.xor=function(e){return n(e)||(e=c(e)),u(this.low^e.low,this.high^e.high,this.unsigned)},I.shiftLeft=function(e){return(n(e)&&(e=e.toInt()),0==(e&=63))?this:e<32?u(this.low<<e,this.high<<e|this.low>>>32-e,this.unsigned):u(0,this.low<<e-32,this.unsigned)},I.shl=I.shiftLeft,I.shiftRight=function(e){return(n(e)&&(e=e.toInt()),0==(e&=63))?this:e<32?u(this.low>>>e|this.high<<32-e,this.high>>e,this.unsigned):u(this.high>>e-32,this.high>=0?0:-1,this.unsigned)},I.shr=I.shiftRight,I.shiftRightUnsigned=function(e){if(n(e)&&(e=e.toInt()),0==(e&=63))return this;var t=this.high;return e<32?u(this.low>>>e|t<<32-e,t>>>e,this.unsigned):32===e?u(t,0,this.unsigned):u(t>>>e-32,0,this.unsigned)},I.shru=I.shiftRightUnsigned,I.shr_u=I.shiftRightUnsigned,I.toSigned=function(){return this.unsigned?u(this.low,this.high,!1):this},I.toUnsigned=function(){return this.unsigned?this:u(this.low,this.high,!0)},I.toBytes=function(e){return e?this.toBytesLE():this.toBytesBE()},I.toBytesLE=function(){var e=this.high,t=this.low;return[255&t,t>>>8&255,t>>>16&255,t>>>24,255&e,e>>>8&255,e>>>16&255,e>>>24]},I.toBytesBE=function(){var e=this.high,t=this.low;return[e>>>24,e>>>16&255,e>>>8&255,255&e,t>>>24,t>>>16&255,t>>>8&255,255&t]},a.fromBytes=function(e,t,r){return r?a.fromBytesLE(e,t):a.fromBytesBE(e,t)},a.fromBytesLE=function(e,t){return new a(e[0]|e[1]<<8|e[2]<<16|e[3]<<24,e[4]|e[5]<<8|e[6]<<16|e[7]<<24,t)},a.fromBytesBE=function(e,t){return new a(e[4]<<24|e[5]<<16|e[6]<<8|e[7],e[0]<<24|e[1]<<16|e[2]<<8|e[3],t)}}),x("8zD9D",function(e,t){a(e.exports,"getFilteredNodesXToY",()=>n),a(e.exports,"backpropagateGradients",()=>s);var r=g("8cCb2");function n(e,t,r){let a={},n={};for(let e=0;e<t.length;e++)a[t[e].id]=!0;for(let r=0;r<e.length;r++){let s=e[r],o=s.inputs;for(let e in o){let r=o[e],i=!1;for(let e=0;e<t.length;e++)if(a[r.id]){s.outputs.forEach(e=>a[e.id]=!0),i=!0,n[s.id]=!0;break}if(i)break}}let s={};s[r.id]=!0;let o={};for(let t=e.length-1;t>=0;t--){let r=e[t],a=r.inputs;for(let e=0;e<r.outputs.length;e++)if(s[r.outputs[e].id]){for(let e in a)s[a[e].id]=!0,o[r.id]=!0;break}}let i=[];for(let t=0;t<e.length;t++){let r=e[t];if(n[r.id]&&o[r.id]){let e={};for(let t in r.inputs){let n=r.inputs[t];a[n.id]&&(e[t]=n)}let t=Object.assign({},r);t.inputs=e,t.outputs=r.outputs,i.push(t)}}return i}function s(e,t,a,n){for(let s=t.length-1;s>=0;s--){let o=t[s],i=[];if(o.outputs.forEach(t=>{let r=e[t.id];null!=r?i.push(r):i.push(null)}),null==o.gradient)throw Error(`Cannot compute gradient: gradient function not found for ${o.kernelName}.`);let l=o.gradient(i);for(let t in o.inputs){if(!(t in l))throw Error(`Cannot backprop through input ${t}. Available gradients found: ${Object.keys(l)}.`);let s=a(()=>l[t]());if("float32"!==s.dtype)throw Error(`Error in gradient for op ${o.kernelName}. The gradient of input ${t} must have 'float32' dtype, but has '${s.dtype}'`);let i=o.inputs[t];if(!r.arraysEqual(s.shape,i.shape))throw Error(`Error in gradient for op ${o.kernelName}. The gradient of input '${t}' has shape '${s.shape}', which does not match the shape of the input '${i.shape}'`);if(null==e[i.id])e[i.id]=s;else{let t=e[i.id];e[i.id]=n(t,s),t.dispose()}}}}}),x("9jCh7",function(e,t){a(e.exports,"TensorBuffer",()=>i),a(e.exports,"setTensorTracker",()=>p),a(e.exports,"setOpHandler",()=>d),a(e.exports,"setDeprecationWarningFn",()=>c),a(e.exports,"Tensor",()=>h),a(e.exports,"getGlobalTensorClass",()=>f),a(e.exports,"Variable",()=>m);var r=g("grcJs"),n=g("iODUZ"),s=g("8cCb2"),o=g("jjNRA");class i{constructor(e,t,r){if(this.dtype=t,this.shape=e.slice(),this.size=s.sizeFromShape(e),null!=r){let e=r.length;s.assert(e===this.size,()=>`Length of values '${e}' does not match the size inferred by the shape '${this.size}'.`)}if("complex64"===t)throw Error("complex64 dtype TensorBuffers are not supported. Please create a TensorBuffer for the real and imaginary parts separately and call tf.complex(real, imag).");this.values=r||s.getArrayFromDType(t,this.size),this.strides=(0,s.computeStrides)(e)}set(e,...t){0===t.length&&(t=[0]),s.assert(t.length===this.rank,()=>`The number of provided coordinates (${t.length}) must match the rank (${this.rank})`);let r=this.locToIndex(t);this.values[r]=e}get(...e){0===e.length&&(e=[0]);let t=0;for(let r of e){if(r<0||r>=this.shape[t])throw Error(`Requested out of range element at ${e}.   Buffer shape=${this.shape}`);t++}let r=e[e.length-1];for(let t=0;t<e.length-1;++t)r+=this.strides[t]*e[t];return this.values[r]}locToIndex(e){if(0===this.rank)return 0;if(1===this.rank)return e[0];let t=e[e.length-1];for(let r=0;r<e.length-1;++r)t+=this.strides[r]*e[r];return t}indexToLoc(e){if(0===this.rank)return[];if(1===this.rank)return[e];let t=Array(this.shape.length);for(let r=0;r<t.length-1;++r)t[r]=Math.floor(e/this.strides[r]),e-=t[r]*this.strides[r];return t[t.length-1]=e,t}get rank(){return this.shape.length}toTensor(){return l().makeTensor(this.values,this.shape,this.dtype)}}let l=null,u=null;function p(e){l=e}function d(e){u=e}function c(e){}class h{constructor(e,t,r,a){this.kept=!1,this.isDisposedInternal=!1,this.shape=e.slice(),this.dtype=t||"float32",this.size=s.sizeFromShape(e),this.strides=(0,s.computeStrides)(e),this.dataId=r,this.id=a,this.rankType=this.rank<5?this.rank.toString():"higher"}get rank(){return this.shape.length}async buffer(){let e=await this.data();return u.buffer(this.shape,this.dtype,e)}bufferSync(){return u.buffer(this.shape,this.dtype,this.dataSync())}async array(){let e=await this.data();return(0,s.toNestedArray)(this.shape,e,"complex64"===this.dtype)}arraySync(){return(0,s.toNestedArray)(this.shape,this.dataSync(),"complex64"===this.dtype)}async data(){this.throwIfDisposed();let e=l().read(this.dataId);if("string"===this.dtype){let t=await e;try{return t.map(e=>o.decodeString(e))}catch(e){throw Error("Failed to decode the string bytes into utf-8. To get the original bytes, call tensor.bytes().")}}return e}dataToGPU(e){return this.throwIfDisposed(),l().readToGPU(this.dataId,e)}dataSync(){this.throwIfDisposed();let e=l().readSync(this.dataId);if("string"===this.dtype)try{return e.map(e=>o.decodeString(e))}catch(e){throw Error("Failed to decode the string bytes into utf-8. To get the original bytes, call tensor.bytes().")}return e}async bytes(){this.throwIfDisposed();let e=await l().read(this.dataId);return"string"===this.dtype?e:new Uint8Array(e.buffer)}dispose(){this.isDisposed||(this.kerasMask&&this.kerasMask.dispose(),l().disposeTensor(this),this.isDisposedInternal=!0)}get isDisposed(){return this.isDisposedInternal}throwIfDisposed(){if(this.isDisposed)throw Error("Tensor is disposed.")}print(e=!1){return u.print(this,e)}clone(){return this.throwIfDisposed(),u.clone(this)}toString(e=!1){let t=this.dataSync();return(0,n.tensorToString)(t,this.shape,this.dtype,e)}cast(e){return this.throwIfDisposed(),u.cast(this,e)}variable(e=!0,t,r){return this.throwIfDisposed(),l().makeVariable(this,e,t,r)}}function f(){return(0,r.getGlobal)("Tensor",()=>h)}Object.defineProperty(h,Symbol.hasInstance,{value:e=>!!e&&null!=e.data&&null!=e.dataSync&&null!=e.throwIfDisposed}),f();class m extends h{constructor(e,t,r,a){super(e.shape,e.dtype,e.dataId,a),this.trainable=t,this.name=r}assign(e){if(e.dtype!==this.dtype)throw Error(`dtype of the new value (${e.dtype}) and previous value (${this.dtype}) must match`);if(!s.arraysEqual(e.shape,this.shape))throw Error(`shape of the new value (${e.shape}) and previous value (${this.shape}) must match`);l().disposeTensor(this),this.dataId=e.dataId,l().incRef(this,null)}dispose(){l().disposeVariable(this),this.isDisposedInternal=!0}}Object.defineProperty(m,Symbol.hasInstance,{value:e=>e instanceof h&&null!=e.assign&&e.assign instanceof Function})}),x("iODUZ",function(e,t){a(e.exports,"tensorToString",()=>n);var r=g("8cCb2");function n(e,t,a,n){let l=(0,r.computeStrides)(t),u=function(e,t,a,n){let o=(0,r.sizeFromShape)(t),l=n[n.length-1],u=Array(l).fill(0),p=t.length,d="complex64"===a?i(e):e;if(p>1)for(let e=0;e<o/l;e++){let t=e*l;for(let e=0;e<l;e++)u[e]=Math.max(u[e],s(d[t+e],0,a).length)}return u}(e,t,a,l),p=t.length,d=function e(t,r,a,n,l,u=!0){let p="complex64"===a?2:1,d=r[0],c=r.length;if(0===c)return"complex64"===a?[s(i(t)[0],0,a)]:"bool"===a?[o(t[0])]:[t[0].toString()];if(1===c){if(d>20){let e=Array.from(t.slice(0,3*p)),r=Array.from(t.slice((d-3)*p,d*p));return"complex64"===a&&(e=i(e),r=i(r)),["["+e.map((e,t)=>s(e,l[t],a)).join(", ")+", ..., "+r.map((e,t)=>s(e,l[d-3+t],a)).join(", ")+"]"]}return["["+("complex64"===a?i(t):Array.from(t)).map((e,t)=>s(e,l[t],a)).join(", ")+"]"]}let h=r.slice(1),f=n.slice(1),m=n[0]*p,g=[];if(d>20){for(let r=0;r<3;r++){let n=r*m,s=n+m;g.push(...e(t.slice(n,s),h,a,f,l,!1))}g.push("...");for(let r=d-3;r<d;r++){let n=r*m,s=n+m;g.push(...e(t.slice(n,s),h,a,f,l,r===d-1))}}else for(let r=0;r<d;r++){let n=r*m,s=n+m;g.push(...e(t.slice(n,s),h,a,f,l,r===d-1))}let x=2===c?",":"";g[0]="["+(d>0?g[0]+x:"");for(let e=1;e<g.length-1;e++)g[e]=" "+g[e]+x;let y=",\n";for(let e=2;e<c;e++)y+="\n";return g[g.length-1]=" "+g[g.length-1]+"]"+(u?"":y),g}(e,t,a,l,u),c=["Tensor"];return n&&(c.push(`  dtype: ${a}`),c.push(`  rank: ${p}`),c.push(`  shape: [${t}]`),c.push("  values:")),c.push(d.map(e=>"    "+e).join("\n")),c.join("\n")}function s(e,t,a){let n;return n=Array.isArray(e)?`${parseFloat(e[0].toFixed(7))} + ${parseFloat(e[1].toFixed(7))}j`:(0,r.isString)(e)?`'${e}'`:"bool"===a?o(e):parseFloat(e.toFixed(7)).toString(),(0,r.rightPad)(n,t)}function o(e){return 0===e?"false":"true"}function i(e){let t=[];for(let r=0;r<e.length;r+=2)t.push([e[r],e[r+1]]);return t}}),x("3w4Rg",function(e,t){a(e.exports,"makeTypesMatch",()=>o),a(e.exports,"assertTypesMatch",()=>i),a(e.exports,"isTensorInList",()=>l),a(e.exports,"getTensorsInContainer",()=>u);var r=g("9jCh7"),n=g("2MDja"),s=g("8cCb2");function o(e,t){if(e.dtype===t.dtype)return[e,t];let r=(0,n.upcastType)(e.dtype,t.dtype);return[e.cast(r),t.cast(r)]}function i(e,t){(0,s.assert)(e.dtype===t.dtype,()=>`The dtypes of the first(${e.dtype}) and second(${t.dtype}) input must match`)}function l(e,t){return t.some(t=>t.id===e.id)}function u(e){let t=[];return function e(t,a,n){var s;if(null!=t){if(t instanceof r.Tensor)return void a.push(t);if(Array.isArray(s=t)||"object"==typeof s)for(let r in t){let s=t[r];n.has(s)||(n.add(s),e(s,a,n))}}}(e,t,new Set),t}}),x("2MDja",function(e,t){var r,n,s,o,i,l,u,p,d,c;a(e.exports,"Rank",()=>r),a(e.exports,"upcastType",()=>f),a(e.exports,"sumOutType",()=>m),a(e.exports,"isWebGLData",()=>g),a(e.exports,"isWebGPUData",()=>x),(l=r||(r={})).R0="R0",l.R1="R1",l.R2="R2",l.R3="R3",l.R4="R4",l.R5="R5",l.R6="R6",(u=n||(n={})).float32="float32",u.int32="int32",u.bool="int32",u.complex64="complex64",(p=s||(s={})).float32="float32",p.int32="int32",p.bool="bool",p.complex64="complex64",(d=o||(o={})).float32="float32",d.int32="float32",d.bool="float32",d.complex64="complex64",(c=i||(i={})).float32="complex64",c.int32="complex64",c.bool="complex64",c.complex64="complex64";let h={float32:o,int32:n,bool:s,complex64:i};function f(e,t){if("string"===e||"string"===t){if("string"===e&&"string"===t)return"string";throw Error(`Can not upcast ${e} with ${t}`)}return h[e][t]}function m(e){return f(e,"int32")}function g(e){return null!=e&&"object"==typeof e&&"texture"in e&&e.texture instanceof WebGLTexture}function x(e){return"undefined"!=typeof GPUBuffer&&null!=e&&"object"==typeof e&&"buffer"in e&&e.buffer instanceof GPUBuffer}}),x("dcHSK",function(e,t){g("38WwN");var r=g("4GTZ3");let a=(0,g("ibsdL").env)();a.registerFlag("DEBUG",()=>!1,e=>{e&&console.warn("Debugging mode is ON. The output of every math call will be downloaded to CPU and checked for NaNs. This significantly impacts performance.")}),a.registerFlag("IS_BROWSER",()=>r.isBrowser()),a.registerFlag("IS_NODE",()=>!1),a.registerFlag("IS_CHROME",()=>"undefined"!=typeof navigator&&null!=navigator&&null!=navigator.userAgent&&/Chrome/.test(navigator.userAgent)&&/Google Inc/.test(navigator.vendor)),a.registerFlag("IS_SAFARI",()=>"undefined"!=typeof navigator&&null!=navigator&&null!=navigator.userAgent&&/Safari/.test(navigator.userAgent)&&/Apple/.test(navigator.vendor)),a.registerFlag("PROD",()=>!1),a.registerFlag("TENSORLIKE_CHECK_SHAPE_CONSISTENCY",()=>a.getBool("DEBUG")),a.registerFlag("DEPRECATION_WARNINGS_ENABLED",()=>!0),a.registerFlag("IS_TEST",()=>!1),a.registerFlag("CHECK_COMPUTATION_FOR_ERRORS",()=>a.getBool("DEBUG")),a.registerFlag("WRAP_TO_IMAGEBITMAP",()=>!1),a.registerFlag("CANVAS2D_WILL_READ_FREQUENTLY_FOR_GPU",()=>!1),a.registerFlag("USE_SETTIMEOUTCUSTOM",()=>!1)}),x("4GTZ3",function(e,t){let r;function n(e){r=e}function s(e){if(void 0!==r)return r;if(e||"undefined"!=typeof navigator&&null!=navigator){if(e||(e=navigator),"ReactNative"===e.product)return!0;let t=e.userAgent||e.vendor||("undefined"!=typeof window?window.opera:"");if(!t){let t=e;return t.userAgentData&&t.userAgentData.mobile}return/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(t)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(t.substr(0,4))}return!1}function o(){return"undefined"!=typeof window&&null!=window.document||"undefined"!=typeof WorkerGlobalScope}a(e.exports,"mockIsMobile",()=>n),a(e.exports,"isMobile",()=>s),a(e.exports,"isBrowser",()=>o)}),x("1MXhU",function(e,t){g("dcHSK");var r=g("ibsdL"),a=g("caMdQ"),n=g("h6KCl"),s=g("1PMKz"),o=g("6LqZS");if((0,r.env)().get("IS_BROWSER")){(0,r.env)().setPlatform("browser",new class{constructor(){this.messageName="setTimeoutCustom",this.functionRefs=[],this.handledMessageCount=0,this.hasEventListener=!1}fetch(e,t){return fetch(e,t)}now(){return performance.now()}encode(e,t){if("utf-8"!==t&&"utf8"!==t)throw Error(`Browser's encoder only supports utf-8, but got ${t}`);return null==this.textEncoder&&(this.textEncoder=new TextEncoder),this.textEncoder.encode(e)}decode(e,t){return new TextDecoder(t).decode(e)}setTimeoutCustom(e,t){if("undefined"==typeof window||!(0,r.env)().getBool("USE_SETTIMEOUTCUSTOM"))return void setTimeout(e,t);this.functionRefs.push(e),setTimeout(()=>{window.postMessage({name:this.messageName,index:this.functionRefs.length-1},"*")},t),this.hasEventListener||(this.hasEventListener=!0,window.addEventListener("message",e=>{e.source===window&&e.data.name===this.messageName&&(e.stopPropagation(),(0,this.functionRefs[e.data.index])(),this.handledMessageCount++,this.handledMessageCount===this.functionRefs.length&&(this.functionRefs=[],this.handledMessageCount=0))},!0))}isTypedArray(e){return(0,o.isTypedArrayBrowser)(e)}});try{s.ModelStoreManagerRegistry.registerManager(n.BrowserLocalStorage.URL_SCHEME,new(0,n.BrowserLocalStorageManager))}catch(e){}try{s.ModelStoreManagerRegistry.registerManager(a.BrowserIndexedDB.URL_SCHEME,new(0,a.BrowserIndexedDBManager))}catch(e){}}}),x("caMdQ",function(e,t){a(e.exports,"BrowserIndexedDB",()=>c),a(e.exports,"BrowserIndexedDBManager",()=>f),g("dcHSK");var r=g("ibsdL"),n=g("4FRLN"),s=g("9RUNn"),o=g("hBb8J");let i="tensorflowjs",l="models_store",u="model_info_store";function p(){if(!(0,r.env)().getBool("IS_BROWSER"))throw Error("Failed to obtain IndexedDB factory because the current environmentis not a web browser.");let e="undefined"==typeof window?self:window,t=e.indexedDB||e.mozIndexedDB||e.webkitIndexedDB||e.msIndexedDB||e.shimIndexedDB;if(null==t)throw Error("The current browser does not appear to support IndexedDB.");return t}function d(e){let t=e.result;t.createObjectStore(l,{keyPath:"modelPath"}),t.createObjectStore(u,{keyPath:"modelPath"})}class c{constructor(e){if(this.indexedDB=p(),null==e||!e)throw Error("For IndexedDB, modelPath must not be null, undefined or empty.");this.modelPath=e}async save(e){if(e.modelTopology instanceof ArrayBuffer)throw Error("BrowserLocalStorage.save() does not support saving model topology in binary formats yet.");return this.databaseAction(this.modelPath,e)}async load(){return this.databaseAction(this.modelPath)}databaseAction(e,t){return new Promise((e,r)=>{let a=this.indexedDB.open(i,1);a.onupgradeneeded=()=>d(a),a.onsuccess=()=>{let s=a.result;if(null==t){let t=s.transaction(l,"readonly"),a=t.objectStore(l).get(this.modelPath);a.onsuccess=()=>{if(null==a.result)return s.close(),r(Error(`Cannot find model with path '${this.modelPath}' in IndexedDB.`));e(a.result.modelArtifacts)},a.onerror=e=>(s.close(),r(a.error)),t.oncomplete=()=>s.close()}else{let a,i;t.weightData=o.CompositeArrayBuffer.join(t.weightData);let p=(0,n.getModelArtifactsInfoForJSON)(t),d=s.transaction(u,"readwrite"),c=d.objectStore(u);try{a=c.put({modelPath:this.modelPath,modelArtifactsInfo:p})}catch(e){return r(e)}a.onsuccess=()=>{let a,n=(i=s.transaction(l,"readwrite")).objectStore(l);try{a=n.put({modelPath:this.modelPath,modelArtifacts:t,modelArtifactsInfo:p})}catch(e){return r(e)}a.onsuccess=()=>e({modelArtifactsInfo:p}),a.onerror=e=>{let t=(c=d.objectStore(u)).delete(this.modelPath);t.onsuccess=()=>(s.close(),r(a.error)),t.onerror=e=>(s.close(),r(a.error))}},a.onerror=e=>(s.close(),r(a.error)),d.oncomplete=()=>{null==i?s.close():i.oncomplete=()=>s.close()}}},a.onerror=e=>r(a.error)})}}c.URL_SCHEME="indexeddb://";let h=e=>{var t;return(0,r.env)().getBool("IS_BROWSER")&&!Array.isArray(e)&&e.startsWith(c.URL_SCHEME)?(t=e.slice(c.URL_SCHEME.length),new c(t)):null};s.IORouterRegistry.registerSaveRouter(h),s.IORouterRegistry.registerLoadRouter(h);class f{constructor(){this.indexedDB=p()}async listModels(){return new Promise((e,t)=>{let r=this.indexedDB.open(i,1);r.onupgradeneeded=()=>d(r),r.onsuccess=()=>{let a=r.result,n=a.transaction(u,"readonly"),s=n.objectStore(u).getAll();s.onsuccess=()=>{let t={};for(let e of s.result)t[e.modelPath]=e.modelArtifactsInfo;e(t)},s.onerror=e=>(a.close(),t(s.error)),n.oncomplete=()=>a.close()},r.onerror=e=>t(r.error)})}async removeModel(e){var t;return e=(t=e).startsWith(c.URL_SCHEME)?t.slice(c.URL_SCHEME.length):t,new Promise((t,r)=>{let a=this.indexedDB.open(i,1);a.onupgradeneeded=()=>d(a),a.onsuccess=()=>{let n,s=a.result,o=s.transaction(u,"readwrite"),i=o.objectStore(u),p=i.get(e);p.onsuccess=()=>{if(null==p.result)return s.close(),r(Error(`Cannot find model with path '${e}' in IndexedDB.`));{let a=i.delete(e),o=()=>{let a=(n=s.transaction(l,"readwrite")).objectStore(l).delete(e);a.onsuccess=()=>t(p.result.modelArtifactsInfo),a.onerror=e=>r(p.error)};a.onsuccess=o,a.onerror=e=>(o(),s.close(),r(p.error))}},p.onerror=e=>(s.close(),r(p.error)),o.oncomplete=()=>{null==n?s.close():n.oncomplete=()=>s.close()}},a.onerror=e=>r(a.error)})}}}),x("4FRLN",function(e,t){a(e.exports,"encodeWeights",()=>d),a(e.exports,"decodeWeights",()=>c),a(e.exports,"decodeWeightsStream",()=>x),a(e.exports,"arrayBufferToBase64String",()=>v),a(e.exports,"base64StringToArrayBuffer",()=>N),a(e.exports,"concatenateArrayBuffers",()=>k),a(e.exports,"basename",()=>T),a(e.exports,"getModelJSONForModelArtifacts",()=>S),a(e.exports,"getModelArtifactsForJSONSync",()=>I),a(e.exports,"getModelArtifactsForJSON",()=>w),a(e.exports,"getModelArtifactsInfoForJSON",()=>C),a(e.exports,"getWeightSpecs",()=>E);var r=g("20oDZ"),n=g("erbmM"),s=g("8cCb2"),o=g("2bXta"),i=g("hBb8J"),l=g("c2DT1"),u=g("ibsdL"),p=g("6ZWSX").Buffer;async function d(e,t){let r=[],a=[],n=Array.isArray(e)?e.map(e=>e.name):Object.keys(e);for(let s=0;s<n.length;++s){let o=n[s],i=Array.isArray(e)?e[s].tensor:e[o];if("float32"!==i.dtype&&"int32"!==i.dtype&&"bool"!==i.dtype&&"string"!==i.dtype&&"complex64"!==i.dtype)throw Error(`Unsupported dtype in weight '${o}': ${i.dtype}`);let l={name:o,shape:i.shape,dtype:i.dtype};if("string"===i.dtype){let e=new Promise(async e=>{let t=await i.bytes(),r=new Uint8Array(t.reduce((e,t)=>e+t.length,0)+4*t.length),a=0;for(let e=0;e<t.length;e++){let n=t[e],s=new Uint8Array(new Uint32Array([n.length]).buffer);r.set(s,a),a+=4,r.set(n,a),a+=n.length}e(r)});a.push(e)}else a.push(i.data());null!=t&&(l.group=t),r.push(l)}return{data:function(e){if(null===e)throw Error(`Invalid input value: ${JSON.stringify(e)}`);let t=0,r=[];e.forEach(e=>{if(t+=e.byteLength,r.push(e.byteLength===e.buffer.byteLength?e:new e.constructor(e)),!(e instanceof Float32Array||e instanceof Int32Array||e instanceof Uint8Array))throw Error(`Unsupported TypedArray subtype: ${e.constructor.name}`)});let a=new Uint8Array(t),n=0;return r.forEach(e=>{a.set(new Uint8Array(e.buffer),n),n+=e.byteLength}),a.buffer}(await Promise.all(a)),specs:r}}function c(e,t){let r=new(0,i.CompositeArrayBuffer)(e),a={},n=0;for(let e of t){let t=function(e,t){let r,a=(0,s.sizeFromShape)(e.shape);if("quantization"in e){let t=e.quantization;r=o.DTYPE_VALUE_SIZE_MAP[t.dtype]}else if("string"===e.dtype){let e=0;for(let r=0;r<a;r++)e+=4+new Uint32Array(t(e,e+4))[0];return e}else r=o.DTYPE_VALUE_SIZE_MAP[e.dtype];return a*r}(e,(e,t)=>r.slice(n+e,n+t));a[e.name]=f(e,r.slice(n,n+t)),n+=t}return a}async function h(e,t){let r,a=(0,s.sizeFromShape)(e.shape);if("quantization"in e){let t=e.quantization;r=o.DTYPE_VALUE_SIZE_MAP[t.dtype]}else if("string"===e.dtype){let e=0;for(let r=0;r<a;r++)e+=4+new Uint32Array(await t(e,e+4))[0];return e}else r=o.DTYPE_VALUE_SIZE_MAP[e.dtype];return a*r}function f(e,t){let a,i=e.name,l=e.dtype,u=e.shape,p=(0,s.sizeFromShape)(u),d=0;if("quantization"in e){let r=e.quantization;if("uint8"===r.dtype||"uint16"===r.dtype){if(!("min"in r&&"scale"in r))throw Error(`Weight ${e.name} with quantization ${r.dtype} doesn't have corresponding metadata min and scale.`)}else if("float16"===r.dtype){if("float32"!==l)throw Error(`Weight ${e.name} is quantized with ${r.dtype} which only supports weights of type float32 not ${l}.`)}else throw Error(`Weight ${e.name} has unknown quantization dtype ${r.dtype}. Supported quantization dtypes are: 'uint8', 'uint16', and 'float16'.`);let n=o.DTYPE_VALUE_SIZE_MAP[r.dtype],s="uint8"===r.dtype?new Uint8Array(t):new Uint16Array(t);if("float32"===l)if("uint8"===r.dtype||"uint16"===r.dtype){a=new Float32Array(s.length);for(let e=0;e<s.length;e++){let t=s[e];a[e]=t*r.scale+r.min}}else if("float16"===r.dtype)a=(function(){let e=function(){let e=e=>{let t=e<<13,r=0;for(;(8388608&t)==0;)r-=8388608,t<<=1;return(t&=-8388609)|(r+=0x38800000)},t=new Uint32Array(2048);t[0]=0;for(let r=1;r<1024;r++)t[r]=e(r);for(let e=1024;e<2048;e++)t[e]=0x38000000+(e-1024<<13);return t}(),t=function(){let e=new Uint32Array(64);e[0]=0,e[31]=0x47800000,e[32]=0x80000000,e[63]=0xc7800000;for(let t=1;t<31;t++)e[t]=t<<23;for(let t=33;t<63;t++)e[t]=0x80000000+(t-32<<23);return e}(),r=function(){let e=new Uint32Array(64);for(let t=0;t<64;t++)e[t]=1024;return e[0]=e[32]=0,e}();return a=>{let n=new ArrayBuffer(4*a.length),s=new Uint32Array(n);for(let n=0;n<a.length;n++){let o=a[n],i=e[r[o>>10]+(1023&o)]+t[o>>10];s[n]=i}return new Float32Array(n)}})()(s);else throw Error(`Unsupported quantization type ${r.dtype} for weight type float32.`);else if("int32"===l){if("uint8"!==r.dtype&&"uint16"!==r.dtype)throw Error(`Unsupported quantization type ${r.dtype} for weight type int32.`);a=new Int32Array(s.length);for(let e=0;e<s.length;e++){let t=s[e];a[e]=Math.round(t*r.scale+r.min)}}else throw Error(`Unsupported dtype in weight '${i}': ${l}`);d+=p*n}else if("string"===l){let r=(0,s.sizeFromShape)(e.shape);a=[];for(let e=0;e<r;e++){let e=new Uint32Array(t.slice(d,d+4))[0];d+=4;let r=new Uint8Array(t.slice(d,d+e));a.push(r),d+=e}}else{let e=o.DTYPE_VALUE_SIZE_MAP[l];if("float32"===l)a=new Float32Array(t);else if("int32"===l)a=new Int32Array(t);else if("bool"===l)a=new Uint8Array(t);else if("complex64"===l){a=new Float32Array(t);let e=new Float32Array(a.length/2),s=new Float32Array(a.length/2);for(let t=0;t<e.length;t++)e[t]=a[2*t],s[t]=a[2*t+1];let o=(0,n.tensor)(e,u,"float32"),i=(0,n.tensor)(s,u,"float32"),l=(0,r.complex)(o,i);return o.dispose(),i.dispose(),l}else throw Error(`Unsupported dtype in weight '${i}': ${l}`);d+=p*e}return(0,n.tensor)(a,u,l)}async function m(e,t,r){let a=new Uint8Array(t);for(;a.byteLength<r;){let{done:t,value:n}=await e.read();if(t&&null==n){let e=r-a.byteLength;throw Error(`Reader is done but ${e} bytes are still expected`)}let s=new Uint8Array(a.length+n.byteLength);s.set(a,0),s.set(new Uint8Array(n),a.length),a=s}return a.buffer}async function x(e,t){let r={},a=e.getReader(),n=new ArrayBuffer(0);for(let e of t){let t=await h(e,async(e,t)=>(n=await m(a,n,t)).slice(e,t)),o=(n=await m(a,n,t)).slice(0,t);n=n.slice(t);let i=f(e,o);if(r[e.name]=i,"webgpu"===(0,l.getBackend)()){let e=(0,l.backend)();"uploadToGPU"in e&&(0,s.sizeFromShape)(i.shape)>=(0,u.env)().get("WEBGPU_CPU_HANDOFF_SIZE_THRESHOLD")&&e.uploadToGPU(i.dataId)}}return r}let y=void 0!==p&&("undefined"==typeof Blob||"undefined"==typeof atob||"undefined"==typeof btoa);function b(e){return y?p.byteLength(e,"utf8"):new Blob([e]).size}function v(e){if(y)return p.from(e).toString("base64");let t=new Uint8Array(e),r="";for(let e=0,a=t.length;e<a;e++)r+=String.fromCharCode(t[e]);return btoa(r)}function N(e){if(y){let t=p.from(e,"base64");return t.buffer.slice(t.byteOffset,t.byteOffset+t.byteLength)}let t=atob(e),r=new Uint8Array(t.length);for(let e=0;e<t.length;++e)r.set([t.charCodeAt(e)],e);return r.buffer}function k(e){return i.CompositeArrayBuffer.join(e)}function T(e){for(e=e.trim();e.endsWith("/");)e=e.slice(0,e.length-1);let t=e.split("/");return t[t.length-1]}function S(e,t){let r={modelTopology:e.modelTopology,format:e.format,generatedBy:e.generatedBy,convertedBy:e.convertedBy,weightsManifest:t};return null!=e.signature&&(r.signature=e.signature),null!=e.userDefinedMetadata&&(r.userDefinedMetadata=e.userDefinedMetadata),null!=e.modelInitializer&&(r.modelInitializer=e.modelInitializer),null!=e.initializerSignature&&(r.initializerSignature=e.initializerSignature),null!=e.trainingConfig&&(r.trainingConfig=e.trainingConfig),r}function I(e,t,r){let a={modelTopology:e.modelTopology,format:e.format,generatedBy:e.generatedBy,convertedBy:e.convertedBy};if(null!=e.trainingConfig&&(a.trainingConfig=e.trainingConfig),null!=e.weightsManifest){if(!t)throw Error("modelJSON has weightsManifest but weightSpecs is null");if(!r)throw Error("modelJSON has weightsManifest but weightData is null");a.weightSpecs=t,a.weightData=r}return null!=e.signature&&(a.signature=e.signature),null!=e.userDefinedMetadata&&(a.userDefinedMetadata=e.userDefinedMetadata),null!=e.modelInitializer&&(a.modelInitializer=e.modelInitializer),null!=e.initializerSignature&&(a.initializerSignature=e.initializerSignature),a}async function w(e,t){let r,a;return null!=e.weightsManifest&&([r,a]=await t(e.weightsManifest)),I(e,r,a)}function C(e){if(e.modelTopology instanceof ArrayBuffer)throw Error("Expected JSON model topology, received ArrayBuffer.");return{dateSaved:new Date,modelTopologyType:"JSON",modelTopologyBytes:null==e.modelTopology?0:b(JSON.stringify(e.modelTopology)),weightSpecsBytes:null==e.weightSpecs?0:b(JSON.stringify(e.weightSpecs)),weightDataBytes:null==e.weightData?0:new(0,i.CompositeArrayBuffer)(e.weightData).byteLength}}function E(e){let t=[];for(let r of e)t.push(...r.weights);return t}}),x("20oDZ",function(e,t){a(e.exports,"complex",()=>i);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk"),o=g("8cCb2");let i=(0,g("jqSCG").op)({complex_:function(e,t){let a=(0,s.convertToTensor)(e,"real","complex"),i=(0,s.convertToTensor)(t,"imag","complex");return o.assertShapesMatch(a.shape,i.shape,`real and imag shapes, ${a.shape} and ${i.shape}, must match in call to tf.complex().`),r.ENGINE.runKernel(n.Complex,{real:a,imag:i})}})}),x("5xBLk",function(e,t){a(e.exports,"inferShape",()=>u),a(e.exports,"convertToTensor",()=>d),a(e.exports,"convertToTensorArray",()=>c);var r=g("38WwN"),n=g("ibsdL"),s=g("9jCh7"),o=g("2MDja"),i=g("8cCb2"),l=g("jjNRA"),i=g("8cCb2");function u(e,t){let r=e;if((0,l.isTypedArray)(e))return"string"===t?[]:[e.length];if((0,o.isWebGLData)(e)){let t=e.channels||"RGBA";return[e.height,e.width*t.length]}if((0,o.isWebGPUData)(e))return[e.buffer.size/(null==t?4:(0,i.bytesPerElement)(t))];if(!Array.isArray(e))return[];let a=[];for(;Array.isArray(r)||(0,l.isTypedArray)(r)&&"string"!==t;)a.push(r.length),r=r[0];return Array.isArray(e)&&(0,n.env)().getBool("TENSORLIKE_CHECK_SHAPE_CONSISTENCY")&&function e(t,r,a){if(a=a||[],!Array.isArray(t)&&!(0,l.isTypedArray)(t))return void(0,i.assert)(0===r.length,()=>`Element arr[${a.join("][")}] is a primitive, but should be an array/TypedArray of ${r[0]} elements`);(0,i.assert)(r.length>0,()=>`Element arr[${a.join("][")}] should be a primitive, but is an array of ${t.length} elements`),(0,i.assert)(t.length===r[0],()=>`Element arr[${a.join("][")}] should have ${r[0]} elements, but has ${t.length} elements`);let n=r.slice(1);for(let r=0;r<t.length;++r)e(t[r],n,a.concat(r))}(e,a,[]),a}function p(e,t,r,a){if("string_or_numeric"!==e){if(null==e)throw Error("Expected dtype cannot be null.");if("numeric"!==e&&e!==t||"numeric"===e&&"string"===t)throw Error(`Argument '${r}' passed to '${a}' must be ${e} tensor, but got ${t} tensor`)}}function d(e,t,a,n="numeric"){if(e instanceof(0,s.getGlobalTensorClass)())return p(n,e.dtype,t,a),e;let o=(0,i.inferDtype)(e);if("string"!==o&&["bool","int32","float32"].indexOf(n)>=0&&(o=n),p(n,o,t,a),null==e||!(0,l.isTypedArray)(e)&&!Array.isArray(e)&&"number"!=typeof e&&"boolean"!=typeof e&&"string"!=typeof e){let r=null==e?"null":e.constructor.name;throw Error(`Argument '${t}' passed to '${a}' must be a Tensor or TensorLike, but got '${r}'`)}let c=u(e,o);(0,l.isTypedArray)(e)||Array.isArray(e)||(e=[e]);let h="string"!==o?(0,l.toTypedArray)(e,o):(0,l.flatten)(e,[],!0);return r.ENGINE.makeTensor(h,c,o)}function c(e,t,r,a="numeric"){if(!Array.isArray(e))throw Error(`Argument ${t} passed to ${r} must be a \`Tensor[]\` or \`TensorLike[]\``);return e.map((e,n)=>d(e,`${t}[${n}]`,r,a))}}),x("jqSCG",function(e,t){a(e.exports,"OP_SCOPE_SUFFIX",()=>s),a(e.exports,"op",()=>o);var r=g("38WwN"),n=g("8cCb2");let s="__op";function o(e){let t=Object.keys(e);if(1!==t.length)throw Error(`Please provide an object with a single key (operation name) mapping to a function. Got an object with ${t.length} keys.`);let a=t[0],o=e[a];a.endsWith("_")&&(a=a.substring(0,a.length-1));let i=(...e)=>{r.ENGINE.startScope(a);try{let t=o(...e);return(0,n.isPromise)(t)&&console.error("Cannot return a Promise inside of tidy."),r.ENGINE.endScope(t),t}catch(e){throw r.ENGINE.endScope(null),e}};return Object.defineProperty(i,"name",{value:a+=s,configurable:!0}),i}}),x("erbmM",function(e,t){a(e.exports,"tensor",()=>s);var r=g("5xBLk"),n=g("dKr4X");function s(e,t,a){let s=(0,r.inferShape)(e,a);return(0,n.makeTensor)(e,t,s,a)}}),x("dKr4X",function(e,t){a(e.exports,"makeTensor",()=>i);var r=g("38WwN"),n=g("2MDja"),s=g("8cCb2"),o=g("jjNRA");function i(e,t,a,i){if(null==i)i=(0,s.inferDtype)(e);else if("complex64"===i)throw Error("Cannot construct a complex64 tensor directly. Please use tf.complex(real, imag).");if((0,n.isWebGPUData)(e)||(0,n.isWebGLData)(e)){if("float32"!==i&&"int32"!==i)throw Error(`Creating tensor from GPU data only supports 'float32'|'int32' dtype, while the dtype is ${i}.`);return r.ENGINE.backend.createTensorFromGPUData(e,t||a,i)}if(!(0,o.isTypedArray)(e)&&!Array.isArray(e)&&"number"!=typeof e&&"boolean"!=typeof e&&"string"!=typeof e)throw Error("values passed to tensor(values) must be a number/boolean/string or an array of numbers/booleans/strings, or a TypedArray");if(null!=t){(0,s.assertNonNegativeIntegerDimensions)(t);let e=(0,s.sizeFromShape)(t),r=(0,s.sizeFromShape)(a);(0,s.assert)(e===r,()=>`Based on the provided shape, [${t}], the tensor should have ${e} values but has ${r}`);for(let e=0;e<a.length;++e){let r=a[e],n=e!==a.length-1||r!==(0,s.sizeFromShape)(t.slice(e));(0,s.assert)(a[e]===t[e]||!n,()=>`Error creating a new Tensor. Inferred shape (${a}) does not match the provided shape (${t}). `)}}return(0,o.isTypedArray)(e)||Array.isArray(e)||(e=[e]),t=t||a,e="string"!==i?(0,o.toTypedArray)(e,i):(0,o.flatten)(e,[],!0),r.ENGINE.makeTensor(e,t,i)}}),x("2bXta",function(e,t){a(e.exports,"DTYPE_VALUE_SIZE_MAP",()=>r);let r={float32:4,float16:2,int32:4,uint16:2,uint8:1,bool:1,complex64:8}}),x("hBb8J",function(e,t){a(e.exports,"CompositeArrayBuffer",()=>n);var r=g("jjNRA");class n{static join(e){return new n(e).slice()}constructor(e){if(this.shards=[],this.previousShardIndex=0,null==e||(e instanceof Array||(e=[e]),0===(e=e.map(e=>r.isTypedArray(e)?e.buffer:e)).length))return;this.bufferUniformSize=e[0].byteLength;let t=0;for(let r=0;r<e.length;r++){let a=e[r];r!==e.length-1&&a.byteLength!==this.bufferUniformSize&&(this.bufferUniformSize=void 0);let n=t+a.byteLength;this.shards.push({buffer:a,start:t,end:n}),t=n}0===this.shards.length&&(this.byteLength=0),this.byteLength=this.shards[this.shards.length-1].end}slice(e=0,t=this.byteLength){if(0===this.shards.length||(e=isNaN(Number(e))?0:e,t=isNaN(Number(t))?0:t,e=Math.max(0,e),(t=Math.min(this.byteLength,t))<=e))return new ArrayBuffer(0);let r=this.findShardForByte(e);if(-1===r)throw Error(`Could not find start shard for byte ${e}`);let a=new ArrayBuffer(t-e),n=new Uint8Array(a),s=0;for(let a=r;a<this.shards.length;a++){let r=this.shards[a],o=e+s-r.start,i=s,l=Math.min(t,r.end)-r.start,u=new Uint8Array(r.buffer,o,l-o);if(n.set(u,i),s+=u.length,t<r.end)break}return a}findShardForByte(e){if(0===this.shards.length||e<0||e>=this.byteLength)return -1;if(null!=this.bufferUniformSize)return this.previousShardIndex=Math.floor(e/this.bufferUniformSize),this.previousShardIndex;function t(t){return e<t.start?-1:+(e>=t.end)}if(0===t(this.shards[this.previousShardIndex]))return this.previousShardIndex;let r=function(e,t){let r=0,a=e.length;for(;r<=a;){let n=Math.floor((a-r)/2)+r,s=t(e[n]);if(0===s)return n;s<0?a=n:r=n+1}return -1}(this.shards,t);return -1===r?-1:(this.previousShardIndex=r,this.previousShardIndex)}}}),x("c2DT1",function(e,t){a(e.exports,"enableProdMode",()=>i),a(e.exports,"enableDebugMode",()=>l),a(e.exports,"disableDeprecationWarnings",()=>u),a(e.exports,"deprecationWarn",()=>p),a(e.exports,"disposeVariables",()=>d),a(e.exports,"engine",()=>c),a(e.exports,"memory",()=>h),a(e.exports,"profile",()=>f),a(e.exports,"tidy",()=>m),a(e.exports,"dispose",()=>x),a(e.exports,"keep",()=>y),a(e.exports,"time",()=>b),a(e.exports,"setBackend",()=>v),a(e.exports,"ready",()=>N),a(e.exports,"getBackend",()=>k),a(e.exports,"removeBackend",()=>T),a(e.exports,"findBackend",()=>S),a(e.exports,"findBackendFactory",()=>I),a(e.exports,"registerBackend",()=>w),a(e.exports,"backend",()=>C),a(e.exports,"setPlatform",()=>E);var r=g("38WwN"),n=g("ibsdL"),s=g("9jCh7"),o=g("3w4Rg");function i(){(0,n.env)().set("PROD",!0)}function l(){(0,n.env)().set("DEBUG",!0)}function u(){(0,n.env)().set("DEPRECATION_WARNINGS_ENABLED",!1),console.warn("TensorFlow.js deprecation warnings have been disabled.")}function p(e){(0,n.env)().getBool("DEPRECATION_WARNINGS_ENABLED")&&console.warn(e+" You can disable deprecation warnings with tf.disableDeprecationWarnings().")}function d(){r.ENGINE.disposeVariables()}function c(){return r.ENGINE}function h(){return r.ENGINE.memory()}function f(e){return r.ENGINE.profile(e)}function m(e,t){return r.ENGINE.tidy(e,t)}function x(e){(0,o.getTensorsInContainer)(e).forEach(e=>e.dispose())}function y(e){return r.ENGINE.keep(e)}function b(e){return r.ENGINE.time(e)}function v(e){return r.ENGINE.setBackend(e)}function N(){return r.ENGINE.ready()}function k(){return r.ENGINE.backendName}function T(e){r.ENGINE.removeBackend(e)}function S(e){return r.ENGINE.findBackend(e)}function I(e){return r.ENGINE.findBackendFactory(e)}function w(e,t,a=1){return r.ENGINE.registerBackend(e,t,a)}function C(){return r.ENGINE.backend}function E(e,t){(0,n.env)().setPlatform(e,t)}(0,s.setDeprecationWarningFn)(p)}),x("6ZWSX",function(e,t){a(e.exports,"Buffer",()=>r,e=>r=e),a(e.exports,"INSPECT_MAX_BYTES",()=>n,e=>n=e);var r,n,s=g("kuxul"),o=g("9NvM5");let i="function"==typeof Symbol&&"function"==typeof Symbol.for?Symbol.for("nodejs.util.inspect.custom"):null;function l(e){if(e>0x7fffffff)throw RangeError('The value "'+e+'" is invalid for option "size"');let t=new Uint8Array(e);return Object.setPrototypeOf(t,u.prototype),t}function u(e,t,r){if("number"==typeof e){if("string"==typeof t)throw TypeError('The "string" argument must be of type string. Received type number');return c(e)}return p(e,t,r)}function p(e,t,r){if("string"==typeof e){var a=e,n=t;if(("string"!=typeof n||""===n)&&(n="utf8"),!u.isEncoding(n))throw TypeError("Unknown encoding: "+n);let r=0|x(a,n),s=l(r),o=s.write(a,n);return o!==r&&(s=s.slice(0,o)),s}if(ArrayBuffer.isView(e)){var s=e;if(V(s,Uint8Array)){let e=new Uint8Array(s);return f(e.buffer,e.byteOffset,e.byteLength)}return h(s)}if(null==e)throw TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof e);if(V(e,ArrayBuffer)||e&&V(e.buffer,ArrayBuffer)||"undefined"!=typeof SharedArrayBuffer&&(V(e,SharedArrayBuffer)||e&&V(e.buffer,SharedArrayBuffer)))return f(e,t,r);if("number"==typeof e)throw TypeError('The "value" argument must not be of type number. Received type number');let o=e.valueOf&&e.valueOf();if(null!=o&&o!==e)return u.from(o,t,r);let i=function(e){if(u.isBuffer(e)){let t=0|m(e.length),r=l(t);return 0===r.length||e.copy(r,0,0,t),r}return void 0!==e.length?"number"!=typeof e.length||function(e){return e!=e}(e.length)?l(0):h(e):"Buffer"===e.type&&Array.isArray(e.data)?h(e.data):void 0}(e);if(i)return i;if("undefined"!=typeof Symbol&&null!=Symbol.toPrimitive&&"function"==typeof e[Symbol.toPrimitive])return u.from(e[Symbol.toPrimitive]("string"),t,r);throw TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof e)}function d(e){if("number"!=typeof e)throw TypeError('"size" argument must be of type number');if(e<0)throw RangeError('The value "'+e+'" is invalid for option "size"')}function c(e){return d(e),l(e<0?0:0|m(e))}function h(e){let t=e.length<0?0:0|m(e.length),r=l(t);for(let a=0;a<t;a+=1)r[a]=255&e[a];return r}function f(e,t,r){let a;if(t<0||e.byteLength<t)throw RangeError('"offset" is outside of buffer bounds');if(e.byteLength<t+(r||0))throw RangeError('"length" is outside of buffer bounds');return Object.setPrototypeOf(a=void 0===t&&void 0===r?new Uint8Array(e):void 0===r?new Uint8Array(e,t):new Uint8Array(e,t,r),u.prototype),a}function m(e){if(e>=0x7fffffff)throw RangeError("Attempt to allocate Buffer larger than maximum size: 0x7fffffff bytes");return 0|e}function x(e,t){if(u.isBuffer(e))return e.length;if(ArrayBuffer.isView(e)||V(e,ArrayBuffer))return e.byteLength;if("string"!=typeof e)throw TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type '+typeof e);let r=e.length,a=arguments.length>2&&!0===arguments[2];if(!a&&0===r)return 0;let n=!1;for(;;)switch(t){case"ascii":case"latin1":case"binary":return r;case"utf8":case"utf-8":return D(e).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*r;case"hex":return r>>>1;case"base64":return _(e).length;default:if(n)return a?-1:D(e).length;t=(""+t).toLowerCase(),n=!0}}function y(e,t,r){let a=!1;if((void 0===t||t<0)&&(t=0),t>this.length||((void 0===r||r>this.length)&&(r=this.length),r<=0||(r>>>=0)<=(t>>>=0)))return"";for(e||(e="utf8");;)switch(e){case"hex":return function(e,t,r){let a=e.length;(!t||t<0)&&(t=0),(!r||r<0||r>a)&&(r=a);let n="";for(let a=t;a<r;++a)n+=G[e[a]];return n}(this,t,r);case"utf8":case"utf-8":return k(this,t,r);case"ascii":return function(e,t,r){let a="";r=Math.min(e.length,r);for(let n=t;n<r;++n)a+=String.fromCharCode(127&e[n]);return a}(this,t,r);case"latin1":case"binary":return function(e,t,r){let a="";r=Math.min(e.length,r);for(let n=t;n<r;++n)a+=String.fromCharCode(e[n]);return a}(this,t,r);case"base64":var n,o,i;return n=this,o=t,i=r,0===o&&i===n.length?s.fromByteArray(n):s.fromByteArray(n.slice(o,i));case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return function(e,t,r){let a=e.slice(t,r),n="";for(let e=0;e<a.length-1;e+=2)n+=String.fromCharCode(a[e]+256*a[e+1]);return n}(this,t,r);default:if(a)throw TypeError("Unknown encoding: "+e);e=(e+"").toLowerCase(),a=!0}}function b(e,t,r){let a=e[t];e[t]=e[r],e[r]=a}function v(e,t,r,a,n){var s;if(0===e.length)return -1;if("string"==typeof r?(a=r,r=0):r>0x7fffffff?r=0x7fffffff:r<-0x80000000&&(r=-0x80000000),(s=r*=1)!=s&&(r=n?0:e.length-1),r<0&&(r=e.length+r),r>=e.length)if(n)return -1;else r=e.length-1;else if(r<0)if(!n)return -1;else r=0;if("string"==typeof t&&(t=u.from(t,a)),u.isBuffer(t))return 0===t.length?-1:N(e,t,r,a,n);if("number"==typeof t){if(t&=255,"function"==typeof Uint8Array.prototype.indexOf)if(n)return Uint8Array.prototype.indexOf.call(e,t,r);else return Uint8Array.prototype.lastIndexOf.call(e,t,r);return N(e,[t],r,a,n)}throw TypeError("val must be string, number or Buffer")}function N(e,t,r,a,n){let s,o=1,i=e.length,l=t.length;if(void 0!==a&&("ucs2"===(a=String(a).toLowerCase())||"ucs-2"===a||"utf16le"===a||"utf-16le"===a)){if(e.length<2||t.length<2)return -1;o=2,i/=2,l/=2,r/=2}function u(e,t){return 1===o?e[t]:e.readUInt16BE(t*o)}if(n){let a=-1;for(s=r;s<i;s++)if(u(e,s)===u(t,-1===a?0:s-a)){if(-1===a&&(a=s),s-a+1===l)return a*o}else -1!==a&&(s-=s-a),a=-1}else for(r+l>i&&(r=i-l),s=r;s>=0;s--){let r=!0;for(let a=0;a<l;a++)if(u(e,s+a)!==u(t,a)){r=!1;break}if(r)return s}return -1}function k(e,t,r){r=Math.min(e.length,r);let a=[],n=t;for(;n<r;){let t=e[n],s=null,o=t>239?4:t>223?3:t>191?2:1;if(n+o<=r){let r,a,i,l;switch(o){case 1:t<128&&(s=t);break;case 2:(192&(r=e[n+1]))==128&&(l=(31&t)<<6|63&r)>127&&(s=l);break;case 3:r=e[n+1],a=e[n+2],(192&r)==128&&(192&a)==128&&(l=(15&t)<<12|(63&r)<<6|63&a)>2047&&(l<55296||l>57343)&&(s=l);break;case 4:r=e[n+1],a=e[n+2],i=e[n+3],(192&r)==128&&(192&a)==128&&(192&i)==128&&(l=(15&t)<<18|(63&r)<<12|(63&a)<<6|63&i)>65535&&l<1114112&&(s=l)}}null===s?(s=65533,o=1):s>65535&&(s-=65536,a.push(s>>>10&1023|55296),s=56320|1023&s),a.push(s),n+=o}var s=a;let o=s.length;if(o<=4096)return String.fromCharCode.apply(String,s);let i="",l=0;for(;l<o;)i+=String.fromCharCode.apply(String,s.slice(l,l+=4096));return i}function T(e,t,r){if(e%1!=0||e<0)throw RangeError("offset is not uint");if(e+t>r)throw RangeError("Trying to access beyond buffer length")}function S(e,t,r,a,n,s){if(!u.isBuffer(e))throw TypeError('"buffer" argument must be a Buffer instance');if(t>n||t<s)throw RangeError('"value" argument is out of bounds');if(r+a>e.length)throw RangeError("Index out of range")}function I(e,t,r,a,n){B(t,a,n,e,r,7);let s=Number(t&BigInt(0xffffffff));e[r++]=s,s>>=8,e[r++]=s,s>>=8,e[r++]=s,s>>=8,e[r++]=s;let o=Number(t>>BigInt(32)&BigInt(0xffffffff));return e[r++]=o,o>>=8,e[r++]=o,o>>=8,e[r++]=o,o>>=8,e[r++]=o,r}function w(e,t,r,a,n){B(t,a,n,e,r,7);let s=Number(t&BigInt(0xffffffff));e[r+7]=s,s>>=8,e[r+6]=s,s>>=8,e[r+5]=s,s>>=8,e[r+4]=s;let o=Number(t>>BigInt(32)&BigInt(0xffffffff));return e[r+3]=o,o>>=8,e[r+2]=o,o>>=8,e[r+1]=o,o>>=8,e[r]=o,r+8}function C(e,t,r,a,n,s){if(r+a>e.length||r<0)throw RangeError("Index out of range")}function E(e,t,r,a,n){return t*=1,r>>>=0,n||C(e,t,r,4,34028234663852886e22,-34028234663852886e22),o.write(e,t,r,a,23,4),r+4}function A(e,t,r,a,n){return t*=1,r>>>=0,n||C(e,t,r,8,17976931348623157e292,-17976931348623157e292),o.write(e,t,r,a,52,8),r+8}r=u,n=50,u.TYPED_ARRAY_SUPPORT=function(){try{let e=new Uint8Array(1),t={foo:function(){return 42}};return Object.setPrototypeOf(t,Uint8Array.prototype),Object.setPrototypeOf(e,t),42===e.foo()}catch(e){return!1}}(),u.TYPED_ARRAY_SUPPORT||"undefined"==typeof console||"function"!=typeof console.error||console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."),Object.defineProperty(u.prototype,"parent",{enumerable:!0,get:function(){if(u.isBuffer(this))return this.buffer}}),Object.defineProperty(u.prototype,"offset",{enumerable:!0,get:function(){if(u.isBuffer(this))return this.byteOffset}}),u.poolSize=8192,u.from=function(e,t,r){return p(e,t,r)},Object.setPrototypeOf(u.prototype,Uint8Array.prototype),Object.setPrototypeOf(u,Uint8Array),u.alloc=function(e,t,r){return(d(e),e<=0)?l(e):void 0!==t?"string"==typeof r?l(e).fill(t,r):l(e).fill(t):l(e)},u.allocUnsafe=function(e){return c(e)},u.allocUnsafeSlow=function(e){return c(e)},u.isBuffer=function(e){return null!=e&&!0===e._isBuffer&&e!==u.prototype},u.compare=function(e,t){if(V(e,Uint8Array)&&(e=u.from(e,e.offset,e.byteLength)),V(t,Uint8Array)&&(t=u.from(t,t.offset,t.byteLength)),!u.isBuffer(e)||!u.isBuffer(t))throw TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');if(e===t)return 0;let r=e.length,a=t.length;for(let n=0,s=Math.min(r,a);n<s;++n)if(e[n]!==t[n]){r=e[n],a=t[n];break}return r<a?-1:+(a<r)},u.isEncoding=function(e){switch(String(e).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},u.concat=function(e,t){let r;if(!Array.isArray(e))throw TypeError('"list" argument must be an Array of Buffers');if(0===e.length)return u.alloc(0);if(void 0===t)for(r=0,t=0;r<e.length;++r)t+=e[r].length;let a=u.allocUnsafe(t),n=0;for(r=0;r<e.length;++r){let t=e[r];if(V(t,Uint8Array))n+t.length>a.length?(u.isBuffer(t)||(t=u.from(t)),t.copy(a,n)):Uint8Array.prototype.set.call(a,t,n);else if(u.isBuffer(t))t.copy(a,n);else throw TypeError('"list" argument must be an Array of Buffers');n+=t.length}return a},u.byteLength=x,u.prototype._isBuffer=!0,u.prototype.swap16=function(){let e=this.length;if(e%2!=0)throw RangeError("Buffer size must be a multiple of 16-bits");for(let t=0;t<e;t+=2)b(this,t,t+1);return this},u.prototype.swap32=function(){let e=this.length;if(e%4!=0)throw RangeError("Buffer size must be a multiple of 32-bits");for(let t=0;t<e;t+=4)b(this,t,t+3),b(this,t+1,t+2);return this},u.prototype.swap64=function(){let e=this.length;if(e%8!=0)throw RangeError("Buffer size must be a multiple of 64-bits");for(let t=0;t<e;t+=8)b(this,t,t+7),b(this,t+1,t+6),b(this,t+2,t+5),b(this,t+3,t+4);return this},u.prototype.toString=function(){let e=this.length;return 0===e?"":0==arguments.length?k(this,0,e):y.apply(this,arguments)},u.prototype.toLocaleString=u.prototype.toString,u.prototype.equals=function(e){if(!u.isBuffer(e))throw TypeError("Argument must be a Buffer");return this===e||0===u.compare(this,e)},u.prototype.inspect=function(){let e="",t=n;return e=this.toString("hex",0,t).replace(/(.{2})/g,"$1 ").trim(),this.length>t&&(e+=" ... "),"<Buffer "+e+">"},i&&(u.prototype[i]=u.prototype.inspect),u.prototype.compare=function(e,t,r,a,n){if(V(e,Uint8Array)&&(e=u.from(e,e.offset,e.byteLength)),!u.isBuffer(e))throw TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type '+typeof e);if(void 0===t&&(t=0),void 0===r&&(r=e?e.length:0),void 0===a&&(a=0),void 0===n&&(n=this.length),t<0||r>e.length||a<0||n>this.length)throw RangeError("out of range index");if(a>=n&&t>=r)return 0;if(a>=n)return -1;if(t>=r)return 1;if(t>>>=0,r>>>=0,a>>>=0,n>>>=0,this===e)return 0;let s=n-a,o=r-t,i=Math.min(s,o),l=this.slice(a,n),p=e.slice(t,r);for(let e=0;e<i;++e)if(l[e]!==p[e]){s=l[e],o=p[e];break}return s<o?-1:+(o<s)},u.prototype.includes=function(e,t,r){return -1!==this.indexOf(e,t,r)},u.prototype.indexOf=function(e,t,r){return v(this,e,t,r,!0)},u.prototype.lastIndexOf=function(e,t,r){return v(this,e,t,r,!1)},u.prototype.write=function(e,t,r,a){var n,s,o,i,l,u,p,d;if(void 0===t)a="utf8",r=this.length,t=0;else if(void 0===r&&"string"==typeof t)a=t,r=this.length,t=0;else if(isFinite(t))t>>>=0,isFinite(r)?(r>>>=0,void 0===a&&(a="utf8")):(a=r,r=void 0);else throw Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");let c=this.length-t;if((void 0===r||r>c)&&(r=c),e.length>0&&(r<0||t<0)||t>this.length)throw RangeError("Attempt to write outside buffer bounds");a||(a="utf8");let h=!1;for(;;)switch(a){case"hex":return function(e,t,r,a){let n;r=Number(r)||0;let s=e.length-r;a?(a=Number(a))>s&&(a=s):a=s;let o=t.length;for(a>o/2&&(a=o/2),n=0;n<a;++n){var i;let a=parseInt(t.substr(2*n,2),16);if((i=a)!=i)break;e[r+n]=a}return n}(this,e,t,r);case"utf8":case"utf-8":return n=t,s=r,L(D(e,this.length-n),this,n,s);case"ascii":case"latin1":case"binary":return o=t,i=r,L(function(e){let t=[];for(let r=0;r<e.length;++r)t.push(255&e.charCodeAt(r));return t}(e),this,o,i);case"base64":return l=t,u=r,L(_(e),this,l,u);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return p=t,d=r,L(function(e,t){let r,a,n=[];for(let s=0;s<e.length&&!((t-=2)<0);++s)a=(r=e.charCodeAt(s))>>8,n.push(r%256),n.push(a);return n}(e,this.length-p),this,p,d);default:if(h)throw TypeError("Unknown encoding: "+a);a=(""+a).toLowerCase(),h=!0}},u.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}},u.prototype.slice=function(e,t){let r=this.length;e=~~e,t=void 0===t?r:~~t,e<0?(e+=r)<0&&(e=0):e>r&&(e=r),t<0?(t+=r)<0&&(t=0):t>r&&(t=r),t<e&&(t=e);let a=this.subarray(e,t);return Object.setPrototypeOf(a,u.prototype),a},u.prototype.readUintLE=u.prototype.readUIntLE=function(e,t,r){e>>>=0,t>>>=0,r||T(e,t,this.length);let a=this[e],n=1,s=0;for(;++s<t&&(n*=256);)a+=this[e+s]*n;return a},u.prototype.readUintBE=u.prototype.readUIntBE=function(e,t,r){e>>>=0,t>>>=0,r||T(e,t,this.length);let a=this[e+--t],n=1;for(;t>0&&(n*=256);)a+=this[e+--t]*n;return a},u.prototype.readUint8=u.prototype.readUInt8=function(e,t){return e>>>=0,t||T(e,1,this.length),this[e]},u.prototype.readUint16LE=u.prototype.readUInt16LE=function(e,t){return e>>>=0,t||T(e,2,this.length),this[e]|this[e+1]<<8},u.prototype.readUint16BE=u.prototype.readUInt16BE=function(e,t){return e>>>=0,t||T(e,2,this.length),this[e]<<8|this[e+1]},u.prototype.readUint32LE=u.prototype.readUInt32LE=function(e,t){return e>>>=0,t||T(e,4,this.length),(this[e]|this[e+1]<<8|this[e+2]<<16)+0x1000000*this[e+3]},u.prototype.readUint32BE=u.prototype.readUInt32BE=function(e,t){return e>>>=0,t||T(e,4,this.length),0x1000000*this[e]+(this[e+1]<<16|this[e+2]<<8|this[e+3])},u.prototype.readBigUInt64LE=W(function(e){F(e>>>=0,"offset");let t=this[e],r=this[e+7];(void 0===t||void 0===r)&&O(e,this.length-8);let a=t+256*this[++e]+65536*this[++e]+0x1000000*this[++e],n=this[++e]+256*this[++e]+65536*this[++e]+0x1000000*r;return BigInt(a)+(BigInt(n)<<BigInt(32))}),u.prototype.readBigUInt64BE=W(function(e){F(e>>>=0,"offset");let t=this[e],r=this[e+7];(void 0===t||void 0===r)&&O(e,this.length-8);let a=0x1000000*t+65536*this[++e]+256*this[++e]+this[++e],n=0x1000000*this[++e]+65536*this[++e]+256*this[++e]+r;return(BigInt(a)<<BigInt(32))+BigInt(n)}),u.prototype.readIntLE=function(e,t,r){e>>>=0,t>>>=0,r||T(e,t,this.length);let a=this[e],n=1,s=0;for(;++s<t&&(n*=256);)a+=this[e+s]*n;return a>=(n*=128)&&(a-=Math.pow(2,8*t)),a},u.prototype.readIntBE=function(e,t,r){e>>>=0,t>>>=0,r||T(e,t,this.length);let a=t,n=1,s=this[e+--a];for(;a>0&&(n*=256);)s+=this[e+--a]*n;return s>=(n*=128)&&(s-=Math.pow(2,8*t)),s},u.prototype.readInt8=function(e,t){return(e>>>=0,t||T(e,1,this.length),128&this[e])?-((255-this[e]+1)*1):this[e]},u.prototype.readInt16LE=function(e,t){e>>>=0,t||T(e,2,this.length);let r=this[e]|this[e+1]<<8;return 32768&r?0xffff0000|r:r},u.prototype.readInt16BE=function(e,t){e>>>=0,t||T(e,2,this.length);let r=this[e+1]|this[e]<<8;return 32768&r?0xffff0000|r:r},u.prototype.readInt32LE=function(e,t){return e>>>=0,t||T(e,4,this.length),this[e]|this[e+1]<<8|this[e+2]<<16|this[e+3]<<24},u.prototype.readInt32BE=function(e,t){return e>>>=0,t||T(e,4,this.length),this[e]<<24|this[e+1]<<16|this[e+2]<<8|this[e+3]},u.prototype.readBigInt64LE=W(function(e){F(e>>>=0,"offset");let t=this[e],r=this[e+7];return(void 0===t||void 0===r)&&O(e,this.length-8),(BigInt(this[e+4]+256*this[e+5]+65536*this[e+6]+(r<<24))<<BigInt(32))+BigInt(t+256*this[++e]+65536*this[++e]+0x1000000*this[++e])}),u.prototype.readBigInt64BE=W(function(e){F(e>>>=0,"offset");let t=this[e],r=this[e+7];return(void 0===t||void 0===r)&&O(e,this.length-8),(BigInt((t<<24)+65536*this[++e]+256*this[++e]+this[++e])<<BigInt(32))+BigInt(0x1000000*this[++e]+65536*this[++e]+256*this[++e]+r)}),u.prototype.readFloatLE=function(e,t){return e>>>=0,t||T(e,4,this.length),o.read(this,e,!0,23,4)},u.prototype.readFloatBE=function(e,t){return e>>>=0,t||T(e,4,this.length),o.read(this,e,!1,23,4)},u.prototype.readDoubleLE=function(e,t){return e>>>=0,t||T(e,8,this.length),o.read(this,e,!0,52,8)},u.prototype.readDoubleBE=function(e,t){return e>>>=0,t||T(e,8,this.length),o.read(this,e,!1,52,8)},u.prototype.writeUintLE=u.prototype.writeUIntLE=function(e,t,r,a){if(e*=1,t>>>=0,r>>>=0,!a){let a=Math.pow(2,8*r)-1;S(this,e,t,r,a,0)}let n=1,s=0;for(this[t]=255&e;++s<r&&(n*=256);)this[t+s]=e/n&255;return t+r},u.prototype.writeUintBE=u.prototype.writeUIntBE=function(e,t,r,a){if(e*=1,t>>>=0,r>>>=0,!a){let a=Math.pow(2,8*r)-1;S(this,e,t,r,a,0)}let n=r-1,s=1;for(this[t+n]=255&e;--n>=0&&(s*=256);)this[t+n]=e/s&255;return t+r},u.prototype.writeUint8=u.prototype.writeUInt8=function(e,t,r){return e*=1,t>>>=0,r||S(this,e,t,1,255,0),this[t]=255&e,t+1},u.prototype.writeUint16LE=u.prototype.writeUInt16LE=function(e,t,r){return e*=1,t>>>=0,r||S(this,e,t,2,65535,0),this[t]=255&e,this[t+1]=e>>>8,t+2},u.prototype.writeUint16BE=u.prototype.writeUInt16BE=function(e,t,r){return e*=1,t>>>=0,r||S(this,e,t,2,65535,0),this[t]=e>>>8,this[t+1]=255&e,t+2},u.prototype.writeUint32LE=u.prototype.writeUInt32LE=function(e,t,r){return e*=1,t>>>=0,r||S(this,e,t,4,0xffffffff,0),this[t+3]=e>>>24,this[t+2]=e>>>16,this[t+1]=e>>>8,this[t]=255&e,t+4},u.prototype.writeUint32BE=u.prototype.writeUInt32BE=function(e,t,r){return e*=1,t>>>=0,r||S(this,e,t,4,0xffffffff,0),this[t]=e>>>24,this[t+1]=e>>>16,this[t+2]=e>>>8,this[t+3]=255&e,t+4},u.prototype.writeBigUInt64LE=W(function(e,t=0){return I(this,e,t,BigInt(0),BigInt("0xffffffffffffffff"))}),u.prototype.writeBigUInt64BE=W(function(e,t=0){return w(this,e,t,BigInt(0),BigInt("0xffffffffffffffff"))}),u.prototype.writeIntLE=function(e,t,r,a){if(e*=1,t>>>=0,!a){let a=Math.pow(2,8*r-1);S(this,e,t,r,a-1,-a)}let n=0,s=1,o=0;for(this[t]=255&e;++n<r&&(s*=256);)e<0&&0===o&&0!==this[t+n-1]&&(o=1),this[t+n]=(e/s|0)-o&255;return t+r},u.prototype.writeIntBE=function(e,t,r,a){if(e*=1,t>>>=0,!a){let a=Math.pow(2,8*r-1);S(this,e,t,r,a-1,-a)}let n=r-1,s=1,o=0;for(this[t+n]=255&e;--n>=0&&(s*=256);)e<0&&0===o&&0!==this[t+n+1]&&(o=1),this[t+n]=(e/s|0)-o&255;return t+r},u.prototype.writeInt8=function(e,t,r){return e*=1,t>>>=0,r||S(this,e,t,1,127,-128),e<0&&(e=255+e+1),this[t]=255&e,t+1},u.prototype.writeInt16LE=function(e,t,r){return e*=1,t>>>=0,r||S(this,e,t,2,32767,-32768),this[t]=255&e,this[t+1]=e>>>8,t+2},u.prototype.writeInt16BE=function(e,t,r){return e*=1,t>>>=0,r||S(this,e,t,2,32767,-32768),this[t]=e>>>8,this[t+1]=255&e,t+2},u.prototype.writeInt32LE=function(e,t,r){return e*=1,t>>>=0,r||S(this,e,t,4,0x7fffffff,-0x80000000),this[t]=255&e,this[t+1]=e>>>8,this[t+2]=e>>>16,this[t+3]=e>>>24,t+4},u.prototype.writeInt32BE=function(e,t,r){return e*=1,t>>>=0,r||S(this,e,t,4,0x7fffffff,-0x80000000),e<0&&(e=0xffffffff+e+1),this[t]=e>>>24,this[t+1]=e>>>16,this[t+2]=e>>>8,this[t+3]=255&e,t+4},u.prototype.writeBigInt64LE=W(function(e,t=0){return I(this,e,t,-BigInt("0x8000000000000000"),BigInt("0x7fffffffffffffff"))}),u.prototype.writeBigInt64BE=W(function(e,t=0){return w(this,e,t,-BigInt("0x8000000000000000"),BigInt("0x7fffffffffffffff"))}),u.prototype.writeFloatLE=function(e,t,r){return E(this,e,t,!0,r)},u.prototype.writeFloatBE=function(e,t,r){return E(this,e,t,!1,r)},u.prototype.writeDoubleLE=function(e,t,r){return A(this,e,t,!0,r)},u.prototype.writeDoubleBE=function(e,t,r){return A(this,e,t,!1,r)},u.prototype.copy=function(e,t,r,a){if(!u.isBuffer(e))throw TypeError("argument should be a Buffer");if(r||(r=0),a||0===a||(a=this.length),t>=e.length&&(t=e.length),t||(t=0),a>0&&a<r&&(a=r),a===r||0===e.length||0===this.length)return 0;if(t<0)throw RangeError("targetStart out of bounds");if(r<0||r>=this.length)throw RangeError("Index out of range");if(a<0)throw RangeError("sourceEnd out of bounds");a>this.length&&(a=this.length),e.length-t<a-r&&(a=e.length-t+r);let n=a-r;return this===e&&"function"==typeof Uint8Array.prototype.copyWithin?this.copyWithin(t,r,a):Uint8Array.prototype.set.call(e,this.subarray(r,a),t),n},u.prototype.fill=function(e,t,r,a){let n;if("string"==typeof e){if("string"==typeof t?(a=t,t=0,r=this.length):"string"==typeof r&&(a=r,r=this.length),void 0!==a&&"string"!=typeof a)throw TypeError("encoding must be a string");if("string"==typeof a&&!u.isEncoding(a))throw TypeError("Unknown encoding: "+a);if(1===e.length){let t=e.charCodeAt(0);("utf8"===a&&t<128||"latin1"===a)&&(e=t)}}else"number"==typeof e?e&=255:"boolean"==typeof e&&(e=Number(e));if(t<0||this.length<t||this.length<r)throw RangeError("Out of range index");if(r<=t)return this;if(t>>>=0,r=void 0===r?this.length:r>>>0,e||(e=0),"number"==typeof e)for(n=t;n<r;++n)this[n]=e;else{let s=u.isBuffer(e)?e:u.from(e,a),o=s.length;if(0===o)throw TypeError('The value "'+e+'" is invalid for argument "value"');for(n=0;n<r-t;++n)this[n+t]=s[n%o]}return this};let $={};function R(e,t,r){$[e]=class extends r{constructor(){super(),Object.defineProperty(this,"message",{value:t.apply(this,arguments),writable:!0,configurable:!0}),this.name=`${this.name} [${e}]`,this.stack,delete this.name}get code(){return e}set code(e){Object.defineProperty(this,"code",{configurable:!0,enumerable:!0,value:e,writable:!0})}toString(){return`${this.name} [${e}]: ${this.message}`}}}function P(e){let t="",r=e.length,a=+("-"===e[0]);for(;r>=a+4;r-=3)t=`_${e.slice(r-3,r)}${t}`;return`${e.slice(0,r)}${t}`}function B(e,t,r,a,n,s){if(e>r||e<t){let a,n="bigint"==typeof t?"n":"";throw a=s>3?0===t||t===BigInt(0)?`>= 0${n} and < 2${n} ** ${(s+1)*8}${n}`:`>= -(2${n} ** ${(s+1)*8-1}${n}) and < 2 ** ${(s+1)*8-1}${n}`:`>= ${t}${n} and <= ${r}${n}`,new $.ERR_OUT_OF_RANGE("value",a,e)}F(n,"offset"),(void 0===a[n]||void 0===a[n+s])&&O(n,a.length-(s+1))}function F(e,t){if("number"!=typeof e)throw new $.ERR_INVALID_ARG_TYPE(t,"number",e)}function O(e,t,r){if(Math.floor(e)!==e)throw F(e,r),new $.ERR_OUT_OF_RANGE(r||"offset","an integer",e);if(t<0)throw new $.ERR_BUFFER_OUT_OF_BOUNDS;throw new $.ERR_OUT_OF_RANGE(r||"offset",`>= ${+!!r} and <= ${t}`,e)}R("ERR_BUFFER_OUT_OF_BOUNDS",function(e){return e?`${e} is outside of buffer bounds`:"Attempt to access memory outside buffer bounds"},RangeError),R("ERR_INVALID_ARG_TYPE",function(e,t){return`The "${e}" argument must be of type number. Received type ${typeof t}`},TypeError),R("ERR_OUT_OF_RANGE",function(e,t,r){let a=`The value of "${e}" is out of range.`,n=r;return Number.isInteger(r)&&Math.abs(r)>0x100000000?n=P(String(r)):"bigint"==typeof r&&(n=String(r),(r>BigInt(2)**BigInt(32)||r<-(BigInt(2)**BigInt(32)))&&(n=P(n)),n+="n"),a+=` It must be ${t}. Received ${n}`},RangeError);let M=/[^+/0-9A-Za-z-_]/g;function D(e,t){let r;t=t||1/0;let a=e.length,n=null,s=[];for(let o=0;o<a;++o){if((r=e.charCodeAt(o))>55295&&r<57344){if(!n){if(r>56319||o+1===a){(t-=3)>-1&&s.push(239,191,189);continue}n=r;continue}if(r<56320){(t-=3)>-1&&s.push(239,191,189),n=r;continue}r=(n-55296<<10|r-56320)+65536}else n&&(t-=3)>-1&&s.push(239,191,189);if(n=null,r<128){if((t-=1)<0)break;s.push(r)}else if(r<2048){if((t-=2)<0)break;s.push(r>>6|192,63&r|128)}else if(r<65536){if((t-=3)<0)break;s.push(r>>12|224,r>>6&63|128,63&r|128)}else if(r<1114112){if((t-=4)<0)break;s.push(r>>18|240,r>>12&63|128,r>>6&63|128,63&r|128)}else throw Error("Invalid code point")}return s}function _(e){return s.toByteArray(function(e){if((e=(e=e.split("=")[0]).trim().replace(M,"")).length<2)return"";for(;e.length%4!=0;)e+="=";return e}(e))}function L(e,t,r,a){let n;for(n=0;n<a&&!(n+r>=t.length)&&!(n>=e.length);++n)t[n+r]=e[n];return n}function V(e,t){return e instanceof t||null!=e&&null!=e.constructor&&null!=e.constructor.name&&e.constructor.name===t.name}let G=function(){let e="0123456789abcdef",t=Array(256);for(let r=0;r<16;++r){let a=16*r;for(let n=0;n<16;++n)t[a+n]=e[r]+e[n]}return t}();function W(e){return"undefined"==typeof BigInt?z:e}function z(){throw Error("BigInt not supported")}}),x("kuxul",function(e,t){a(e.exports,"toByteArray",()=>r,e=>r=e),a(e.exports,"fromByteArray",()=>n,e=>n=e);for(var r=function(e){var t,r,a=function(e){var t=e.length;if(t%4>0)throw Error("Invalid string. Length must be a multiple of 4");var r=e.indexOf("=");-1===r&&(r=t);var a=r===t?0:4-r%4;return[r,a]}(e),n=a[0],s=a[1],l=new i((n+s)*3/4-s),u=0,p=s>0?n-4:n;for(r=0;r<p;r+=4)t=o[e.charCodeAt(r)]<<18|o[e.charCodeAt(r+1)]<<12|o[e.charCodeAt(r+2)]<<6|o[e.charCodeAt(r+3)],l[u++]=t>>16&255,l[u++]=t>>8&255,l[u++]=255&t;return 2===s&&(t=o[e.charCodeAt(r)]<<2|o[e.charCodeAt(r+1)]>>4,l[u++]=255&t),1===s&&(t=o[e.charCodeAt(r)]<<10|o[e.charCodeAt(r+1)]<<4|o[e.charCodeAt(r+2)]>>2,l[u++]=t>>8&255,l[u++]=255&t),l},n=function(e){for(var t,r=e.length,a=r%3,n=[],o=0,i=r-a;o<i;o+=16383)n.push(function(e,t,r){for(var a,n=[],o=t;o<r;o+=3)a=(e[o]<<16&0xff0000)+(e[o+1]<<8&65280)+(255&e[o+2]),n.push(s[a>>18&63]+s[a>>12&63]+s[a>>6&63]+s[63&a]);return n.join("")}(e,o,o+16383>i?i:o+16383));return 1===a?n.push(s[(t=e[r-1])>>2]+s[t<<4&63]+"=="):2===a&&n.push(s[(t=(e[r-2]<<8)+e[r-1])>>10]+s[t>>4&63]+s[t<<2&63]+"="),n.join("")},s=[],o=[],i="undefined"!=typeof Uint8Array?Uint8Array:Array,l="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",u=0,p=l.length;u<p;++u)s[u]=l[u],o[l.charCodeAt(u)]=u;o[45]=62,o[95]=63}),x("9NvM5",function(e,t){var r,n;a(e.exports,"read",()=>r,e=>r=e),a(e.exports,"write",()=>n,e=>n=e),r=function(e,t,r,a,n){var s,o,i=8*n-a-1,l=(1<<i)-1,u=l>>1,p=-7,d=r?n-1:0,c=r?-1:1,h=e[t+d];for(d+=c,s=h&(1<<-p)-1,h>>=-p,p+=i;p>0;s=256*s+e[t+d],d+=c,p-=8);for(o=s&(1<<-p)-1,s>>=-p,p+=a;p>0;o=256*o+e[t+d],d+=c,p-=8);if(0===s)s=1-u;else{if(s===l)return o?NaN:1/0*(h?-1:1);o+=Math.pow(2,a),s-=u}return(h?-1:1)*o*Math.pow(2,s-a)},n=function(e,t,r,a,n,s){var o,i,l,u=8*s-n-1,p=(1<<u)-1,d=p>>1,c=5960464477539062e-23*(23===n),h=a?0:s-1,f=a?1:-1,m=+(t<0||0===t&&1/t<0);for(isNaN(t=Math.abs(t))||t===1/0?(i=+!!isNaN(t),o=p):(o=Math.floor(Math.log(t)/Math.LN2),t*(l=Math.pow(2,-o))<1&&(o--,l*=2),o+d>=1?t+=c/l:t+=c*Math.pow(2,1-d),t*l>=2&&(o++,l/=2),o+d>=p?(i=0,o=p):o+d>=1?(i=(t*l-1)*Math.pow(2,n),o+=d):(i=t*Math.pow(2,d-1)*Math.pow(2,n),o=0));n>=8;e[r+h]=255&i,h+=f,i/=256,n-=8);for(o=o<<n|i,u+=n;u>0;e[r+h]=255&o,h+=f,o/=256,u-=8);e[r+h-f]|=128*m}}),x("9RUNn",function(e,t){a(e.exports,"IORouterRegistry",()=>r),a(e.exports,"registerSaveRouter",()=>n),a(e.exports,"registerLoadRouter",()=>s),a(e.exports,"getSaveHandlers",()=>o),a(e.exports,"getLoadHandlers",()=>i);class r{constructor(){this.saveRouters=[],this.loadRouters=[]}static getInstance(){return null==r.instance&&(r.instance=new r),r.instance}static registerSaveRouter(e){r.getInstance().saveRouters.push(e)}static registerLoadRouter(e){r.getInstance().loadRouters.push(e)}static getSaveHandlers(e){return r.getHandlers(e,"save")}static getLoadHandlers(e,t){return r.getHandlers(e,"load",t)}static getHandlers(e,t,a){let n=[];return("load"===t?r.getInstance().loadRouters:r.getInstance().saveRouters).forEach(t=>{let r=t(e,a);null!==r&&n.push(r)}),n}}let n=e=>r.registerSaveRouter(e),s=e=>r.registerLoadRouter(e),o=e=>r.getSaveHandlers(e),i=(e,t)=>r.getLoadHandlers(e,t)}),x("h6KCl",function(e,t){a(e.exports,"BrowserLocalStorage",()=>c),a(e.exports,"BrowserLocalStorageManager",()=>f),g("dcHSK");var r=g("ibsdL"),n=g("8cCb2"),s=g("4FRLN"),o=g("hBb8J"),i=g("9RUNn");let l="tensorflowjs_models",u="info";function p(e){return{info:[l,e,u].join("/"),topology:[l,e,"model_topology"].join("/"),weightSpecs:[l,e,"weight_specs"].join("/"),weightData:[l,e,"weight_data"].join("/"),modelMetadata:[l,e,"model_metadata"].join("/")}}function d(e){for(let t of Object.values(e))window.localStorage.removeItem(t)}class c{constructor(e){if(!(0,r.env)().getBool("IS_BROWSER")||"undefined"==typeof window||void 0===window.localStorage)throw Error("The current environment does not support local storage.");if(this.LS=window.localStorage,null==e||!e)throw Error("For local storage, modelPath must not be null, undefined or empty.");this.modelPath=e,this.keys=p(this.modelPath)}async save(e){if(e.modelTopology instanceof ArrayBuffer)throw Error("BrowserLocalStorage.save() does not support saving model topology in binary formats yet.");{let t=JSON.stringify(e.modelTopology),r=JSON.stringify(e.weightSpecs),a=(0,s.getModelArtifactsInfoForJSON)(e),n=o.CompositeArrayBuffer.join(e.weightData);try{this.LS.setItem(this.keys.info,JSON.stringify(a)),this.LS.setItem(this.keys.topology,t),this.LS.setItem(this.keys.weightSpecs,r),this.LS.setItem(this.keys.weightData,(0,s.arrayBufferToBase64String)(n));let o={format:e.format,generatedBy:e.generatedBy,convertedBy:e.convertedBy,signature:null!=e.signature?e.signature:void 0,userDefinedMetadata:null!=e.userDefinedMetadata?e.userDefinedMetadata:void 0,modelInitializer:null!=e.modelInitializer?e.modelInitializer:void 0,initializerSignature:null!=e.initializerSignature?e.initializerSignature:void 0,trainingConfig:null!=e.trainingConfig?e.trainingConfig:void 0};return this.LS.setItem(this.keys.modelMetadata,JSON.stringify(o)),{modelArtifactsInfo:a}}catch(e){throw d(this.keys),Error(`Failed to save model '${this.modelPath}' to local storage: size quota being exceeded is a possible cause of this failure: modelTopologyBytes=${a.modelTopologyBytes}, weightSpecsBytes=${a.weightSpecsBytes}, weightDataBytes=${a.weightDataBytes}.`)}}}async load(){let e=JSON.parse(this.LS.getItem(this.keys.info));if(null==e)throw Error(`In local storage, there is no model with name '${this.modelPath}'`);if("JSON"!==e.modelTopologyType)throw Error("BrowserLocalStorage does not support loading non-JSON model topology yet.");let t={},r=JSON.parse(this.LS.getItem(this.keys.topology));if(null==r)throw Error(`In local storage, the topology of model '${this.modelPath}' is missing.`);t.modelTopology=r;let a=JSON.parse(this.LS.getItem(this.keys.weightSpecs));if(null==a)throw Error(`In local storage, the weight specs of model '${this.modelPath}' are missing.`);t.weightSpecs=a;let n=this.LS.getItem(this.keys.modelMetadata);if(null!=n){let e=JSON.parse(n);t.format=e.format,t.generatedBy=e.generatedBy,t.convertedBy=e.convertedBy,null!=e.signature&&(t.signature=e.signature),null!=e.userDefinedMetadata&&(t.userDefinedMetadata=e.userDefinedMetadata),null!=e.modelInitializer&&(t.modelInitializer=e.modelInitializer),null!=e.initializerSignature&&(t.initializerSignature=e.initializerSignature),null!=e.trainingConfig&&(t.trainingConfig=e.trainingConfig)}let o=this.LS.getItem(this.keys.weightData);if(null==o)throw Error(`In local storage, the binary weight values of model '${this.modelPath}' are missing.`);return t.weightData=(0,s.base64StringToArrayBuffer)(o),t}}c.URL_SCHEME="localstorage://";let h=e=>{var t;return(0,r.env)().getBool("IS_BROWSER")&&!Array.isArray(e)&&e.startsWith(c.URL_SCHEME)?(t=e.slice(c.URL_SCHEME.length),new c(t)):null};i.IORouterRegistry.registerSaveRouter(h),i.IORouterRegistry.registerLoadRouter(h);class f{constructor(){(0,n.assert)((0,r.env)().getBool("IS_BROWSER"),()=>"Current environment is not a web browser"),(0,n.assert)("undefined"==typeof window||void 0!==window.localStorage,()=>"Current browser does not appear to support localStorage"),this.LS=window.localStorage}async listModels(){let e={},t=l+"/",r="/"+u;for(let a=0;a<this.LS.length;++a){let n=this.LS.key(a);n.startsWith(t)&&n.endsWith(r)&&(e[function(e){let t=e.split("/");if(t.length<3)throw Error(`Invalid key format: ${e}`);return t.slice(1,t.length-1).join("/")}(n)]=JSON.parse(this.LS.getItem(n)))}return e}async removeModel(e){var t;let r=p(e=(t=e).startsWith(c.URL_SCHEME)?t.slice(c.URL_SCHEME.length):t);if(null==this.LS.getItem(r.info))throw Error(`Cannot find model at path '${e}'`);let a=JSON.parse(this.LS.getItem(r.info));return d(r),a}}}),x("1PMKz",function(e,t){a(e.exports,"ModelStoreManagerRegistry",()=>s),a(e.exports,"listModels",()=>l),a(e.exports,"removeModel",()=>u),a(e.exports,"copyModel",()=>p),a(e.exports,"moveModel",()=>d);var r=g("8cCb2"),n=g("9RUNn");class s{constructor(){this.managers={}}static getInstance(){return null==s.instance&&(s.instance=new s),s.instance}static registerManager(e,t){(0,r.assert)(null!=e,()=>"scheme must not be undefined or null."),e.endsWith("://")&&(e=e.slice(0,e.indexOf("://"))),(0,r.assert)(e.length>0,()=>"scheme must not be an empty string.");let a=s.getInstance();(0,r.assert)(null==a.managers[e],()=>`A model store manager is already registered for scheme '${e}'.`),a.managers[e]=t}static getManager(e){let t=s.getInstance().managers[e];if(null==t)throw Error(`Cannot find model manager for scheme '${e}'`);return t}static getSchemes(){return Object.keys(s.getInstance().managers)}}function o(e){if(-1===e.indexOf("://"))throw Error(`The url string provided does not contain a scheme. Supported schemes are: ${s.getSchemes().join(",")}`);return{scheme:e.split("://")[0],path:e.split("://")[1]}}async function i(e,t,a=!1){(0,r.assert)(e!==t,()=>`Old path and new path are the same: '${e}'`);let l=n.IORouterRegistry.getLoadHandlers(e);(0,r.assert)(l.length>0,()=>`Copying failed because no load handler is found for source URL ${e}.`),(0,r.assert)(l.length<2,()=>`Copying failed because more than one (${l.length}) load handlers for source URL ${e}.`);let u=l[0],p=n.IORouterRegistry.getSaveHandlers(t);(0,r.assert)(p.length>0,()=>`Copying failed because no save handler is found for destination URL ${t}.`),(0,r.assert)(p.length<2,()=>`Copying failed because more than one (${l.length}) save handlers for destination URL ${t}.`);let d=p[0],c=o(e).scheme,h=o(e).path,f=c===o(e).scheme,m=await u.load();a&&f&&await s.getManager(c).removeModel(h);let g=await d.save(m);return a&&!f&&await s.getManager(c).removeModel(h),g.modelArtifactsInfo}async function l(){let e=s.getSchemes(),t={};for(let r of e){let e=await s.getManager(r).listModels();for(let a in e)t[r+"://"+a]=e[a]}return t}async function u(e){let t=o(e);return s.getManager(t.scheme).removeModel(t.path)}async function p(e,t){return i(e,t,!1)}async function d(e,t){return i(e,t,!0)}}),x("lhiTQ",function(e,t){let r;var a=g("ibsdL"),n=g("hPtJY");let s={importFetch:()=>g("kjyEk")};(0,a.env)().get("IS_NODE")&&!(0,a.env)().get("IS_BROWSER")&&(0,a.env)().setPlatform("node",new class{constructor(){this.util=g("kjyEk"),this.textEncoder=new this.util.TextEncoder}fetch(e,t){return null!=(0,a.env)().global.fetch?(0,a.env)().global.fetch(e,t):(null==r&&(r=s.importFetch()),r(e,t))}now(){let e=n.hrtime();return 1e3*e[0]+e[1]/1e6}encode(e,t){if("utf-8"!==t&&"utf8"!==t)throw Error(`Node built-in encoder only supports utf-8, but got ${t}`);return this.textEncoder.encode(e)}decode(e,t){return 0===e.length?"":new this.util.TextDecoder(t).decode(e)}isTypedArray(e){return this.util.types.isFloat32Array(e)||this.util.types.isInt32Array(e)||this.util.types.isUint8Array(e)||this.util.types.isUint8ClampedArray(e)}})}),x("kjyEk",function(e,t){}),x("iG87S",function(e,t){a(e.exports,"buffer",()=>s);var r=g("9jCh7"),n=g("8cCb2");function s(e,t="float32",a){return t=t||"float32",n.assertNonNegativeIntegerDimensions(e),new(0,r.TensorBuffer)(e,t,a)}}),x("inFmq",function(e,t){a(e.exports,"cast",()=>i);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk"),o=g("8cCb2");let i=(0,g("jqSCG").op)({cast_:function(e,t){let a=(0,s.convertToTensor)(e,"x","cast");if(!o.isValidDtype(t))throw Error(`Failed to cast to unknown dtype ${t}`);if("string"===t&&"string"!==a.dtype||"string"!==t&&"string"===a.dtype)throw Error("Only strings can be casted to strings");return r.ENGINE.runKernel(n.Cast,{x:a},{dtype:t})}})}),x("5TuCW",function(e,t){a(e.exports,"clone",()=>o);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk");let o=(0,g("jqSCG").op)({clone_:function(e){let t=(0,s.convertToTensor)(e,"x","clone","string_or_numeric");return r.ENGINE.runKernel(n.Identity,{x:t})}})}),x("bSp5U",function(e,t){a(e.exports,"print",()=>r);function r(e,t=!1){console.log(e.toString(t))}}),x("5KHy0",function(e,t){a(e.exports,"registerOptimizers",()=>c);var r=g("Haryc"),n=g("7740A"),s=g("cdIoP"),o=g("9sl63"),i=g("7GJGN"),l=g("7qglv"),u=g("hR6PP"),p=g("5IZxH");let d=[r.AdadeltaOptimizer,n.AdagradOptimizer,s.AdamOptimizer,o.AdamaxOptimizer,i.MomentumOptimizer,l.RMSPropOptimizer,u.SGDOptimizer];function c(){for(let e of d)(0,p.registerClass)(e)}}),x("Haryc",function(e,t){a(e.exports,"AdadeltaOptimizer",()=>c);var r=g("38WwN"),n=g("c2DT1"),s=g("hgacW"),o=g("1QPqB"),i=g("jZc0w"),l=g("iAb3z"),u=g("iDd8d"),p=g("8EjnK"),d=g("kULIJ");class c extends d.Optimizer{static get className(){return"Adadelta"}constructor(e,t,a=null){super(),this.learningRate=e,this.rho=t,this.epsilon=a,this.accumulatedGrads=[],this.accumulatedUpdates=[],null==a&&(this.epsilon=r.ENGINE.backend.epsilon())}applyGradients(e){(Array.isArray(e)?e.map(e=>e.name):Object.keys(e)).forEach((t,a)=>{let d=r.ENGINE.registeredVariables[t];null==this.accumulatedGrads[a]&&(this.accumulatedGrads[a]={originalName:`${t}/accum_grad`,variable:(0,n.tidy)(()=>(0,p.zerosLike)(d).variable(!1))}),null==this.accumulatedUpdates[a]&&(this.accumulatedUpdates[a]={originalName:`${t}/accum_var`,variable:(0,n.tidy)(()=>(0,p.zerosLike)(d).variable(!1))});let c=Array.isArray(e)?e[a].tensor:e[t];if(null==c)return;let h=this.accumulatedGrads[a].variable,f=this.accumulatedUpdates[a].variable;(0,n.tidy)(()=>{let e=(0,s.add)((0,i.mul)(h,this.rho),(0,i.mul)((0,u.square)(c),1-this.rho)),t=(0,i.mul)((0,o.div)((0,l.sqrt)((0,s.add)(f,this.epsilon)),(0,l.sqrt)((0,s.add)(h,this.epsilon))),c),r=(0,s.add)((0,i.mul)(f,this.rho),(0,i.mul)((0,u.square)(t),1-this.rho));h.assign(e),f.assign(r);let a=(0,s.add)((0,i.mul)(t,-this.learningRate),d);d.assign(a)})}),this.incrementIterations()}dispose(){null!=this.accumulatedUpdates&&((0,n.dispose)(this.accumulatedGrads.map(e=>e.variable)),(0,n.dispose)(this.accumulatedUpdates.map(e=>e.variable)))}async getWeights(){let e=[...this.accumulatedGrads,...this.accumulatedUpdates];return[await this.saveIterations()].concat(e.map(e=>({name:e.originalName,tensor:e.variable})))}async setWeights(e){let t=(e=await this.extractIterations(e)).length/2;this.accumulatedGrads=e.slice(0,t).map(e=>({originalName:e.name,variable:e.tensor.variable(!1)})),this.accumulatedUpdates=e.slice(t,2*t).map(e=>({originalName:e.name,variable:e.tensor.variable(!1)}))}getConfig(){return{learningRate:this.learningRate,rho:this.rho,epsilon:this.epsilon}}static fromConfig(e,t){return new e(t.learningRate,t.rho,t.epsilon)}}}),x("hgacW",function(e,t){a(e.exports,"add",()=>i);var r=g("38WwN"),n=g("hl418"),s=g("3w4Rg"),o=g("5xBLk");let i=(0,g("jqSCG").op)({add_:function(e,t){let a=(0,o.convertToTensor)(e,"a","add"),i=(0,o.convertToTensor)(t,"b","add");[a,i]=(0,s.makeTypesMatch)(a,i);let l={a:a,b:i};return r.ENGINE.runKernel(n.Add,l)}})}),x("1QPqB",function(e,t){a(e.exports,"div",()=>l);var r=g("38WwN"),n=g("hl418"),s=g("3w4Rg"),o=g("5xBLk"),i=g("6a2Ft");let l=(0,g("jqSCG").op)({div_:function(e,t){let a=(0,o.convertToTensor)(e,"a","div"),l=(0,o.convertToTensor)(t,"b","div");if([a,l]=(0,s.makeTypesMatch)(a,l),"int32"===a.dtype&&"int32"===l.dtype)return(0,i.floorDiv)(a,l);let u={a:a,b:l};return r.ENGINE.runKernel(n.RealDiv,u,{})}})}),x("6a2Ft",function(e,t){a(e.exports,"floorDiv",()=>i);var r=g("38WwN"),n=g("hl418"),s=g("3w4Rg"),o=g("5xBLk");let i=(0,g("jqSCG").op)({floorDiv_:function(e,t){let a=(0,o.convertToTensor)(e,"a","floorDiv"),i=(0,o.convertToTensor)(t,"b","floorDiv");[a,i]=(0,s.makeTypesMatch)(a,i);let l={a:a,b:i};return r.ENGINE.runKernel(n.FloorDiv,l)}})}),x("jZc0w",function(e,t){a(e.exports,"mul",()=>i);var r=g("38WwN"),n=g("hl418"),s=g("3w4Rg"),o=g("5xBLk");let i=(0,g("jqSCG").op)({mul_:function(e,t){let a=(0,o.convertToTensor)(e,"a","mul"),i=(0,o.convertToTensor)(t,"b","mul");[a,i]=(0,s.makeTypesMatch)(a,i);let l={a:a,b:i};return r.ENGINE.runKernel(n.Multiply,l)}})}),x("iAb3z",function(e,t){a(e.exports,"sqrt",()=>o);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk");let o=(0,g("jqSCG").op)({sqrt_:function(e){let t=(0,s.convertToTensor)(e,"x","sqrt","float32");return r.ENGINE.runKernel(n.Sqrt,{x:t})}})}),x("iDd8d",function(e,t){a(e.exports,"square",()=>s);var r=g("38WwN"),n=g("5xBLk");let s=(0,g("jqSCG").op)({square_:function(e){let t=(0,n.convertToTensor)(e,"x","square");return r.ENGINE.runKernel("Square",{x:t},{})}})}),x("8EjnK",function(e,t){a(e.exports,"zerosLike",()=>o);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk");let o=(0,g("jqSCG").op)({zerosLike_:function(e){let t=(0,s.convertToTensor)(e,"x","zerosLike");return r.ENGINE.runKernel(n.ZerosLike,{x:t})}})}),x("kULIJ",function(e,t){a(e.exports,"Optimizer",()=>i);var r=g("c2DT1"),n=g("92fpA"),s=g("3xp7o"),o=g("5IZxH");class i extends o.Serializable{minimize(e,t=!1,a){let{value:n,grads:s}=this.computeGradients(e,a);if(null!=a){let e=a.map(e=>({name:e.name,tensor:s[e.name]}));this.applyGradients(e)}else this.applyGradients(s);return((0,r.dispose)(s),t)?n:(n.dispose(),null)}get iterations(){return null==this.iterations_&&(this.iterations_=0),this.iterations_}incrementIterations(){this.iterations_=this.iterations+1}computeGradients(e,t){return(0,n.variableGrads)(e,t)}dispose(){null!=this.iterations_&&(0,r.dispose)(this.iterations_)}async saveIterations(){return null==this.iterations_&&(this.iterations_=0),{name:"iter",tensor:(0,s.scalar)(this.iterations_,"int32")}}async getWeights(){throw Error("getWeights() is not implemented for this optimizer yet.")}async setWeights(e){throw Error(`setWeights() is not implemented for this optimizer class ${this.getClassName()}`)}async extractIterations(e){return this.iterations_=(await e[0].tensor.data())[0],e.slice(1)}}Object.defineProperty(i,Symbol.hasInstance,{value:e=>null!=e.minimize&&null!=e.computeGradients&&null!=e.applyGradients})}),x("92fpA",function(e,t){a(e.exports,"grad",()=>i),a(e.exports,"grads",()=>l),a(e.exports,"valueAndGrad",()=>u),a(e.exports,"valueAndGrads",()=>p),a(e.exports,"variableGrads",()=>d),a(e.exports,"customGrad",()=>c);var r=g("38WwN"),n=g("9jCh7"),s=g("5xBLk"),o=g("8cCb2");function i(e){return o.assert(o.isFunction(e),()=>"The f passed in grad(f) must be a function"),(t,a)=>{let n=(0,s.convertToTensor)(t,"x","tf.grad","string_or_numeric"),i=null!=a?(0,s.convertToTensor)(a,"dy","tf.grad"):null;return r.ENGINE.tidy(()=>{let{value:t,grads:a}=r.ENGINE.gradients(()=>e(n),[n],i);return null!=i&&o.assertShapesMatch(t.shape,i.shape,"The shape of dy passed in grad(f)(x, dy) must match the shape returned by f(x)"),h(a),a[0]})}}function l(e){return o.assert(o.isFunction(e),()=>"The f passed in grads(f) must be a function"),(t,a)=>{o.assert(Array.isArray(t),()=>"The args passed in grads(f)(args) must be an array of `Tensor`s or `TensorLike`s");let n=(0,s.convertToTensorArray)(t,"args","tf.grads","string_or_numeric"),i=null!=a?(0,s.convertToTensor)(a,"dy","tf.grads"):null;return r.ENGINE.tidy(()=>{let{value:t,grads:a}=r.ENGINE.gradients(()=>e(...n),n,i);return null!=i&&o.assertShapesMatch(t.shape,i.shape,"The shape of dy passed in grads(f)([x1,...], dy) must match the shape returned by f([x1,...])"),h(a),a})}}function u(e){return o.assert(o.isFunction(e),()=>"The f passed in valueAndGrad(f) must be a function"),(t,a)=>{o.assert(t instanceof n.Tensor,()=>"The x passed in valueAndGrad(f)(x) must be a tensor"),o.assert(null==a||a instanceof n.Tensor,()=>"The dy passed in valueAndGrad(f)(x, dy) must be a tensor");let{grads:s,value:i}=r.ENGINE.gradients(()=>e(t),[t],a);return h(s),{grad:s[0],value:i}}}function p(e){return o.assert(o.isFunction(e),()=>"The f passed in valueAndGrads(f) must be a function"),(t,a)=>{o.assert(Array.isArray(t)&&t.every(e=>e instanceof n.Tensor),()=>"The args passed in valueAndGrads(f)(args) must be array of tensors"),o.assert(null==a||a instanceof n.Tensor,()=>"The dy passed in valueAndGrads(f)(args, dy) must be a tensor");let s=r.ENGINE.gradients(()=>e(...t),t,a);return null!=a&&o.assertShapesMatch(s.value.shape,a.shape,"The shape of dy passed in valueAndGrads(f)([x1,...], dy) must match the shape returned by f([x1,...])"),h(s.grads),s}}function d(e,t){o.assert(o.isFunction(e),()=>"The f passed in variableGrads(f) must be a function"),o.assert(null==t||Array.isArray(t)&&t.every(e=>e instanceof n.Variable),()=>"The varList passed in variableGrads(f, varList) must be an array of variables");let a=null!=t;if(!a)for(let e in t=[],r.ENGINE.registeredVariables)t.push(r.ENGINE.registeredVariables[e]);let s=a?t.filter(e=>!e.trainable):null,i=t.length;t=t.filter(e=>e.trainable),o.assert(t.length>0,()=>`variableGrads() expects at least one of the input variables to be trainable, but none of the ${i} variables is trainable.`);let{value:l,grads:u}=r.ENGINE.gradients(e,t,null,!0);o.assert(u.some(e=>null!=e),()=>"Cannot find a connection between any variable and the result of the loss function y=f(x). Please make sure the operations that use variables are inside the function f passed to minimize()."),o.assert(0===l.rank,()=>`The f passed in variableGrads(f) must return a scalar, but it returned a rank-${l.rank} tensor`);let p={};return t.forEach((e,t)=>{null!=u[t]&&(p[e.name]=u[t])}),null!=s&&s.forEach(e=>p[e.name]=null),{value:l,grads:p}}function c(e){return r.ENGINE.customGrad(e)}function h(e){if(e.filter(e=>null==e).length>0)throw Error(`Cannot compute gradient of y=f(x) with respect to x. Make sure that
    the f you passed encloses all operations that lead from x to y.`)}}),x("3xp7o",function(e,t){a(e.exports,"scalar",()=>s);var r=g("jjNRA"),n=g("dKr4X");function s(e,t){if(((0,r.isTypedArray)(e)&&"string"!==t||Array.isArray(e))&&"complex64"!==t)throw Error("Error creating a new Scalar: value must be a primitive (number|boolean|string)");if("string"===t&&(0,r.isTypedArray)(e)&&!(e instanceof Uint8Array))throw Error("When making a scalar from encoded string, the value must be `Uint8Array`.");return(0,n.makeTensor)(e,[],[],t)}}),x("5IZxH",function(e,t){a(e.exports,"Serializable",()=>o),a(e.exports,"SerializationMap",()=>i),a(e.exports,"registerClass",()=>l),a(e.exports,"getRegisteredName",()=>u);var r=g("8cCb2");let n=new Map,s=new Map;class o{getClassName(){return this.constructor.className}static fromConfig(e,t){return new e(t)}}class i{constructor(){this.classNameMap={}}static getMap(){return null==i.instance&&(i.instance=new i),i.instance}static register(e){i.getMap().classNameMap[e.className]=[e,e.fromConfig]}}function l(e,t,a){(0,r.assert)(null!=e.className,()=>"Class being registered does not have the static className property defined."),(0,r.assert)("string"==typeof e.className,()=>"className is required to be a string, but got type "+typeof e.className),(0,r.assert)(e.className.length>0,()=>"Class being registered has an empty-string as its className, which is disallowed."),void 0===t&&(t="Custom"),void 0===a&&(a=e.className);let o=t+">"+a;return i.register(e),n.set(o,e),s.set(e,o),e}function u(e){return s.has(e)?s.get(e):e.className}}),x("7740A",function(e,t){a(e.exports,"AdagradOptimizer",()=>c);var r=g("38WwN"),n=g("c2DT1"),s=g("hgacW"),o=g("1QPqB"),i=g("gYive"),l=g("jZc0w"),u=g("iAb3z"),p=g("iDd8d"),d=g("kULIJ");class c extends d.Optimizer{static get className(){return"Adagrad"}constructor(e,t=.1){super(),this.learningRate=e,this.initialAccumulatorValue=t,this.accumulatedGrads=[]}applyGradients(e){(Array.isArray(e)?e.map(e=>e.name):Object.keys(e)).forEach((t,a)=>{let d=r.ENGINE.registeredVariables[t];null==this.accumulatedGrads[a]&&(this.accumulatedGrads[a]={originalName:`${t}/accumulator`,variable:(0,n.tidy)(()=>(0,i.fill)(d.shape,this.initialAccumulatorValue).variable(!1))});let c=Array.isArray(e)?e[a].tensor:e[t];if(null==c)return;let h=this.accumulatedGrads[a].variable;(0,n.tidy)(()=>{let e=(0,s.add)(h,(0,p.square)(c));h.assign(e);let t=(0,s.add)((0,l.mul)((0,o.div)(c,(0,u.sqrt)((0,s.add)(e,r.ENGINE.backend.epsilon()))),-this.learningRate),d);d.assign(t)})}),this.incrementIterations()}dispose(){null!=this.accumulatedGrads&&(0,n.dispose)(this.accumulatedGrads.map(e=>e.variable))}async getWeights(){return[await this.saveIterations()].concat(this.accumulatedGrads.map(e=>({name:e.originalName,tensor:e.variable})))}async setWeights(e){e=await this.extractIterations(e),this.accumulatedGrads=e.map(e=>({originalName:e.name,variable:e.tensor.variable(!1)}))}getConfig(){return{learningRate:this.learningRate,initialAccumulatorValue:this.initialAccumulatorValue}}static fromConfig(e,t){return new e(t.learningRate,t.initialAccumulatorValue)}}}),x("gYive",function(e,t){a(e.exports,"fill",()=>o);var r=g("38WwN"),n=g("hl418"),s=(g("8cCb2"),g("8cCb2"));function o(e,t,a){(0,s.assertNonNegativeIntegerDimensions)(e),a=a||(0,s.inferDtype)(t);let o={shape:e,value:t,dtype:a};return r.ENGINE.runKernel(n.Fill,{},o)}}),x("cdIoP",function(e,t){a(e.exports,"AdamOptimizer",()=>m);var r=g("38WwN"),n=g("c2DT1"),s=g("hgacW"),o=g("1QPqB"),i=g("jZc0w"),l=g("ad1of"),u=g("3xp7o"),p=g("iAb3z"),d=g("iDd8d"),c=g("7kouu"),h=g("8EjnK"),f=g("kULIJ");class m extends f.Optimizer{static get className(){return"Adam"}constructor(e,t,a,s=null){super(),this.learningRate=e,this.beta1=t,this.beta2=a,this.epsilon=s,this.accumulatedFirstMoment=[],this.accumulatedSecondMoment=[],(0,n.tidy)(()=>{this.accBeta1=(0,u.scalar)(t).variable(),this.accBeta2=(0,u.scalar)(a).variable()}),null==s&&(this.epsilon=r.ENGINE.backend.epsilon())}applyGradients(e){let t=Array.isArray(e)?e.map(e=>e.name):Object.keys(e);(0,n.tidy)(()=>{let a=(0,c.sub)(1,this.accBeta1),l=(0,c.sub)(1,this.accBeta2);t.forEach((t,u)=>{let c=r.ENGINE.registeredVariables[t];null==this.accumulatedFirstMoment[u]&&(this.accumulatedFirstMoment[u]={originalName:`${t}/m`,variable:(0,n.tidy)(()=>(0,h.zerosLike)(c).variable(!1))}),null==this.accumulatedSecondMoment[u]&&(this.accumulatedSecondMoment[u]={originalName:`${t}/v`,variable:(0,n.tidy)(()=>(0,h.zerosLike)(c).variable(!1))});let f=Array.isArray(e)?e[u].tensor:e[t];if(null==f)return;let m=this.accumulatedFirstMoment[u].variable,g=this.accumulatedSecondMoment[u].variable,x=(0,s.add)((0,i.mul)(m,this.beta1),(0,i.mul)(f,1-this.beta1)),y=(0,s.add)((0,i.mul)(g,this.beta2),(0,i.mul)((0,d.square)(f),1-this.beta2)),b=(0,o.div)(x,a),v=(0,o.div)(y,l);m.assign(x),g.assign(y);let N=(0,s.add)((0,i.mul)((0,o.div)(b,(0,s.add)((0,p.sqrt)(v),this.epsilon)),-this.learningRate),c);c.assign(N)}),this.accBeta1.assign((0,i.mul)(this.accBeta1,this.beta1)),this.accBeta2.assign((0,i.mul)(this.accBeta2,this.beta2))}),this.incrementIterations()}dispose(){this.accBeta1.dispose(),this.accBeta2.dispose(),null!=this.accumulatedFirstMoment&&(0,n.dispose)(this.accumulatedFirstMoment.map(e=>e.variable)),null!=this.accumulatedSecondMoment&&(0,n.dispose)(this.accumulatedSecondMoment.map(e=>e.variable))}async getWeights(){let e=[...this.accumulatedFirstMoment,...this.accumulatedSecondMoment];return[await this.saveIterations()].concat(e.map(e=>({name:e.originalName,tensor:e.variable})))}async setWeights(e){e=await this.extractIterations(e),(0,n.tidy)(()=>{this.accBeta1.assign((0,l.pow)(this.beta1,this.iterations_+1)),this.accBeta2.assign((0,l.pow)(this.beta2,this.iterations_+1))});let t=e.length/2;this.accumulatedFirstMoment=e.slice(0,t).map(e=>({originalName:e.name,variable:e.tensor.variable(!1)})),this.accumulatedSecondMoment=e.slice(t,2*t).map(e=>({originalName:e.name,variable:e.tensor.variable(!1)}))}getConfig(){return{learningRate:this.learningRate,beta1:this.beta1,beta2:this.beta2,epsilon:this.epsilon}}static fromConfig(e,t){return new e(t.learningRate,t.beta1,t.beta2,t.epsilon)}}}),x("ad1of",function(e,t){a(e.exports,"pow",()=>i);var r=g("38WwN"),n=g("hl418"),s=g("3w4Rg"),o=g("5xBLk");let i=(0,g("jqSCG").op)({pow_:function(e,t){let a=(0,o.convertToTensor)(e,"base","pow"),i=(0,o.convertToTensor)(t,"exp","pow");[a,i]=(0,s.makeTypesMatch)(a,i);let l={a:a,b:i};return r.ENGINE.runKernel(n.Pow,l)}})}),x("7kouu",function(e,t){a(e.exports,"sub",()=>i);var r=g("38WwN"),n=g("hl418"),s=g("3w4Rg"),o=g("5xBLk");let i=(0,g("jqSCG").op)({sub_:function(e,t){let a=(0,o.convertToTensor)(e,"a","sub"),i=(0,o.convertToTensor)(t,"b","sub");[a,i]=(0,s.makeTypesMatch)(a,i);let l={a:a,b:i};return r.ENGINE.runKernel(n.Sub,l)}})}),x("9sl63",function(e,t){a(e.exports,"AdamaxOptimizer",()=>f);var r=g("38WwN"),n=g("c2DT1"),s=g("7j49I"),o=g("hgacW"),i=g("1QPqB"),l=g("g5Jt1"),u=g("jZc0w"),p=g("3xp7o"),d=g("7kouu"),c=g("8EjnK"),h=g("kULIJ");class f extends h.Optimizer{static get className(){return"Adamax"}constructor(e,t,a,s=null,o=0){super(),this.learningRate=e,this.beta1=t,this.beta2=a,this.epsilon=s,this.decay=o,this.accumulatedFirstMoment=[],this.accumulatedWeightedInfNorm=[],(0,n.tidy)(()=>{this.iteration=(0,p.scalar)(0).variable(),this.accBeta1=(0,p.scalar)(t).variable()}),null==s&&(this.epsilon=r.ENGINE.backend.epsilon())}applyGradients(e){let t=Array.isArray(e)?e.map(e=>e.name):Object.keys(e);(0,n.tidy)(()=>{let a=(0,d.sub)(1,this.accBeta1),n=(0,i.div)(-this.learningRate,(0,o.add)((0,u.mul)(this.iteration,this.decay),1));t.forEach((t,p)=>{let d=r.ENGINE.registeredVariables[t];null==this.accumulatedFirstMoment[p]&&(this.accumulatedFirstMoment[p]={originalName:`${t}/m`,variable:(0,c.zerosLike)(d).variable(!1)}),null==this.accumulatedWeightedInfNorm[p]&&(this.accumulatedWeightedInfNorm[p]={originalName:`${t}/v`,variable:(0,c.zerosLike)(d).variable(!1)});let h=Array.isArray(e)?e[p].tensor:e[t];if(null==h)return;let f=this.accumulatedFirstMoment[p].variable,m=this.accumulatedWeightedInfNorm[p].variable,g=(0,o.add)((0,u.mul)(f,this.beta1),(0,u.mul)(h,1-this.beta1)),x=(0,u.mul)(m,this.beta2),y=(0,s.abs)(h),b=(0,l.maximum)(x,y);f.assign(g),m.assign(b);let v=(0,o.add)((0,u.mul)((0,i.div)(n,a),(0,i.div)(g,(0,o.add)(b,this.epsilon))),d);d.assign(v)}),this.iteration.assign((0,o.add)(this.iteration,1)),this.accBeta1.assign((0,u.mul)(this.accBeta1,this.beta1))}),this.incrementIterations()}dispose(){this.accBeta1.dispose(),this.iteration.dispose(),null!=this.accumulatedFirstMoment&&(0,n.dispose)(this.accumulatedFirstMoment.map(e=>e.variable)),null!=this.accumulatedWeightedInfNorm&&(0,n.dispose)(this.accumulatedWeightedInfNorm.map(e=>e.variable))}async getWeights(){throw Error("getWeights() is not implemented for Adamax yet.")}async setWeights(e){throw Error("setWeights() is not implemented for Adamax yet.")}getConfig(){return{learningRate:this.learningRate,beta1:this.beta1,beta2:this.beta2,epsilon:this.epsilon,decay:this.decay}}static fromConfig(e,t){return new e(t.learningRate,t.beta1,t.beta2,t.epsilon,t.decay)}}}),x("7j49I",function(e,t){a(e.exports,"abs",()=>o);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk");let o=(0,g("jqSCG").op)({abs_:function(e){let t=(0,s.convertToTensor)(e,"x","abs");return"complex64"===t.dtype?r.ENGINE.runKernel(n.ComplexAbs,{x:t}):r.ENGINE.runKernel(n.Abs,{x:t})}})}),x("g5Jt1",function(e,t){a(e.exports,"maximum",()=>u);var r=g("38WwN"),n=g("hl418"),s=g("3w4Rg"),o=g("5xBLk"),i=g("8BaGO"),l=g("inFmq");let u=(0,g("jqSCG").op)({maximum_:function(e,t){let a=(0,o.convertToTensor)(e,"a","maximum"),u=(0,o.convertToTensor)(t,"b","maximum");[a,u]=(0,s.makeTypesMatch)(a,u),"bool"===a.dtype&&(a=(0,l.cast)(a,"int32"),u=(0,l.cast)(u,"int32")),(0,i.assertAndGetBroadcastShape)(a.shape,u.shape);let p={a:a,b:u};return r.ENGINE.runKernel(n.Maximum,p)}})}),x("8BaGO",function(e,t){function r(e,t){let r=e.length,a=[];for(let n=0;n<r;n++){let s=r-1-n,o=e[s]||1;(t[t.length-1-n]||1)>1&&1===o&&a.unshift(s)}return a}function n(e,t){let r=[];for(let a=0;a<t.length;a++){let n=e[e.length-a-1],s=t.length-a-1,o=t[s];(null==n||1===n&&o>1)&&r.unshift(s)}return r}function s(e,t){let r=Math.max(e.length,t.length),a=Array(r);for(let n=0;n<r;n++){let s=e[e.length-n-1];null==s&&(s=1);let o=t[t.length-n-1];if(null==o&&(o=1),1===s)a[r-n-1]=o;else if(1===o)a[r-n-1]=s;else if(s!==o)throw Error(`Operands could not be broadcast together with shapes ${e} and ${t}.`);else a[r-n-1]=s}return a}a(e.exports,"getBroadcastDims",()=>r),a(e.exports,"getReductionAxes",()=>n),a(e.exports,"assertAndGetBroadcastShape",()=>s)}),x("7GJGN",function(e,t){a(e.exports,"MomentumOptimizer",()=>p);var r=g("38WwN"),n=g("c2DT1"),s=g("hgacW"),o=g("jZc0w"),i=g("3xp7o"),l=g("8EjnK"),u=g("hR6PP");class p extends u.SGDOptimizer{static get className(){return"Momentum"}constructor(e,t,r=!1){super(e),this.learningRate=e,this.momentum=t,this.useNesterov=r,this.accumulations=[],this.m=(0,i.scalar)(this.momentum)}applyGradients(e){(Array.isArray(e)?e.map(e=>e.name):Object.keys(e)).forEach((t,a)=>{let i=r.ENGINE.registeredVariables[t];null==this.accumulations[a]&&(this.accumulations[a]={originalName:`${t}/momentum`,variable:(0,n.tidy)(()=>(0,l.zerosLike)(i).variable(!1))});let u=this.accumulations[a].variable,p=Array.isArray(e)?e[a].tensor:e[t];null!=p&&(0,n.tidy)(()=>{let e,t=(0,s.add)((0,o.mul)(this.m,u),p);e=this.useNesterov?(0,s.add)((0,o.mul)(this.c,(0,s.add)(p,(0,o.mul)(t,this.m))),i):(0,s.add)((0,o.mul)(this.c,t),i),u.assign(t),i.assign(e)})}),this.incrementIterations()}dispose(){this.m.dispose(),null!=this.accumulations&&(0,n.dispose)(this.accumulations.map(e=>e.variable))}setMomentum(e){this.momentum=e}async getWeights(){return[await this.saveIterations()].concat(this.accumulations.map(e=>({name:e.originalName,tensor:e.variable})))}async setWeights(e){e=await this.extractIterations(e),this.accumulations=e.map(e=>({originalName:e.name,variable:e.tensor.variable(!1)}))}getConfig(){return{learningRate:this.learningRate,momentum:this.momentum,useNesterov:this.useNesterov}}static fromConfig(e,t){return new e(t.learningRate,t.momentum,t.useNesterov)}}}),x("hR6PP",function(e,t){a(e.exports,"SGDOptimizer",()=>u);var r=g("38WwN"),n=g("c2DT1"),s=g("hgacW"),o=g("jZc0w"),i=g("3xp7o"),l=g("kULIJ");class u extends l.Optimizer{static get className(){return"SGD"}constructor(e){super(),this.learningRate=e,this.setLearningRate(e)}applyGradients(e){(Array.isArray(e)?e.map(e=>e.name):Object.keys(e)).forEach((t,a)=>{let i=Array.isArray(e)?e[a].tensor:e[t];if(null==i)return;let l=r.ENGINE.registeredVariables[t];(0,n.tidy)(()=>{let e=(0,s.add)((0,o.mul)(this.c,i),l);l.assign(e)})}),this.incrementIterations()}setLearningRate(e){this.learningRate=e,null!=this.c&&this.c.dispose(),this.c=(0,n.keep)((0,i.scalar)(-e))}dispose(){this.c.dispose()}async getWeights(){return[await this.saveIterations()]}async setWeights(e){if(0!==(e=await this.extractIterations(e)).length)throw Error("SGD optimizer does not have settable weights.")}getConfig(){return{learningRate:this.learningRate}}static fromConfig(e,t){return new e(t.learningRate)}}}),x("7qglv",function(e,t){a(e.exports,"RMSPropOptimizer",()=>h);var r=g("38WwN"),n=g("c2DT1"),s=g("hgacW"),o=g("1QPqB"),i=g("jZc0w"),l=g("iAb3z"),u=g("iDd8d"),p=g("7kouu"),d=g("8EjnK"),c=g("kULIJ");class h extends c.Optimizer{static get className(){return"RMSProp"}constructor(e,t=.9,a=0,n=null,s=!1){if(super(),this.learningRate=e,this.decay=t,this.momentum=a,this.epsilon=n,this.accumulatedMeanSquares=[],this.accumulatedMoments=[],this.accumulatedMeanGrads=[],this.centered=s,null==n&&(this.epsilon=r.ENGINE.backend.epsilon()),null==e)throw Error("learningRate for RMSPropOptimizer must be defined.")}applyGradients(e){(Array.isArray(e)?e.map(e=>e.name):Object.keys(e)).forEach((t,a)=>{let c=r.ENGINE.registeredVariables[t];null==this.accumulatedMeanSquares[a]&&(this.accumulatedMeanSquares[a]={originalName:`${t}/rms`,variable:(0,n.tidy)(()=>(0,d.zerosLike)(c).variable(!1))}),null==this.accumulatedMoments[a]&&(this.accumulatedMoments[a]={originalName:`${t}/momentum`,variable:(0,n.tidy)(()=>(0,d.zerosLike)(c).variable(!1))}),null==this.accumulatedMeanGrads[a]&&this.centered&&(this.accumulatedMeanGrads[a]={originalName:`${t}/mg`,variable:(0,n.tidy)(()=>(0,d.zerosLike)(c).variable(!1))});let h=Array.isArray(e)?e[a].tensor:e[t];if(null==h)return;let f=this.accumulatedMeanSquares[a].variable,m=this.accumulatedMoments[a].variable;(0,n.tidy)(()=>{let e=(0,s.add)((0,i.mul)(f,this.decay),(0,i.mul)((0,u.square)(h),1-this.decay));if(this.centered){let t=this.accumulatedMeanGrads[a].variable,r=(0,s.add)((0,i.mul)(t,this.decay),(0,i.mul)(h,1-this.decay)),n=(0,o.div)((0,i.mul)(h,this.learningRate),(0,l.sqrt)((0,p.sub)(e,(0,s.add)((0,u.square)(r),this.epsilon)))),d=(0,s.add)((0,i.mul)(m,this.momentum),n);f.assign(e),t.assign(r),m.assign(d);let g=(0,p.sub)(c,d);c.assign(g)}else{let e=(0,s.add)((0,i.mul)(f,this.decay),(0,i.mul)((0,u.square)(h),1-this.decay)),t=(0,s.add)((0,i.mul)(m,this.momentum),(0,o.div)((0,i.mul)(h,this.learningRate),(0,l.sqrt)((0,s.add)(e,this.epsilon))));f.assign(e),m.assign(t);let r=(0,p.sub)(c,t);c.assign(r)}})}),this.incrementIterations()}dispose(){null!=this.accumulatedMeanSquares&&(0,n.dispose)(this.accumulatedMeanSquares.map(e=>e.variable)),null!=this.accumulatedMeanGrads&&this.centered&&(0,n.dispose)(this.accumulatedMeanGrads.map(e=>e.variable)),null!=this.accumulatedMoments&&(0,n.dispose)(this.accumulatedMoments.map(e=>e.variable))}async getWeights(){let e=[...this.accumulatedMeanSquares,...this.accumulatedMoments];return this.centered&&e.push(...this.accumulatedMeanGrads),[await this.saveIterations()].concat(e.map(e=>({name:e.originalName,tensor:e.variable})))}async setWeights(e){e=await this.extractIterations(e);let t=this.centered?e.length/3:e.length/2;this.accumulatedMeanSquares=e.slice(0,t).map(e=>({originalName:e.name,variable:e.tensor.variable(!1)})),this.accumulatedMoments=e.slice(t,2*t).map(e=>({originalName:e.name,variable:e.tensor.variable(!1)})),this.centered&&(this.accumulatedMeanGrads=e.slice(2*t,3*t).map(e=>({originalName:e.name,variable:e.tensor.variable(!1)})))}getConfig(){return{learningRate:this.learningRate,decay:this.decay,momentum:this.momentum,epsilon:this.epsilon,centered:this.centered}}static fromConfig(e,t){return new e(t.learningRate,t.decay,t.momentum,t.epsilon,t.centered)}}}),x("6th4t",function(e,t){a(e.exports,"AdadeltaOptimizer",()=>g("Haryc").AdadeltaOptimizer),a(e.exports,"AdagradOptimizer",()=>g("7740A").AdagradOptimizer),a(e.exports,"AdamOptimizer",()=>g("cdIoP").AdamOptimizer),a(e.exports,"AdamaxOptimizer",()=>g("9sl63").AdamaxOptimizer),a(e.exports,"MomentumOptimizer",()=>g("7GJGN").MomentumOptimizer),a(e.exports,"Optimizer",()=>g("kULIJ").Optimizer),a(e.exports,"OptimizerConstructors",()=>g("bO4Xu").OptimizerConstructors),a(e.exports,"RMSPropOptimizer",()=>g("7qglv").RMSPropOptimizer),a(e.exports,"SGDOptimizer",()=>g("hR6PP").SGDOptimizer),a(e.exports,"Tensor",()=>g("9jCh7").Tensor),a(e.exports,"TensorBuffer",()=>g("9jCh7").TensorBuffer),a(e.exports,"Variable",()=>g("9jCh7").Variable),a(e.exports,"Rank",()=>g("2MDja").Rank),a(e.exports,"sumOutType",()=>g("2MDja").sumOutType),a(e.exports,"upcastType",()=>g("2MDja").upcastType),a(e.exports,"Reduction",()=>g("i8gZm").Reduction),a(e.exports,"customGrad",()=>g("92fpA").customGrad),a(e.exports,"grad",()=>g("92fpA").grad),a(e.exports,"grads",()=>g("92fpA").grads),a(e.exports,"valueAndGrad",()=>g("92fpA").valueAndGrad),a(e.exports,"valueAndGrads",()=>g("92fpA").valueAndGrads),a(e.exports,"variableGrads",()=>g("92fpA").variableGrads),a(e.exports,"Environment",()=>g("ibsdL").Environment),a(e.exports,"env",()=>g("ibsdL").env),a(e.exports,"ENV",()=>g("ibsdL").ENV),a(e.exports,"version_core",()=>g("kWDmn").version),a(e.exports,"nextFrame",()=>g("9LtVT").nextFrame),a(e.exports,"browser",()=>g("cpgue")),a(e.exports,"io",()=>g("9ELKf")),a(e.exports,"math",()=>g("9soOW")),a(e.exports,"serialization",()=>g("5IZxH")),a(e.exports,"test_util",()=>g("6thPa")),a(e.exports,"util",()=>g("jjNRA")),a(e.exports,"backend_util",()=>g("7MaPk")),a(e.exports,"broadcast_util",()=>g("8BaGO")),a(e.exports,"tensor_util",()=>g("3w4Rg")),a(e.exports,"slice_util",()=>g("bszZn")),a(e.exports,"gather_util",()=>g("4EvS9")),a(e.exports,"scatter_util",()=>g("7wQGW")),a(e.exports,"device_util",()=>g("4GTZ3")),a(e.exports,"kernel_impls",()=>g("lzjc8")),a(e.exports,"KernelBackend",()=>g("fJqML").KernelBackend),a(e.exports,"DataStorage",()=>g("fJqML").DataStorage),g("9ELKf"),g("9soOW"),g("8BaGO"),g("cpgue"),g("4EvS9"),g("7wQGW"),g("bszZn"),g("5IZxH"),g("3w4Rg"),g("6thPa"),g("jjNRA"),g("kWDmn"),g("Haryc"),g("7740A"),g("cdIoP"),g("9sl63"),g("7GJGN"),g("kULIJ"),g("bO4Xu"),g("7qglv"),g("hR6PP"),g("9jCh7"),g("2MDja");var r=g("aosGd");g("i8gZm");var s=g("dXS8M"),o=g("c2DT1"),i=g("eky5o");g("92fpA"),g("ibsdL"),g("9LtVT"),g("7MaPk"),g("4GTZ3"),g("lzjc8"),g("fJqML");var l=g("hl418");n(e.exports,r),n(e.exports,s),n(e.exports,o),n(e.exports,i),n(e.exports,l)}),x("9ELKf",function(e,t){a(e.exports,"copyModel",()=>g("1PMKz").copyModel),a(e.exports,"listModels",()=>g("1PMKz").listModels),a(e.exports,"moveModel",()=>g("1PMKz").moveModel),a(e.exports,"removeModel",()=>g("1PMKz").removeModel),a(e.exports,"browserFiles",()=>g("GOEuS").browserFiles),a(e.exports,"browserHTTPRequest",()=>g("jbPC7").browserHTTPRequest),a(e.exports,"CompositeArrayBuffer",()=>g("hBb8J").CompositeArrayBuffer),a(e.exports,"concatenateArrayBuffers",()=>g("4FRLN").concatenateArrayBuffers),a(e.exports,"decodeWeights",()=>g("4FRLN").decodeWeights),a(e.exports,"decodeWeightsStream",()=>g("4FRLN").decodeWeightsStream),a(e.exports,"encodeWeights",()=>g("4FRLN").encodeWeights),a(e.exports,"fromMemory",()=>g("hfd1o").fromMemory),a(e.exports,"fromMemorySync",()=>g("hfd1o").fromMemorySync),a(e.exports,"getLoadHandlers",()=>g("9RUNn").getLoadHandlers),a(e.exports,"getModelArtifactsForJSON",()=>g("4FRLN").getModelArtifactsForJSON),a(e.exports,"getModelArtifactsForJSONSync",()=>g("4FRLN").getModelArtifactsForJSONSync),a(e.exports,"getModelArtifactsInfoForJSON",()=>g("4FRLN").getModelArtifactsInfoForJSON),a(e.exports,"getSaveHandlers",()=>g("9RUNn").getSaveHandlers),a(e.exports,"getWeightSpecs",()=>g("4FRLN").getWeightSpecs),a(e.exports,"http",()=>g("jbPC7").http),a(e.exports,"isHTTPScheme",()=>g("jbPC7").isHTTPScheme),a(e.exports,"loadWeights",()=>g("wfkqW").loadWeights),a(e.exports,"registerLoadRouter",()=>g("9RUNn").registerLoadRouter),a(e.exports,"registerSaveRouter",()=>g("9RUNn").registerSaveRouter),a(e.exports,"weightsLoaderFactory",()=>g("wfkqW").weightsLoaderFactory),a(e.exports,"withSaveHandler",()=>g("hfd1o").withSaveHandler),a(e.exports,"withSaveHandlerSync",()=>g("hfd1o").withSaveHandlerSync),g("caMdQ"),g("h6KCl"),g("GOEuS"),g("jbPC7"),g("4FRLN"),g("hfd1o"),g("9RUNn"),g("wfkqW"),g("hBb8J"),g("1PMKz")}),x("GOEuS",function(e,t){a(e.exports,"browserFiles",()=>p),g("dcHSK");var r=g("ibsdL"),n=g("4FRLN"),s=g("9RUNn"),o=g("hBb8J");function i(e){return new Promise(e=>setTimeout(e)).then(e)}class l{constructor(e){if(!(0,r.env)().getBool("IS_BROWSER"))throw Error("browserDownloads() cannot proceed because the current environment is not a browser.");e.startsWith(l.URL_SCHEME)&&(e=e.slice(l.URL_SCHEME.length)),(null==e||0===e.length)&&(e="model"),this.modelJsonFileName=e+".json",this.weightDataFileName=e+".weights.bin"}async save(e){if("undefined"==typeof document)throw Error("Browser downloads are not supported in this environment since `document` is not present");let t=o.CompositeArrayBuffer.join(e.weightData),r=window.URL.createObjectURL(new Blob([t],{type:"application/octet-stream"}));if(e.modelTopology instanceof ArrayBuffer)throw Error("BrowserDownloads.save() does not support saving model topology in binary formats yet.");{let t=[{paths:["./"+this.weightDataFileName],weights:e.weightSpecs}],a=(0,n.getModelJSONForModelArtifacts)(e,t),s=window.URL.createObjectURL(new Blob([JSON.stringify(a)],{type:"application/json"})),o=null==this.modelJsonAnchor?document.createElement("a"):this.modelJsonAnchor;if(o.download=this.modelJsonFileName,o.href=s,await i(()=>o.dispatchEvent(new MouseEvent("click"))),null!=e.weightData){let e=null==this.weightDataAnchor?document.createElement("a"):this.weightDataAnchor;e.download=this.weightDataFileName,e.href=r,await i(()=>e.dispatchEvent(new MouseEvent("click")))}return{modelArtifactsInfo:(0,n.getModelArtifactsInfoForJSON)(e)}}}}l.URL_SCHEME="downloads://";class u{constructor(e){if(null==e||e.length<1)throw Error(`When calling browserFiles, at least 1 file is required, but received ${e}`);this.jsonFile=e[0],this.weightsFiles=e.slice(1)}async load(){return new Promise((e,t)=>{let r=new FileReader;r.onload=r=>{let a=JSON.parse(r.target.result),s=a.modelTopology;return null==s?void t(Error(`modelTopology field is missing from file ${this.jsonFile.name}`)):null==a.weightsManifest?void t(Error(`weightManifest field is missing from file ${this.jsonFile.name}`)):0===this.weightsFiles.length?void e({modelTopology:s}):void e((0,n.getModelArtifactsForJSON)(a,e=>this.loadWeights(e)))},r.onerror=e=>t(`Failed to read model topology and weights manifest JSON from file '${this.jsonFile.name}'. BrowserFiles supports loading Keras-style tf.Model artifacts only.`),r.readAsText(this.jsonFile)})}loadWeights(e){let t=[],r=[];for(let a of e)t.push(...a.weights),r.push(...a.paths);let a=this.checkManifestAndWeightFiles(e);return Promise.all(r.map(e=>this.loadWeightsFile(e,a[e]))).then(e=>[t,e])}loadWeightsFile(e,t){return new Promise((r,a)=>{let n=new FileReader;n.onload=e=>{r(e.target.result)},n.onerror=t=>a(`Failed to weights data from file of path '${e}'.`),n.readAsArrayBuffer(t)})}checkManifestAndWeightFiles(e){let t=[],r=this.weightsFiles.map(e=>(0,n.basename)(e.name)),a={};for(let s of e)s.paths.forEach(e=>{let s=(0,n.basename)(e);if(-1!==t.indexOf(s))throw Error(`Duplicate file basename found in weights manifest: '${s}'`);if(t.push(s),-1===r.indexOf(s))throw Error(`Weight file with basename '${s}' is not provided.`);a[e]=this.weightsFiles[r.indexOf(s)]});if(t.length!==this.weightsFiles.length)throw Error(`Mismatch in the number of files in weights manifest (${t.length}) and the number of weight files provided (${this.weightsFiles.length}).`);return a}}function p(e){return new u(e)}s.IORouterRegistry.registerSaveRouter(e=>(0,r.env)().getBool("IS_BROWSER")&&!Array.isArray(e)&&e.startsWith(l.URL_SCHEME)?function(e="model"){return new l(e)}(e.slice(l.URL_SCHEME.length)):null)}),x("jbPC7",function(e,t){a(e.exports,"isHTTPScheme",()=>p),a(e.exports,"http",()=>c),a(e.exports,"browserHTTPRequest",()=>h);var r=g("ibsdL"),n=g("8cCb2"),s=g("4FRLN"),o=g("hBb8J"),i=g("9RUNn"),l=g("wfkqW");class u{constructor(e,t){if(this.DEFAULT_METHOD="POST",null==t&&(t={}),this.weightPathPrefix=t.weightPathPrefix,this.weightUrlConverter=t.weightUrlConverter,null!=t.fetchFunc?((0,n.assert)("function"==typeof t.fetchFunc,()=>"Must pass a function that matches the signature of `fetch` (see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)"),this.fetch=t.fetchFunc):this.fetch=(0,r.env)().platform.fetch,(0,n.assert)(null!=e&&e.length>0,()=>"URL path for http must not be null, undefined or empty."),Array.isArray(e)&&(0,n.assert)(2===e.length,()=>`URL paths for http must have a length of 2, (actual length is ${e.length}).`),this.path=e,null!=t.requestInit&&null!=t.requestInit.body)throw Error("requestInit is expected to have no pre-existing body, but has one.");this.requestInit=t.requestInit||{},this.loadOptions=t}async save(e){if(e.modelTopology instanceof ArrayBuffer)throw Error("BrowserHTTPRequest.save() does not support saving model topology in binary formats yet.");let t=Object.assign({method:this.DEFAULT_METHOD},this.requestInit);t.body=new FormData;let r=[{paths:["./model.weights.bin"],weights:e.weightSpecs}],a=(0,s.getModelJSONForModelArtifacts)(e,r);if(t.body.append("model.json",new Blob([JSON.stringify(a)],{type:"application/json"}),"model.json"),null!=e.weightData){let r=o.CompositeArrayBuffer.join(e.weightData);t.body.append("model.weights.bin",new Blob([r],{type:"application/octet-stream"}),"model.weights.bin")}let n=await this.fetch(this.path,t);if(n.ok)return{modelArtifactsInfo:(0,s.getModelArtifactsInfoForJSON)(e),responses:[n]};throw Error(`BrowserHTTPRequest.save() failed due to HTTP response status ${n.status}.`)}async loadModelJSON(){let e,t=await this.fetch(this.path,this.requestInit);if(!t.ok)throw Error(`Request to ${this.path} failed with status code ${t.status}. Please verify this URL points to the model JSON of the model to load.`);try{e=await t.json()}catch(t){let e=`Failed to parse model JSON of response from ${this.path}.`;throw this.path.endsWith(".pb")?e+=" Your path contains a .pb file extension. Support for .pb models have been removed in TensorFlow.js 1.0 in favor of .json models. You can re-convert your Python TensorFlow model using the TensorFlow.js 1.0 conversion scripts or you can convert your.pb models with the 'pb2json'NPM script in the tensorflow/tfjs-converter repository.":e+=" Please make sure the server is serving valid JSON for this request.",Error(e)}let r=e.modelTopology,a=e.weightsManifest;if(null==r&&null==a)throw Error(`The JSON from HTTP path ${this.path} contains neither model topology or manifest for weights.`);return e}async load(){if(this.loadOptions.streamWeights)return this.loadStream();let e=await this.loadModelJSON();return(0,s.getModelArtifactsForJSON)(e,e=>this.loadWeights(e))}async loadStream(){let e=await this.loadModelJSON(),t=await this.getWeightUrls(e.weightsManifest),r=(0,s.getWeightSpecs)(e.weightsManifest);return Object.assign(Object.assign({},e),{weightSpecs:r,getWeightStream:()=>(0,l.streamWeights)(t,this.loadOptions)})}async getWeightUrls(e){let[t,r]=function(e){let t=e.lastIndexOf("/"),r=e.lastIndexOf("?");return[e.substring(0,t)+"/",r>t?e.substring(r):""]}(Array.isArray(this.path)?this.path[1]:this.path),a=this.weightPathPrefix||t,n=[],s=[];for(let t of e)for(let e of t.paths)null!=this.weightUrlConverter?s.push(this.weightUrlConverter(e)):n.push(a+e+r);return this.weightUrlConverter&&n.push(...await Promise.all(s)),n}async loadWeights(e){let t=await this.getWeightUrls(e);return[(0,s.getWeightSpecs)(e),await (0,l.loadWeightsAsArrayBuffer)(t,this.loadOptions)]}}function p(e){return null!=e.match(u.URL_SCHEME_REGEX)}u.URL_SCHEME_REGEX=/^https?:\/\//;let d=(e,t)=>{if("undefined"==typeof fetch&&(null==t||null==t.fetchFunc));else{let r=!0;if(Array.isArray(e)?e.every(e=>p(e)):p(e))return c(e,t)}return null};function c(e,t){return new u(e,t)}function h(e,t){return c(e,t)}i.IORouterRegistry.registerSaveRouter(d),i.IORouterRegistry.registerLoadRouter(d)}),x("wfkqW",function(e,t){a(e.exports,"loadWeightsAsArrayBuffer",()=>u),a(e.exports,"streamWeights",()=>p),a(e.exports,"loadWeights",()=>d),a(e.exports,"weightsLoaderFactory",()=>c);var r=g("ibsdL"),n=g("8cCb2"),s=g("hBb8J"),o=g("4FRLN"),i=g("cYV5g"),l=g("2bXta");async function u(e,t){null==t&&(t={});let a=null==t.fetchFunc?(0,r.env)().platform.fetch:t.fetchFunc,n=e.map(e=>a(e,t.requestInit,{isBinary:!0})),s=(null==t.onProgress?await Promise.all(n):await (0,i.monitorPromisesProgress)(n,t.onProgress,0,.5)).map(e=>e.arrayBuffer());return null==t.onProgress?await Promise.all(s):await (0,i.monitorPromisesProgress)(s,t.onProgress,.5,1)}function p(e,t){var a;let n,s=null==t.fetchFunc?(0,r.env)().platform.fetch:t.fetchFunc,o=0;return null==(a=t.onProgress)||a.call(t,0),new ReadableStream({pull:async r=>{for(var a;o<e.length;){n||(n=(await s(e[o],t.requestInit,{isBinary:!0})).body.getReader());let{done:i,value:l}=await n.read();if(i){o++,n=void 0,null==(a=t.onProgress)||a.call(t,o/e.length);continue}r.enqueue(l);return}r.close()}})}async function d(e,t="",r,a){return c(e=>u(e,{requestInit:a}))(e,t,r)}function c(e){return async(t,r="",a)=>{let i=t.map(()=>!1),u={},p=null!=a?a.map(()=>!1):[],d=[];if(t.forEach((e,t)=>{let r=0;e.weights.forEach(e=>{let s="quantization"in e?e.quantization.dtype:e.dtype,o=l.DTYPE_VALUE_SIZE_MAP[s]*n.sizeFromShape(e.shape),c=()=>{i[t]=!0,null==u[t]&&(u[t]=[]),u[t].push({manifestEntry:e,groupOffset:r,sizeBytes:o})};null!=a?a.forEach((t,r)=>{t===e.name&&(c(),p[r]=!0)}):c(),d.push(e.name),r+=o})}),!p.every(e=>e)){let e=a.filter((e,t)=>!p[t]);throw Error(`Could not find weights in manifest with names: ${e.join(", ")}. 
Manifest JSON has weights with names: ${d.join(", ")}.`)}let c=i.reduce((e,t,r)=>(t&&e.push(r),e),[]),h=[];c.forEach(e=>{t[e].paths.forEach(e=>{let t=r+(r.endsWith("/")?"":"/")+e;h.push(t)})});let f=await e(h),m={},g=0;return c.forEach(e=>{let r=t[e].paths.length,a=new(0,s.CompositeArrayBuffer)(f.slice(g,g+r));u[e].forEach(e=>{let t=a.slice(e.groupOffset,e.groupOffset+e.sizeBytes),r=(0,o.decodeWeights)(t,[e.manifestEntry]);for(let e in r)m[e]=r[e]}),g+=r}),m}}}),x("cYV5g",function(e,t){a(e.exports,"monitorPromisesProgress",()=>n);var r=g("8cCb2");function n(e,t,a,n){var s,o,i;s=e,(0,r.assert)(null!=s&&Array.isArray(s)&&s.length>0,()=>"promises must be a none empty array"),o=a=null==a?0:a,i=n=null==n?1:n,(0,r.assert)(o>=0&&o<=1,()=>`Progress fraction must be in range [0, 1], but got startFraction ${o}`),(0,r.assert)(i>=0&&i<=1,()=>`Progress fraction must be in range [0, 1], but got endFraction ${i}`),(0,r.assert)(i>=o,()=>`startFraction must be no more than endFraction, but got startFraction ${o} and endFraction ${i}`);let l=0;return Promise.all(e.map(r=>(r.then(r=>(t(a+ ++l/e.length*(n-a)),r)),r)))}}),x("hfd1o",function(e,t){a(e.exports,"fromMemory",()=>o),a(e.exports,"fromMemorySync",()=>i),a(e.exports,"withSaveHandler",()=>l),a(e.exports,"withSaveHandlerSync",()=>u);class r{constructor(e){this.modelArtifacts=e}load(){return this.modelArtifacts}}class n{constructor(e){this.saveHandler=e}save(e){return this.saveHandler(e)}}class s{constructor(e){e.load&&(this.load=()=>Promise.resolve(e.load())),e.save&&(this.save=t=>Promise.resolve(e.save(t)))}}function o(e,t,r,a){let n=arguments;return new s(i(...n))}function i(e,t,a,n){return 1!=arguments.length?(console.warn("Please call tf.io.fromMemory() with only one argument. The argument should be of type ModelArtifacts. The multi-argument signature of tf.io.fromMemory() has been deprecated and will be removed in a future release."),new r({modelTopology:e,weightSpecs:t,weightData:a,trainingConfig:n})):null!=e.modelTopology||null!=e.weightSpecs?new r(e):(console.warn("Please call tf.io.fromMemory() with only one argument. The argument should be of type ModelArtifacts. The multi-argument signature of tf.io.fromMemory() has been deprecated and will be removed in a future release."),new r({modelTopology:e}))}function l(e){return new n(e)}function u(e){return new n(e)}}),x("9soOW",function(e,t){a(e.exports,"confusionMatrix",()=>g("4UAJF").confusionMatrix),g("4UAJF")}),x("4UAJF",function(e,t){a(e.exports,"confusionMatrix",()=>p);var r=g("5xBLk"),n=g("8cCb2"),s=g("inFmq"),o=g("aUFou"),i=g("i3U4j"),l=g("jqSCG"),u=g("aDHKy");let p=(0,l.op)({confusionMatrix_:function(e,t,a){let l=(0,r.convertToTensor)(e,"labels","confusionMatrix"),p=(0,r.convertToTensor)(t,"predictions","confusionMatrix");n.assert(null==a||a>0&&Number.isInteger(a),()=>`If provided, numClasses must be a positive integer, but got ${a}`),n.assert(1===l.rank,()=>`Expected the rank of labels to be 1, but got ${l.rank}`),n.assert(1===p.rank,()=>`Expected the rank of predictions to be 1, but got ${p.rank}`),n.assert(l.shape[0]===p.shape[0],()=>`Mismatch in the number of examples: ${l.shape[0]} vs. ${p.shape[0]}. Labels and predictions should have the same number of elements.`),n.assert(a>0&&Number.isInteger(a),()=>`numClasses is required to be a positive integer, but got ${a}`);let d=(0,i.oneHot)((0,s.cast)(l,"int32"),a),c=(0,i.oneHot)((0,s.cast)(p,"int32"),a),h=(0,u.transpose)(d),f=(0,o.matMul)(h,c);return(0,s.cast)(f,"int32")}})}),x("aUFou",function(e,t){a(e.exports,"matMul",()=>i);var r=g("38WwN"),n=g("hl418"),s=g("3w4Rg"),o=g("5xBLk");let i=(0,g("jqSCG").op)({matMul_:function(e,t,a=!1,i=!1){let l=(0,o.convertToTensor)(e,"a","matMul"),u=(0,o.convertToTensor)(t,"b","matMul");[l,u]=(0,s.makeTypesMatch)(l,u);let p={a:l,b:u};return r.ENGINE.runKernel(n.BatchMatMul,p,{transposeA:a,transposeB:i})}})}),x("i3U4j",function(e,t){a(e.exports,"oneHot",()=>o);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk");let o=(0,g("jqSCG").op)({oneHot_:function(e,t,a=1,o=0,i="int32"){if(t<2)throw Error(`Error in oneHot: depth must be >=2, but it is ${t}`);let l=(0,s.convertToTensor)(e,"indices","oneHot","int32");return r.ENGINE.runKernel(n.OneHot,{indices:l},{dtype:i,depth:t,onValue:a,offValue:o})}})}),x("aDHKy",function(e,t){a(e.exports,"transpose",()=>h);var r=g("38WwN"),n=g("c2DT1"),s=g("hl418"),o=g("5xBLk"),i=g("8cCb2"),l=g("20oDZ"),u=g("1d8KH"),p=g("15cGp"),d=g("jqSCG"),c=g("b7x1G");let h=(0,d.op)({transpose_:function(e,t,a){let d=(0,o.convertToTensor)(e,"x","transpose");if(null==t&&(t=d.shape.map((e,t)=>t).reverse()),i.assert(d.rank===t.length,()=>`Error in transpose: rank of input ${d.rank} must match length of perm ${t}.`),t.forEach(e=>{i.assert(e>=0&&e<d.rank,()=>`All entries in 'perm' must be between 0 and ${d.rank-1} but got ${t}`)}),d.rank<=1)return d.clone();let h={perm:t};return"complex64"===d.dtype?(0,n.tidy)(()=>{let e=(0,c.real)(d),t=(0,u.imag)(d);return e=r.ENGINE.runKernel(s.Transpose,{x:e},h),t=r.ENGINE.runKernel(s.Transpose,{x:t},h),a&&(t=(0,p.neg)(t)),(0,l.complex)(e,t)}):r.ENGINE.runKernel(s.Transpose,{x:d},h)}})}),x("1d8KH",function(e,t){a(e.exports,"imag",()=>o);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk");let o=(0,g("jqSCG").op)({imag_:function(e){let t=(0,s.convertToTensor)(e,"input","imag");return r.ENGINE.runKernel(n.Imag,{input:t})}})}),x("15cGp",function(e,t){a(e.exports,"neg",()=>o);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk");let o=(0,g("jqSCG").op)({neg_:function(e){let t=(0,s.convertToTensor)(e,"x","neg");return r.ENGINE.runKernel(n.Neg,{x:t})}})}),x("b7x1G",function(e,t){a(e.exports,"real",()=>o);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk");let o=(0,g("jqSCG").op)({real_:function(e){let t=(0,s.convertToTensor)(e,"input","real");return r.ENGINE.runKernel(n.Real,{input:t})}})}),x("cpgue",function(e,t){let r;a(e.exports,"fromPixelsAsync",()=>m),a(e.exports,"toPixels",()=>y),a(e.exports,"draw",()=>b),a(e.exports,"fromPixels",()=>v);var n=g("38WwN"),s=g("ibsdL"),o=g("hl418"),i=g("eky5o"),l=g("9jCh7"),u=g("5xBLk"),p=g("inFmq"),d=g("jqSCG"),c=g("6Fl9Q");let h=!1;function f(e,t=3){let a,s;if(t>4)throw Error("Cannot construct Tensor with more than 4 channels from pixels.");if(null==e)throw Error("pixels passed to tf.browser.fromPixels() can not be null");let l=!1,u=!1,p=!1,d=!1,h=!1,m=!1;if(e.data instanceof Uint8Array)l=!0;else if("undefined"!=typeof ImageData&&e instanceof ImageData)u=!0;else if("undefined"!=typeof HTMLVideoElement&&e instanceof HTMLVideoElement)p=!0;else if("undefined"!=typeof HTMLImageElement&&e instanceof HTMLImageElement)d=!0;else if(null!=e.getContext)h=!0;else if("undefined"!=typeof ImageBitmap&&e instanceof ImageBitmap)m=!0;else throw Error(`pixels passed to tf.browser.fromPixels() must be either an HTMLVideoElement, HTMLImageElement, HTMLCanvasElement, ImageData in browser, or OffscreenCanvas, ImageData in webworker or {data: Uint32Array, width: number, height: number}, but was ${e.constructor.name}`);if(null!=(0,i.getKernel)(o.FromPixels,n.ENGINE.backendName))return n.ENGINE.runKernel(o.FromPixels,{pixels:e},{numChannels:t});let[g,x]=p?[e.videoWidth,e.videoHeight]:[e.width,e.height];if(h)a=e.getContext("2d").getImageData(0,0,g,x).data;else if(u||l)a=e.data;else if(d||p||m){if(null==r)if("undefined"==typeof document)if("undefined"!=typeof OffscreenCanvas&&"undefined"!=typeof OffscreenCanvasRenderingContext2D)r=new OffscreenCanvas(1,1).getContext("2d");else throw Error("Cannot parse input in current context. Reason: OffscreenCanvas Context2D rendering is not supported.");else r=document.createElement("canvas").getContext("2d",{willReadFrequently:!0});r.canvas.width=g,r.canvas.height=x,r.drawImage(e,0,0,g,x),a=r.getImageData(0,0,g,x).data}if(4===t)s=new Int32Array(a);else{let e=g*x;s=new Int32Array(e*t);for(let r=0;r<e;r++)for(let e=0;e<t;++e)s[r*t+e]=a[4*r+e]}let y=[x,g,t];return(0,c.tensor3d)(s,y,"int32")}async function m(e,t=3){var r;let a=null;if((0,s.env)().getBool("WRAP_TO_IMAGEBITMAP")&&"undefined"!=typeof window&&"undefined"!=typeof ImageBitmap&&window.hasOwnProperty("createImageBitmap")&&!(e instanceof ImageBitmap)&&null!=(r=e)&&0!==r.width&&0!==r.height&&!(null!=e&&e.data instanceof Uint8Array)){let t;try{t=await createImageBitmap(e,{premultiplyAlpha:"none"})}catch(e){t=null}a=null!=t&&t.width===e.width&&t.height===e.height?t:e}else a=e;return f(a,t)}function x(e){if(2!==e.rank&&3!==e.rank)throw Error(`toPixels only supports rank 2 or 3 tensors, got rank ${e.rank}.`);let t=2===e.rank?1:e.shape[2];if(t>4||2===t)throw Error(`toPixels only supports depth of size 1, 3 or 4 but got ${t}`);if("float32"!==e.dtype&&"int32"!==e.dtype)throw Error(`Unsupported type for toPixels: ${e.dtype}. Please use float32 or int32 tensors.`)}async function y(e,t){let r=(0,u.convertToTensor)(e,"img","toPixels");if(!(e instanceof l.Tensor)){let e=r;r=(0,p.cast)(e,"int32"),e.dispose()}x(r);let[a,s]=r.shape.slice(0,2),d=2===r.rank?1:r.shape[2],c=await r.data(),f="float32"===r.dtype?255:1,m=new Uint8ClampedArray(s*a*4);for(let e=0;e<a*s;++e){let t=[0,0,0,255];for(let a=0;a<d;a++){let n=c[e*d+a];if("float32"===r.dtype){if(n<0||n>1)throw Error(`Tensor values for a float32 Tensor must be in the range [0 - 1] but encountered ${n}.`)}else if("int32"===r.dtype&&(n<0||n>255))throw Error(`Tensor values for a int32 Tensor must be in the range [0 - 255] but encountered ${n}.`);1===d?(t[0]=n*f,t[1]=n*f,t[2]=n*f):t[a]=n*f}let a=4*e;m[a+0]=Math.round(t[0]),m[a+1]=Math.round(t[1]),m[a+2]=Math.round(t[2]),m[a+3]=Math.round(t[3])}if(null!=t){h||null!=(0,i.getKernel)(o.Draw,n.ENGINE.backendName)&&(console.warn("tf.browser.toPixels is not efficient to draw tensor on canvas. Please try tf.browser.draw instead."),h=!0),t.width=s,t.height=a;let e=t.getContext("2d"),r=new ImageData(m,s,a);e.putImageData(r,0,0)}return r!==e&&r.dispose(),m}function b(e,t,r){let a=(0,u.convertToTensor)(e,"img","draw");if(!(e instanceof l.Tensor)){let e=a;a=(0,p.cast)(e,"int32"),e.dispose()}x(a);var s=null==r?void 0:r.imageOptions;let i=(null==s?void 0:s.alpha)||1;if(i>1||i<0)throw Error(`Alpha value ${i} is suppoed to be in range [0 - 1].`);let d={image:a};n.ENGINE.runKernel(o.Draw,d,{canvas:t,options:r})}let v=(0,d.op)({fromPixels_:f})}),x("6Fl9Q",function(e,t){a(e.exports,"tensor3d",()=>o);var r=g("5xBLk"),n=g("8cCb2"),s=g("dKr4X");function o(e,t,a){if((0,n.assertNonNull)(e),null!=t&&3!==t.length)throw Error("tensor3d() requires shape to have three numbers");let o=(0,r.inferShape)(e,a);if(3!==o.length&&1!==o.length)throw Error("tensor3d() requires values to be number[][][] or flat/TypedArray");if(1===o.length&&null==t)throw Error("tensor3d() requires shape to be provided when `values` are a flat array");return(0,s.makeTensor)(e,t,o,a)}}),x("4EvS9",function(e,t){a(e.exports,"prepareAndValidate",()=>n);var r=g("8cCb2");function n(e,t){let a=e.shape.length,n=t.shape.length;if(a<1)throw Error(`tf.gatherND() expects the input to be rank 1 or higher, but the rank was ${a}.`);if(n<1)throw Error(`tf.gatherND() expects the indices to be rank 1 or higher, but the rank was ${n}.`);if("int32"!==t.dtype)throw Error(`tf.gatherND() expects the indices to be int32 type, but the dtype was ${t.dtype}.`);if(t.shape[n-1]>a)throw Error(`index innermost dimension length must be <= tensor rank; saw: ${t.shape[n-1]} vs. ${a}`);if(0===(0,r.sizeFromShape)(e.shape))throw Error(`Requested more than 0 entries, but input is empty. Input shape: ${e.shape}.`);let s=t.shape,o=s[s.length-1],i=1;for(let e=0;e<s.length-1;++e)i*=s[e];let l=e.shape,u=s.slice();u.pop();let p=1;for(let e=o;e<a;++e)p*=l[e],u.push(l[e]);let d=[...(0,r.computeStrides)(e.shape).map(e=>e/p),1].slice(0,o);return[u,i,p,d]}}),x("7wQGW",function(e,t){a(e.exports,"validateUpdateShape",()=>n),a(e.exports,"validateInput",()=>s),a(e.exports,"calculateShapes",()=>o);var r=g("8cCb2");function n(e,t,r){let a=t.rank>1?t.shape[t.rank-1]:1,n=t.rank>1?t.rank-1:1,s=`Must have updates.shape = indices.shape[:batchDim] + shape[sliceDim:], got updates.shape: ${r.shape}, indices.shape: ${t.shape}, shape: ${e}, sliceDim: ${a}, and batchDim: ${n}.`;if(r.rank<n)throw Error(s+` update.rank < ${n}. `);if(e.length<a+(r.rank-n))throw Error(s+` Output shape length < ${a+(r.rank-n)}`);if(r.rank!==n+e.length-a)throw Error(s+` update.rank != ${n+e.length-a}`);for(let e=0;e<n;++e)if(r.shape[e]!==t.shape[e])throw Error(s+` updates.shape[${e}] (${r.shape[e]}) != indices.shape[${e}] (${t.shape[e]}).`);for(let t=0;t<r.rank-n;++t)if(r.shape[t+n]!==e[t+a])throw Error(s+` updates.shape[${t+n}] (${r.shape[t+n]}) != shape[${t+n}] (${e[t+n]})`)}function s(e,t,r){if(t.rank<1)throw Error(`tf.scatterND() expects the indices to be rank 1 or higher, but the rank was ${t.rank}.`);if(e.rank<1)throw Error(`tf.scatterND() expects the updates to be rank 1 or higher, but the rank was ${e.rank}.`);if("int32"!==t.dtype)throw Error(`The dtype of 'indices' should be int32, but got dtype: ${t.dtype}`);if(r.length<1)throw Error(`Output rank must be greater or equal to 1, but got shape: ${r}`);if(0===r.length){if(0===t.size)throw Error(`Indices specified for empty output. indices shape: ${t.shape}`);if(0===e.size)throw Error(`Updates specified for empty output. updates shape: ${e.shape}`)}n(r,t,e)}function o(e,t,a){let n=t.shape.length,s=n>1?t.shape[n-1]:1,o=a.length,i=1;for(let e=s;e<o;++e)i*=a[e];let l=s<1?1:s,u=(0,r.sizeFromShape)(t.shape)/l,p=[...(0,r.computeStrides)(a.slice(0,s)),1];return{sliceRank:s,numUpdates:u,sliceSize:i,strides:p,outputSize:(0,r.sizeFromShape)(a)}}}),x("bszZn",function(e,t){a(e.exports,"assertParamsValid",()=>n),a(e.exports,"maskToAxes",()=>s),a(e.exports,"computeOutShape",()=>o),a(e.exports,"stridesWithElidedDims",()=>i),a(e.exports,"getNormalizedAxes",()=>p),a(e.exports,"startIndicesWithElidedDims",()=>d),a(e.exports,"stopIndicesWithElidedDims",()=>c),a(e.exports,"startForAxis",()=>f),a(e.exports,"stopForAxis",()=>m),a(e.exports,"stridesForAxis",()=>h),a(e.exports,"isSliceContinous",()=>x),a(e.exports,"computeFlatOffset",()=>y),a(e.exports,"parseSliceParams",()=>b),a(e.exports,"sliceInfo",()=>v);var r=g("8cCb2");function n(e,t,a){let n=e.shape.length;r.assert(n===t.length,()=>`Error in slice${n}D: Length of begin ${t} must match the rank of the array (${n}).`),r.assert(n===a.length,()=>`Error in slice${n}D: Length of size ${a} must match the rank of the array (${n}).`);for(let s=0;s<n;++s)r.assert(t[s]+a[s]<=e.shape[s],()=>`Error in slice${n}D: begin[${s}] + size[${s}] (${t[s]+a[s]}) would overflow input.shape[${s}] (${e.shape[s]})`)}function s(e){let t=[],r=0;for(;e>0;)1&e&&t.push(r),e/=2,r++;return t}function o(e,t,r){let a=[];for(let n=0;n<e.length;n++)a[n]=Math.ceil((t[n]-e[n])/r[n]);return a}function i(e,t,r,a){let n=[...e];for(let e=n.length;e<a.length;e++)n.push(1);for(let e=0;e<r;e++)0===e?n[t]=1:(n.splice(t,0,1),n.pop());return n}function l(e,t,r){return r<=e?r:r-(t-1)}function u(e,t){let r=[];for(let a=0;a<e;a++)r.push(t+a);return r}function p(e,t,r,a,n,s,o,l,u){let p=e.length,g=Array(p),x=Array(p),y=Array(p);if(t.length&&r>0){let u=t[0],p=r+1;g=d(o,u,p,a,e),x=c(l,u,p,n,e),y=i(s,u,p,e)}else for(let t=0;t<p;t++)g[t]=f(o,a,s,e,t,u),x[t]=m(l,n,s,e,t,u),y[t]=h(s,t,u);return{begin:g,end:x,strides:y}}function d(e,t,r,a,n){let s=[...n],o=u(r,t);for(let n=0;n<s.length;n++)if(o.indexOf(n)>-1)s[n]=0;else{var i,l,p;let o=(i=t,l=r,(p=n)<=i?p:p-(l-1)),u=a[o];e&1<<o&&(u=0),s[n]=u}return s}function c(e,t,a,n,s){let o=[...s],i=u(a,t);for(let r=0;r<o.length;r++)if(i.indexOf(r)>-1)o[r]=Number.MAX_SAFE_INTEGER;else{var l,p,d;let s=(l=t,p=a,(d=r)<=l?d:d-(p-1)),i=n[s];e&1<<s&&(i=Number.MAX_SAFE_INTEGER),o[r]=i}for(let e=0;e<o.length;e++){let t=s[e];o[e]<0&&(o[e]+=t),o[e]=r.clamp(0,o[e],s[e])}return o}function h(e,t,r){let a=e[t];return(r&1<<t||null==a)&&(a=1),a}function f(e,t,a,n,s,o){let i=t[s],l=a[s]||1;(e&1<<s||o&1<<s||null==i)&&(i=l>0?Number.MIN_SAFE_INTEGER:Number.MAX_SAFE_INTEGER);let u=n[s];return i<0&&(i+=u),i=r.clamp(0,i,u-1)}function m(e,t,a,n,s,o){let i=t[s],l=a[s]||1;(e&1<<s||o&1<<s||null==i)&&(i=l>0?Number.MAX_SAFE_INTEGER:Number.MIN_SAFE_INTEGER);let u=n[s];return i<0&&(i+=u),i=l>0?r.clamp(0,i,u):r.clamp(-1,i,u-1)}function x(e,t,r){let a=r.length;for(let e=0;e<r.length;e++)if(r[e]>1){a=e;break}for(let n=a+1;n<r.length;n++)if(t[n]>0||r[n]!==e[n])return!1;return!0}function y(e,t){let r=e.length>0?e[e.length-1]:1;for(let a=0;a<e.length-1;a++)r+=e[a]*t[a];return r}function b(e,t,a){let n,s,o=e.shape.length;return(n="number"==typeof t?[t,...Array(o-1).fill(0)]:t.length<o?t.concat(Array(o-t.length).fill(0)):t.slice()).forEach(e=>{r.assert(-1!==e,()=>"slice() does not support negative begin indexing.")}),s=(s=null==a?Array(o).fill(-1):"number"==typeof a?[a,...Array(o-1).fill(-1)]:a.length<o?a.concat(Array(o-a.length).fill(-1)):a).map((t,a)=>t>=0?t:(r.assert(-1===t,()=>`Negative size values should be exactly -1 but got ${t} for the slice() size at index ${a}.`),e.shape[a]-n[a])),[n,s]}function v(e,t,r,a,n,s,o,i,l){let u;if(null==a?(u=Array(t.length)).fill(1):u=a,null!=o&&(o&o-1)!=0)throw Error("Multiple ellipses in slice is not allowed.");let p=!1,d={dims:u.length,numAddAxisAfterEllipsis:0,begin:t.slice(),end:r.slice(),strides:u.slice(),beginMask:n,endMask:s,ellipsisMask:o,newAxisMask:i,shrinkAxisMask:l};for(let e=0;e<d.dims;e++)p&&(1<<e&i)!=0&&d.numAddAxisAfterEllipsis++,1<<e&o&&(p=!0);!p&&(d.ellipsisMask|=1<<d.dims,d.dims++);let c={dims:e.length,beginMask:0,endMask:0,beginValid:!1,endValid:!1};var h=d,f=c;f.beginMask=0,f.endMask=0,f.shrinkAxisMask=0;let m=0;f.beginValid=null!=h.begin,f.endValid=null!=h.end,f.begin=Array(f.dims),f.end=Array(f.dims),f.strides=Array(f.dims),f.finalShapeGatherIndices=[],f.finalShapeGatherIndicesSparse=[],f.inputShapeGatherIndicesSparse=Array(f.dims);for(let e=0;e<h.dims;e++)if(1<<e&h.ellipsisMask){let t=Math.min(f.dims-(h.dims-e)+1+h.numAddAxisAfterEllipsis,f.dims);for(;m<t;m++)f.begin[m]=0,f.end[m]=0,f.strides[m]=1,f.beginMask|=1<<m,f.endMask|=1<<m,f.finalShapeGatherIndices.push(m),f.finalShapeGatherIndicesSparse.push(-1),f.inputShapeGatherIndicesSparse[m]=e}else if(1<<e&h.newAxisMask)f.finalShapeGatherIndices.push(-2),f.finalShapeGatherIndicesSparse.push(-1);else{if(m===f.begin.length)throw Error(`Index out of range using input dim ${m}; input has only ${f.dims} dims, ${f.begin.length}.`);null!=h.begin&&(f.begin[m]=h.begin[e]),null!=h.end&&(f.end[m]=h.end[e]),f.strides[m]=h.strides[e],h.beginMask&1<<e&&(f.beginMask|=1<<m),h.endMask&1<<e&&(f.endMask|=1<<m),h.shrinkAxisMask&1<<e?(f.finalShapeGatherIndices.push(-1),f.finalShapeGatherIndicesSparse.push(-1),f.shrinkAxisMask|=1<<m):(f.finalShapeGatherIndices.push(m),f.finalShapeGatherIndicesSparse.push(e)),f.inputShapeGatherIndicesSparse[m]=e,m++}let g=!0,x=!0,y=!0,b=[],v=[];for(let t=0;t<e.length;++t){let r;if(0===c.strides[t])throw Error(`strides[${t}] must be non-zero`);let a=!!(c.shrinkAxisMask&1<<t),n=e[t];if(-1===n){b.push(a?1:-1);continue}let s=[c.beginMask&1<<t,c.endMask&1<<t],o=[c.strides[t]>0?0:-1,c.strides[t]>0?n:n-1];if(a&&c.strides[t]<=0)throw Error("only stride 1 allowed on non-range indexing.");y=y&&1===c.strides[t];let i=!!(c.beginMask&1<<t&&c.endMask&1<<t);if(c.beginValid&&c.endValid){if(a){let e=c.begin[t]<0?n+c.begin[t]:c.begin[t];if(c.begin[t]=e,c.end[t]=c.begin[t]+1,e<0||e>=n)throw Error(`slice index ${c.begin[t]} of dimension ${t} out of bounds.`)}else c.begin[t]=N(c.begin[t],0,c.strides[t],n,s,o),c.end[t]=N(c.end[t],1,c.strides[t],n,s,o);let e=1===c.strides[t]&&0===c.begin[t]&&c.end[t]===n;g=g&&e,x=x&&(0===t&&1===c.strides[t]||e)}else g=g&&1===c.strides[t]&&i,x=x&&(0===t&&1===c.strides[t]||i);let l=!1;if(c.beginValid&&c.endValid?(r=c.end[t]-c.begin[t],l=!0):a?(r=1,l=!0):i&&n>=0&&(r=c.strides[t]<0?-n:n,l=!0),l){let e;e=0===r||r<0!=c.strides[t]<0?0:Math.trunc(r/c.strides[t])+ +(r%c.strides[t]!=0),b.push(e)}else b.push(-1)}for(let e=0;e<c.finalShapeGatherIndices.length;++e){let t=c.finalShapeGatherIndices[e];t>=0?v.push(b[t]):-2===t&&v.push(1)}return{finalShapeSparse:v.filter((e,t)=>-2!==c.finalShapeGatherIndices[t]),finalShape:v,isIdentity:g,sliceDim0:x,isSimpleSlice:y,begin:c.begin,end:c.end,strides:c.strides}}function N(e,t,r,a,n,s){if(n[t])return r>0?s[t]:s[t+1&1];{let t=e<0?a+e:e;return t<s[0]?s[0]:t>s[1]?s[1]:t}}}),x("6thPa",function(e,t){a(e.exports,"TEST_EPSILON_FLOAT16",()=>i),a(e.exports,"expectArraysClose",()=>l),a(e.exports,"testEpsilon",()=>u),a(e.exports,"expectPromiseToFail",()=>d),a(e.exports,"expectArraysEqual",()=>c),a(e.exports,"expectNumbersClose",()=>h),a(e.exports,"expectValuesInRange",()=>m),a(e.exports,"expectArrayBuffersEqual",()=>x),a(e.exports,"encodeStrings",()=>function e(t){for(let r=0;r<t.length;r++){let a=t[r];Array.isArray(a)?e(a):t[r]=(0,o.encodeString)(a)}return t}),a(e.exports,"createVideoElement",()=>y),a(e.exports,"play",()=>b);var r=g("38WwN"),n=g("5xBLk"),s=g("8cCb2"),o=g("jjNRA");let i=.1;function l(e,t,r){return null==r&&(r=u()),p(e,t,(e,t)=>f(e,t,r))}function u(){return 32===r.ENGINE.backend.floatPrecision()?.001:i}function p(e,t,r){let a=!0;if(((0,o.isTypedArray)(e)||(0,o.isTypedArray)(t))&&(a=!1),(0,o.isTypedArray)(e)&&(0,o.isTypedArray)(t)&&(a=!0),a){let r=e.constructor.name,a=t.constructor.name;if(r!==a)throw Error(`Arrays are of different type. Actual: ${r}. Expected: ${a}`)}if(Array.isArray(e)&&Array.isArray(t)){let r=(0,n.inferShape)(e),a=(0,n.inferShape)(t);if(!(0,s.arraysEqual)(r,a))throw Error(`Arrays have different shapes. Actual: [${r}]. Expected: [${a}]`)}let i=(0,o.isTypedArray)(e)?e:(0,o.flatten)(e),l=(0,o.isTypedArray)(t)?t:(0,o.flatten)(t);if(i.length!==l.length)throw Error(`Arrays have different lengths actual: ${i.length} vs expected: ${l.length}.
Actual:   ${i}.
Expected: ${l}.`);for(let e=0;e<l.length;++e){let t=i[e],a=l[e];if(!r(t,a))throw Error(`Arrays differ: actual[${e}] = ${t}, expected[${e}] = ${a}.
Actual:   ${i}.
Expected: ${l}.`)}"undefined"!=typeof expect&&expect().nothing()}function d(e,t){e().then(()=>t.fail(),()=>t()),"undefined"!=typeof expect&&expect().nothing()}function c(e,t){let r="string"==typeof t||"number"==typeof t||"boolean"==typeof t?[t]:t;return(0,s.isString)(e)||(0,s.isString)(e[0])||(0,s.isString)(t)||(0,s.isString)(t[0])?p(e,r,(e,t)=>e==t):p(e,t,(e,t)=>f(e,t,0))}function h(e,t,r){if(null==r&&(r=u()),!f(e,t,r))throw Error(`Numbers differ: actual === ${e}, expected === ${t}`);"undefined"!=typeof expect&&expect().nothing()}function f(e,t,r){return!(isFinite(e)||isFinite(t))||!(isNaN(e)||isNaN(t)||Math.abs(e-t)>r)}function m(e,t,r){for(let a=0;a<e.length;a++)if(e[a]<t||e[a]>r)throw Error(`Value out of range:${e[a]} low: ${t}, high: ${r}`)}function x(e,t){let r=new Float32Array(e),a=new Float32Array(t);if(r.length!==a.length)throw Error(`Expected ArrayBuffer to be of length ${a.length}, but it was ${r.length}`);for(let e=0;e<a.length;e++)if(r[e]!==a[e])throw Error(`Expected ArrayBuffer value at ${e} to be ${a[e]} but got ${r[e]} instead`)}function y(e){let t=document.createElement("video");return"playsInline"in t&&(t.playsInline=!0),t.muted=!0,t.loop=!0,t.style.position="fixed",t.style.left="0px",t.style.top="0px",t.preload="auto",t.appendChild(e),new Promise(e=>{t.addEventListener("loadeddata",r=>e(t)),t.load()})}async function b(e){await e.play(),"requestVideoFrameCallback"in e&&await new Promise(t=>{e.requestVideoFrameCallback(t)})}}),x("kWDmn",function(e,t){a(e.exports,"version",()=>r);let r="4.22.0"}),x("bO4Xu",function(e,t){a(e.exports,"OptimizerConstructors",()=>p);var r=g("Haryc"),n=g("7740A"),s=g("cdIoP"),o=g("9sl63"),i=g("7GJGN"),l=g("7qglv"),u=g("hR6PP");class p{static sgd(e){return new(0,u.SGDOptimizer)(e)}static momentum(e,t,r=!1){return new(0,i.MomentumOptimizer)(e,t,r)}static rmsprop(e,t=.9,r=0,a=null,n=!1){return new(0,l.RMSPropOptimizer)(e,t,r,a,n)}static adam(e=.001,t=.9,r=.999,a=null){return new(0,s.AdamOptimizer)(e,t,r,a)}static adadelta(e=.001,t=.95,a=null){return new(0,r.AdadeltaOptimizer)(e,t,a)}static adamax(e=.002,t=.9,r=.999,a=null,n=0){return new(0,o.AdamaxOptimizer)(e,t,r,a,n)}static adagrad(e,t=.1){return new(0,n.AdagradOptimizer)(e,t)}}}),x("aosGd",function(e,t){a(e.exports,"spectral",()=>es),a(e.exports,"signal",()=>eo),a(e.exports,"image",()=>ei),a(e.exports,"linalg",()=>el),a(e.exports,"losses",()=>eu),a(e.exports,"sparse",()=>ep),a(e.exports,"string",()=>ed),a(e.exports,"abs",()=>g("7j49I").abs),a(e.exports,"acos",()=>g("lhgWX").acos),a(e.exports,"acosh",()=>g("c0yr6").acosh),a(e.exports,"add",()=>g("hgacW").add),a(e.exports,"addN",()=>g("rRJGt").addN),a(e.exports,"all",()=>g("baxp3").all),a(e.exports,"any",()=>g("3cXYO").any),a(e.exports,"argMax",()=>g("jctS7").argMax),a(e.exports,"argMin",()=>g("hNrdr").argMin),a(e.exports,"asin",()=>g("8ZwsA").asin),a(e.exports,"asinh",()=>g("9a9km").asinh),a(e.exports,"atan",()=>g("PYQvk").atan),a(e.exports,"atan2",()=>g("8ikBQ").atan2),a(e.exports,"atanh",()=>g("5vfVv").atanh),a(e.exports,"avgPool",()=>g("j4oHC").avgPool),a(e.exports,"avgPool3d",()=>g("ku2lx").avgPool3d),a(e.exports,"basicLSTMCell",()=>g("eHiMt").basicLSTMCell),a(e.exports,"batchToSpaceND",()=>g("31sZ7").batchToSpaceND),a(e.exports,"batchNorm",()=>g("5ULLz").batchNorm),a(e.exports,"batchNorm2d",()=>g("kKS8R").batchNorm2d),a(e.exports,"batchNorm3d",()=>g("3KWPF").batchNorm3d),a(e.exports,"batchNorm4d",()=>g("34sL5").batchNorm4d),a(e.exports,"bincount",()=>g("f3UMy").bincount),a(e.exports,"bitwiseAnd",()=>g("dmptO").bitwiseAnd),a(e.exports,"broadcastArgs",()=>g("k4fG6").broadcastArgs),a(e.exports,"broadcastTo",()=>g("aeB3Z").broadcastTo),a(e.exports,"buffer",()=>g("iG87S").buffer),a(e.exports,"cast",()=>g("inFmq").cast),a(e.exports,"ceil",()=>g("jDrkY").ceil),a(e.exports,"clipByValue",()=>g("cOWuO").clipByValue),a(e.exports,"clone",()=>g("5TuCW").clone),a(e.exports,"complex",()=>g("20oDZ").complex),a(e.exports,"concat",()=>g("iTu6j").concat),a(e.exports,"concat1d",()=>g("4TU82").concat1d),a(e.exports,"concat2d",()=>g("7PZdE").concat2d),a(e.exports,"concat3d",()=>g("ljqPW").concat3d),a(e.exports,"concat4d",()=>g("9Grxx").concat4d),a(e.exports,"conv1d",()=>g("ebPOp").conv1d),a(e.exports,"conv2d",()=>g("5Nkm1").conv2d),a(e.exports,"conv2dTranspose",()=>g("5rn1J").conv2dTranspose),a(e.exports,"conv3d",()=>g("kj7tM").conv3d),a(e.exports,"conv3dTranspose",()=>g("7Zgyq").conv3dTranspose),a(e.exports,"cos",()=>g("3BU7G").cos),a(e.exports,"cosh",()=>g("bTdqT").cosh),a(e.exports,"cumprod",()=>g("bhhSS").cumprod),a(e.exports,"cumsum",()=>g("7lqwF").cumsum),a(e.exports,"denseBincount",()=>g("8maH5").denseBincount),a(e.exports,"depthToSpace",()=>g("lIVEL").depthToSpace),a(e.exports,"depthwiseConv2d",()=>g("182Rc").depthwiseConv2d),a(e.exports,"diag",()=>g("4VHSw").diag),a(e.exports,"dilation2d",()=>g("leKzP").dilation2d),a(e.exports,"div",()=>g("1QPqB").div),a(e.exports,"divNoNan",()=>g("3pBq5").divNoNan),a(e.exports,"dot",()=>g("67T3W").dot),a(e.exports,"einsum",()=>g("1mzpU").einsum),a(e.exports,"elu",()=>g("7UQTl").elu),a(e.exports,"ensureShape",()=>g("8jXAt").ensureShape),a(e.exports,"equal",()=>g("7R9HC").equal),a(e.exports,"erf",()=>g("3q8h0").erf),a(e.exports,"euclideanNorm",()=>g("4PmMp").euclideanNorm),a(e.exports,"exp",()=>g("2PcQK").exp),a(e.exports,"expandDims",()=>g("iPDWZ").expandDims),a(e.exports,"expm1",()=>g("cUuFo").expm1),a(e.exports,"eye",()=>g("9gIZb").eye),a(e.exports,"fill",()=>g("gYive").fill),a(e.exports,"floor",()=>g("4ZUCz").floor),a(e.exports,"floorDiv",()=>g("6a2Ft").floorDiv),a(e.exports,"gather",()=>g("3qUjU").gather),a(e.exports,"greater",()=>g("bRRKf").greater),a(e.exports,"greaterEqual",()=>g("l0Zxl").greaterEqual),a(e.exports,"imag",()=>g("1d8KH").imag),a(e.exports,"isFinite",()=>g("eaZNC").isFinite),a(e.exports,"isInf",()=>g("ahjR1").isInf),a(e.exports,"isNaN",()=>g("5FmUe").isNaN),a(e.exports,"leakyRelu",()=>g("3XskU").leakyRelu),a(e.exports,"less",()=>g("jTDVJ").less),a(e.exports,"lessEqual",()=>g("7LQ38").lessEqual),a(e.exports,"linspace",()=>g("9ntOC").linspace),a(e.exports,"localResponseNormalization",()=>g("k8D3u").localResponseNormalization),a(e.exports,"log",()=>g("dcoCo").log),a(e.exports,"log1p",()=>g("5QUXI").log1p),a(e.exports,"logSigmoid",()=>g("7hYeW").logSigmoid),a(e.exports,"logSoftmax",()=>g("2NPdY").logSoftmax),a(e.exports,"logSumExp",()=>g("9dGIC").logSumExp),a(e.exports,"logicalAnd",()=>g("kg1Wp").logicalAnd),a(e.exports,"logicalNot",()=>g("7NVSX").logicalNot),a(e.exports,"logicalOr",()=>g("iok2K").logicalOr),a(e.exports,"logicalXor",()=>g("iIobM").logicalXor),a(e.exports,"lowerBound",()=>g("jAFVi").lowerBound),a(e.exports,"matMul",()=>g("aUFou").matMul),a(e.exports,"max",()=>g("05cMR").max),a(e.exports,"maxPool",()=>g("gscJF").maxPool),a(e.exports,"maxPool3d",()=>g("gF4tm").maxPool3d),a(e.exports,"maxPoolWithArgmax",()=>g("9K0B1").maxPoolWithArgmax),a(e.exports,"maximum",()=>g("g5Jt1").maximum),a(e.exports,"mean",()=>g("67GCc").mean),a(e.exports,"meshgrid",()=>g("e6A1c").meshgrid),a(e.exports,"min",()=>g("fySTI").min),a(e.exports,"minimum",()=>g("6V8xR").minimum),a(e.exports,"mirrorPad",()=>g("ejlRR").mirrorPad),a(e.exports,"mod",()=>g("jR4my").mod),a(e.exports,"moments",()=>g("jV1KY").moments),a(e.exports,"mul",()=>g("jZc0w").mul),a(e.exports,"multiRNNCell",()=>g("culYm").multiRNNCell),a(e.exports,"multinomial",()=>g("b2OB7").multinomial),a(e.exports,"neg",()=>g("15cGp").neg),a(e.exports,"notEqual",()=>g("8WSnu").notEqual),a(e.exports,"oneHot",()=>g("i3U4j").oneHot),a(e.exports,"ones",()=>g("fOBRA").ones),a(e.exports,"onesLike",()=>g("67iid").onesLike),a(e.exports,"outerProduct",()=>g("8lsKt").outerProduct),a(e.exports,"pad",()=>g("fSZF6").pad),a(e.exports,"pad1d",()=>g("d3x5E").pad1d),a(e.exports,"pad2d",()=>g("lbRCf").pad2d),a(e.exports,"pad3d",()=>g("kZSbJ").pad3d),a(e.exports,"pad4d",()=>g("ghY1H").pad4d),a(e.exports,"pool",()=>g("9PaVS").pool),a(e.exports,"pow",()=>g("ad1of").pow),a(e.exports,"prelu",()=>g("a3pvF").prelu),a(e.exports,"print",()=>g("bSp5U").print),a(e.exports,"prod",()=>g("bWQC3").prod),a(e.exports,"raggedGather",()=>g("3MjiG").raggedGather),a(e.exports,"raggedRange",()=>g("6df7Q").raggedRange),a(e.exports,"raggedTensorToTensor",()=>g("hRiiN").raggedTensorToTensor),a(e.exports,"rand",()=>g("bTXL0").rand),a(e.exports,"randomGamma",()=>g("SB4J3").randomGamma),a(e.exports,"randomNormal",()=>g("h2Vnz").randomNormal),a(e.exports,"randomStandardNormal",()=>g("kVqJN").randomStandardNormal),a(e.exports,"randomUniform",()=>g("j8sic").randomUniform),a(e.exports,"randomUniformInt",()=>g("edlzT").randomUniformInt),a(e.exports,"range",()=>g("80Ety").range),a(e.exports,"real",()=>g("b7x1G").real),a(e.exports,"reciprocal",()=>g("3aqJ6").reciprocal),a(e.exports,"relu",()=>g("8wbQq").relu),a(e.exports,"relu6",()=>g("fvNYr").relu6),a(e.exports,"reshape",()=>g("4sqA7").reshape),a(e.exports,"reverse",()=>g("6act6").reverse),a(e.exports,"reverse1d",()=>g("2KcE1").reverse1d),a(e.exports,"reverse2d",()=>g("8EvRg").reverse2d),a(e.exports,"reverse3d",()=>g("c9r0k").reverse3d),a(e.exports,"reverse4d",()=>g("bFrHw").reverse4d),a(e.exports,"round",()=>g("9YKoa").round),a(e.exports,"rsqrt",()=>g("5pj7R").rsqrt),a(e.exports,"scalar",()=>g("3xp7o").scalar),a(e.exports,"selu",()=>g("b636r").selu),a(e.exports,"separableConv2d",()=>g("8uLn4").separableConv2d),a(e.exports,"setdiff1dAsync",()=>g("d05b8").setdiff1dAsync),a(e.exports,"sigmoid",()=>g("jvtSq").sigmoid),a(e.exports,"sign",()=>g("3zBCT").sign),a(e.exports,"sin",()=>g("4xqM7").sin),a(e.exports,"sinh",()=>g("fAOzm").sinh),a(e.exports,"slice",()=>g("79KOG").slice),a(e.exports,"slice1d",()=>g("5vfHb").slice1d),a(e.exports,"slice2d",()=>g("gKBEV").slice2d),a(e.exports,"slice3d",()=>g("22oMq").slice3d),a(e.exports,"slice4d",()=>g("8hEpb").slice4d),a(e.exports,"softmax",()=>g("dnEu5").softmax),a(e.exports,"softplus",()=>g("4Udpd").softplus),a(e.exports,"spaceToBatchND",()=>g("ePI8Y").spaceToBatchND),a(e.exports,"fft",()=>g("1Lg9u").fft),a(e.exports,"ifft",()=>g("3l9Cr").ifft),a(e.exports,"irfft",()=>g("hrsi6").irfft),a(e.exports,"rfft",()=>g("cafDa").rfft),a(e.exports,"split",()=>g("9fmAX").split),a(e.exports,"sqrt",()=>g("iAb3z").sqrt),a(e.exports,"square",()=>g("iDd8d").square),a(e.exports,"squaredDifference",()=>g("ay2Nw").squaredDifference),a(e.exports,"squeeze",()=>g("kX8Hd").squeeze),a(e.exports,"stack",()=>g("8BrLX").stack),a(e.exports,"step",()=>g("lWdx1").step),a(e.exports,"stridedSlice",()=>g("dqRnt").stridedSlice),a(e.exports,"sub",()=>g("7kouu").sub),a(e.exports,"sum",()=>g("9NgTx").sum),a(e.exports,"tan",()=>g("l8Hok").tan),a(e.exports,"tanh",()=>g("etcYL").tanh),a(e.exports,"tensor",()=>g("erbmM").tensor),a(e.exports,"tensor1d",()=>g("lalFM").tensor1d),a(e.exports,"tensor2d",()=>g("gmMlv").tensor2d),a(e.exports,"tensor3d",()=>g("6Fl9Q").tensor3d),a(e.exports,"tensor4d",()=>g("6BSQ6").tensor4d),a(e.exports,"tensor5d",()=>g("fjd6b").tensor5d),a(e.exports,"tensor6d",()=>g("gCuDf").tensor6d),a(e.exports,"tensorScatterUpdate",()=>g("4om7p").tensorScatterUpdate),a(e.exports,"tile",()=>g("61ay4").tile),a(e.exports,"topk",()=>g("cRAvI").topk),a(e.exports,"truncatedNormal",()=>g("dE1HO").truncatedNormal),a(e.exports,"unique",()=>g("aEpp6").unique),a(e.exports,"unsortedSegmentSum",()=>g("djGEF").unsortedSegmentSum),a(e.exports,"unstack",()=>g("gBOC6").unstack),a(e.exports,"upperBound",()=>g("igCyu").upperBound),a(e.exports,"variable",()=>g("eoViB").variable),a(e.exports,"where",()=>g("l2P14").where),a(e.exports,"whereAsync",()=>g("5t2or").whereAsync),a(e.exports,"zeros",()=>g("hxi4c").zeros),a(e.exports,"zerosLike",()=>g("8EjnK").zerosLike),a(e.exports,"op",()=>g("jqSCG").op),a(e.exports,"OP_SCOPE_SUFFIX",()=>g("jqSCG").OP_SCOPE_SUFFIX),a(e.exports,"fused",()=>g("jDZRN")),g("7j49I"),g("lhgWX"),g("c0yr6"),g("hgacW"),g("rRJGt"),g("baxp3"),g("3cXYO"),g("jctS7"),g("hNrdr"),g("8ZwsA"),g("9a9km"),g("PYQvk"),g("8ikBQ"),g("5vfVv"),g("j4oHC"),g("ku2lx"),g("eHiMt"),g("31sZ7"),g("5ULLz"),g("kKS8R"),g("3KWPF"),g("34sL5"),g("f3UMy"),g("dmptO"),g("k4fG6"),g("aeB3Z"),g("iG87S"),g("inFmq"),g("jDrkY"),g("cOWuO"),g("5TuCW"),g("20oDZ"),g("iTu6j"),g("4TU82"),g("7PZdE"),g("ljqPW"),g("9Grxx"),g("ebPOp"),g("5Nkm1"),g("5rn1J"),g("kj7tM"),g("7Zgyq"),g("3BU7G"),g("bTdqT"),g("bhhSS"),g("7lqwF"),g("8maH5"),g("lIVEL"),g("182Rc"),g("4VHSw"),g("leKzP"),g("1QPqB"),g("3pBq5"),g("67T3W"),g("1mzpU"),g("7UQTl"),g("8jXAt"),g("7R9HC"),g("3q8h0"),g("4PmMp"),g("2PcQK"),g("iPDWZ"),g("cUuFo"),g("9gIZb"),g("gYive"),g("4ZUCz"),g("6a2Ft"),g("3qUjU"),g("bRRKf"),g("l0Zxl"),g("1d8KH"),g("eaZNC"),g("ahjR1"),g("5FmUe"),g("3XskU"),g("jTDVJ"),g("7LQ38"),g("9ntOC"),g("k8D3u"),g("dcoCo"),g("5QUXI"),g("7hYeW"),g("2NPdY"),g("9dGIC"),g("kg1Wp"),g("7NVSX"),g("iok2K"),g("iIobM"),g("jAFVi"),g("aUFou"),g("05cMR"),g("gscJF"),g("gF4tm"),g("9K0B1"),g("g5Jt1"),g("67GCc"),g("e6A1c"),g("fySTI"),g("6V8xR"),g("ejlRR"),g("jR4my"),g("jV1KY"),g("jZc0w"),g("culYm"),g("b2OB7"),g("15cGp"),g("8WSnu"),g("i3U4j"),g("fOBRA"),g("67iid"),g("8lsKt"),g("fSZF6"),g("d3x5E"),g("lbRCf"),g("kZSbJ"),g("ghY1H"),g("9PaVS"),g("ad1of"),g("a3pvF"),g("bSp5U"),g("bWQC3"),g("3MjiG"),g("6df7Q"),g("hRiiN"),g("bTXL0"),g("SB4J3"),g("h2Vnz"),g("kVqJN"),g("j8sic"),g("edlzT"),g("80Ety"),g("b7x1G"),g("3aqJ6"),g("8wbQq"),g("fvNYr"),g("4sqA7"),g("6act6"),g("2KcE1"),g("8EvRg"),g("c9r0k"),g("bFrHw"),g("9YKoa"),g("5pj7R"),g("3xp7o"),g("b636r"),g("8uLn4"),g("d05b8"),g("jvtSq"),g("3zBCT"),g("4xqM7"),g("fAOzm"),g("79KOG"),g("5vfHb"),g("gKBEV"),g("22oMq"),g("8hEpb"),g("dnEu5"),g("4Udpd"),g("ePI8Y");var r=g("1Lg9u"),s=g("3l9Cr"),o=g("hrsi6"),i=g("cafDa");g("9fmAX"),g("iAb3z"),g("iDd8d"),g("ay2Nw"),g("kX8Hd"),g("8BrLX"),g("lWdx1"),g("dqRnt"),g("7kouu"),g("9NgTx"),g("l8Hok"),g("etcYL"),g("erbmM"),g("lalFM"),g("gmMlv"),g("6Fl9Q"),g("6BSQ6"),g("fjd6b"),g("gCuDf"),g("4om7p"),g("61ay4"),g("cRAvI"),g("dE1HO"),g("aEpp6"),g("djGEF"),g("gBOC6"),g("igCyu"),g("eoViB"),g("l2P14"),g("5t2or"),g("hxi4c"),g("8EjnK");var l=g("4xhB2"),u=g("aDHKy"),p=g("7k6dx"),d=g("gIiMY"),c=g("4wiJQ"),h=g("6PrVj"),f=g("kMXcY"),m=g("5FwF9"),x=g("5kLyC"),y=g("j5jow"),b=g("8mg8Q");g("jqSCG"),g("jDZRN");var v=g("dGKlF"),N=g("gicu0"),k=g("lLT0m"),T=g("hGoJt"),S=g("jLoMm"),I=g("jAPwM"),w=g("7xYxa"),C=g("iStMK"),E=g("gF4CQ"),A=g("3Dhm5"),$=g("ihqU7"),R=g("gxykK"),P=g("8357p"),B=g("gzUbZ"),F=g("bq0nG"),O=g("6zgXB"),M=g("ek5OW"),D=g("2uj2A"),_=g("53uSk"),L=g("kGYDg"),V=g("bI4CH"),G=g("ipM8K"),W=g("beFbS"),z=g("aQ3Nu"),j=g("315ft"),U=g("aqAKz"),q=g("2lNlw"),H=g("8Bzf4"),K=g("2Tkqe"),X=g("7tTB0"),Z=g("5FlUs"),Y=g("gXzaa"),Q=g("fMgdQ"),J=g("22SmX"),ee=g("6wGr9"),et=g("brFzl"),er=g("VUiwf"),ea=g("g7F6x"),en=g("bZL8f");let es={fft:r.fft,ifft:s.ifft,rfft:i.rfft,irfft:o.irfft},eo={hammingWindow:v.hammingWindow,hannWindow:N.hannWindow,frame:k.frame,stft:T.stft},ei={flipLeftRight:I.flipLeftRight,grayscaleToRGB:w.grayscaleToRGB,resizeNearestNeighbor:M.resizeNearestNeighbor,resizeBilinear:O.resizeBilinear,rgbToGrayscale:C.rgbToGrayscale,rotateWithOffset:E.rotateWithOffset,cropAndResize:S.cropAndResize,nonMaxSuppression:A.nonMaxSuppression,nonMaxSuppressionAsync:$.nonMaxSuppressionAsync,nonMaxSuppressionWithScore:R.nonMaxSuppressionWithScore,nonMaxSuppressionWithScoreAsync:P.nonMaxSuppressionWithScoreAsync,nonMaxSuppressionPadded:B.nonMaxSuppressionPadded,nonMaxSuppressionPaddedAsync:F.nonMaxSuppressionPaddedAsync,threshold:D.threshold,transform:_.transform},el={bandPart:L.bandPart,gramSchmidt:V.gramSchmidt,qr:G.qr},eu={absoluteDifference:W.absoluteDifference,computeWeightedLoss:z.computeWeightedLoss,cosineDistance:j.cosineDistance,hingeLoss:U.hingeLoss,huberLoss:q.huberLoss,logLoss:H.logLoss,meanSquaredError:K.meanSquaredError,sigmoidCrossEntropy:X.sigmoidCrossEntropy,softmaxCrossEntropy:Z.softmaxCrossEntropy},ep={sparseFillEmptyRows:Y.sparseFillEmptyRows,sparseReshape:Q.sparseReshape,sparseSegmentMean:J.sparseSegmentMean,sparseSegmentSum:ee.sparseSegmentSum},ed={stringNGrams:et.stringNGrams,stringSplit:er.stringSplit,stringToHashBucketFast:ea.stringToHashBucketFast,staticRegexReplace:en.staticRegexReplace};n(e.exports,l),n(e.exports,u),n(e.exports,p),n(e.exports,d),n(e.exports,c),n(e.exports,h),n(e.exports,f),n(e.exports,m),n(e.exports,x),n(e.exports,y),n(e.exports,b)}),x("lhgWX",function(e,t){a(e.exports,"acos",()=>o);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk");let o=(0,g("jqSCG").op)({acos_:function(e){let t=(0,s.convertToTensor)(e,"x","acos");return r.ENGINE.runKernel(n.Acos,{x:t})}})}),x("c0yr6",function(e,t){a(e.exports,"acosh",()=>o);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk");let o=(0,g("jqSCG").op)({acosh_:function(e){let t=(0,s.convertToTensor)(e,"x","acosh");return r.ENGINE.runKernel(n.Acosh,{x:t})}})}),x("rRJGt",function(e,t){a(e.exports,"addN",()=>i);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk"),o=g("8cCb2");let i=(0,g("jqSCG").op)({addN_:function(e){o.assert(Array.isArray(e),()=>"The argument passed to tf.addN() must be a list of tensors"),o.assert(e.length>=1,()=>`Must pass at least one tensor to tf.addN(), but got ${e.length}`);let t=e.map((e,t)=>(0,s.convertToTensor)(e,`tensors${t}`,"addN")),a=t[0];return t.forEach(e=>{if(e.dtype!==a.dtype)throw Error("All tensors passed to tf.addN() must have the same dtype")}),t.forEach(e=>{if(!o.arraysEqual(e.shape,a.shape))throw Error("All tensors passed to tf.addN() must have the same shape")}),r.ENGINE.runKernel(n.AddN,t)}})}),x("baxp3",function(e,t){a(e.exports,"all",()=>o);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk");let o=(0,g("jqSCG").op)({all_:function(e,t=null,a=!1){let o=(0,s.convertToTensor)(e,"x","all","bool");return r.ENGINE.runKernel(n.All,{x:o},{axis:t,keepDims:a})}})}),x("3cXYO",function(e,t){a(e.exports,"any",()=>o);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk");let o=(0,g("jqSCG").op)({any_:function(e,t=null,a=!1){let o=(0,s.convertToTensor)(e,"x","any","bool");return r.ENGINE.runKernel(n.Any,{x:o},{axis:t,keepDims:a})}})}),x("jctS7",function(e,t){a(e.exports,"argMax",()=>o);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk");let o=(0,g("jqSCG").op)({argMax_:function(e,t=0){let a=(0,s.convertToTensor)(e,"x","argMax");return r.ENGINE.runKernel(n.ArgMax,{x:a},{axis:t})}})}),x("hNrdr",function(e,t){a(e.exports,"argMin",()=>o);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk");let o=(0,g("jqSCG").op)({argMin_:function(e,t=0){let a=(0,s.convertToTensor)(e,"x","argMin");return r.ENGINE.runKernel(n.ArgMin,{x:a},{axis:t})}})}),x("8ZwsA",function(e,t){a(e.exports,"asin",()=>o);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk");let o=(0,g("jqSCG").op)({asin_:function(e){let t=(0,s.convertToTensor)(e,"x","asin");return r.ENGINE.runKernel(n.Asin,{x:t})}})}),x("9a9km",function(e,t){a(e.exports,"asinh",()=>o);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk");let o=(0,g("jqSCG").op)({asinh_:function(e){let t=(0,s.convertToTensor)(e,"x","asinh");return r.ENGINE.runKernel(n.Asinh,{x:t})}})}),x("PYQvk",function(e,t){a(e.exports,"atan",()=>o);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk");let o=(0,g("jqSCG").op)({atan_:function(e){let t=(0,s.convertToTensor)(e,"x","atan");return r.ENGINE.runKernel(n.Atan,{x:t})}})}),x("8ikBQ",function(e,t){a(e.exports,"atan2",()=>i);var r=g("38WwN"),n=g("hl418"),s=g("3w4Rg"),o=g("5xBLk");let i=(0,g("jqSCG").op)({atan2_:function(e,t){let a=(0,o.convertToTensor)(e,"a","atan2"),i=(0,o.convertToTensor)(t,"b","atan2");[a,i]=(0,s.makeTypesMatch)(a,i);let l={a:a,b:i};return r.ENGINE.runKernel(n.Atan2,l)}})}),x("5vfVv",function(e,t){a(e.exports,"atanh",()=>o);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk");let o=(0,g("jqSCG").op)({atanh_:function(e){let t=(0,s.convertToTensor)(e,"x","atanh");return r.ENGINE.runKernel(n.Atanh,{x:t})}})}),x("j4oHC",function(e,t){a(e.exports,"avgPool",()=>d);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk"),o=g("8cCb2"),i=g("inFmq"),l=g("frznq"),u=g("jqSCG"),p=g("4sqA7");let d=(0,u.op)({avgPool_:function(e,t,a,u,d){let c=(0,s.convertToTensor)(e,"x","avgPool","float32");o.assert(l.eitherStridesOrDilationsAreOne(a,1),()=>`Error in avgPool: Either strides or dilations must be 1. Got strides ${a} and dilations '1'`);let h=c,f=!1;3===c.rank&&(f=!0,h=(0,p.reshape)(c,[1,c.shape[0],c.shape[1],c.shape[2]])),o.assert(4===h.rank,()=>`Error in avgPool: x must be rank 4 but got rank ${h.rank}.`),l.checkPadOnDimRoundingMode("avgPool",u,d);let m={x:h},g=r.ENGINE.runKernel(n.AvgPool,m,{filterSize:t,strides:a,pad:u,dimRoundingMode:d});return(g=(0,i.cast)(g,c.dtype),f)?(0,p.reshape)(g,[g.shape[1],g.shape[2],g.shape[3]]):g}})}),x("frznq",function(e,t){a(e.exports,"computeDilation2DInfo",()=>n),a(e.exports,"convertConv2DDataFormat",()=>y),a(e.exports,"computeConv2DInfo",()=>i),a(e.exports,"computePool2DInfo",()=>s),a(e.exports,"computePool3DInfo",()=>o),a(e.exports,"computeConv3DInfo",()=>l),a(e.exports,"computeDefaultPad",()=>u),a(e.exports,"tupleValuesAreOne",()=>f),a(e.exports,"eitherStridesOrDilationsAreOne",()=>m),a(e.exports,"stridesOrDilationsArePositive",()=>x),a(e.exports,"checkPadOnDimRoundingMode",()=>b);var r=g("8cCb2");function n(e,t,r,a,s="NHWC",o){let l=[...t,e[3]];return i(e,l,r,o,a,null,null,y(s))}function s(e,t,r,a,n,o,l="channelsLast"){let u,[d,c]=p(t);if("channelsLast"===l)u=[d,c,e[3],e[3]];else if("channelsFirst"===l)u=[d,c,e[1],e[1]];else throw Error(`Unknown dataFormat ${l}`);return i(e,u,r,a,n,o,!1,l)}function o(e,t,r,a,n,s,i="NDHWC"){let u,p,[c,h,f]=d(t);if("NDHWC"===i)p="channelsLast",u=[c,h,f,e[4],e[4]];else if("NCDHW"===i)p="channelsFirst",u=[c,h,f,e[1],e[1]];else throw Error(`Unknown dataFormat ${i}`);return l(e,u,r,a,n,!1,p,s)}function i(e,t,r,a,n,s,o=!1,l="channelsLast"){let d,[f,m,g,x]=[-1,-1,-1,-1];if("channelsLast"===l)[f,m,g,x]=e;else if("channelsFirst"===l)[f,x,m,g]=e;else throw Error(`Unknown dataFormat ${l}`);let[y,b,,v]=t,[N,k]=p(r),[T,S]=p(a),I=c(y,T),w=c(b,S),{padInfo:C,outHeight:E,outWidth:A}=function(e,t,r,a,n,s,o,i,l){let p,d,c;if("number"==typeof e){let n=0===e?"VALID":"NUMBER";p={top:e,bottom:e,left:e,right:e,type:n};let o=function(e,t,r,a,n){null==a&&(a=u(e,t,r));let s=e[0],o=e[1];return[h((s-t+2*a)/r+1,n),h((o-t+2*a)/r+1,n)]}([t,r],s,a,e,i);d=o[0],c=o[1]}else if("same"===e){let e=Math.max(0,((d=Math.ceil(t/a))-1)*a+s-t),i=Math.max(0,((c=Math.ceil(r/n))-1)*n+o-r),l=Math.floor(e/2),u=Math.floor(i/2);p={top:l,bottom:e-l,left:u,right:i-u,type:"SAME"}}else if("valid"===e)p={top:0,bottom:0,left:0,right:0,type:"VALID"},d=Math.ceil((t-s+1)/a),c=Math.ceil((r-o+1)/n);else if("object"==typeof e){let u="channelsLast"===l?e[1][0]:e[2][0],f="channelsLast"===l?e[1][1]:e[2][1],m="channelsLast"===l?e[2][0]:e[3][0],g="channelsLast"===l?e[2][1]:e[3][1];p={top:u,bottom:f,left:m,right:g,type:0===u&&0===f&&0===m&&0===g?"VALID":"EXPLICIT"},d=h((t-s+u+f)/a+1,i),c=h((r-o+m+g)/n+1,i)}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:p,outHeight:d,outWidth:c}}(n,m,g,N,k,I,w,s,l),$=o?v*x:v;return"channelsFirst"===l?d=[f,$,E,A]:"channelsLast"===l&&(d=[f,E,A,$]),{batchSize:f,dataFormat:l,inHeight:m,inWidth:g,inChannels:x,outHeight:E,outWidth:A,outChannels:$,padInfo:C,strideHeight:N,strideWidth:k,filterHeight:y,filterWidth:b,effectiveFilterHeight:I,effectiveFilterWidth:w,dilationHeight:T,dilationWidth:S,inShape:e,outShape:d,filterShape:t}}function l(e,t,r,a,n,s=!1,o="channelsLast",i){let p,[f,m,g,x,y]=[-1,-1,-1,-1,-1];if("channelsLast"===o)[f,m,g,x,y]=e;else if("channelsFirst"===o)[f,y,m,g,x]=e;else throw Error(`Unknown dataFormat ${o}`);let[b,v,N,,k]=t,[T,S,I]=d(r),[w,C,E]=d(a),A=c(b,w),$=c(v,C),R=c(N,E),{padInfo:P,outDepth:B,outHeight:F,outWidth:O}=function(e,t,r,a,n,s,o,i,l,p,d){let c,f,m,g;if("valid"===e&&(e=0),"number"==typeof e){let x=0===e?"VALID":"NUMBER";c={top:e,bottom:e,left:e,right:e,front:e,back:e,type:x};let y=function(e,t,r,a,n,s){null==n&&(n=u(e,t[0],a[0]));let o=[0,0,0,1];for(let r=0;r<3;r++)e[r]+2*n>=t[r]&&(o[r]=h((e[r]-t[r]+2*n)/a[r]+1,s));return o}([t,r,a,1],[i,l,p],0,[n,s,o],e,d);f=y[0],m=y[1],g=y[2]}else if("same"===e){let e=((f=Math.ceil(t/n))-1)*n+i-t,u=((m=Math.ceil(r/s))-1)*s+l-r,d=((g=Math.ceil(a/o))-1)*o+p-a,h=Math.floor(e/2),x=Math.floor(u/2),y=Math.floor(d/2);c={top:x,bottom:u-x,left:y,right:d-y,front:h,back:e-h,type:"SAME"}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:c,outDepth:f,outHeight:m,outWidth:g}}(n,m,g,x,T,S,I,A,$,R,i),M=s?k*y:k;return"channelsFirst"===o?p=[f,M,B,F,O]:"channelsLast"===o&&(p=[f,B,F,O,M]),{batchSize:f,dataFormat:o,inDepth:m,inHeight:g,inWidth:x,inChannels:y,outDepth:B,outHeight:F,outWidth:O,outChannels:M,padInfo:P,strideDepth:T,strideHeight:S,strideWidth:I,filterDepth:b,filterHeight:v,filterWidth:N,effectiveFilterDepth:A,effectiveFilterHeight:$,effectiveFilterWidth:R,dilationDepth:w,dilationHeight:C,dilationWidth:E,inShape:e,outShape:p,filterShape:t}}function u(e,t,r,a=1){let n=c(t,a);return Math.floor((e[0]*(r-1)-r+n)/2)}function p(e){return"number"==typeof e?[e,e,e]:2===e.length?[e[0],e[1],1]:e}function d(e){return"number"==typeof e?[e,e,e]:e}function c(e,t){return t<=1?e:e+(e-1)*(t-1)}function h(e,t){if(!t)return Math.trunc(e);switch(t){case"round":return Math.round(e);case"ceil":return Math.ceil(e);case"floor":return Math.floor(e);default:throw Error(`Unknown roundingMode ${t}`)}}function f(e){let[t,r,a]=p(e);return 1===t&&1===r&&1===a}function m(e,t){return f(e)||f(t)}function x(e){return p(e).every(e=>e>0)}function y(e){if("NHWC"===e)return"channelsLast";if("NCHW"===e)return"channelsFirst";throw Error(`Unknown dataFormat ${e}`)}function b(e,t,a){if(null!=a)if("string"==typeof t)throw Error(`Error in ${e}: pad must be an integer when using dimRoundingMode ${a} but got pad ${t}.`);else if("number"==typeof t)r.assert(r.isInt(t),()=>`Error in ${e}: pad must be an integer when using dimRoundingMode ${a} but got pad ${t}.`);else if("object"==typeof t)t.forEach(t=>{t.forEach(t=>{r.assert(r.isInt(t),()=>`Error in ${e}: pad must be an integer when using dimRoundingMode ${a} but got pad ${t}.`)})});else throw Error(`Error in ${e}: Unknown padding parameter: ${t}`)}}),x("4sqA7",function(e,t){a(e.exports,"reshape",()=>o);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk");let o=(0,g("jqSCG").op)({reshape_:function(e,t){let a=(0,s.convertToTensor)(e,"x","reshape","string_or_numeric");return r.ENGINE.runKernel(n.Reshape,{x:a},{shape:t})}})}),x("ku2lx",function(e,t){a(e.exports,"avgPool3d",()=>d);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk"),o=g("8cCb2"),i=g("inFmq"),l=g("frznq"),u=g("jqSCG"),p=g("4sqA7");let d=(0,u.op)({avgPool3d_:function(e,t,a,u,d,c="NDHWC"){let h=(0,s.convertToTensor)(e,"x","avgPool3d","float32"),f=h,m=!1;4===h.rank&&(m=!0,f=(0,p.reshape)(h,[1,h.shape[0],h.shape[1],h.shape[2],h.shape[3]])),o.assert(5===f.rank,()=>`Error in avgPool3d: x must be rank 5 but got rank ${f.rank}.`),o.assert("NDHWC"===c,()=>`Error in avgPool3d: Only NDHWC is currently supported, but got dataFormat of ${c}`),o.assert("number"==typeof a&&a>0||Array.isArray(a)&&a[0]>0&&a[1]>0&&a[2]>0,()=>`Error in avgPool3d: Stride must be > 0, but got '${a}'`),(0,l.checkPadOnDimRoundingMode)("avgPool3d",u,d);let g={x:f},x=r.ENGINE.runKernel(n.AvgPool3D,g,{filterSize:t,strides:a,pad:u,dimRoundingMode:d,dataFormat:c});return(x=(0,i.cast)(x,f.dtype),m)?(0,p.reshape)(x,[x.shape[1],x.shape[2],x.shape[3],x.shape[4]]):x}})}),x("eHiMt",function(e,t){a(e.exports,"basicLSTMCell",()=>c);var r=g("5xBLk"),n=g("hgacW"),s=g("iTu6j"),o=g("aUFou"),i=g("jZc0w"),l=g("jqSCG"),u=g("jvtSq"),p=g("79KOG"),d=g("etcYL");let c=(0,l.op)({basicLSTMCell_:function(e,t,a,l,c,h){let f=(0,r.convertToTensor)(e,"forgetBias","basicLSTMCell"),m=(0,r.convertToTensor)(t,"lstmKernel","basicLSTMCell"),g=(0,r.convertToTensor)(a,"lstmBias","basicLSTMCell"),x=(0,r.convertToTensor)(l,"data","basicLSTMCell"),y=(0,r.convertToTensor)(c,"c","basicLSTMCell"),b=(0,r.convertToTensor)(h,"h","basicLSTMCell"),v=(0,s.concat)([x,b],1),N=(0,o.matMul)(v,m),k=(0,n.add)(N,g),T=k.shape[0],S=k.shape[1]/4,I=[T,S],w=(0,p.slice)(k,[0,0],I),C=(0,p.slice)(k,[0,S],I),E=(0,p.slice)(k,[0,2*S],I),A=(0,p.slice)(k,[0,3*S],I),$=(0,n.add)((0,i.mul)((0,u.sigmoid)(w),(0,d.tanh)(C)),(0,i.mul)(y,(0,u.sigmoid)((0,n.add)(f,E)))),R=(0,i.mul)((0,d.tanh)($),(0,u.sigmoid)(A));return[$,R]}})}),x("iTu6j",function(e,t){a(e.exports,"concat",()=>l);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk"),o=g("8cCb2"),i=g("5TuCW");let l=(0,g("jqSCG").op)({concat_:function(e,t=0){(0,o.assert)(e.length>=1,()=>"Pass at least one tensor to concat");let a=(0,s.convertToTensorArray)(e,"tensors","concat","string_or_numeric");return("complex64"===a[0].dtype&&a.forEach(e=>{if("complex64"!==e.dtype)throw Error(`Cannot concatenate complex64 tensors with a tensor
          with dtype ${e.dtype}. `)}),1===a.length)?(0,i.clone)(a[0]):r.ENGINE.runKernel(n.Concat,a,{axis:t})}})}),x("jvtSq",function(e,t){a(e.exports,"sigmoid",()=>o);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk");let o=(0,g("jqSCG").op)({sigmoid_:function(e){let t=(0,s.convertToTensor)(e,"x","sigmoid","float32");return r.ENGINE.runKernel(n.Sigmoid,{x:t})}})}),x("79KOG",function(e,t){a(e.exports,"slice",()=>o);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk");let o=(0,g("jqSCG").op)({slice_:function(e,t,a){let o=(0,s.convertToTensor)(e,"x","slice","string_or_numeric");if(0===o.rank)throw Error("Slicing scalar is not possible");return r.ENGINE.runKernel(n.Slice,{x:o},{begin:t,size:a})}})}),x("etcYL",function(e,t){a(e.exports,"tanh",()=>o);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk");let o=(0,g("jqSCG").op)({tanh_:function(e){let t=(0,s.convertToTensor)(e,"x","tanh","float32");return r.ENGINE.runKernel(n.Tanh,{x:t})}})}),x("31sZ7",function(e,t){a(e.exports,"batchToSpaceND",()=>i);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk"),o=g("8cCb2");let i=(0,g("jqSCG").op)({batchToSpaceND_:function(e,t,a){let i=(0,s.convertToTensor)(e,"x","batchToSpaceND"),l=t.reduce((e,t)=>e*t);return o.assert(i.rank>=1+t.length,()=>`input rank is ${i.rank} but should be > than blockShape.length ${t.length}`),o.assert(a.length===t.length,()=>`crops.length is ${a.length} but should be equal to blockShape.length  ${t.length}`),o.assert(i.shape[0]%l==0,()=>`input tensor batch is ${i.shape[0]} but is not divisible by the product of the elements of blockShape ${t.join(" * ")} === ${l}`),r.ENGINE.runKernel(n.BatchToSpaceND,{x:i},{blockShape:t,crops:a})}})}),x("5ULLz",function(e,t){a(e.exports,"batchNorm",()=>p);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk"),o=g("8cCb2"),i=g("1EYew"),l=g("jqSCG"),u=g("4sqA7");let p=(0,l.op)({batchNorm_:function(e,t,a,l,p,d){let c,h;null==d&&(d=.001);let f=(0,s.convertToTensor)(e,"x","batchNorm"),m=(0,s.convertToTensor)(t,"mean","batchNorm"),g=(0,s.convertToTensor)(a,"variance","batchNorm");null!=p&&(c=(0,s.convertToTensor)(p,"scale","batchNorm")),null!=l&&(h=(0,s.convertToTensor)(l,"offset","batchNorm")),o.assert(m.rank===g.rank,()=>"Batch normalization gradient requires mean and variance to have equal ranks."),o.assert(null==h||m.rank===h.rank,()=>"Batch normalization gradient requires mean and offset to have equal ranks."),o.assert(null==c||m.rank===c.rank,()=>"Batch normalization gradient requires mean and scale to have equal ranks.");let x={x:(0,i.xAs4D)(f),scale:c,offset:h,mean:m,variance:g},y={varianceEpsilon:d},b=r.ENGINE.runKernel(n.FusedBatchNorm,x,y);return(0,u.reshape)(b,f.shape)}})}),x("1EYew",function(e,t){a(e.exports,"xAs4D",()=>n);var r=g("4sqA7");function n(e){let t;return 0===e.rank||1===e.rank?(0,r.reshape)(e,[1,1,1,e.size]):2===e.rank?(0,r.reshape)(e,[1,1,e.shape[0],e.shape[1]]):3===e.rank?(0,r.reshape)(e,[1,e.shape[0],e.shape[1],e.shape[2]]):e}}),x("kKS8R",function(e,t){a(e.exports,"batchNorm2d",()=>o);var r=g("5xBLk"),n=g("8cCb2"),s=g("5ULLz");let o=(0,g("jqSCG").op)({batchNorm2d_:function(e,t,a,o,i,l){let u,p,d=(0,r.convertToTensor)(e,"x","batchNorm"),c=(0,r.convertToTensor)(t,"mean","batchNorm"),h=(0,r.convertToTensor)(a,"variance","batchNorm");return null!=i&&(u=(0,r.convertToTensor)(i,"scale","batchNorm")),null!=o&&(p=(0,r.convertToTensor)(o,"offset","batchNorm")),n.assert(2===d.rank,()=>`Error in batchNorm2D: x must be rank 2 but got rank ${d.rank}.`),n.assert(2===c.rank||1===c.rank,()=>`Error in batchNorm2D: mean must be rank 2 or rank 1 but got rank ${c.rank}.`),n.assert(2===h.rank||1===h.rank,()=>`Error in batchNorm2D: variance must be rank 2 or rank 1 but got rank ${h.rank}.`),null!=u&&n.assert(2===u.rank||1===u.rank,()=>`Error in batchNorm2D: scale must be rank 2 or rank 1 but got rank ${u.rank}.`),null!=p&&n.assert(2===p.rank||1===p.rank,()=>`Error in batchNorm2D: offset must be rank 2 or rank 1 but got rank ${p.rank}.`),(0,s.batchNorm)(d,c,h,p,u,l)}})}),x("3KWPF",function(e,t){a(e.exports,"batchNorm3d",()=>o);var r=g("5xBLk"),n=g("8cCb2"),s=g("5ULLz");let o=(0,g("jqSCG").op)({batchNorm3d_:function(e,t,a,o,i,l){let u,p,d=(0,r.convertToTensor)(e,"x","batchNorm"),c=(0,r.convertToTensor)(t,"mean","batchNorm"),h=(0,r.convertToTensor)(a,"variance","batchNorm");return null!=i&&(u=(0,r.convertToTensor)(i,"scale","batchNorm")),null!=o&&(p=(0,r.convertToTensor)(o,"offset","batchNorm")),n.assert(3===d.rank,()=>`Error in batchNorm3D: x must be rank 3 but got rank ${d.rank}.`),n.assert(3===c.rank||1===c.rank,()=>`Error in batchNorm3D: mean must be rank 3 or rank 1 but got rank ${c.rank}.`),n.assert(3===h.rank||1===h.rank,()=>`Error in batchNorm3D: variance must be rank 3 or rank 1 but got rank ${h.rank}.`),null!=u&&n.assert(3===u.rank||1===u.rank,()=>`Error in batchNorm3D: scale must be rank 3 or rank 1 but got rank ${u.rank}.`),null!=p&&n.assert(3===p.rank||1===p.rank,()=>`Error in batchNorm3D: offset must be rank 3 or rank 1 but got rank ${p.rank}.`),(0,s.batchNorm)(d,c,h,p,u,l)}})}),x("34sL5",function(e,t){a(e.exports,"batchNorm4d",()=>o);var r=g("5xBLk"),n=g("8cCb2"),s=g("5ULLz");let o=(0,g("jqSCG").op)({batchNorm4d_:function(e,t,a,o,i,l){let u,p,d=(0,r.convertToTensor)(e,"x","batchNorm"),c=(0,r.convertToTensor)(t,"mean","batchNorm"),h=(0,r.convertToTensor)(a,"variance","batchNorm");return null!=i&&(u=(0,r.convertToTensor)(i,"scale","batchNorm")),null!=o&&(p=(0,r.convertToTensor)(o,"offset","batchNorm")),n.assert(4===d.rank,()=>`Error in batchNorm4D: x must be rank 4 but got rank ${d.rank}.`),n.assert(4===c.rank||1===c.rank,()=>`Error in batchNorm4D: mean must be rank 4 or rank 1 but got rank ${c.rank}.`),n.assert(4===h.rank||1===h.rank,()=>`Error in batchNorm4D: variance must be rank 4 or rank 1 but got rank ${h.rank}.`),null!=u&&n.assert(4===u.rank||1===u.rank,()=>`Error in batchNorm4D: scale must be rank 4 or rank 1 but got rank ${u.rank}.`),null!=p&&n.assert(4===p.rank||1===p.rank,()=>`Error in batchNorm4D: offset must be rank 4 or rank 1 but got rank ${p.rank}.`),(0,s.batchNorm)(d,c,h,p,u,l)}})}),x("f3UMy",function(e,t){a(e.exports,"bincount",()=>i);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk"),o=g("8cCb2");let i=(0,g("jqSCG").op)({bincount_:function(e,t,a){let i=(0,s.convertToTensor)(e,"x","bincount"),l=(0,s.convertToTensor)(t,"weights","bincount");return o.assert("int32"===i.dtype,()=>`Error in bincount: input dtype must be int32, but got ${i.dtype}`),o.assert(a>=0,()=>`size must be non-negative, but got ${a}.`),o.assert(l.size===i.size||0===l.size,()=>`Error in bincount: weights must have the same size as input or0-length, but got input shape: ${i.shape}, weights shape: ${l.shape}.`),r.ENGINE.runKernel(n.Bincount,{x:i,weights:l},{size:a})}})}),x("dmptO",function(e,t){a(e.exports,"bitwiseAnd",()=>i);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk"),o=g("8cCb2");let i=(0,g("jqSCG").op)({bitwiseAnd_:function(e,t){let a=(0,s.convertToTensor)(e,"x","bitwiseAnd"),i=(0,s.convertToTensor)(t,"y","bitwiseAnd");if(!(0,o.arraysEqual)(a.shape,i.shape))throw Error(`BitwiseAnd: Tensors must have the same shape. x: ${a.shape}, y: ${i.shape}`);if("int32"!==a.dtype||"int32"!==i.dtype)throw Error(`BitwiseAnd: Only supports 'int32' values in tensor, found type of x: ${a.dtype} and type of y: ${i.dtype}`);return r.ENGINE.runKernel(n.BitwiseAnd,{a:a,b:i})}})}),x("k4fG6",function(e,t){a(e.exports,"broadcastArgs",()=>o);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk");let o=(0,g("jqSCG").op)({broadcastArgs_:function(e,t){let a=(0,s.convertToTensor)(e,"s0","broadcastArgs","int32"),o=(0,s.convertToTensor)(t,"s1","broadcastArgs","int32");if(1!==a.rank)throw Error(`broadcastArgs(): first input must be a vector (rank=1). Has rank ${a.rank}`);if(1!==o.rank)throw Error(`broadcastArgs(): second input must be a vector (rank=1). Has rank ${o.rank}`);return r.ENGINE.runKernel(n.BroadcastArgs,{s0:a,s1:o})}})}),x("aeB3Z",function(e,t){a(e.exports,"broadcastTo",()=>p);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk"),o=g("8cCb2"),i=g("5TuCW"),l=g("jqSCG"),u=g("4sqA7");let p=(0,l.op)({broadcastTo_:function(e,t){let a=(0,s.convertToTensor)(e,"broadcastTo","x"),l=a.shape;if((0,o.assertNonNegativeIntegerDimensions)(t),t.length<a.rank)throw Error(`broadcastTo(): shape.length=${t.length} < input.rank=${a.rank}.`);if(t.length>a.rank){let e=a.shape.slice();for(;e.length<t.length;)e.unshift(1);a=(0,u.reshape)(a,e)}let p=a.shape,d=Array.from(t);for(let e=t.length-1;e>=0;e--)if(p[e]===t[e])d[e]=1;else if(1!==a.shape[e])throw Error(`broadcastTo(): [${l}] cannot be broadcast to [${t}].`);if(0===d.map((e,t)=>e>1?t:-1).filter(e=>e>=0).length)return(0,i.clone)(a);let c={x:a};return r.ENGINE.runKernel(n.Tile,c,{reps:d})}})}),x("jDrkY",function(e,t){a(e.exports,"ceil",()=>o);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk");let o=(0,g("jqSCG").op)({ceil_:function(e){let t=(0,s.convertToTensor)(e,"x","ceil","float32");return r.ENGINE.runKernel(n.Ceil,{x:t})}})}),x("cOWuO",function(e,t){a(e.exports,"clipByValue",()=>l);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk"),o=g("8cCb2"),i=g("gYive");let l=(0,g("jqSCG").op)({clipByValue_:function(e,t,a){let l=(0,s.convertToTensor)(e,"x","clipByValue");return(o.assert(t<=a,()=>`Error in clip: min (${t}) must be less than or equal to max (${a}).`),t===a)?(0,i.fill)(l.shape,t,l.dtype):r.ENGINE.runKernel(n.ClipByValue,{x:l},{clipValueMin:t,clipValueMax:a})}})}),x("4TU82",function(e,t){a(e.exports,"concat1d",()=>n);var r=g("iTu6j");let n=(0,g("jqSCG").op)({concat1d_:function(e){return(0,r.concat)(e,0)}})}),x("7PZdE",function(e,t){a(e.exports,"concat2d",()=>n);var r=g("iTu6j");let n=(0,g("jqSCG").op)({concat2d_:function(e,t){return(0,r.concat)(e,t)}})}),x("ljqPW",function(e,t){a(e.exports,"concat3d",()=>n);var r=g("iTu6j");let n=(0,g("jqSCG").op)({concat3d_:function(e,t){return(0,r.concat)(e,t)}})}),x("9Grxx",function(e,t){a(e.exports,"concat4d",()=>n);var r=g("iTu6j");let n=(0,g("jqSCG").op)({concat4d_:function(e,t){return(0,r.concat)(e,t)}})}),x("ebPOp",function(e,t){a(e.exports,"conv1d",()=>u);var r=g("5xBLk"),n=g("8cCb2"),s=g("5Nkm1"),o=g("frznq"),i=g("jqSCG"),l=g("4sqA7");let u=(0,i.op)({conv1d_:function(e,t,a,i,u="NWC",p=1,d){let c=(0,r.convertToTensor)(e,"x","conv1d"),h=(0,r.convertToTensor)(t,"filter","conv1d"),f=c,m=!1;2===c.rank&&(m=!0,f=(0,l.reshape)(c,[1,c.shape[0],c.shape[1]])),n.assert(3===f.rank,()=>`Error in conv1d: input must be rank 3, but got rank ${f.rank}.`),n.assert(3===h.rank,()=>`Error in conv1d: filter must be rank 3, but got rank ${h.rank}.`),o.checkPadOnDimRoundingMode("conv1d",i,d),n.assert(f.shape[2]===h.shape[1],()=>`Error in conv1d: depth of input (${f.shape[2]}) must match input depth for filter ${h.shape[1]}.`),n.assert(o.eitherStridesOrDilationsAreOne(a,p),()=>`Error in conv1D: Either stride or dilation must be 1. Got stride ${a} and dilation '${p}'`),n.assert(o.stridesOrDilationsArePositive(p),()=>"Error in conv1D: Dilated rates should be larger than 0."),n.assert(o.stridesOrDilationsArePositive(a),()=>"Error in conv1D: Stride should be larger than 0."),n.assert("NWC"===u,()=>`Error in conv1d: got dataFormat of ${u} but only NWC is currently supported.`);let g=(0,l.reshape)(h,[1,h.shape[0],h.shape[1],h.shape[2]]),x=(0,l.reshape)(f,[f.shape[0],1,f.shape[1],f.shape[2]]),y=(0,s.conv2d)(x,g,[1,a],i,"NHWC",[1,p],d);return m?(0,l.reshape)(y,[y.shape[2],y.shape[3]]):(0,l.reshape)(y,[y.shape[0],y.shape[2],y.shape[3]])}})}),x("5Nkm1",function(e,t){a(e.exports,"conv2d",()=>p);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk"),o=g("8cCb2"),i=g("frznq"),l=g("jqSCG"),u=g("4sqA7");let p=(0,l.op)({conv2d_:function(e,t,a,l,p="NHWC",d=[1,1],c){let h=(0,s.convertToTensor)(e,"x","conv2d","float32"),f=(0,s.convertToTensor)(t,"filter","conv2d","float32"),m=h,g=!1;3===h.rank&&(g=!0,m=(0,u.reshape)(h,[1,h.shape[0],h.shape[1],h.shape[2]])),o.assert(4===m.rank,()=>`Error in conv2d: input must be rank 4, but got rank ${m.rank}.`),o.assert(4===f.rank,()=>`Error in conv2d: filter must be rank 4, but got rank ${f.rank}.`),i.checkPadOnDimRoundingMode("conv2d",l,c);let x="NHWC"===p?m.shape[3]:m.shape[1];o.assert(x===f.shape[2],()=>`Error in conv2d: depth of input (${x}) must match input depth for filter ${f.shape[2]}.`),o.assert(i.eitherStridesOrDilationsAreOne(a,d),()=>`Error in conv2D: Either strides or dilations must be 1. Got strides ${a} and dilations '${d}'`),o.assert(i.stridesOrDilationsArePositive(d),()=>"Error in conv2D: Dilated rates should be larger than 0."),o.assert(i.stridesOrDilationsArePositive(a),()=>"Error in conv2D: Strides should be larger than 0.");let y={x:m,filter:f},b=r.ENGINE.runKernel(n.Conv2D,y,{strides:a,pad:l,dataFormat:p,dilations:d,dimRoundingMode:c});return g?(0,u.reshape)(b,[b.shape[1],b.shape[2],b.shape[3]]):b}})}),x("5rn1J",function(e,t){a(e.exports,"conv2dTranspose",()=>s);var r=g("5xBLk"),n=g("6eptr");let s=(0,g("jqSCG").op)({conv2dTranspose_:function(e,t,a,s,o,i){let l=(0,r.convertToTensor)(e,"x","conv2dTranspose"),u=(0,r.convertToTensor)(t,"filter","conv2dTranspose");return(0,n.conv2DBackpropInput)(a,l,u,s,o,"NHWC",i)}})}),x("6eptr",function(e,t){a(e.exports,"conv2DBackpropInput",()=>u);var r=g("38WwN"),n=g("hl418"),s=g("8cCb2"),o=g("frznq"),i=g("jqSCG"),l=g("4sqA7");let u=(0,i.op)({conv2DBackpropInput_:function(e,t,a,i,u,p="NHWC",d){s.assert(e.length===t.rank,()=>`Length of inShape (${e.length}) and rank of dy (${t.rank}) must match`);let c=e,h=t,f=!1;3===t.rank&&(f=!0,h=(0,l.reshape)(t,[1,t.shape[0],t.shape[1],t.shape[2]]),c=[1,e[0],e[1],e[2]]),s.assert(4===c.length,()=>`Error in conv2dDerInput: inShape must be length 4, but got length ${c.length}.`),s.assert(4===h.rank,()=>`Error in conv2dDerInput: dy must be rank 4, but got rank ${h.rank}`),s.assert(4===a.rank,()=>`Error in conv2dDerInput: filter must be rank 4, but got rank ${a.rank}`);let m="NHWC"===p?c[3]:c[1],g="NHWC"===p?h.shape[3]:h.shape[1];s.assert(m===a.shape[2],()=>`Error in conv2dDerInput: depth of input (${m}) must match input depth for filter ${a.shape[2]}.`),s.assert(g===a.shape[3],()=>`Error in conv2dDerInput: depth of output (${g}) must match output depth for filter ${a.shape[3]}.`),o.checkPadOnDimRoundingMode("conv2dDerInput",u,d);let x={dy:h,filter:a},y={strides:i,pad:u,dataFormat:p,dimRoundingMode:d,inputShape:c},b=r.ENGINE.runKernel(n.Conv2DBackpropInput,x,y);return f?(0,l.reshape)(b,[b.shape[1],b.shape[2],b.shape[3]]):b}})}),x("kj7tM",function(e,t){a(e.exports,"conv3d",()=>p);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk"),o=g("8cCb2"),i=g("frznq"),l=g("jqSCG"),u=g("4sqA7");let p=(0,l.op)({conv3d_:function(e,t,a,l,p="NDHWC",d=[1,1,1]){let c=(0,s.convertToTensor)(e,"x","conv3d"),h=(0,s.convertToTensor)(t,"filter","conv3d"),f=c,m=!1;4===c.rank&&(m=!0,f=(0,u.reshape)(c,[1,c.shape[0],c.shape[1],c.shape[2],c.shape[3]])),o.assert(5===f.rank,()=>`Error in conv3d: input must be rank 5, but got rank ${f.rank}.`),o.assert(5===h.rank,()=>`Error in conv3d: filter must be rank 5, but got rank ${h.rank}.`),o.assert(f.shape[4]===h.shape[3],()=>`Error in conv3d: depth of input (${f.shape[4]}) must match input depth for filter ${h.shape[3]}.`),o.assert((0,i.eitherStridesOrDilationsAreOne)(a,d),()=>`Error in conv3D: Either strides or dilations must be 1. Got strides ${a} and dilations '${d}'`),o.assert("NDHWC"===p,()=>`Error in conv3d: got dataFormat of ${p} but only NDHWC is currently supported.`),o.assert((0,i.stridesOrDilationsArePositive)(d),()=>"Error in conv3D: Dilated rates should be larger than 0."),o.assert((0,i.stridesOrDilationsArePositive)(a),()=>"Error in conv3D: Strides should be larger than 0.");let g={x:f,filter:h},x=r.ENGINE.runKernel(n.Conv3D,g,{strides:a,pad:l,dataFormat:p,dilations:d});return m?(0,u.reshape)(x,[x.shape[1],x.shape[2],x.shape[3],x.shape[4]]):x}})}),x("7Zgyq",function(e,t){a(e.exports,"conv3dTranspose",()=>s);var r=g("5xBLk"),n=g("AHZ4U");let s=(0,g("jqSCG").op)({conv3dTranspose_:function(e,t,a,s,o){let i=(0,r.convertToTensor)(e,"x","conv3dTranspose"),l=(0,r.convertToTensor)(t,"filter","conv3dTranspose");return(0,n.conv3DBackpropInput)(a,i,l,s,o)}})}),x("AHZ4U",function(e,t){a(e.exports,"conv3DBackpropInput",()=>l);var r=g("38WwN"),n=g("hl418"),s=g("8cCb2"),o=g("jqSCG"),i=g("4sqA7");let l=(0,o.op)({conv3DBackpropInput_:function(e,t,a,o,l){s.assert(e.length===t.rank,()=>`Length of inShape (${e.length}) and rank of dy (${t.rank}) must match`);let u=e,p=t,d=!1;4===t.rank&&(d=!0,p=(0,i.reshape)(t,[1,t.shape[0],t.shape[1],t.shape[2],t.shape[3]]),u=[1,e[0],e[1],e[2],e[3]]);let c=u[4],h=p.shape[4];s.assert(5===u.length,()=>`Error in conv3dDerInput: inShape must be length 5, but got length ${u.length}.`),s.assert(5===p.rank,()=>`Error in conv3dDerInput: dy must be rank 5, but got rank ${p.rank}`),s.assert(5===a.rank,()=>`Error in conv3dDerInput: filter must be rank 5, but got rank ${a.rank}`),s.assert(c===a.shape[3],()=>`Error in conv3dDerInput: depth of input (${c}) must match input depth for filter ${a.shape[3]}.`),s.assert(h===a.shape[4],()=>`Error in conv3dDerInput: depth of output (${h}) must match output depth for filter ${a.shape[4]}.`);let f={dy:p,filter:a},m={pad:l,strides:o,inputShape:u},g=r.ENGINE.runKernel(n.Conv3DBackpropInputV2,f,m);return d?(0,i.reshape)(g,[g.shape[1],g.shape[2],g.shape[3],g.shape[4]]):g}})}),x("3BU7G",function(e,t){a(e.exports,"cos",()=>o);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk");let o=(0,g("jqSCG").op)({cos_:function(e){let t=(0,s.convertToTensor)(e,"x","cos","float32");return r.ENGINE.runKernel(n.Cos,{x:t})}})}),x("bTdqT",function(e,t){a(e.exports,"cosh",()=>o);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk");let o=(0,g("jqSCG").op)({cosh_:function(e){let t=(0,s.convertToTensor)(e,"x","cosh","float32");return r.ENGINE.runKernel(n.Cosh,{x:t})}})}),x("bhhSS",function(e,t){a(e.exports,"cumprod",()=>o);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk");let o=(0,g("jqSCG").op)({cumprod_:function(e,t=0,a=!1,o=!1){let i=(0,s.convertToTensor)(e,"x","cumprod");return r.ENGINE.runKernel(n.Cumprod,{x:i},{axis:t,exclusive:a,reverse:o})}})}),x("7lqwF",function(e,t){a(e.exports,"cumsum",()=>o);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk");let o=(0,g("jqSCG").op)({cumsum_:function(e,t=0,a=!1,o=!1){let i=(0,s.convertToTensor)(e,"x","cumsum");return r.ENGINE.runKernel(n.Cumsum,{x:i},{axis:t,exclusive:a,reverse:o})}})}),x("8maH5",function(e,t){a(e.exports,"denseBincount",()=>i);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk"),o=g("8cCb2");let i=(0,g("jqSCG").op)({denseBincount_:function(e,t,a,i=!1){let l=(0,s.convertToTensor)(e,"x","denseBincount"),u=(0,s.convertToTensor)(t,"weights","denseBincount");return o.assert("int32"===l.dtype,()=>`Error in denseBincount: input dtype must be int32, but got ${l.dtype}`),o.assert(l.rank<=2,()=>`Error in denseBincount: input must be at most rank 2, but got rank ${l.rank}.`),o.assert(a>=0,()=>`size must be non-negative, but got ${a}.`),o.assert(u.size===l.size||0===u.size,()=>`Error in denseBincount: weights must have the same shape as x or 0-length, but got x shape: ${l.shape}, weights shape: ${u.shape}.`),r.ENGINE.runKernel(n.DenseBincount,{x:l,weights:u},{size:a,binaryOutput:i})}})}),x("lIVEL",function(e,t){a(e.exports,"depthToSpace",()=>i);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk"),o=g("8cCb2");let i=(0,g("jqSCG").op)({depthToSpace_:function(e,t,a="NHWC"){let i=(0,s.convertToTensor)(e,"x","depthToSpace","float32"),l="NHWC"===a?i.shape[1]:i.shape[2],u="NHWC"===a?i.shape[2]:i.shape[3],p="NHWC"===a?i.shape[3]:i.shape[1];return o.assert(t>1,()=>`blockSize should be > 1 for depthToSpace, but was: ${t}`),o.assert(l*t>=0,()=>`Negative dimension size caused by overflow when multiplying
    ${l} and ${t}  for depthToSpace with input shape
    ${i.shape}`),o.assert(u*t>=0,()=>`Negative dimension size caused by overflow when multiplying
    ${u} and ${t} for depthToSpace with input shape
        ${i.shape}`),o.assert(p%(t*t)==0,()=>`Dimension size must be evenly divisible by ${t*t} but is ${p} for depthToSpace with input shape ${i.shape}`),r.ENGINE.runKernel(n.DepthToSpace,{x:i},{blockSize:t,dataFormat:a})}})}),x("182Rc",function(e,t){a(e.exports,"depthwiseConv2d",()=>p);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk"),o=g("8cCb2"),i=g("frznq"),l=g("jqSCG"),u=g("4sqA7");let p=(0,l.op)({depthwiseConv2d_:function(e,t,a,l,p="NHWC",d=[1,1],c){let h=(0,s.convertToTensor)(e,"x","depthwiseConv2d","float32"),f=(0,s.convertToTensor)(t,"filter","depthwiseConv2d","float32"),m=h,g=!1;3===h.rank&&(g=!0,m=(0,u.reshape)(h,[1,h.shape[0],h.shape[1],h.shape[2]])),o.assert(4===m.rank,()=>`Error in depthwiseConv2d: input must be rank 4, but got rank ${m.rank}.`),o.assert(4===f.rank,()=>`Error in depthwiseConv2d: filter must be rank 4, but got rank ${f.rank}.`);let x="NHWC"===p?m.shape[3]:m.shape[1];o.assert(x===f.shape[2],()=>`Error in depthwiseConv2d: number of input channels (${x}) must match the inChannels dimension in filter ${f.shape[2]}.`),i.checkPadOnDimRoundingMode("depthwiseConv2d",l,c);let y={x:m,filter:f},b=r.ENGINE.runKernel(n.DepthwiseConv2dNative,y,{strides:a,pad:l,dataFormat:p,dilations:d,dimRoundingMode:c});return g?(0,u.reshape)(b,[b.shape[1],b.shape[2],b.shape[3]]):b}})}),x("4VHSw",function(e,t){a(e.exports,"diag",()=>o);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk");let o=(0,g("jqSCG").op)({diag_:function(e){let t=(0,s.convertToTensor)(e,"x","diag");return r.ENGINE.runKernel(n.Diag,{x:t})}})}),x("leKzP",function(e,t){a(e.exports,"dilation2d",()=>u);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk"),o=g("8cCb2"),i=g("jqSCG"),l=g("4sqA7");let u=(0,i.op)({dilation2d_:function(e,t,a,i,u=[1,1],p="NHWC"){let d=(0,s.convertToTensor)(e,"x","dilation2d"),c=(0,s.convertToTensor)(t,"filter","dilation2d");o.assert(3===d.rank||4===d.rank,()=>`Error in dilation2d: input must be rank 3 or 4, but got rank ${d.rank}.`),o.assert(3===c.rank,()=>`Error in dilation2d: filter must be rank 3, but got rank ${c.rank}.`),o.assert("NHWC"===p,()=>`Error in dilation2d: Only NHWC is currently supported, but got dataFormat of ${p}`);let h=d,f=!1;3===d.rank&&(h=(0,l.reshape)(d,[1,d.shape[0],d.shape[1],d.shape[2]]),f=!0),o.assert(h.shape[3]===c.shape[2],()=>`Error in dilation2d:  input and filter must have the same depth: ${h.shape[3]} vs ${c.shape[2]}`);let m={x:h,filter:c},g=r.ENGINE.runKernel(n.Dilation2D,m,{strides:a,pad:i,dilations:u});return f?(0,l.reshape)(g,[g.shape[1],g.shape[2],g.shape[3]]):g}})}),x("3pBq5",function(e,t){a(e.exports,"divNoNan",()=>p);var r=g("3w4Rg"),n=g("5xBLk"),s=g("1QPqB"),o=g("7R9HC"),i=g("jqSCG"),l=g("l2P14"),u=g("8EjnK");let p=(0,i.op)({divNoNan_:function(e,t){let a=(0,n.convertToTensor)(e,"a","div"),i=(0,n.convertToTensor)(t,"b","div");[a,i]=(0,r.makeTypesMatch)(a,i);let p=(0,s.div)(a,i),d=(0,u.zerosLike)(p),c=(0,o.equal)(i,d);return(0,l.where)(c,d,p)}})}),x("7R9HC",function(e,t){a(e.exports,"equal",()=>l);var r=g("38WwN"),n=g("hl418"),s=g("3w4Rg"),o=g("5xBLk"),i=g("8BaGO");let l=(0,g("jqSCG").op)({equal_:function(e,t){let a=(0,o.convertToTensor)(e,"a","equal","string_or_numeric"),l=(0,o.convertToTensor)(t,"b","equal","string_or_numeric");[a,l]=(0,s.makeTypesMatch)(a,l),(0,i.assertAndGetBroadcastShape)(a.shape,l.shape);let u={a:a,b:l};return r.ENGINE.runKernel(n.Equal,u)}})}),x("l2P14",function(e,t){a(e.exports,"where",()=>l);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk"),o=g("aeB3Z"),i=g("8BaGO");let l=(0,g("jqSCG").op)({where_:function(e,t,a){let l=(0,s.convertToTensor)(t,"a","where"),u=(0,s.convertToTensor)(a,"b","where"),p=(0,s.convertToTensor)(e,"condition","where","bool"),d=(0,i.assertAndGetBroadcastShape)((0,i.assertAndGetBroadcastShape)(p.shape,l.shape),u.shape),c=(0,o.broadcastTo)(p,d),h=(0,o.broadcastTo)(l,d),f=(0,o.broadcastTo)(u,d);return r.ENGINE.runKernel(n.Select,{condition:c,t:h,e:f})}})}),x("67T3W",function(e,t){a(e.exports,"dot",()=>l);var r=g("5xBLk"),n=g("8cCb2"),s=g("aUFou"),o=g("jqSCG"),i=g("4sqA7");let l=(0,o.op)({dot_:function(e,t){let a=(0,r.convertToTensor)(e,"t1","dot"),o=(0,r.convertToTensor)(t,"t2","dot");n.assert((1===a.rank||2===a.rank)&&(1===o.rank||2===o.rank),()=>`Error in dot: inputs must all be rank 1 or 2, but got ranks ${a.rank} and ${o.rank}.`);let l=1===a.rank?a.size:a.shape[1],u=1===o.rank?o.size:o.shape[0];if(n.assert(l===u,()=>`Error in dot: inner dimensions of inputs must match, but got ${l} and ${u}.`),1===a.rank&&1===o.rank){let e=(0,i.reshape)(a,[1,-1]),t=(0,i.reshape)(o,[-1,1]),r=(0,s.matMul)(e,t);return(0,i.reshape)(r,[])}if(1===a.rank&&2===o.rank){let e=(0,i.reshape)(a,[1,-1]),t=(0,i.reshape)(o,[o.shape[0],o.shape[1]]),r=(0,s.matMul)(e,t);return(0,i.reshape)(r,[r.size])}if(2===a.rank&&1===o.rank){let e=(0,i.reshape)(o,[-1,1]),t=(0,s.matMul)(a,e);return(0,i.reshape)(t,[t.size])}{let e=(0,i.reshape)(o,[o.shape[0],o.shape[1]]);return(0,s.matMul)(a,e)}}})}),x("1mzpU",function(e,t){a(e.exports,"einsum",()=>o);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk");let o=(0,g("jqSCG").op)({einsum_:function(e,...t){let a=t.map((e,t)=>(0,s.convertToTensor)(e,`tensors${t}`,"einsum"));return r.ENGINE.runKernel(n.Einsum,a,{equation:e})}})}),x("7UQTl",function(e,t){a(e.exports,"elu",()=>o);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk");let o=(0,g("jqSCG").op)({elu_:function(e){let t=(0,s.convertToTensor)(e,"x","elu","float32");return r.ENGINE.runKernel(n.Elu,{x:t})}})}),x("8jXAt",function(e,t){a(e.exports,"ensureShape",()=>s);var r=g("5xBLk"),n=g("8cCb2");let s=(0,g("jqSCG").op)({ensureShape_:function(e,t){let a=(0,r.convertToTensor)(e,"x","ensureShape","string_or_numeric");if(!(0,n.arraysEqualWithNull)(a.shape,t))throw Error(`EnsureShape: Shape of tensor ${a.shape} is not compatible with expected shape ${t}`);return e}})}),x("3q8h0",function(e,t){a(e.exports,"erf",()=>l);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk"),o=g("8cCb2"),i=g("inFmq");let l=(0,g("jqSCG").op)({erf_:function(e){let t=(0,s.convertToTensor)(e,"x","erf");o.assert("int32"===t.dtype||"float32"===t.dtype,()=>"Input dtype must be `int32` or `float32`."),"int32"===t.dtype&&(t=(0,i.cast)(t,"float32"));let a={x:t};return r.ENGINE.runKernel(n.Erf,a)}})}),x("4PmMp",function(e,t){a(e.exports,"euclideanNorm",()=>n);var r=g("7k6dx");let n=(0,g("jqSCG").op)({euclideanNorm_:function(e,t=null,a=!1){return(0,r.norm)(e,"euclidean",t,a)}})}),x("7k6dx",function(e,t){a(e.exports,"norm",()=>x);var r=g("5xBLk"),n=g("8cCb2"),s=g("7j49I"),o=g("kTunp"),i=g("05cMR"),l=g("fySTI"),u=g("jqSCG"),p=g("ad1of"),d=g("4sqA7"),c=g("3xp7o"),h=g("iAb3z"),f=g("iDd8d"),m=g("9NgTx");let x=(0,u.op)({norm_:function(e,t="euclidean",a=null,u=!1){let g=function e(t,r,a=null){if(0===t.rank)return(0,s.abs)(t);if(1!==t.rank&&null===a)return e((0,d.reshape)(t,[-1]),r,a);if(1===t.rank||"number"==typeof a||Array.isArray(a)&&1===a.length){if(1===r)return(0,m.sum)((0,s.abs)(t),a);if(r===1/0)return(0,i.max)((0,s.abs)(t),a);if(r===-1/0)return(0,l.min)((0,s.abs)(t),a);if("euclidean"===r||2===r)return(0,h.sqrt)((0,m.sum)((0,p.pow)((0,s.abs)(t),(0,c.scalar)(2,"int32")),a));throw Error(`Error in norm: invalid ord value: ${r}`)}if(Array.isArray(a)&&2===a.length){if(1===r)return(0,i.max)((0,m.sum)((0,s.abs)(t),a[0]),a[1]-1);if(r===1/0)return(0,i.max)((0,m.sum)((0,s.abs)(t),a[1]),a[0]);if(r===-1/0)return(0,l.min)((0,m.sum)((0,s.abs)(t),a[1]),a[0]);if("fro"===r||"euclidean"===r)return(0,h.sqrt)((0,m.sum)((0,f.square)(t),a));throw Error(`Error in norm: invalid ord value: ${r}`)}throw Error(`Error in norm: invalid axis: ${a}`)}(e=(0,r.convertToTensor)(e,"x","norm"),t,a),x=g.shape;if(u){let t=(0,n.parseAxisParam)(a,e.shape);x=o.expandShapeToKeepDim(g.shape,t)}return(0,d.reshape)(g,x)}})}),x("kTunp",function(e,t){a(e.exports,"axesAreInnerMostDims",()=>n),a(e.exports,"combineLocations",()=>s),a(e.exports,"computeOutAndReduceShapes",()=>o),a(e.exports,"expandShapeToKeepDim",()=>i),a(e.exports,"assertAxesAreInnerMostDims",()=>l),a(e.exports,"getAxesPermutation",()=>u),a(e.exports,"getUndoAxesPermutation",()=>p),a(e.exports,"getInnerMostAxes",()=>d);var r=g("8cCb2");function n(e,t){for(let r=0;r<e.length;++r)if(e[e.length-r-1]!==t-1-r)return!1;return!0}function s(e,t,r){let a=e.length+t.length,n=[],s=0,o=0;for(let i=0;i<a;i++)-1===r.indexOf(i)?n.push(e[s++]):n.push(t[o++]);return n}function o(e,t){let r=[],a=e.length;for(let n=0;n<a;n++)-1===t.indexOf(n)&&r.push(e[n]);return[r,t.map(t=>e[t])]}function i(e,t){return s(e,t.map(e=>1),t)}function l(e,t,a){r.assert(n(t,a),()=>`${e} supports only inner-most axes for now. Got axes ${t} and rank-${a} input.`)}function u(e,t){if(n(e,t))return null;let r=[];for(let a=0;a<t;++a)-1===e.indexOf(a)&&r.push(a);return e.forEach(e=>r.push(e)),r}function p(e){return e.map((e,t)=>[t,e]).sort((e,t)=>e[1]-t[1]).map(e=>e[0])}function d(e,t){let r=[];for(let a=t-e;a<t;++a)r.push(a);return r}}),x("05cMR",function(e,t){a(e.exports,"max",()=>o);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk");let o=(0,g("jqSCG").op)({max_:function(e,t=null,a=!1){let o=(0,s.convertToTensor)(e,"x","max");return r.ENGINE.runKernel(n.Max,{x:o},{reductionIndices:t,keepDims:a})}})}),x("fySTI",function(e,t){a(e.exports,"min",()=>o);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk");let o=(0,g("jqSCG").op)({min_:function(e,t=null,a=!1){let o=(0,s.convertToTensor)(e,"x","min");return r.ENGINE.runKernel(n.Min,{x:o},{axis:t,keepDims:a})}})}),x("9NgTx",function(e,t){a(e.exports,"sum",()=>i);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk"),o=g("inFmq");let i=(0,g("jqSCG").op)({sum_:function(e,t=null,a=!1){let i=(0,s.convertToTensor)(e,"x","sum");"bool"===i.dtype&&(i=(0,o.cast)(i,"int32"));let l={x:i};return r.ENGINE.runKernel(n.Sum,l,{axis:t,keepDims:a})}})}),x("2PcQK",function(e,t){a(e.exports,"exp",()=>o);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk");let o=(0,g("jqSCG").op)({exp_:function(e){let t=(0,s.convertToTensor)(e,"x","exp");return r.ENGINE.runKernel(n.Exp,{x:t})}})}),x("iPDWZ",function(e,t){a(e.exports,"expandDims",()=>i);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk"),o=g("8cCb2");let i=(0,g("jqSCG").op)({expandDims_:function(e,t=0){let a=(0,s.convertToTensor)(e,"x","expandDims","string_or_numeric");return o.assert(t<=a.rank,()=>"Axis must be <= rank of the tensor"),r.ENGINE.runKernel(n.ExpandDims,{input:a},{dim:t})}})}),x("cUuFo",function(e,t){a(e.exports,"expm1",()=>o);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk");let o=(0,g("jqSCG").op)({expm1_:function(e){let t=(0,s.convertToTensor)(e,"x","expm1");return r.ENGINE.runKernel(n.Expm1,{x:t})}})}),x("9gIZb",function(e,t){a(e.exports,"eye",()=>l);var r=g("iG87S"),n=g("iPDWZ"),s=g("jqSCG"),o=g("4sqA7"),i=g("61ay4");let l=(0,s.op)({eye_:function(e,t,a,s="float32"){null==t&&(t=e);let l=(0,r.buffer)([e,t],s),u=e<=t?e:t;for(let e=0;e<u;++e)l.set(1,e,e);let p=(0,o.reshape)(l.toTensor(),[e,t]);if(null==a)return p;if(1===a.length)return(0,i.tile)((0,n.expandDims)(p,0),[a[0],1,1]);if(2===a.length)return(0,i.tile)((0,n.expandDims)((0,n.expandDims)(p,0),0),[a[0],a[1],1,1]);if(3===a.length)return(0,i.tile)((0,n.expandDims)((0,n.expandDims)((0,n.expandDims)(p,0),0),0),[a[0],a[1],a[2],1,1]);throw Error(`eye() currently supports only 1D and 2D batchShapes, but received ${a.length}D.`)}})}),x("61ay4",function(e,t){a(e.exports,"tile",()=>i);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk"),o=g("8cCb2");let i=(0,g("jqSCG").op)({tile_:function(e,t){let a=(0,s.convertToTensor)(e,"x","tile","string_or_numeric");return o.assert(a.rank===t.length,()=>`Error in transpose: rank of input ${a.rank} must match length of reps ${t}.`),r.ENGINE.runKernel(n.Tile,{x:a},{reps:t})}})}),x("4ZUCz",function(e,t){a(e.exports,"floor",()=>o);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk");let o=(0,g("jqSCG").op)({floor_:function(e){let t=(0,s.convertToTensor)(e,"x","floor","float32");return r.ENGINE.runKernel(n.Floor,{x:t})}})}),x("3qUjU",function(e,t){a(e.exports,"gather",()=>o);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk");let o=(0,g("jqSCG").op)({gather_:function(e,t,a=0,o=0){let i=(0,s.convertToTensor)(e,"x","gather"),l=(0,s.convertToTensor)(t,"indices","gather","int32");return r.ENGINE.runKernel(n.GatherV2,{x:i,indices:l},{axis:a,batchDims:o})}})}),x("bRRKf",function(e,t){a(e.exports,"greater",()=>l);var r=g("38WwN"),n=g("hl418"),s=g("3w4Rg"),o=g("5xBLk"),i=g("8BaGO");let l=(0,g("jqSCG").op)({greater_:function(e,t){let a=(0,o.convertToTensor)(e,"a","greater","string_or_numeric"),l=(0,o.convertToTensor)(t,"b","greater","string_or_numeric");[a,l]=(0,s.makeTypesMatch)(a,l),(0,i.assertAndGetBroadcastShape)(a.shape,l.shape);let u={a:a,b:l};return r.ENGINE.runKernel(n.Greater,u)}})}),x("l0Zxl",function(e,t){a(e.exports,"greaterEqual",()=>l);var r=g("38WwN"),n=g("hl418"),s=g("3w4Rg"),o=g("5xBLk"),i=g("8BaGO");let l=(0,g("jqSCG").op)({greaterEqual_:function(e,t){let a=(0,o.convertToTensor)(e,"a","greaterEqual","string_or_numeric"),l=(0,o.convertToTensor)(t,"b","greaterEqual","string_or_numeric");[a,l]=(0,s.makeTypesMatch)(a,l),(0,i.assertAndGetBroadcastShape)(a.shape,l.shape);let u={a:a,b:l};return r.ENGINE.runKernel(n.GreaterEqual,u)}})}),x("eaZNC",function(e,t){a(e.exports,"isFinite",()=>o);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk");let o=(0,g("jqSCG").op)({isFinite_:function(e){let t=(0,s.convertToTensor)(e,"x","isFinite");return r.ENGINE.runKernel(n.IsFinite,{x:t})}})}),x("ahjR1",function(e,t){a(e.exports,"isInf",()=>o);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk");let o=(0,g("jqSCG").op)({isInf_:function(e){let t=(0,s.convertToTensor)(e,"x","isInf");return r.ENGINE.runKernel(n.IsInf,{x:t})}})}),x("5FmUe",function(e,t){a(e.exports,"isNaN",()=>o);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk");let o=(0,g("jqSCG").op)({isNaN_:function(e){let t=(0,s.convertToTensor)(e,"x","isNaN");return r.ENGINE.runKernel(n.IsNan,{x:t})}})}),x("3XskU",function(e,t){a(e.exports,"leakyRelu",()=>o);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk");let o=(0,g("jqSCG").op)({leakyRelu_:function(e,t=.2){let a=(0,s.convertToTensor)(e,"x","leakyRelu");return r.ENGINE.runKernel(n.LeakyRelu,{x:a},{alpha:t})}})}),x("jTDVJ",function(e,t){a(e.exports,"less",()=>l);var r=g("38WwN"),n=g("hl418"),s=g("3w4Rg"),o=g("5xBLk"),i=g("8BaGO");let l=(0,g("jqSCG").op)({less_:function(e,t){let a=(0,o.convertToTensor)(e,"a","less","string_or_numeric"),l=(0,o.convertToTensor)(t,"b","less","string_or_numeric");[a,l]=(0,s.makeTypesMatch)(a,l),(0,i.assertAndGetBroadcastShape)(a.shape,l.shape);let u={a:a,b:l};return r.ENGINE.runKernel(n.Less,u)}})}),x("7LQ38",function(e,t){a(e.exports,"lessEqual",()=>l);var r=g("38WwN"),n=g("hl418"),s=g("3w4Rg"),o=g("5xBLk"),i=g("8BaGO");let l=(0,g("jqSCG").op)({lessEqual_:function(e,t){let a=(0,o.convertToTensor)(e,"a","lessEqual","string_or_numeric"),l=(0,o.convertToTensor)(t,"b","lessEqual","string_or_numeric");[a,l]=(0,s.makeTypesMatch)(a,l),(0,i.assertAndGetBroadcastShape)(a.shape,l.shape);let u={a:a,b:l};return r.ENGINE.runKernel(n.LessEqual,u)}})}),x("9ntOC",function(e,t){a(e.exports,"linspace",()=>s);var r=g("38WwN"),n=g("hl418");function s(e,t,a){if(a<=0)throw Error("The number of values should be positive.");return r.ENGINE.runKernel(n.LinSpace,{},{start:e,stop:t,num:a})}}),x("k8D3u",function(e,t){a(e.exports,"localResponseNormalization",()=>u);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk"),o=g("8cCb2"),i=g("jqSCG"),l=g("4sqA7");let u=(0,i.op)({localResponseNormalization_:function(e,t=5,a=1,i=1,u=.5){let p=(0,s.convertToTensor)(e,"x","localResponseNormalization");o.assert(4===p.rank||3===p.rank,()=>`Error in localResponseNormalization: x must be rank 3 or 4 but got
               rank ${p.rank}.`),o.assert(o.isInt(t),()=>`Error in localResponseNormalization: depthRadius must be an integer but got depthRadius ${t}.`);let d=p,c=!1;3===p.rank&&(c=!0,d=(0,l.reshape)(p,[1,p.shape[0],p.shape[1],p.shape[2]]));let h={x:d},f=r.ENGINE.runKernel(n.LRN,h,{depthRadius:t,bias:a,alpha:i,beta:u});return c?(0,l.reshape)(f,[f.shape[1],f.shape[2],f.shape[3]]):f}})}),x("dcoCo",function(e,t){a(e.exports,"log",()=>o);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk");let o=(0,g("jqSCG").op)({log_:function(e){let t=(0,s.convertToTensor)(e,"x","log","float32");return r.ENGINE.runKernel(n.Log,{x:t})}})}),x("5QUXI",function(e,t){a(e.exports,"log1p",()=>o);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk");let o=(0,g("jqSCG").op)({log1p_:function(e){let t=(0,s.convertToTensor)(e,"x","log1p");return r.ENGINE.runKernel(n.Log1p,{x:t})}})}),x("7hYeW",function(e,t){a(e.exports,"logSigmoid",()=>p);var r=g("92fpA"),n=g("5xBLk"),s=g("jZc0w"),o=g("15cGp"),i=g("jqSCG"),l=g("jvtSq"),u=g("4Udpd");let p=(0,i.op)({logSigmoid_:function(e){let t=(0,n.convertToTensor)(e,"x","logSigmoid");return(0,r.customGrad)(e=>({value:(0,o.neg)((0,u.softplus)((0,o.neg)(e))),gradFunc:t=>(0,s.mul)(t,(0,l.sigmoid)((0,o.neg)(e)))}))(t)}})}),x("4Udpd",function(e,t){a(e.exports,"softplus",()=>o);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk");let o=(0,g("jqSCG").op)({softplus_:function(e){let t=(0,s.convertToTensor)(e,"x","softplus");return r.ENGINE.runKernel(n.Softplus,{x:t})}})}),x("2NPdY",function(e,t){a(e.exports,"logSoftmax",()=>h);var r=g("92fpA"),n=g("5xBLk"),s=g("inFmq"),o=g("2PcQK"),i=g("dcoCo"),l=g("05cMR"),u=g("jZc0w"),p=g("jqSCG"),d=g("7kouu"),c=g("9NgTx");let h=(0,p.op)({logSoftmax_:function(e,t=-1){let a=(0,n.convertToTensor)(e,"logits","logSoftmax");if(-1===t&&(t=a.rank-1),t!==a.rank-1)throw Error(`Log Softmax along a non-last dimension is not yet supported. Logits was rank ${a.rank} and axis was ${t}`);return(0,r.customGrad)((e,r)=>{let a=(0,l.max)(e,t,!0),n=(0,d.sub)(e,a),p=(0,d.sub)((0,s.cast)(n,"float32"),(0,i.log)((0,c.sum)((0,o.exp)(n),t,!0)));return r([p]),{value:p,gradFunc:(e,r)=>{let[a]=r,n=(0,o.exp)(a);return(0,d.sub)(e,(0,u.mul)((0,c.sum)(e,t,!0),n))}}})(a)}})}),x("9dGIC",function(e,t){a(e.exports,"logSumExp",()=>f);var r=g("5xBLk"),n=g("8cCb2"),s=g("hgacW"),o=g("kTunp"),i=g("2PcQK"),l=g("dcoCo"),u=g("05cMR"),p=g("jqSCG"),d=g("4sqA7"),c=g("7kouu"),h=g("9NgTx");let f=(0,p.op)({logSumExp_:function(e,t=null,a=!1){let p=(0,r.convertToTensor)(e,"x","logSumExp"),f=(0,n.parseAxisParam)(t,p.shape),m=(0,u.max)(p,f,!0),g=(0,c.sub)(p,m),x=(0,i.exp)(g),y=(0,h.sum)(x,f),b=(0,l.log)(y),v=(0,s.add)((0,d.reshape)(m,b.shape),b);if(a){let e=(0,o.expandShapeToKeepDim)(v.shape,f);return(0,d.reshape)(v,e)}return v}})}),x("kg1Wp",function(e,t){a(e.exports,"logicalAnd",()=>i);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk"),o=g("8BaGO");let i=(0,g("jqSCG").op)({logicalAnd_:function(e,t){let a=(0,s.convertToTensor)(e,"a","logicalAnd","bool"),i=(0,s.convertToTensor)(t,"b","logicalAnd","bool");return(0,o.assertAndGetBroadcastShape)(a.shape,i.shape),r.ENGINE.runKernel(n.LogicalAnd,{a:a,b:i})}})}),x("7NVSX",function(e,t){a(e.exports,"logicalNot",()=>o);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk");let o=(0,g("jqSCG").op)({logicalNot_:function(e){let t=(0,s.convertToTensor)(e,"x","logicalNot","bool");return r.ENGINE.runKernel(n.LogicalNot,{x:t})}})}),x("iok2K",function(e,t){a(e.exports,"logicalOr",()=>i);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk"),o=g("8BaGO");let i=(0,g("jqSCG").op)({logicalOr_:function(e,t){let a=(0,s.convertToTensor)(e,"a","logicalOr","bool"),i=(0,s.convertToTensor)(t,"b","logicalOr","bool");return(0,o.assertAndGetBroadcastShape)(a.shape,i.shape),r.ENGINE.runKernel(n.LogicalOr,{a:a,b:i})}})}),x("iIobM",function(e,t){a(e.exports,"logicalXor",()=>l);var r=g("5xBLk"),n=g("8BaGO"),s=g("kg1Wp"),o=g("7NVSX"),i=g("iok2K");let l=(0,g("jqSCG").op)({logicalXor_:function(e,t){let a=(0,r.convertToTensor)(e,"a","logicalXor","bool"),l=(0,r.convertToTensor)(t,"b","logicalXor","bool");return(0,n.assertAndGetBroadcastShape)(a.shape,l.shape),(0,s.logicalAnd)((0,i.logicalOr)(e,t),(0,o.logicalNot)((0,s.logicalAnd)(e,t)))}})}),x("jAFVi",function(e,t){a(e.exports,"lowerBound",()=>n);var r=g("6PrVj");function n(e,t){return(0,r.searchSorted)(e,t,"left")}}),x("6PrVj",function(e,t){a(e.exports,"searchSorted",()=>u);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk"),o=g("8cCb2"),i=g("jqSCG"),l=g("4sqA7");let u=(0,i.op)({searchSorted_:function(e,t,a="left"){let i=(0,s.convertToTensor)(e,"sortedSequence","searchSorted"),u=(0,s.convertToTensor)(t,"values","searchSorted"),p=i.shape[i.shape.length-1],d=u.shape[u.shape.length-1],c=(0,l.reshape)(i,[-1,p]),h=(0,l.reshape)(u,[-1,d]);if(c.rank<2)throw Error("Sorted input argument must be at least 2-dimensional");if(c.shape[0]!==h.shape[0])throw Error("Leading dimension of 'sortedSequence' and 'values' must match.");if((0,o.sizeFromShape)(h.shape)>=0x80000000)throw Error("values tensor size must less than 2147483648");if(c.shape[1]>=0x80000000)throw Error(`trailing dim_size must less than 2147483648 for int32 output type, was ${c.shape[1]}`);return r.ENGINE.runKernel(n.SearchSorted,{sortedSequence:c,values:h},{side:a})}})}),x("gscJF",function(e,t){a(e.exports,"maxPool",()=>p);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk"),o=g("8cCb2"),i=g("frznq"),l=g("jqSCG"),u=g("4sqA7");let p=(0,l.op)({maxPool_:function(e,t,a,l,p){let d=(0,s.convertToTensor)(e,"x","maxPool"),c=d,h=!1;3===d.rank&&(h=!0,c=(0,u.reshape)(d,[1,d.shape[0],d.shape[1],d.shape[2]])),o.assert(4===c.rank,()=>`Error in maxPool: input must be rank 4 but got rank ${c.rank}.`),o.assert(i.eitherStridesOrDilationsAreOne(a,1),()=>`Error in maxPool: Either strides or dilations must be 1. Got strides ${a} and dilations '1'`),i.checkPadOnDimRoundingMode("maxPool",l,p);let f={x:c},m=r.ENGINE.runKernel(n.MaxPool,f,{filterSize:t,strides:a,pad:l,dimRoundingMode:p});return h?(0,u.reshape)(m,[m.shape[1],m.shape[2],m.shape[3]]):m}})}),x("gF4tm",function(e,t){a(e.exports,"maxPool3d",()=>p);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk"),o=g("8cCb2"),i=g("frznq"),l=g("jqSCG"),u=g("4sqA7");let p=(0,l.op)({maxPool3d_:function(e,t=[1,1,1],a,l,p,d="NDHWC"){let c=(0,s.convertToTensor)(e,"x","maxPool3d"),h=c,f=!1;4===c.rank&&(f=!0,h=(0,u.reshape)(c,[1,c.shape[0],c.shape[1],c.shape[2],c.shape[3]])),o.assert(5===h.rank,()=>`Error in maxPool3d: x must be rank 5 but got rank ${h.rank}.`),o.assert("NDHWC"===d,()=>`Error in maxPool3d: Only NDHWC is currently supported, but got dataFormat of ${d}`),(0,i.checkPadOnDimRoundingMode)("maxPool3d",l,p);let m={x:h},g=r.ENGINE.runKernel(n.MaxPool3D,m,{filterSize:t,strides:a,pad:l,dimRoundingMode:p,dataFormat:d});return f?(0,u.reshape)(g,[g.shape[1],g.shape[2],g.shape[3],g.shape[4]]):g}})}),x("9K0B1",function(e,t){a(e.exports,"maxPoolWithArgmax",()=>o);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk");let o=(0,g("jqSCG").op)({maxPoolWithArgmax_:function(e,t,a,o,i=!1){let l=(0,s.convertToTensor)(e,"x","maxPoolWithArgmax"),u=r.ENGINE.runKernel(n.MaxPoolWithArgmax,{x:l},{filterSize:t,strides:a,pad:o,includeBatchInIndex:i});return{result:u[0],indexes:u[1]}}})}),x("67GCc",function(e,t){a(e.exports,"mean",()=>o);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk");let o=(0,g("jqSCG").op)({mean_:function(e,t=null,a=!1){let o=(0,s.convertToTensor)(e,"x","mean");return r.ENGINE.runKernel(n.Mean,{x:o},{axis:t,keepDims:a})}})}),x("e6A1c",function(e,t){a(e.exports,"meshgrid",()=>u);var r=g("aUFou"),n=g("fOBRA"),s=g("4sqA7"),o=g("9jCh7"),i=g("5xBLk"),l=g("8cCb2");function u(e,t,{indexing:a="xy"}={}){if("xy"!==a&&"ij"!==a)throw TypeError(`${a} is not a valid third argument to meshgrid`);if(void 0===e)return[];let p=(0,i.convertToTensor)(e,"x","meshgrid",e instanceof o.Tensor?e.dtype:"float32");if(void 0===t)return[p];let d=(0,i.convertToTensor)(t,"y","meshgrid",t instanceof o.Tensor?t.dtype:"float32"),c=(0,l.sizeFromShape)(p.shape),h=(0,l.sizeFromShape)(d.shape);return"xy"===a?(p=(0,s.reshape)(p,[1,-1]),d=(0,s.reshape)(d,[-1,1]),[(0,r.matMul)((0,n.ones)([h,1],p.dtype),p),(0,r.matMul)(d,(0,n.ones)([1,c],d.dtype))]):(p=(0,s.reshape)(p,[-1,1]),d=(0,s.reshape)(d,[1,-1]),[(0,r.matMul)(p,(0,n.ones)([1,h],p.dtype)),(0,r.matMul)((0,n.ones)([c,1],d.dtype),d)])}}),x("fOBRA",function(e,t){a(e.exports,"ones",()=>function e(t,a="float32"){if((0,n.assertNonNegativeIntegerDimensions)(t),"complex64"===a){let r=e(t,"float32"),a=(0,o.zeros)(t,"float32");return(0,s.complex)(r,a)}let i=(0,n.makeOnesTypedArray)((0,n.sizeFromShape)(t),a);return r.ENGINE.makeTensor(i,t,a)});var r=g("38WwN"),n=(g("8cCb2"),g("8cCb2")),s=g("20oDZ"),o=g("hxi4c")}),x("hxi4c",function(e,t){a(e.exports,"zeros",()=>function e(t,a="float32"){if((0,n.assertNonNegativeIntegerDimensions)(t),"complex64"===a){let r=e(t,"float32"),a=e(t,"float32");return(0,s.complex)(r,a)}let o=(0,n.makeZerosTypedArray)((0,n.sizeFromShape)(t),a);return r.ENGINE.makeTensor(o,t,a)});var r=g("38WwN"),n=g("8cCb2"),s=g("20oDZ")}),x("6V8xR",function(e,t){a(e.exports,"minimum",()=>u);var r=g("38WwN"),n=g("hl418"),s=g("3w4Rg"),o=g("5xBLk"),i=g("8BaGO"),l=g("inFmq");let u=(0,g("jqSCG").op)({minimum_:function(e,t){let a=(0,o.convertToTensor)(e,"a","minimum"),u=(0,o.convertToTensor)(t,"b","minimum");[a,u]=(0,s.makeTypesMatch)(a,u),"bool"===a.dtype&&(a=(0,l.cast)(a,"int32"),u=(0,l.cast)(u,"int32")),(0,i.assertAndGetBroadcastShape)(a.shape,u.shape);let p={a:a,b:u};return r.ENGINE.runKernel(n.Minimum,p)}})}),x("ejlRR",function(e,t){a(e.exports,"mirrorPad",()=>i);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk"),o=g("8cCb2");let i=(0,g("jqSCG").op)({mirrorPad_:function(e,t,a){o.assert("reflect"===a||"symmetric"===a,()=>`Invalid mode. Mode must be either reflect or symmetric. Got ${a}.`);let i=(0,s.convertToTensor)(e,"x","mirrorPad");if(0===i.rank)throw Error("mirrorPad(scalar) is not defined. Pass non-scalar to mirrorPad");o.assert(t.length===i.rank,()=>`Padding doesn't match input. Must be ${i.rank}. Got ${t.length}.`);let l=+("reflect"===a);for(let e=0;e<i.rank;e++)o.assert(2===t[e].length,()=>"Invalid number of paddings. Must be length of 2 each."),o.assert(t[e][0]>=0&&t[e][0]<=i.shape[e]-l&&t[e][1]>=0&&t[e][1]<=i.shape[e]-l,()=>`Padding in dimension ${e} cannot be greater than or equal to ${i.shape[e]-l} or less than 0 for input of shape ${i.shape}`);return r.ENGINE.runKernel(n.MirrorPad,{x:i},{paddings:t,mode:a})}})}),x("jR4my",function(e,t){a(e.exports,"mod",()=>i);var r=g("38WwN"),n=g("hl418"),s=g("3w4Rg"),o=g("5xBLk");let i=(0,g("jqSCG").op)({mod_:function(e,t){let a=(0,o.convertToTensor)(e,"a","mod"),i=(0,o.convertToTensor)(t,"b","mod");[a,i]=(0,s.makeTypesMatch)(a,i);let l={a:a,b:i};return r.ENGINE.runKernel(n.Mod,l)}})}),x("jV1KY",function(e,t){a(e.exports,"moments",()=>c);var r=g("5xBLk"),n=g("8cCb2"),s=g("kTunp"),o=g("inFmq"),i=g("67GCc"),l=g("jqSCG"),u=g("4sqA7"),p=g("iDd8d"),d=g("7kouu");let c=(0,l.op)({moments_:function(e,t=null,a=!1){e=(0,r.convertToTensor)(e,"x","moments");let l=(0,n.parseAxisParam)(t,e.shape),c=(0,i.mean)(e,l,a),h=c.shape;a||(h=(0,s.expandShapeToKeepDim)(c.shape,l));let f=(0,p.square)((0,d.sub)((0,o.cast)(e,"float32"),(0,u.reshape)(c,h)));return{mean:c,variance:(0,i.mean)(f,l,a)}}})}),x("culYm",function(e,t){a(e.exports,"multiRNNCell",()=>n);var r=g("5xBLk");let n=(0,g("jqSCG").op)({multiRNNCell_:function(e,t,a,n){let s=(0,r.convertToTensor)(t,"data","multiRNNCell"),o=(0,r.convertToTensorArray)(a,"c","multiRNNCell"),i=(0,r.convertToTensorArray)(n,"h","multiRNNCell"),l=s,u=[];for(let t=0;t<e.length;t++){let r=e[t](l,o[t],i[t]);u.push(r[0]),u.push(r[1]),l=r[1]}let p=[],d=[];for(let e=0;e<u.length;e+=2)p.push(u[e]),d.push(u[e+1]);return[p,d]}})}),x("b2OB7",function(e,t){a(e.exports,"multinomial",()=>l);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk"),o=g("jqSCG"),i=g("4sqA7");let l=(0,o.op)({multinomial_:function(e,t,a,o=!1){let l=(0,s.convertToTensor)(e,"logits","multinomial"),u=l.size,p=l.rank;if(u<2)throw Error(`Error in multinomial: you need at least 2 outcomes, but got ${u}.`);if(p>2)throw Error(`Rank of probabilities must be 1 or 2, but is ${p}`);a=a||Math.random();let d=1===p?(0,i.reshape)(l,[1,-1]):l,c={numSamples:t,seed:a,normalized:o},h=r.ENGINE.runKernel(n.Multinomial,{logits:d},c);return 1===p?(0,i.reshape)(h,[h.size]):h}})}),x("8WSnu",function(e,t){a(e.exports,"notEqual",()=>l);var r=g("38WwN"),n=g("hl418"),s=g("3w4Rg"),o=g("5xBLk"),i=g("8BaGO");let l=(0,g("jqSCG").op)({notEqual_:function(e,t){let a=(0,o.convertToTensor)(e,"a","notEqual","string_or_numeric"),l=(0,o.convertToTensor)(t,"b","notEqual","string_or_numeric");[a,l]=(0,s.makeTypesMatch)(a,l),(0,i.assertAndGetBroadcastShape)(a.shape,l.shape);let u={a:a,b:l};return r.ENGINE.runKernel(n.NotEqual,u)}})}),x("67iid",function(e,t){a(e.exports,"onesLike",()=>o);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk");let o=(0,g("jqSCG").op)({onesLike_:function(e){let t=(0,s.convertToTensor)(e,"x","onesLike");return r.ENGINE.runKernel(n.OnesLike,{x:t})}})}),x("8lsKt",function(e,t){a(e.exports,"outerProduct",()=>l);var r=g("5xBLk"),n=g("8cCb2"),s=g("aUFou"),o=g("jqSCG"),i=g("4sqA7");let l=(0,o.op)({outerProduct_:function(e,t){let a=(0,r.convertToTensor)(e,"v1","outerProduct"),o=(0,r.convertToTensor)(t,"v2","outerProduct");n.assert(1===a.rank&&1===o.rank,()=>`Error in outerProduct: inputs must be rank 1, but got ranks ${a.rank} and ${o.rank}.`);let l=(0,i.reshape)(a,[-1,1]),u=(0,i.reshape)(o,[1,-1]);return(0,s.matMul)(l,u)}})}),x("fSZF6",function(e,t){a(e.exports,"pad",()=>o);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk");let o=(0,g("jqSCG").op)({pad_:function(e,t,a=0){let o=(0,s.convertToTensor)(e,"x","pad");if(0===o.rank)throw Error("pad(scalar) is not defined. Pass non-scalar to pad");return r.ENGINE.runKernel(n.PadV2,{x:o},{paddings:t,constantValue:a})}})}),x("d3x5E",function(e,t){a(e.exports,"pad1d",()=>o);var r=g("8cCb2"),n=g("jqSCG"),s=g("fSZF6");let o=(0,n.op)({pad1d_:function(e,t,a=0){return(0,r.assert)(2===t.length,()=>"Invalid number of paddings. Must be length of 2."),(0,s.pad)(e,[t],a)}})}),x("lbRCf",function(e,t){a(e.exports,"pad2d",()=>o);var r=g("8cCb2"),n=g("jqSCG"),s=g("fSZF6");let o=(0,n.op)({pad2d_:function(e,t,a=0){return(0,r.assert)(2===t.length&&2===t[0].length&&2===t[1].length,()=>"Invalid number of paddings. Must be length of 2 each."),(0,s.pad)(e,t,a)}})}),x("kZSbJ",function(e,t){a(e.exports,"pad3d",()=>o);var r=g("8cCb2"),n=g("jqSCG"),s=g("fSZF6");let o=(0,n.op)({pad3d_:function(e,t,a=0){return(0,r.assert)(3===t.length&&2===t[0].length&&2===t[1].length&&2===t[2].length,()=>"Invalid number of paddings. Must be length of 2 each."),(0,s.pad)(e,t,a)}})}),x("ghY1H",function(e,t){a(e.exports,"pad4d",()=>o);var r=g("8cCb2"),n=g("jqSCG"),s=g("fSZF6");let o=(0,n.op)({pad4d_:function(e,t,a=0){return(0,r.assert)(4===t.length&&2===t[0].length&&2===t[1].length&&2===t[2].length&&2===t[3].length,()=>"Invalid number of paddings. Must be length of 2 each."),(0,s.pad)(e,t,a)}})}),x("9PaVS",function(e,t){a(e.exports,"pool",()=>c);var r=g("5xBLk"),n=g("8cCb2"),s=g("j4oHC"),o=g("31sZ7"),i=g("frznq"),l=g("gscJF"),u=g("jqSCG"),p=g("4sqA7"),d=g("ePI8Y");let c=(0,u.op)({pool_:function(e,t,a,u,c,h,f){let m;null==c&&(c=[1,1]),null==h&&(h=1),0===u&&(u="valid");let g=(0,r.convertToTensor)(e,"x","maxPool"),x=g,y=!1;3===g.rank&&(y=!0,x=(0,p.reshape)(g,[1,g.shape[0],g.shape[1],g.shape[2]])),n.assert(i.eitherStridesOrDilationsAreOne(h,c),()=>`Error in pool: Either strides or dilations must be 1. Got strides ${h} and dilations '${c}'`);let b=i.computePool2DInfo(x.shape,t,h,c,u),v=[b.dilationHeight,b.dilationWidth];m="same"===u?function(e,t){let r=e.map((e,r)=>e+(e-1)*(t[r]-1)).map(e=>e-1),a=r.map(e=>Math.floor(e/2)),n=r.map((e,t)=>e-a[t]);return r.map((e,t)=>[a[t],n[t]])}([b.filterHeight,b.filterWidth],v):[[0,0],[0,0]];let N=1===v[0]&&1===v[1],[k,T]=function(e,t,r){let a=r.map(e=>e[0]),n=r.map(e=>e[1]),s=e.concat(a,n),o=t.map((e,t)=>(e-s[t]%e)%e),i=n.map((e,t)=>e+o[t]);return[t.map((e,t)=>[a[t],i[t]]),t.map((e,t)=>[0,o[t]])]}([b.inHeight,b.inWidth],v,m),S=N?u:"valid",I=N?x:(0,d.spaceToBatchND)(x,v,k),w=("avg"===a?()=>(0,s.avgPool)(I,t,h,S,f):()=>(0,l.maxPool)(I,t,h,S,f))(),C=N?w:(0,o.batchToSpaceND)(w,v,T);return y?(0,p.reshape)(C,[C.shape[1],C.shape[2],C.shape[3]]):C}})}),x("ePI8Y",function(e,t){a(e.exports,"spaceToBatchND",()=>i);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk"),o=g("8cCb2");let i=(0,g("jqSCG").op)({spaceToBatchND_:function(e,t,a){let i=(0,s.convertToTensor)(e,"x","spaceToBatchND");return o.assert(i.rank>=1+t.length,()=>`input rank ${i.rank} should be > than [blockShape] ${t.length}`),o.assert(a.length===t.length,()=>`paddings.shape[0] ${a.length} must be equal to [blockShape] ${t.length}`),o.assert(i.shape.reduce((e,r,n)=>n>0&&n<=t.length?e&&(r+a[n-1][0]+a[n-1][1])%t[n-1]==0:e,!0),()=>`input spatial dimensions ${i.shape.slice(1)} with paddings ${a.toString()} must be divisible by blockShapes ${t.toString()}`),r.ENGINE.runKernel(n.SpaceToBatchND,{x:i},{blockShape:t,paddings:a})}})}),x("a3pvF",function(e,t){a(e.exports,"prelu",()=>o);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk");let o=(0,g("jqSCG").op)({prelu_:function(e,t){let a=(0,s.convertToTensor)(e,"x","prelu"),o=(0,s.convertToTensor)(t,"alpha","prelu");return r.ENGINE.runKernel(n.Prelu,{x:a,alpha:o})}})}),x("bWQC3",function(e,t){a(e.exports,"prod",()=>i);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk"),o=g("inFmq");let i=(0,g("jqSCG").op)({prod_:function(e,t=null,a=!1){let i=(0,s.convertToTensor)(e,"x","prod");"bool"===i.dtype&&(i=(0,o.cast)(i,"int32"));let l={x:i};return r.ENGINE.runKernel(n.Prod,l,{axis:t,keepDims:a})}})}),x("3MjiG",function(e,t){a(e.exports,"raggedGather",()=>o);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk");let o=(0,g("jqSCG").op)({raggedGather_:function(e,t,a,o){let i=e.map((e,t)=>(0,s.convertToTensor)(e,`tensors${t}`,"raggedGather","int32")),l=(0,s.convertToTensor)(t,"paramsDenseValues","raggedGather"),u=(0,s.convertToTensor)(a,"indices","raggedGather","int32"),p=r.ENGINE.runKernel(n.RaggedGather,{paramsNestedSplits:i,paramsDenseValues:l,indices:u},{outputRaggedRank:o});return{outputNestedSplits:p.slice(0,p.length-1),outputDenseValues:p[p.length-1]}}})}),x("6df7Q",function(e,t){a(e.exports,"raggedRange",()=>o);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk");let o=(0,g("jqSCG").op)({raggedRange_:function(e,t,a){let o=(0,s.convertToTensor)(e,"starts","raggedRange"),i=(0,s.convertToTensor)(t,"limits","raggedRange",o.dtype),l=(0,s.convertToTensor)(a,"deltas","raggedRange",o.dtype),u=r.ENGINE.runKernel(n.RaggedRange,{starts:o,limits:i,deltas:l});return{rtNestedSplits:u[0],rtDenseValues:u[1]}}})}),x("hRiiN",function(e,t){a(e.exports,"raggedTensorToTensor",()=>o);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk");let o=(0,g("jqSCG").op)({raggedTensorToTensor_:function(e,t,a,o,i){let l=(0,s.convertToTensor)(e,"shape","raggedTensorToTensor","int32"),u=(0,s.convertToTensor)(t,"values","raggedTensorToTensor"),p=(0,s.convertToTensor)(a,"defaultValue","raggedTensorToTensor",u.dtype),d=o.map((e,t)=>(0,s.convertToTensor)(e,`tensors${t}`,"raggedTensorToTensor","int32"));return r.ENGINE.runKernel(n.RaggedTensorToTensor,{shape:l,values:u,defaultValue:p,rowPartitionTensors:d},{rowPartitionTypes:i})}})}),x("bTXL0",function(e,t){a(e.exports,"rand",()=>s);var r=g("38WwN"),n=(g("8cCb2"),g("8cCb2"));let s=(0,g("jqSCG").op)({rand_:function(e,t,a){(0,n.assertNonNegativeIntegerDimensions)(e);let s=(0,n.sizeFromShape)(e),o=null;if(null==a||"float32"===a)o=new Float32Array(s);else if("int32"===a)o=new Int32Array(s);else if("bool"===a)o=new Uint8Array(s);else throw Error(`Unknown data type ${a}`);for(let e=0;e<s;e++)o[e]=t();return r.ENGINE.makeTensor(o,e,a)}})}),x("SB4J3",function(e,t){a(e.exports,"randomGamma",()=>i);var r=g("8cCb2"),n=g("iG87S"),s=g("jqSCG"),o=g("7QK6b");let i=(0,s.op)({randomGamma_:function(e,t,a=1,s="float32",i){if((0,r.assertNonNegativeIntegerDimensions)(e),null==a&&(a=1),null==s&&(s="float32"),"float32"!==s&&"int32"!==s)throw Error(`Unsupported data type ${s}`);let l=new(0,o.RandGamma)(t,a,s,i),u=(0,n.buffer)(e,s);for(let e=0;e<u.values.length;e++)u.values[e]=l.nextValue();return u.toTensor()}})}),x("7QK6b",function(e,t){a(e.exports,"MPRandGauss",()=>n),a(e.exports,"RandGamma",()=>s),a(e.exports,"UniformRandom",()=>o);var r=g("3mnBW");g("6thPa");class n{constructor(e,t,a,n,s){this.mean=e,this.stdDev=t,this.dtype=a,this.nextVal=NaN,this.truncated=n,this.truncated&&(this.upper=this.mean+2*this.stdDev,this.lower=this.mean-2*this.stdDev);let o=s||Math.random();this.random=r.alea(o.toString())}nextValue(){let e,t;if(!isNaN(this.nextVal)){let e=this.nextVal;return this.nextVal=NaN,e}let r=!1;for(;!r;){let a,n,s;do s=(a=2*this.random()-1)*a+(n=2*this.random()-1)*n;while(s>=1||0===s)let o=Math.sqrt(-2*Math.log(s)/s);e=this.mean+this.stdDev*a*o,t=this.mean+this.stdDev*n*o,(!this.truncated||this.isValidTruncated(e))&&(r=!0)}return(!this.truncated||this.isValidTruncated(t))&&(this.nextVal=this.convertValue(t)),this.convertValue(e)}convertValue(e){return null==this.dtype||"float32"===this.dtype?e:Math.round(e)}isValidTruncated(e){return e<=this.upper&&e>=this.lower}}class s{constructor(e,t,a,s){this.alpha=e,this.beta=1/t,this.dtype=a;let o=s||Math.random();this.randu=r.alea(o.toString()),this.randn=new n(0,1,a,!1,this.randu()),e<1?this.d=e+2/3:this.d=e-1/3,this.c=1/Math.sqrt(9*this.d)}nextValue(){let e,t,r,a,n,s;for(;;){do a=this.randn.nextValue(),s=1+this.c*a;while(s<=0)if(s*=s*s,t=1-.331*(e=a*a)*e,r=.5*e+this.d*(1-s+Math.log(s)),(n=this.randu())<t||Math.log(n)<r)break}return s=1/this.beta*this.d*s,this.alpha<1&&(s*=Math.pow(this.randu(),1/this.alpha)),this.convertValue(s)}convertValue(e){return"float32"===this.dtype?e:Math.round(e)}}class o{constructor(e=0,t=1,a,n){if(this.canReturnFloat=()=>null==this.dtype||"float32"===this.dtype,this.min=e,this.range=t-e,this.dtype=a,null==n&&(n=Math.random()),"number"==typeof n&&(n=n.toString()),!this.canReturnFloat()&&this.range<=1)throw Error(`The difference between ${e} - ${t} <= 1 and dtype is not float`);this.random=r.alea(n)}convertValue(e){return this.canReturnFloat()?e:Math.round(e)}nextValue(){return this.convertValue(this.min+this.range*this.random())}}}),x("3mnBW",function(e,t){var r=g("cmoHh"),a=g("euRi5"),n=g("hDsEw"),s=g("3J2Zm"),o=g("6Px8M"),i=g("lDm0S"),l=g("ixfky");l.alea=r,l.xor128=a,l.xorwow=n,l.xorshift7=s,l.xor4096=o,l.tychei=i,e.exports=l}),x("cmoHh",function(e,t){!function(e,t,r){function a(e){var t,r=this,a=(t=0xefc8249d,function(e){e=String(e);for(var r=0;r<e.length;r++){var a=.02519603282416938*(t+=e.charCodeAt(r));t=a>>>0,a-=t,a*=t,t=a>>>0,a-=t,t+=0x100000000*a}return(t>>>0)*23283064365386963e-26});r.next=function(){var e=2091639*r.s0+23283064365386963e-26*r.c;return r.s0=r.s1,r.s1=r.s2,r.s2=e-(r.c=0|e)},r.c=1,r.s0=a(" "),r.s1=a(" "),r.s2=a(" "),r.s0-=a(e),r.s0<0&&(r.s0+=1),r.s1-=a(e),r.s1<0&&(r.s1+=1),r.s2-=a(e),r.s2<0&&(r.s2+=1)}function n(e,t){return t.c=e.c,t.s0=e.s0,t.s1=e.s1,t.s2=e.s2,t}function s(e,t){var r=new a(e),s=t&&t.state,o=r.next;return o.int32=function(){return 0x100000000*r.next()|0},o.double=function(){return o()+(2097152*o()|0)*11102230246251565e-32},o.quick=o,s&&("object"==typeof s&&n(s,r),o.state=function(){return n(r,{})}),o}t&&t.exports?t.exports=s:r&&r.amd?r(function(){return s}):this.alea=s}(0,e,"function"==typeof define&&define)}),x("euRi5",function(e,t){!function(e,t,r){function a(e){var t=this,r="";t.x=0,t.y=0,t.z=0,t.w=0,t.next=function(){var e=t.x^t.x<<11;return t.x=t.y,t.y=t.z,t.z=t.w,t.w^=t.w>>>19^e^e>>>8},e===(0|e)?t.x=e:r+=e;for(var a=0;a<r.length+64;a++)t.x^=r.charCodeAt(a),t.next()}function n(e,t){return t.x=e.x,t.y=e.y,t.z=e.z,t.w=e.w,t}function s(e,t){var r=new a(e),s=t&&t.state,o=function(){return(r.next()>>>0)/0x100000000};return o.double=function(){do var e=r.next()>>>11,t=(r.next()>>>0)/0x100000000,a=(e+t)/2097152;while(0===a)return a},o.int32=r.next,o.quick=o,s&&("object"==typeof s&&n(s,r),o.state=function(){return n(r,{})}),o}t&&t.exports?t.exports=s:r&&r.amd?r(function(){return s}):this.xor128=s}(0,e,"function"==typeof define&&define)}),x("hDsEw",function(e,t){!function(e,t,r){function a(e){var t=this,r="";t.next=function(){var e=t.x^t.x>>>2;return t.x=t.y,t.y=t.z,t.z=t.w,t.w=t.v,(t.d=t.d+362437|0)+(t.v=t.v^t.v<<4^(e^e<<1))|0},t.x=0,t.y=0,t.z=0,t.w=0,t.v=0,e===(0|e)?t.x=e:r+=e;for(var a=0;a<r.length+64;a++)t.x^=r.charCodeAt(a),a==r.length&&(t.d=t.x<<10^t.x>>>4),t.next()}function n(e,t){return t.x=e.x,t.y=e.y,t.z=e.z,t.w=e.w,t.v=e.v,t.d=e.d,t}function s(e,t){var r=new a(e),s=t&&t.state,o=function(){return(r.next()>>>0)/0x100000000};return o.double=function(){do var e=r.next()>>>11,t=(r.next()>>>0)/0x100000000,a=(e+t)/2097152;while(0===a)return a},o.int32=r.next,o.quick=o,s&&("object"==typeof s&&n(s,r),o.state=function(){return n(r,{})}),o}t&&t.exports?t.exports=s:r&&r.amd?r(function(){return s}):this.xorwow=s}(0,e,"function"==typeof define&&define)}),x("3J2Zm",function(e,t){!function(e,t,r){function a(e){var t=this;t.next=function(){var e,r,a=t.x,n=t.i;return e=a[n],e^=e>>>7,r=e^e<<24^((e=a[n+1&7])^e>>>10)^((e=a[n+3&7])^e>>>3)^((e=a[n+4&7])^e<<7),e=a[n+7&7],e^=e<<13,r^=e^e<<9,a[n]=r,t.i=n+1&7,r};var r,a=e,n=[];if(a===(0|a))n[0]=a;else for(r=0,a=""+a;r<a.length;++r)n[7&r]=n[7&r]<<15^a.charCodeAt(r)+n[r+1&7]<<13;for(;n.length<8;)n.push(0);for(r=0;r<8&&0===n[r];++r);for(8==r?n[7]=-1:n[r],t.x=n,t.i=0,r=256;r>0;--r)t.next()}function n(e,t){return t.x=e.x.slice(),t.i=e.i,t}function s(e,t){null==e&&(e=+new Date);var r=new a(e),s=t&&t.state,o=function(){return(r.next()>>>0)/0x100000000};return o.double=function(){do var e=r.next()>>>11,t=(r.next()>>>0)/0x100000000,a=(e+t)/2097152;while(0===a)return a},o.int32=r.next,o.quick=o,s&&(s.x&&n(s,r),o.state=function(){return n(r,{})}),o}t&&t.exports?t.exports=s:r&&r.amd?r(function(){return s}):this.xorshift7=s}(0,e,"function"==typeof define&&define)}),x("6Px8M",function(e,t){!function(e,t,r){function a(e){var t=this;t.next=function(){var e,r,a=t.w,n=t.X,s=t.i;return t.w=a=a+0x61c88647|0,r=n[s+34&127],e=n[s=s+1&127],r^=r<<13,e^=e<<17,r^=r>>>15,e^=e>>>12,r=n[s]=r^e,t.i=s,r+(a^a>>>16)|0},!function(e,t){var r,a,n,s,o,i=[],l=128;for(t===(0|t)?(a=t,t=null):(t+="\0",a=0,l=Math.max(l,t.length)),n=0,s=-32;s<l;++s)t&&(a^=t.charCodeAt((s+32)%t.length)),0===s&&(o=a),a^=a<<10,a^=a>>>15,a^=a<<4,a^=a>>>13,s>=0&&(o=o+0x61c88647|0,n=0==(r=i[127&s]^=a+o)?n+1:0);for(n>=128&&(i[127&(t&&t.length||0)]=-1),n=127,s=512;s>0;--s)a=i[n+34&127],r=i[n=n+1&127],a^=a<<13,r^=r<<17,a^=a>>>15,r^=r>>>12,i[n]=a^r;e.w=o,e.X=i,e.i=n}(t,e)}function n(e,t){return t.i=e.i,t.w=e.w,t.X=e.X.slice(),t}function s(e,t){null==e&&(e=+new Date);var r=new a(e),s=t&&t.state,o=function(){return(r.next()>>>0)/0x100000000};return o.double=function(){do var e=r.next()>>>11,t=(r.next()>>>0)/0x100000000,a=(e+t)/2097152;while(0===a)return a},o.int32=r.next,o.quick=o,s&&(s.X&&n(s,r),o.state=function(){return n(r,{})}),o}t&&t.exports?t.exports=s:r&&r.amd?r(function(){return s}):this.xor4096=s}(0,e,"function"==typeof define&&define)}),x("lDm0S",function(e,t){!function(e,t,r){function a(e){var t=this,r="";t.next=function(){var e=t.b,r=t.c,a=t.d,n=t.a;return e=e<<25^e>>>7^r,r=r-a|0,a=a<<24^a>>>8^n,n=n-e|0,t.b=e=e<<20^e>>>12^r,t.c=r=r-a|0,t.d=a<<16^r>>>16^n,t.a=n-e|0},t.a=0,t.b=0,t.c=-0x61c88647,t.d=0x517cc1b7,e===Math.floor(e)?(t.a=e/0x100000000|0,t.b=0|e):r+=e;for(var a=0;a<r.length+20;a++)t.b^=r.charCodeAt(a),t.next()}function n(e,t){return t.a=e.a,t.b=e.b,t.c=e.c,t.d=e.d,t}function s(e,t){var r=new a(e),s=t&&t.state,o=function(){return(r.next()>>>0)/0x100000000};return o.double=function(){do var e=r.next()>>>11,t=(r.next()>>>0)/0x100000000,a=(e+t)/2097152;while(0===a)return a},o.int32=r.next,o.quick=o,s&&("object"==typeof s&&n(s,r),o.state=function(){return n(r,{})}),o}t&&t.exports?t.exports=s:r&&r.amd?r(function(){return s}):this.tychei=s}(0,e,"function"==typeof define&&define)}),x("ixfky",function(e,t){!function(t,r,a){var n,s="random",o=a.pow(256,6),i=a.pow(2,52),l=2*i;function u(e,u,f){var m=[],g=c(function e(t,r){var a,n=[],s=typeof t;if(r&&"object"==s)for(a in t)try{n.push(e(t[a],r-1))}catch(e){}return n.length?n:"string"==s?t:t+"\0"}((u=!0==u?{entropy:!0}:u||{}).entropy?[e,h(r)]:null==e?function(){try{var e;return n&&(e=n.randomBytes)?e=e(256):(e=new Uint8Array(256),(t.crypto||t.msCrypto).getRandomValues(e)),h(e)}catch(e){var a=t.navigator,s=a&&a.plugins;return[+new Date,t,s,t.screen,h(r)]}}():e,3),m),x=new p(m),y=function(){for(var e=x.g(6),t=o,r=0;e<i;)e=(e+r)*256,t*=256,r=x.g(1);for(;e>=l;)e/=2,t/=2,r>>>=1;return(e+r)/t};return y.int32=function(){return 0|x.g(4)},y.quick=function(){return x.g(4)/0x100000000},y.double=y,c(h(x.S),r),(u.pass||f||function(e,t,r,n){return(n&&(n.S&&d(n,x),e.state=function(){return d(x,{})}),r)?(a[s]=e,t):e})(y,g,"global"in u?u.global:this==a,u.state)}function p(e){var t,r=e.length,a=this,n=0,s=a.i=a.j=0,o=a.S=[];for(r||(e=[r++]);n<256;)o[n]=n++;for(n=0;n<256;n++)o[n]=o[s=255&s+e[n%r]+(t=o[n])],o[s]=t;(a.g=function(e){for(var t,r=0,n=a.i,s=a.j,o=a.S;e--;)t=o[n=255&n+1],r=256*r+o[255&(o[n]=o[s=255&s+t])+(o[s]=t)];return a.i=n,a.j=s,r})(256)}function d(e,t){return t.i=e.i,t.j=e.j,t.S=e.S.slice(),t}function c(e,t){for(var r,a=e+"",n=0;n<a.length;)t[255&n]=255&(r^=19*t[255&n])+a.charCodeAt(n++);return h(t)}function h(e){return String.fromCharCode.apply(0,e)}if(c(a.random(),r),e.exports){e.exports=u;try{n=g("kjyEk")}catch(e){}}else"function"==typeof define&&define.amd?define(function(){return u}):a["seed"+s]=u}("undefined"!=typeof self?self:e.exports,[],Math)}),x("h2Vnz",function(e,t){a(e.exports,"randomNormal",()=>i);var r=g("8cCb2"),n=g("iG87S"),s=g("jqSCG"),o=g("7QK6b");let i=(0,s.op)({randomNormal_:function(e,t=0,a=1,s,i){if((0,r.assertNonNegativeIntegerDimensions)(e),null!=s&&"bool"===s)throw Error(`Unsupported data type ${s}`);let l=new(0,o.MPRandGauss)(t,a,s,!1,i),u=(0,n.buffer)(e,s);for(let e=0;e<u.values.length;e++)u.values[e]=l.nextValue();return u.toTensor()}})}),x("kVqJN",function(e,t){a(e.exports,"randomStandardNormal",()=>s);var r=g("jqSCG"),n=g("h2Vnz");let s=(0,r.op)({randomStandardNormal_:function(e,t,r){if(null!=t&&"bool"===t)throw Error(`Unsupported data type ${t}`);return(0,n.randomNormal)(e,0,1,t,r)}})}),x("j8sic",function(e,t){a(e.exports,"randomUniform",()=>i);var r=g("8cCb2"),n=g("iG87S"),s=g("jqSCG"),o=g("7QK6b");let i=(0,s.op)({randomUniform_:function(e,t=0,a=1,s="float32",i){(0,r.assertNonNegativeIntegerDimensions)(e);let l=(0,n.buffer)(e,s),u=new(0,o.UniformRandom)(t,a,null,i);for(let e=0;e<l.values.length;e++)l.values[e]=u.nextValue();return l.toTensor()}})}),x("edlzT",function(e,t){a(e.exports,"randomUniformInt",()=>s);var r=g("jqSCG"),n=g("j8sic");let s=(0,r.op)({randomUniformInt_:function(e,t,r,a){return(0,n.randomUniform)(e,t,r,"int32",a)}})}),x("80Ety",function(e,t){a(e.exports,"range",()=>s);var r=g("38WwN"),n=g("hl418");function s(e,t,a=1,o="float32"){if(0===a)throw Error("Cannot have a step of zero");return r.ENGINE.runKernel(n.Range,{},{start:e,stop:t,step:a,dtype:o})}}),x("3aqJ6",function(e,t){a(e.exports,"reciprocal",()=>o);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk");let o=(0,g("jqSCG").op)({reciprocal_:function(e){let t=(0,s.convertToTensor)(e,"x","reciprocal");return r.ENGINE.runKernel(n.Reciprocal,{x:t})}})}),x("8wbQq",function(e,t){a(e.exports,"relu",()=>o);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk");let o=(0,g("jqSCG").op)({relu_:function(e){let t=(0,s.convertToTensor)(e,"x","relu");return r.ENGINE.runKernel(n.Relu,{x:t})}})}),x("fvNYr",function(e,t){a(e.exports,"relu6",()=>o);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk");let o=(0,g("jqSCG").op)({relu6_:function(e){let t=(0,s.convertToTensor)(e,"x","relu6");return r.ENGINE.runKernel(n.Relu6,{x:t})}})}),x("6act6",function(e,t){a(e.exports,"reverse",()=>o);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk");let o=(0,g("jqSCG").op)({reverse_:function(e,t){let a=(0,s.convertToTensor)(e,"x","reverse");return r.ENGINE.runKernel(n.Reverse,{x:a},{dims:t})}})}),x("2KcE1",function(e,t){a(e.exports,"reverse1d",()=>i);var r=g("5xBLk"),n=g("8cCb2"),s=g("jqSCG"),o=g("6act6");let i=(0,s.op)({reverse1d_:function(e){let t=(0,r.convertToTensor)(e,"x","reverse");return n.assert(1===t.rank,()=>`Error in reverse1D: x must be rank 1 but got rank ${t.rank}.`),(0,o.reverse)(t,0)}})}),x("8EvRg",function(e,t){a(e.exports,"reverse2d",()=>i);var r=g("5xBLk"),n=g("8cCb2"),s=g("jqSCG"),o=g("6act6");let i=(0,s.op)({reverse2d_:function(e,t){let a=(0,r.convertToTensor)(e,"x","reverse");return n.assert(2===a.rank,()=>`Error in reverse2D: x must be rank 2 but got rank ${a.rank}.`),(0,o.reverse)(a,t)}})}),x("c9r0k",function(e,t){a(e.exports,"reverse3d",()=>i);var r=g("5xBLk"),n=g("8cCb2"),s=g("jqSCG"),o=g("6act6");let i=(0,s.op)({reverse3d_:function(e,t){let a=(0,r.convertToTensor)(e,"x","reverse");return n.assert(3===a.rank,()=>`Error in reverse3D: x must be rank 3 but got rank ${a.rank}.`),(0,o.reverse)(a,t)}})}),x("bFrHw",function(e,t){a(e.exports,"reverse4d",()=>i);var r=g("5xBLk"),n=g("8cCb2"),s=g("jqSCG"),o=g("6act6");let i=(0,s.op)({reverse4d_:function(e,t){let a=(0,r.convertToTensor)(e,"x","reverse");return n.assert(4===a.rank,()=>`Error in reverse4D: x must be rank 4 but got rank ${a.rank}.`),(0,o.reverse)(a,t)}})}),x("9YKoa",function(e,t){a(e.exports,"round",()=>o);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk");let o=(0,g("jqSCG").op)({round_:function(e){let t=(0,s.convertToTensor)(e,"x","round");return r.ENGINE.runKernel(n.Round,{x:t})}})}),x("5pj7R",function(e,t){a(e.exports,"rsqrt",()=>o);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk");let o=(0,g("jqSCG").op)({rsqrt_:function(e){let t=(0,s.convertToTensor)(e,"x","rsqrt","float32");return r.ENGINE.runKernel(n.Rsqrt,{x:t})}})}),x("b636r",function(e,t){a(e.exports,"selu",()=>o);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk");let o=(0,g("jqSCG").op)({selu_:function(e){let t=(0,s.convertToTensor)(e,"x","selu");return r.ENGINE.runKernel(n.Selu,{x:t})}})}),x("8uLn4",function(e,t){a(e.exports,"separableConv2d",()=>u);var r=g("5xBLk"),n=g("8cCb2"),s=g("5Nkm1"),o=g("182Rc"),i=g("jqSCG"),l=g("4sqA7");let u=(0,i.op)({separableConv2d_:function(e,t,a,i,u,p=[1,1],d="NHWC"){let c=(0,r.convertToTensor)(e,"x","separableConv2d"),h=(0,r.convertToTensor)(t,"depthwiseFilter","separableConv2d"),f=(0,r.convertToTensor)(a,"pointwiseFilter","separableConv2d"),m=c,g=!1;if(3===c.rank&&(g=!0,m=(0,l.reshape)(c,[1,c.shape[0],c.shape[1],c.shape[2]])),"NCHW"===d)throw Error("separableConv2d currently does not support dataFormat NCHW; only NHWC is supported");n.assert(4===m.rank,()=>`Error in separableConv2d: input must be rank 4, but got rank ${m.rank}.`),n.assert(4===h.rank,()=>`Error in separableConv2d: depthwise filter must be rank 4, but got rank ${h.rank}.`),n.assert(4===f.rank,()=>`Error in separableConv2d: pointwise filter must be rank 4, but got rank ${h.rank}.`),n.assert(1===f.shape[0],()=>`Error in separableConv2d: the first dimension of pointwise filter  must be 1, but got ${f.shape[0]}.`),n.assert(1===f.shape[1],()=>`Error in separableConv2d: the second dimension of pointwise filter must be 1, but got ${f.shape[1]}.`);let x=h.shape[2],y=h.shape[3];n.assert(f.shape[2]===x*y,()=>`Error in separableConv2d: the third dimension of pointwise filter must be ${x*y}, but got ${f.shape[2]}.`);let b=(0,o.depthwiseConv2d)(m,h,i,u,d,p),v=(0,s.conv2d)(b,f,1,"valid",d);return g?(0,l.reshape)(v,[v.shape[1],v.shape[2],v.shape[3]]):v}})}),x("d05b8",function(e,t){a(e.exports,"setdiff1dAsync",()=>o);var r=g("9jCh7"),n=g("5xBLk"),s=g("8cCb2");let o=async function(e,t){let a=(0,n.convertToTensor)(e,"x","setdiff1d"),o=(0,n.convertToTensor)(t,"y","setdiff1d");s.assert(a.dtype===o.dtype,()=>`x and y should have the same dtype, but got x (${a.dtype}) and y (${o.dtype}).`),s.assert(1===a.rank,()=>`x should be 1D tensor, but got x (${a.shape}).`),s.assert(1===o.rank,()=>`y should be 1D tensor, but got y (${o.shape}).`);let i=await a.data(),l=new Set(await o.data()),u=0;for(let e=0;e<i.length;e++)!l.has(i[e])&&u++;let p=new(0,r.TensorBuffer)([u],a.dtype),d=new(0,r.TensorBuffer)([u],"int32");for(let e=0,t=0;e<i.length;e++)!l.has(i[e])&&(p.values[t]=i[e],d.values[t]=e,t++);return[p.toTensor(),d.toTensor()]}}),x("3zBCT",function(e,t){a(e.exports,"sign",()=>o);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk");let o=(0,g("jqSCG").op)({sign_:function(e){let t=(0,s.convertToTensor)(e,"x","sign");return r.ENGINE.runKernel(n.Sign,{x:t})}})}),x("4xqM7",function(e,t){a(e.exports,"sin",()=>o);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk");let o=(0,g("jqSCG").op)({sin_:function(e){let t=(0,s.convertToTensor)(e,"x","sin","float32");return r.ENGINE.runKernel(n.Sin,{x:t})}})}),x("fAOzm",function(e,t){a(e.exports,"sinh",()=>o);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk");let o=(0,g("jqSCG").op)({sinh_:function(e){let t=(0,s.convertToTensor)(e,"x","sinh");return r.ENGINE.runKernel(n.Sinh,{x:t})}})}),x("5vfHb",function(e,t){a(e.exports,"slice1d",()=>i);var r=g("5xBLk"),n=g("8cCb2"),s=g("jqSCG"),o=g("79KOG");let i=(0,s.op)({slice1d_:function(e,t,a){let s=(0,r.convertToTensor)(e,"x","slice1d");return n.assert(1===s.rank,()=>`slice1d expects a rank-1 tensor, but got a rank-${s.rank} tensor`),(0,o.slice)(s,[t],[a])}})}),x("gKBEV",function(e,t){a(e.exports,"slice2d",()=>i);var r=g("5xBLk"),n=g("8cCb2"),s=g("jqSCG"),o=g("79KOG");let i=(0,s.op)({slice2d_:function(e,t,a){let s=(0,r.convertToTensor)(e,"x","slice2d");return n.assert(2===s.rank,()=>`slice2d expects a rank-2 tensor, but got a rank-${s.rank} tensor`),(0,o.slice)(s,t,a)}})}),x("22oMq",function(e,t){a(e.exports,"slice3d",()=>i);var r=g("5xBLk"),n=g("8cCb2"),s=g("jqSCG"),o=g("79KOG");let i=(0,s.op)({slice3d_:function(e,t,a){let s=(0,r.convertToTensor)(e,"x","slice3d");return n.assert(3===s.rank,()=>`slice3d expects a rank-3 tensor, but got a rank-${s.rank} tensor`),(0,o.slice)(s,t,a)}})}),x("8hEpb",function(e,t){a(e.exports,"slice4d",()=>i);var r=g("5xBLk"),n=g("8cCb2"),s=g("jqSCG"),o=g("79KOG");let i=(0,s.op)({slice4d_:function(e,t,a){let s=(0,r.convertToTensor)(e,"x","slice4d");return n.assert(4===s.rank,()=>`slice4d expects a rank-4 tensor, but got a rank-${s.rank} tensor`),(0,o.slice)(s,t,a)}})}),x("dnEu5",function(e,t){a(e.exports,"softmax",()=>o);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk");let o=(0,g("jqSCG").op)({softmax_:function(e,t=-1){let a=(0,s.convertToTensor)(e,"logits","softmax","float32");if(-1===t&&(t=a.rank-1),t!==a.rank-1)throw Error(`Softmax along a non-last dimension is not yet supported. Logits was rank ${a.rank} and dim was ${t}`);let o={dim:t};return r.ENGINE.runKernel(n.Softmax,{logits:a},o)}})}),x("1Lg9u",function(e,t){a(e.exports,"fft",()=>o);var r=g("38WwN"),n=g("hl418"),s=g("8cCb2");let o=(0,g("jqSCG").op)({fft_:function(e){return(0,s.assert)("complex64"===e.dtype,()=>`The dtype for tf.spectral.fft() must be complex64 but got ${e.dtype}.`),r.ENGINE.runKernel(n.FFT,{input:e})}})}),x("3l9Cr",function(e,t){a(e.exports,"ifft",()=>o);var r=g("38WwN"),n=g("hl418"),s=g("8cCb2");let o=(0,g("jqSCG").op)({ifft_:function(e){return(0,s.assert)("complex64"===e.dtype,()=>`The dtype for tf.spectral.ifft() must be complex64 but got ${e.dtype}.`),r.ENGINE.runKernel(n.IFFT,{input:e})}})}),x("hrsi6",function(e,t){a(e.exports,"irfft",()=>f);var r=g("20oDZ"),n=g("iTu6j"),s=g("1d8KH"),o=g("jZc0w"),i=g("jqSCG"),l=g("b7x1G"),u=g("4sqA7"),p=g("6act6"),d=g("3xp7o"),c=g("79KOG"),h=g("3l9Cr");let f=(0,i.op)({irfft_:function(e){let t,a=e.shape[e.shape.length-1],i=e.size/a;if(a<=2){let r=(0,u.reshape)(e,[i,a]);t=(0,h.ifft)(r)}else{let f=[i,2*(a-1)],m=(0,u.reshape)((0,l.real)(e),[i,a]),g=(0,u.reshape)((0,s.imag)(e),[i,a]),x=(0,p.reverse)((0,c.slice)(m,[0,1],[i,a-2]),1),y=(0,o.mul)((0,p.reverse)((0,c.slice)(g,[0,1],[i,a-2]),1),(0,d.scalar)(-1)),b=(0,n.concat)([m,x],1),v=(0,n.concat)([g,y],1),N=(0,u.reshape)((0,r.complex)(b,v),[f[0],f[1]]);t=(0,h.ifft)(N)}if(t=(0,l.real)(t),3===e.rank&&0!==e.shape[0]){let r=t,a=e.shape[0];t=(0,u.reshape)(t,[a,t.shape[0]/a,t.shape[1]]),r.dispose()}return t}})}),x("cafDa",function(e,t){a(e.exports,"rfft",()=>m);var r=g("8cCb2"),n=g("20oDZ"),s=g("iTu6j"),o=g("1d8KH"),i=g("jqSCG"),l=g("b7x1G"),u=g("4sqA7"),p=g("79KOG"),d=g("9fmAX"),c=g("hxi4c"),h=g("8EjnK"),f=g("1Lg9u");let m=(0,i.op)({rfft_:function(e,t){let a;(0,r.assert)("float32"===e.dtype,()=>`The dtype for rfft() must be real value but got ${e.dtype}`);let i=e.shape[e.shape.length-1],m=e.size/i;if(null!=t&&t<i){let r=e.shape.map(e=>0),n=e.shape.map(e=>e);n[e.shape.length-1]=t,a=(0,p.slice)(e,r,n),i=t}else if(null!=t&&t>i){let r=e.shape.map(e=>e);r[e.shape.length-1]=t-i,a=(0,s.concat)([e,(0,c.zeros)(r)],e.shape.length-1),i=t}else a=e;let g=(0,h.zerosLike)(a),x=(0,u.reshape)((0,n.complex)(a,g),[m,i]),y=(0,f.fft)(x),b=Math.floor(i/2)+1,v=(0,l.real)(y),N=(0,o.imag)(y),k=(0,d.split)(v,[b,i-b],v.shape.length-1),T=(0,d.split)(N,[b,i-b],N.shape.length-1),S=a.shape.slice();return S[a.shape.length-1]=b,(0,u.reshape)((0,n.complex)(k[0],T[0]),S)}})}),x("9fmAX",function(e,t){a(e.exports,"split",()=>o);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk");let o=(0,g("jqSCG").op)({split_:function(e,t,a=0){let o=(0,s.convertToTensor)(e,"x","split");return r.ENGINE.runKernel(n.SplitV,{x:o},{numOrSizeSplits:t,axis:a})}})}),x("ay2Nw",function(e,t){a(e.exports,"squaredDifference",()=>l);var r=g("38WwN"),n=g("hl418"),s=g("3w4Rg"),o=g("5xBLk"),i=g("8BaGO");let l=(0,g("jqSCG").op)({squaredDifference_:function(e,t){let a=(0,o.convertToTensor)(e,"a","squaredDifference"),l=(0,o.convertToTensor)(t,"b","squaredDifference");[a,l]=(0,s.makeTypesMatch)(a,l),(0,i.assertAndGetBroadcastShape)(a.shape,l.shape);let u={a:a,b:l};return r.ENGINE.runKernel(n.SquaredDifference,u,{})}})}),x("kX8Hd",function(e,t){a(e.exports,"squeeze",()=>i);var r=g("5xBLk"),n=g("8cCb2"),s=g("jqSCG"),o=g("4sqA7");let i=(0,s.op)({squeeze_:function(e,t){let a=(0,r.convertToTensor)(e,"x","squeeze","string_or_numeric");return(0,o.reshape)(a,(0,n.squeezeShape)(a.shape,t).newShape)}})}),x("8BrLX",function(e,t){a(e.exports,"stack",()=>i);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk"),o=g("8cCb2");let i=(0,g("jqSCG").op)({stack_:function(e,t=0){let a=(0,s.convertToTensorArray)(e,"tensors","stack","string_or_numeric");return o.assert(a.length>=1,()=>"Pass at least one tensor to tf.stack"),a.length>0&&o.assert(t<=a[0].rank,()=>"Axis must be <= rank of the tensor"),r.ENGINE.runKernel(n.Pack,a,{axis:t})}})}),x("lWdx1",function(e,t){a(e.exports,"step",()=>o);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk");let o=(0,g("jqSCG").op)({step_:function(e,t=0){let a=(0,s.convertToTensor)(e,"x","step");return r.ENGINE.runKernel(n.Step,{x:a},{alpha:t})}})}),x("dqRnt",function(e,t){a(e.exports,"stridedSlice",()=>o);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk");let o=(0,g("jqSCG").op)({stridedSlice_:function(e,t,a,o,i=0,l=0,u=0,p=0,d=0){let c=(0,s.convertToTensor)(e,"x","stridedSlice","string_or_numeric");return r.ENGINE.runKernel(n.StridedSlice,{x:c},{begin:t,end:a,strides:o,beginMask:i,endMask:l,ellipsisMask:u,newAxisMask:p,shrinkAxisMask:d})}})}),x("l8Hok",function(e,t){a(e.exports,"tan",()=>o);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk");let o=(0,g("jqSCG").op)({tan_:function(e){let t=(0,s.convertToTensor)(e,"x","tan","float32");return r.ENGINE.runKernel(n.Tan,{x:t})}})}),x("lalFM",function(e,t){a(e.exports,"tensor1d",()=>o);var r=g("5xBLk"),n=g("8cCb2"),s=g("dKr4X");function o(e,t){(0,n.assertNonNull)(e);let a=(0,r.inferShape)(e,t);if(1!==a.length)throw Error("tensor1d() requires values to be a flat/TypedArray");return(0,s.makeTensor)(e,null,a,t)}}),x("gmMlv",function(e,t){a(e.exports,"tensor2d",()=>o);var r=g("5xBLk"),n=g("8cCb2"),s=g("dKr4X");function o(e,t,a){if((0,n.assertNonNull)(e),null!=t&&2!==t.length)throw Error("tensor2d() requires shape to have two numbers");let o=(0,r.inferShape)(e,a);if(2!==o.length&&1!==o.length)throw Error("tensor2d() requires values to be number[][] or flat/TypedArray");if(1===o.length&&null==t)throw Error("tensor2d() requires shape to be provided when `values` are a flat/TypedArray");return(0,s.makeTensor)(e,t,o,a)}}),x("6BSQ6",function(e,t){a(e.exports,"tensor4d",()=>o);var r=g("5xBLk"),n=g("8cCb2"),s=g("dKr4X");function o(e,t,a){if((0,n.assertNonNull)(e),null!=t&&4!==t.length)throw Error("tensor4d() requires shape to have four numbers");let o=(0,r.inferShape)(e,a);if(4!==o.length&&1!==o.length)throw Error("tensor4d() requires values to be number[][][][] or flat/TypedArray");if(1===o.length&&null==t)throw Error("tensor4d() requires shape to be provided when `values` are a flat array");return(0,s.makeTensor)(e,t,o,a)}}),x("fjd6b",function(e,t){a(e.exports,"tensor5d",()=>o);var r=g("5xBLk"),n=g("8cCb2"),s=g("dKr4X");function o(e,t,a){if((0,n.assertNonNull)(e),null!=t&&5!==t.length)throw Error("tensor5d() requires shape to have five numbers");let o=(0,r.inferShape)(e,a);if(5!==o.length&&1!==o.length)throw Error("tensor5d() requires values to be number[][][][][] or flat/TypedArray");if(1===o.length&&null==t)throw Error("tensor5d() requires shape to be provided when `values` are a flat array");return(0,s.makeTensor)(e,t,o,a)}}),x("gCuDf",function(e,t){a(e.exports,"tensor6d",()=>o);var r=g("5xBLk"),n=g("8cCb2"),s=g("dKr4X");function o(e,t,a){if((0,n.assertNonNull)(e),null!=t&&6!==t.length)throw Error("tensor6d() requires shape to have six numbers");let o=(0,r.inferShape)(e,a);if(6!==o.length&&1!==o.length)throw Error("tensor6d() requires values to be number[][][][][][] or flat/TypedArray");if(1===o.length&&null==t)throw Error("tensor6d() requires shape to be provided when `values` are a flat array");return t=t||o,(0,s.makeTensor)(e,t,o,a)}}),x("4om7p",function(e,t){a(e.exports,"tensorScatterUpdate",()=>l);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk"),o=g("jqSCG"),i=g("7wQGW");let l=(0,o.op)({tensorScatterUpdate_:function(e,t,a){let o=(0,s.convertToTensor)(e,"tensor","tensorScatterupdate"),l=(0,s.convertToTensor)(t,"indices","tensorScatterupdate","int32"),u=(0,s.convertToTensor)(a,"updates","tensorScatterupdate");if(i.validateInput(u,l,o.shape),o.dtype!==u.dtype)throw Error(`tensor and updates must have the same dtype, instead they are ${o.dtype} and ${u.dtype}.`);return r.ENGINE.runKernel(n.TensorScatterUpdate,{tensor:o,indices:l,updates:u},{})}})}),x("cRAvI",function(e,t){a(e.exports,"topk",()=>o);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk");let o=(0,g("jqSCG").op)({topk_:function(e,t=1,a=!0){let o=(0,s.convertToTensor)(e,"x","topk");if(0===o.rank)throw Error("topk() expects the input to be of rank 1 or higher");let i=o.shape[o.shape.length-1];if(t<0)throw Error(`'k' passed to topk() must be >= 0 but got ${t}`);if(t>i)throw Error(`'k' passed to topk() must be <= the last dimension (${i}) but got ${t}`);let[l,u]=r.ENGINE.runKernel(n.TopK,{x:o},{k:t,sorted:a});return{values:l,indices:u}}})}),x("dE1HO",function(e,t){a(e.exports,"truncatedNormal",()=>i);var r=g("8cCb2"),n=g("iG87S"),s=g("jqSCG"),o=g("7QK6b");let i=(0,s.op)({truncatedNormal_:function(e,t=0,a=1,s,i){if((0,r.assertNonNegativeIntegerDimensions)(e),null!=s&&"bool"===s)throw Error("Unsupported data type $ { dtype }");let l=new(0,o.MPRandGauss)(t,a,s,!0,i),u=(0,n.buffer)(e,s);for(let e=0;e<u.values.length;e++)u.values[e]=l.nextValue();return u.toTensor()}})}),x("aEpp6",function(e,t){a(e.exports,"unique",()=>i);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk"),o=g("8cCb2");let i=(0,g("jqSCG").op)({unique_:function(e,t=0){let a=(0,s.convertToTensor)(e,"x","unique","string_or_numeric");(0,o.assert)(a.rank>0,()=>"The input tensor must be at least 1D");let[i,l]=r.ENGINE.runKernel(n.Unique,{x:a},{axis:t});return{values:i,indices:l}}})}),x("djGEF",function(e,t){a(e.exports,"unsortedSegmentSum",()=>i);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk"),o=g("8cCb2");let i=(0,g("jqSCG").op)({unsortedSegmentSum_:function(e,t,a){let i=(0,s.convertToTensor)(e,"x","unsortedSegmentSum"),l=(0,s.convertToTensor)(t,"segmentIds","unsortedSegmentSum","int32");return(0,o.assert)((0,o.isInt)(a),()=>"numSegments must be of dtype int"),r.ENGINE.runKernel(n.UnsortedSegmentSum,{x:i,segmentIds:l},{numSegments:a})}})}),x("gBOC6",function(e,t){a(e.exports,"unstack",()=>i);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk"),o=g("8cCb2");let i=(0,g("jqSCG").op)({unstack_:function(e,t=0){let a=(0,s.convertToTensor)(e,"x","unstack","string_or_numeric");return o.assert(t>=-a.shape.length&&t<a.shape.length,()=>`Axis = ${t} is not in [-${a.shape.length}, ${a.shape.length})`),r.ENGINE.runKernel(n.Unpack,{value:a},{axis:t})}})}),x("igCyu",function(e,t){a(e.exports,"upperBound",()=>n);var r=g("6PrVj");function n(e,t){return(0,r.searchSorted)(e,t,"right")}}),x("eoViB",function(e,t){a(e.exports,"variable",()=>n);var r=g("38WwN");function n(e,t=!0,a,s){return r.ENGINE.makeVariable(e,t,a,s)}}),x("5t2or",function(e,t){a(e.exports,"whereAsync",()=>s);var r=g("kNeGS"),n=g("5xBLk");let s=async function(e){let t=(0,n.convertToTensor)(e,"condition","whereAsync","bool"),a=await t.data(),s=(0,r.whereImpl)(t.shape,a);return e!==t&&t.dispose(),s}}),x("kNeGS",function(e,t){a(e.exports,"whereImpl",()=>n);var r=g("iG87S");function n(e,t){let a=[];for(let e=0;e<t.length;e++)t[e]&&a.push(e);let n=(0,r.buffer)(e,"int32"),s=(0,r.buffer)([a.length,e.length],"int32");for(let t=0;t<a.length;t++){let r=n.indexToLoc(a[t]),o=t*e.length;s.values.set(r,o)}return s.toTensor()}}),x("4xhB2",function(e,t){a(e.exports,"booleanMaskAsync",()=>u);var r=g("5xBLk"),n=g("8cCb2"),s=g("3qUjU"),o=g("4sqA7"),i=g("kX8Hd"),l=g("5t2or");let u=async function(e,t,a){let u=(0,r.convertToTensor)(e,"tensor","boolMask"),p=(0,r.convertToTensor)(t,"mask","boolMask","bool"),d=null==a?0:a,c=p.rank,h=u.shape;n.assert(c>0,()=>"mask cannot be scalar"),n.assertShapesMatch(h.slice(d,d+c),p.shape,"mask's shape must match the first K dimensions of tensor's shape,");let f=1;for(let e=d;e<d+c;e++)f*=h[e];let m=h.slice(0,d).concat([f],h.slice(d+c)),g=(0,o.reshape)(u,m),x=(0,o.reshape)(p,[-1]),y=await (0,l.whereAsync)(x),b=(0,i.squeeze)(y,[1]),v=(0,s.gather)(g,b,d);return e!==u&&u.dispose(),t!==p&&p.dispose(),b.dispose(),g.dispose(),x.dispose(),y.dispose(),v}}),x("gIiMY",function(e,t){a(e.exports,"movingAverage",()=>h);var r=g("3w4Rg"),n=g("5xBLk"),s=g("8cCb2"),o=g("hgacW"),i=g("1QPqB"),l=g("jZc0w"),u=g("jqSCG"),p=g("ad1of"),d=g("3xp7o"),c=g("7kouu");let h=(0,u.op)({movingAverage_:function(e,t,a,u,h=!0){let f=(0,n.convertToTensor)(e,"v","movingAverage"),m=(0,n.convertToTensor)(t,"x","movingAverage"),g=(0,n.convertToTensor)(a,"decay","movingAverage");(0,r.assertTypesMatch)(f,m),s.assert(s.arraysEqual(f.shape,m.shape),()=>"Shape mismatch in v and x");let x=(0,d.scalar)(1),y=(0,c.sub)(x,g),b=(0,l.mul)((0,c.sub)(m,f),y);if(h){s.assert(null!=u,()=>"When using zeroDebias: true, step is required.");let e=(0,n.convertToTensor)(u,"step","movingAverage");b=(0,i.div)(b,(0,c.sub)(x,(0,p.pow)(g,e)))}return(0,o.add)(f,b)}})}),x("4wiJQ",function(e,t){a(e.exports,"scatterND",()=>u);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk"),o=g("8cCb2"),i=g("jqSCG"),l=g("7wQGW");let u=(0,i.op)({scatterND_:function(e,t,a){(0,o.assertNonNegativeIntegerDimensions)(a);let i=(0,s.convertToTensor)(e,"indices","scatterND","int32"),u=(0,s.convertToTensor)(t,"updates","scatterND");return l.validateInput(u,i,a),r.ENGINE.runKernel(n.ScatterNd,{indices:i,updates:u},{shape:a})}})}),x("kMXcY",function(e,t){a(e.exports,"sparseToDense",()=>l);var r=g("38WwN"),n=g("hl418"),s=g("ch6b2"),o=g("5xBLk"),i=g("8cCb2");let l=(0,g("jqSCG").op)({sparseToDense_:function(e,t,a,l=0){(0,i.assertNonNegativeIntegerDimensions)(a);let u=(0,o.convertToTensor)(e,"sparseIndices","sparseToDense","int32"),p=(0,o.convertToTensor)(t,"sparseValues","sparseToDense","string_or_numeric"),d=(0,o.convertToTensor)(l,"defaultValue","sparseToDense",p.dtype);return s.validateInput(u,p,a,d),r.ENGINE.runKernel(n.SparseToDense,{sparseIndices:u,sparseValues:p,defaultValue:d},{outputShape:a})}})}),x("ch6b2",function(e,t){a(e.exports,"validateInput",()=>r);function r(e,t,r,a){if("int32"!==e.dtype)throw Error(`tf.sparseToDense() expects the indices to be int32 type, but the dtype was ${e.dtype}.`);if(e.rank>2)throw Error(`sparseIndices should be a scalar, vector, or matrix, but got shape ${e.shape}.`);let n=e.rank>0?e.shape[0]:1,s=e.rank>1?e.shape[1]:1;if(r.length!==s)throw Error(`outputShape has incorrect number of elements:, ${r.length}, should be: ${s}.`);let o=t.size;if(0!==t.rank&&(1!==t.rank||o!==n))throw Error(`sparseValues has incorrect shape ${t.shape}, should be [] or [${n}]`);if(t.dtype!==a.dtype)throw Error("sparseValues.dtype must match defaultValues.dtype")}}),x("5FwF9",function(e,t){a(e.exports,"gatherND",()=>o);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk");let o=(0,g("jqSCG").op)({gatherND_:function(e,t){let a=(0,s.convertToTensor)(t,"indices","gatherND","int32"),o=(0,s.convertToTensor)(e,"x","gatherND","string_or_numeric");return r.ENGINE.runKernel(n.GatherNd,{params:o,indices:a})}})}),x("5kLyC",function(e,t){a(e.exports,"dropout",()=>h);var r=g("9jCh7"),n=g("5xBLk"),s=g("8cCb2"),o=g("hgacW"),i=g("1QPqB"),l=g("273XW"),u=g("4ZUCz"),p=g("jZc0w"),d=g("jqSCG"),c=g("j8sic");let h=(0,d.op)({dropout_:function(e,t,a,d){let h=(0,n.convertToTensor)(e,"x","dropout");if(s.assert("float32"===h.dtype,()=>`x has to be a floating point tensor since it's going to be scaled, but got a ${h.dtype} tensor instead.`),s.assert(t>=0&&t<1,()=>`rate must be a float in the range [0, 1), but got ${t}.`),0===t)return e instanceof r.Tensor?h.clone():h;let f=(0,l.getNoiseShape)(h,a),m=1-t,g=(0,i.div)((0,u.floor)((0,o.add)((0,c.randomUniform)(f,0,1,"float32",d),m)),m);return(0,p.mul)(h,g)}})}),x("273XW",function(e,t){a(e.exports,"getNoiseShape",()=>n);var r=g("8cCb2");function n(e,t){if(null==t)return e.shape.slice();if(r.arraysEqual(e.shape,t))return t;if(e.shape.length===t.length){let r=[];for(let a=0;a<e.shape.length;a++)null==t[a]&&null!=e.shape[a]?r.push(e.shape[a]):r.push(t[a]);return r}return t}}),x("j5jow",function(e,t){a(e.exports,"enclosingPowerOfTwo",()=>n),a(e.exports,"cosineWindow",()=>s);var r=g("lalFM");function n(e){return Math.floor(Math.pow(2,Math.ceil(Math.log(e)/Math.log(2))))}function s(e,t,a){let n=1-e%2,s=new Float32Array(e);for(let r=0;r<e;++r){let o=2*Math.PI*r/(e+n-1);s[r]=t-a*Math.cos(o)}return(0,r.tensor1d)(s,"float32")}}),x("8mg8Q",function(e,t){a(e.exports,"inTopKAsync",()=>o);var r=g("5xBLk"),n=g("8cCb2"),s=g("erbmM");let o=async function(e,t,a=1){let o=(0,r.convertToTensor)(e,"predictions","inTopK"),i=(0,r.convertToTensor)(t,"targets","inTopK");(0,n.assert)(o.rank>1,()=>`inTopK() expects the predictions to be of rank 2 or higher, but got ${o.rank}`),(0,n.assert)(o.rank-1===i.rank,()=>`predictions rank should be 1 larger than targets rank, but got predictions rank ${o.rank} and targets rank ${i.rank}`),(0,n.assertShapesMatch)(o.shape.slice(0,o.shape.length-1),i.shape,"predictions's shape should be align with the targets' shape, except the last dimension.");let l=o.shape[o.shape.length-1];(0,n.assert)(a>0&&a<=l,()=>`'k' passed to inTopK() must be > 0 && <= the predictions last dimension (${l}), but got ${a}`);let u=await o.data(),p=await i.data(),[d,c]=[u.length/l,l],h=(0,n.getTypedArrayFromDType)("bool",d);for(let e=0;e<d;e++){let t=e*c,r=u.subarray(t,t+c),n=[];for(let e=0;e<r.length;e++)n.push({value:r[e],index:e});n.sort((e,t)=>t.value-e.value),h[e]=0;for(let t=0;t<a;t++)if(n[t].index===p[e]){h[e]=1;break}}return e!==o&&o.dispose(),t!==i&&i.dispose(),(0,s.tensor)(h,i.shape,"bool")}}),x("jDZRN",function(e,t){a(e.exports,"conv2d",()=>g("6GXo4").conv2d),a(e.exports,"depthwiseConv2d",()=>g("d71bK").depthwiseConv2d),a(e.exports,"matMul",()=>g("1q6Gm").matMul),g("6GXo4"),g("d71bK"),g("1q6Gm")}),x("6GXo4",function(e,t){a(e.exports,"conv2d",()=>b);var r=g("38WwN"),n=g("92fpA"),s=g("hl418"),o=g("3w4Rg"),i=g("5xBLk"),l=g("8cCb2"),u=g("hgacW"),p=g("8BaGO"),d=g("5Nkm1"),c=g("4Tgmn"),h=g("6eptr"),f=g("frznq"),m=g("bzoAL"),x=g("jqSCG"),y=g("4sqA7");let b=(0,x.op)({fusedConv2d_:function({x:e,filter:t,strides:a,pad:g,dataFormat:x="NHWC",dilations:b=[1,1],dimRoundingMode:v,bias:N,activation:k="linear",preluActivationWeights:T,leakyreluAlpha:S}){let I,w;if(k=k||"linear",!1===(0,m.shouldFuse)(r.ENGINE.state.gradientDepth,k)){l.assert("NHWC"===x,()=>`Error in fused conv2d: got dataFormat of ${x} but only NHWC is currently supported for the case of gradient depth is 0 and the activation is not linear.`);let r=(0,d.conv2d)(e,t,a,g,x,b,v);return null!=N&&(r=(0,u.add)(r,N)),(0,m.applyActivation)(r,k,T,S)}let C=(0,i.convertToTensor)(e,"x","conv2d","float32"),E=(0,i.convertToTensor)(t,"filter","conv2d","float32"),A=C,$=!1;3===C.rank&&($=!0,A=(0,y.reshape)(C,[1,C.shape[0],C.shape[1],C.shape[2]])),l.assert(4===A.rank,()=>`Error in fused conv2d: input must be rank 4, but got rank ${A.rank}.`),l.assert(4===E.rank,()=>`Error in fused conv2d: filter must be rank 4, but got rank ${E.rank}.`),f.checkPadOnDimRoundingMode("fused conv2d",g,v);let R="NHWC"===x?A.shape[3]:A.shape[1];l.assert(E.shape[2]===R,()=>`Error in conv2d: depth of input (${R}) must match input depth for filter ${E.shape[2]}.`),l.assert(f.eitherStridesOrDilationsAreOne(a,b),()=>`Error in conv2D: Either strides or dilations must be 1. Got strides ${a} and dilations '${b}'`);let P=f.computeConv2DInfo(A.shape,E.shape,a,b,g,v);if(null!=N&&(I=(0,i.convertToTensor)(N,"bias","fused conv2d"),[I]=(0,o.makeTypesMatch)(I,C),"NHWC"===x?p.assertAndGetBroadcastShape(P.outShape,I.shape):(l.assert(I.shape.length<=1,()=>`Error in fused conv2d: only supports scalar or 1-D Tensor bias for NCHW format but got the bias of rank-${I.shape.length}.`),l.assert(0===I.shape.length||I.shape[0]===P.outChannels||1===I.shape[0],()=>`Error in fused conv2d: bias shape (${I.shape}) is not compatible with the number of output channels (${P.outChannels})`))),null!=T){let e=T.shape;if(l.assert(e.length<=1||3===e.length,()=>`Error in fused conv2d: only supports scalar, 1-D Tensor or 3-D Tensor PReLU activation weights but got a tensor of rank-${e.length}.`),1===e.length)l.assert(1===e[0]||e[0]===P.outChannels,()=>`Error in fused conv2d: PReLU activation weights (${e}) is not compatible with the number of output channels (${P.outChannels}).`);else if(3===e.length)try{p.assertAndGetBroadcastShape(e,P.outShape)}catch(t){throw Error(`Error in fused conv2d: PReLU activation weights (${e}) is not compatible with the output shape of the conv2d (${P.outShape}).`)}w=(0,i.convertToTensor)(T,"prelu weights","fused conv2d")}let B=(e,t)=>{l.assert("NHWC"===x,()=>`Error in gradient of fused conv2D: got dataFormat of ${x} but only NHWC is currently supported.`);let[r,n,s,o]=t,i=(0,m.getFusedDyActivation)(e,s,k);l.assert(f.tupleValuesAreOne(b),()=>`Error in gradient of fused conv2D: dilation rates greater than 1 are not yet supported in gradients. Got dilations '${b}'`);let u=[(0,h.conv2DBackpropInput)(n.shape,i,r,a,g),(0,c.conv2DBackpropFilter)(n,i,r.shape,a,g)];if(null!=o){let e=(0,m.getFusedBiasGradient)(o,i);u.push(e)}return u},F={x:A,filter:E,bias:I,preluActivationWeights:w},O={strides:a,pad:g,dataFormat:x,dilations:b,dimRoundingMode:v,activation:k,leakyreluAlpha:S};return null==N?(0,n.customGrad)((e,t,a)=>{let n=r.ENGINE.runKernel(s.FusedConv2D,F,O);return a([t,e,n]),$&&(n=(0,y.reshape)(n,[n.shape[1],n.shape[2],n.shape[3]])),{value:n,gradFunc:B}})(A,E):(0,n.customGrad)((e,t,a,n)=>{let o=r.ENGINE.runKernel(s.FusedConv2D,F,O);return n([t,e,o,a]),$&&(o=(0,y.reshape)(o,[o.shape[1],o.shape[2],o.shape[3]])),{value:o,gradFunc:B}})(A,E,I)}})}),x("4Tgmn",function(e,t){a(e.exports,"conv2DBackpropFilter",()=>u);var r=g("38WwN"),n=g("hl418"),s=g("8cCb2"),o=g("frznq"),i=g("jqSCG"),l=g("4sqA7");let u=(0,i.op)({conv2DBackpropFilter_:function(e,t,a,i,u,p="NHWC",d){let c=e;3===e.rank&&(c=(0,l.reshape)(e,[1,e.shape[0],e.shape[1],e.shape[2]]));let h=t;3===h.rank&&(h=(0,l.reshape)(t,[1,t.shape[0],t.shape[1],t.shape[2]])),s.assert(4===c.rank,()=>`Error in conv2dDerFilter: input must be rank 4, but got shape ${c.shape}.`),s.assert(4===h.rank,()=>`Error in conv2dDerFilter: dy must be rank 4, but got shape ${h.shape}.`),s.assert(4===a.length,()=>`Error in conv2dDerFilter: filterShape must be length 4, but got ${a}.`);let f="NHWC"===p?c.shape[3]:c.shape[1],m="NHWC"===p?h.shape[3]:h.shape[1];s.assert(f===a[2],()=>`Error in conv2dDerFilter: depth of input ${f}) must match input depth in filter (${a[2]}.`),s.assert(m===a[3],()=>`Error in conv2dDerFilter: depth of dy (${m}) must match output depth for filter (${a[3]}).`),o.checkPadOnDimRoundingMode("conv2dDerFilter",u,d);let g={x:c,dy:h};return r.ENGINE.runKernel(n.Conv2DBackpropFilter,g,{strides:i,pad:u,dataFormat:p,dimRoundingMode:d,filterShape:a})}})}),x("bzoAL",function(e,t){a(e.exports,"getFusedDyActivation",()=>f),a(e.exports,"getFusedBiasGradient",()=>m),a(e.exports,"applyActivation",()=>x),a(e.exports,"shouldFuse",()=>y);var r=g("8BaGO"),n=g("7UQTl"),s=g("3XskU"),o=g("jZc0w"),i=g("a3pvF"),l=g("8wbQq"),u=g("fvNYr"),p=g("4sqA7"),d=g("jvtSq"),c=g("lWdx1"),h=g("9NgTx");function f(e,t,r){if(null==r||"linear"===r)return e;if("relu"===r)return(0,o.mul)(e,(0,c.step)(t));throw Error(`Cannot compute gradient for fused activation ${r}.`)}function m(e,t){let a=t,n=r.getReductionAxes(e.shape,t.shape);return n.length>0&&(a=(0,h.sum)(a,n)),(0,p.reshape)(a,e.shape)}function x(e,t,r,a){if("linear"===t)return e;if("relu"===t)return(0,l.relu)(e);if("elu"===t)return(0,n.elu)(e);if("relu6"===t)return(0,u.relu6)(e);if("prelu"===t)return(0,i.prelu)(e,r);else if("leakyrelu"===t)return(0,s.leakyRelu)(e,a);else if("sigmoid"===t)return(0,d.sigmoid)(e);throw Error(`Unknown fused activation ${t}.`)}let y=(e,t)=>!(e>0)||"linear"===t}),x("d71bK",function(e,t){a(e.exports,"depthwiseConv2d",()=>b);var r=g("38WwN"),n=g("92fpA"),s=g("hl418"),o=g("3w4Rg"),i=g("5xBLk"),l=g("8cCb2"),u=g("hgacW"),p=g("8BaGO"),d=g("frznq"),c=g("182Rc"),h=g("j2Gyr"),f=g("1C2e1"),m=g("bzoAL"),x=g("jqSCG"),y=g("4sqA7");let b=(0,x.op)({fusedDepthwiseConv2d_:function({x:e,filter:t,strides:a,pad:g,dataFormat:x="NHWC",dilations:b=[1,1],dimRoundingMode:v,bias:N,activation:k="linear",preluActivationWeights:T,leakyreluAlpha:S}){let I,w;if(!1===(0,m.shouldFuse)(r.ENGINE.state.gradientDepth,k)){let r=(0,c.depthwiseConv2d)(e,t,a,g,x,b,v);return null!=N&&(r=(0,u.add)(r,N)),(0,m.applyActivation)(r,k,T,S)}let C=(0,i.convertToTensor)(e,"x","depthwiseConv2d","float32"),E=(0,i.convertToTensor)(t,"filter","depthwiseConv2d","float32"),A=C,$=!1;3===C.rank&&($=!0,A=(0,y.reshape)(C,[1,C.shape[0],C.shape[1],C.shape[2]])),l.assert(4===A.rank,()=>`Error in fused depthwiseConv2d: input must be rank 4, but got rank ${A.rank}.`),l.assert(4===E.rank,()=>`Error in fused depthwiseConv2d: filter must be rank 4, but got rank ${E.rank}.`),l.assert(A.shape[3]===E.shape[2],()=>`Error in fused depthwiseConv2d: number of input channels (${A.shape[3]}) must match the inChannels dimension in filter ${E.shape[2]}.`),null==b&&(b=[1,1]),l.assert(d.eitherStridesOrDilationsAreOne(a,b),()=>`Error in fused depthwiseConv2d: Either strides or dilations must be 1. Got strides ${a} and dilations '${b}'`),d.checkPadOnDimRoundingMode("fused depthwiseConv2d",g,v);let R=d.computeConv2DInfo(A.shape,E.shape,a,b,g,v,!0);null!=N&&(I=(0,i.convertToTensor)(N,"bias","fused conv2d"),[I]=(0,o.makeTypesMatch)(I,C),p.assertAndGetBroadcastShape(R.outShape,I.shape)),null!=T&&(w=(0,i.convertToTensor)(T,"prelu weights","fused depthwiseConv2d"));let P=(e,t)=>{l.assert(d.tupleValuesAreOne(b),()=>`Error in gradient of fused depthwiseConv2d: dilation rates greater than 1 are not yet supported. Got dilations '${b}'`);let[r,n,s,o]=t,i=(0,m.getFusedDyActivation)(e,s,k),u=(0,f.depthwiseConv2dNativeBackpropInput)(n.shape,i,r,a,g,b,v),p=(0,h.depthwiseConv2dNativeBackpropFilter)(n,i,r.shape,a,g,b,v);return null!=o?[u,p,(0,m.getFusedBiasGradient)(I,i)]:[u,p]},B={x:A,filter:E,bias:I,preluActivationWeights:w},F={strides:a,pad:g,dataFormat:x,dilations:b,dimRoundingMode:v,activation:k,leakyreluAlpha:S};return null==N?(0,n.customGrad)((e,t,a)=>{let n=r.ENGINE.runKernel(s.FusedDepthwiseConv2D,B,F);return a([t,e,n]),$&&(n=(0,y.reshape)(n,[n.shape[1],n.shape[2],n.shape[3]])),{value:n,gradFunc:P}})(A,E):(0,n.customGrad)((e,t,a,n)=>{let o=r.ENGINE.runKernel(s.FusedDepthwiseConv2D,B,F);return n([t,e,o,a]),$&&(o=(0,y.reshape)(o,[o.shape[1],o.shape[2],o.shape[3]])),{value:o,gradFunc:P}})(A,E,I)}})}),x("j2Gyr",function(e,t){a(e.exports,"depthwiseConv2dNativeBackpropFilter",()=>i);var r=g("38WwN"),n=g("hl418"),s=g("jqSCG"),o=g("4sqA7");let i=(0,s.op)({depthwiseConv2dNativeBackpropFilter_:function(e,t,a,s,i,l=[1,1],u){let p=e;3===e.rank&&(p=(0,o.reshape)(e,[1,e.shape[0],e.shape[1],e.shape[2]]));let d=t;3===d.rank&&(d=(0,o.reshape)(t,[1,t.shape[0],t.shape[1],t.shape[2]]));let c={x:p,dy:d};return r.ENGINE.runKernel(n.DepthwiseConv2dNativeBackpropFilter,c,{strides:s,pad:i,dimRoundingMode:u,dilations:l,filterShape:a})}})}),x("1C2e1",function(e,t){a(e.exports,"depthwiseConv2dNativeBackpropInput",()=>i);var r=g("38WwN"),n=g("hl418"),s=g("jqSCG"),o=g("4sqA7");let i=(0,s.op)({depthwiseConv2dNativeBackpropInput_:function(e,t,a,s,i,l=[1,1],u){let p=t,d=!1;3===t.rank&&(d=!0,p=(0,o.reshape)(t,[1,t.shape[0],t.shape[1],t.shape[2]]));let c={dy:p,filter:a},h=r.ENGINE.runKernel(n.DepthwiseConv2dNativeBackpropInput,c,{strides:s,pad:i,dimRoundingMode:u,dilations:l,inputShape:e});return d?(0,o.reshape)(h,[h.shape[1],h.shape[2],h.shape[3]]):h}})}),x("1q6Gm",function(e,t){a(e.exports,"matMul",()=>m);var r=g("38WwN"),n=g("92fpA"),s=g("hl418"),o=g("3w4Rg"),i=g("5xBLk"),l=g("8cCb2"),u=g("hgacW"),p=g("8BaGO"),d=g("bzoAL"),c=g("aUFou"),h=g("jqSCG"),f=g("4sqA7");let m=(0,h.op)({fusedMatMul_:function({a:e,b:t,transposeA:a=!1,transposeB:h=!1,bias:m,activation:g="linear",preluActivationWeights:x,leakyreluAlpha:y=.2}){let b,v;if(!1===(0,d.shouldFuse)(r.ENGINE.state.gradientDepth,g)){let r=(0,c.matMul)(e,t,a,h);return null!=m&&(r=(0,u.add)(r,m)),(0,d.applyActivation)(r,g,x,y)}let N=(0,i.convertToTensor)(e,"a","fused matMul"),k=(0,i.convertToTensor)(t,"b","fused matMul");[N,k]=(0,o.makeTypesMatch)(N,k);let T=a?N.shape[N.rank-2]:N.shape[N.rank-1],S=h?k.shape[k.rank-1]:k.shape[k.rank-2],I=a?N.shape[N.rank-1]:N.shape[N.rank-2],w=h?k.shape[k.rank-2]:k.shape[k.rank-1],C=N.shape.slice(0,-2),E=k.shape.slice(0,-2),A=l.sizeFromShape(C),$=l.sizeFromShape(E);l.assert(T===S,()=>`Error in fused matMul: inner shapes (${T}) and (${S}) of Tensors with shapes ${N.shape} and ${k.shape} and transposeA=${a} and transposeB=${h} must match.`);let R=p.assertAndGetBroadcastShape(N.shape.slice(0,-2),k.shape.slice(0,-2)).concat([I,w]),P=a?(0,f.reshape)(N,[A,T,I]):(0,f.reshape)(N,[A,I,T]),B=h?(0,f.reshape)(k,[$,w,S]):(0,f.reshape)(k,[$,S,w]);null!=m&&(b=(0,i.convertToTensor)(m,"bias","fused matMul"),[b]=(0,o.makeTypesMatch)(b,N),p.assertAndGetBroadcastShape(R,b.shape)),null!=x&&(v=(0,i.convertToTensor)(x,"prelu weights","fused matMul"));let F=(e,t)=>{let r,n,[s,o,i,l]=t,u=(0,d.getFusedDyActivation)((0,f.reshape)(e,i.shape),i,g);return(a||h?!a&&h?(r=(0,c.matMul)(u,o,!1,!1),n=(0,c.matMul)(u,s,!0,!1)):a&&!h?(r=(0,c.matMul)(o,u,!1,!0),n=(0,c.matMul)(s,u,!1,!1)):(r=(0,c.matMul)(o,u,!0,!0),n=(0,c.matMul)(u,s,!0,!0)):(r=(0,c.matMul)(u,o,!1,!0),n=(0,c.matMul)(s,u,!0,!1)),null!=m)?[r,n,(0,d.getFusedBiasGradient)(l,u)]:[r,n]},O={a:P,b:B,bias:b,preluActivationWeights:v},M={transposeA:a,transposeB:h,activation:g,leakyreluAlpha:y};return null==m?(0,n.customGrad)((e,t,a)=>{let n=r.ENGINE.runKernel(s._FusedMatMul,O,M);return a([e,t,n]),{value:(0,f.reshape)(n,R),gradFunc:F}})(P,B):(0,n.customGrad)((e,t,a,n)=>{let o=r.ENGINE.runKernel(s._FusedMatMul,O,M);return n([e,t,o,a]),{value:(0,f.reshape)(o,R),gradFunc:F}})(P,B,b)}})}),x("dGKlF",function(e,t){a(e.exports,"hammingWindow",()=>s);var r=g("jqSCG"),n=g("j5jow");let s=(0,r.op)({hammingWindow_:function(e){return(0,n.cosineWindow)(e,.54,.46)}})}),x("gicu0",function(e,t){a(e.exports,"hannWindow",()=>s);var r=g("jqSCG"),n=g("j5jow");let s=(0,r.op)({hannWindow_:function(e){return(0,n.cosineWindow)(e,.5,.5)}})}),x("lLT0m",function(e,t){a(e.exports,"frame",()=>u);var r=g("iTu6j"),n=g("gYive"),s=g("jqSCG"),o=g("4sqA7"),i=g("79KOG"),l=g("gmMlv");let u=(0,s.op)({frame_:function(e,t,a,s=!1,u=0){let p=0,d=[];for(;p+t<=e.size;)d.push((0,i.slice)(e,p,t)),p+=a;if(s)for(;p<e.size;){let s=p+t-e.size,o=(0,r.concat)([(0,i.slice)(e,p,t-s),(0,n.fill)([s],u)]);d.push(o),p+=a}return 0===d.length?(0,l.tensor2d)([],[0,t]):(0,o.reshape)((0,r.concat)(d),[d.length,t])}})}),x("hGoJt",function(e,t){a(e.exports,"stft",()=>u);var r=g("jZc0w"),n=g("jqSCG"),s=g("j5jow"),o=g("cafDa"),i=g("lLT0m"),l=g("gicu0");let u=(0,n.op)({stft_:function(e,t,a,n,u=l.hannWindow){null==n&&(n=(0,s.enclosingPowerOfTwo)(t));let p=(0,i.frame)(e,t,a),d=(0,r.mul)(p,u(t));return(0,o.rfft)(d,n)}})}),x("jLoMm",function(e,t){a(e.exports,"cropAndResize",()=>i);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk"),o=g("8cCb2");let i=(0,g("jqSCG").op)({cropAndResize_:function(e,t,a,i,l="bilinear",u=0){let p=(0,s.convertToTensor)(e,"image","cropAndResize"),d=(0,s.convertToTensor)(t,"boxes","cropAndResize","float32"),c=(0,s.convertToTensor)(a,"boxInd","cropAndResize","int32"),h=d.shape[0];return o.assert(4===p.rank,()=>`Error in cropAndResize: image must be rank 4,but got rank ${p.rank}.`),o.assert(2===d.rank&&4===d.shape[1],()=>`Error in cropAndResize: boxes must be have size [${h},4] but had shape ${d.shape}.`),o.assert(1===c.rank&&c.shape[0]===h,()=>`Error in cropAndResize: boxInd must be have size [${h}] but had shape ${d.shape}.`),o.assert(2===i.length,()=>`Error in cropAndResize: cropSize must be of length 2, but got length ${i.length}.`),o.assert(i[0]>=1&&i[1]>=1,()=>`cropSize must be atleast [1,1], but was ${i}`),o.assert("bilinear"===l||"nearest"===l,()=>`method must be bilinear or nearest, but was ${l}`),r.ENGINE.runKernel(n.CropAndResize,{image:p,boxes:d,boxInd:c},{method:l,extrapolationValue:u,cropSize:i})}})}),x("jAPwM",function(e,t){a(e.exports,"flipLeftRight",()=>i);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk"),o=g("8cCb2");let i=(0,g("jqSCG").op)({flipLeftRight_:function(e){let t=(0,s.convertToTensor)(e,"image","flipLeftRight","float32");return o.assert(4===t.rank,()=>`Error in flipLeftRight: image must be rank 4,but got rank ${t.rank}.`),r.ENGINE.runKernel(n.FlipLeftRight,{image:t},{})}})}),x("7xYxa",function(e,t){a(e.exports,"grayscaleToRGB",()=>i);var r=g("5xBLk"),n=g("8cCb2"),s=g("jqSCG"),o=g("61ay4");let i=(0,s.op)({grayscaleToRGB_:function(e){let t=(0,r.convertToTensor)(e,"image","grayscaleToRGB"),a=t.rank-1,s=t.shape[a];n.assert(t.rank>=2,()=>`Error in grayscaleToRGB: images must be at least rank 2, but got rank ${t.rank}.`),n.assert(1===s,()=>`Error in grayscaleToRGB: last dimension of a grayscale image should be size 1, but got size ${s}.`);let i=Array(t.rank);return i.fill(1,0,a),i[a]=3,(0,o.tile)(t,i)}})}),x("iStMK",function(e,t){a(e.exports,"rgbToGrayscale",()=>p);var r=g("5xBLk"),n=g("8cCb2"),s=g("inFmq"),o=g("1mzpU"),i=g("iPDWZ"),l=g("jqSCG"),u=g("lalFM");let p=(0,l.op)({rgbToGrayscale_:function(e){let t,a=(0,r.convertToTensor)(e,"image","RGBToGrayscale"),l=a.rank-1,p=a.shape[l];n.assert(a.rank>=2,()=>`Error in RGBToGrayscale: images must be at least rank 2, but got rank ${a.rank}.`),n.assert(3===p,()=>`Error in RGBToGrayscale: last dimension of an RGB image should be size 3, but got size ${p}.`);let d=a.dtype,c=(0,s.cast)(a,"float32"),h=(0,u.tensor1d)([.2989,.587,.114]);switch(a.rank){case 2:t=(0,o.einsum)("ij,j->i",c,h);break;case 3:t=(0,o.einsum)("ijk,k->ij",c,h);break;case 4:t=(0,o.einsum)("ijkl,l->ijk",c,h);break;case 5:t=(0,o.einsum)("ijklm,m->ijkl",c,h);break;case 6:t=(0,o.einsum)("ijklmn,n->ijklm",c,h);break;default:throw Error("Not a valid tensor rank.")}return t=(0,i.expandDims)(t,-1),(0,s.cast)(t,d)}})}),x("gF4CQ",function(e,t){a(e.exports,"rotateWithOffset",()=>i);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk"),o=g("8cCb2");let i=(0,g("jqSCG").op)({rotateWithOffset_:function(e,t,a=0,i=.5){let l=(0,s.convertToTensor)(e,"image","rotateWithOffset","float32");return o.assert(4===l.rank,()=>`Error in rotateWithOffset: image must be rank 4,but got rank ${l.rank}.`),r.ENGINE.runKernel(n.RotateWithOffset,{image:l},{radians:t,fillValue:a,center:i})}})}),x("3Dhm5",function(e,t){a(e.exports,"nonMaxSuppression",()=>i);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk"),o=g("dpIoR");let i=(0,g("jqSCG").op)({nonMaxSuppression_:function(e,t,a,i=.5,l=Number.NEGATIVE_INFINITY){let u=(0,s.convertToTensor)(e,"boxes","nonMaxSuppression","float32"),p=(0,s.convertToTensor)(t,"scores","nonMaxSuppression","float32"),d=(0,o.nonMaxSuppSanityCheck)(u,p,a,i,l);a=d.maxOutputSize;let c={maxOutputSize:a,iouThreshold:i=d.iouThreshold,scoreThreshold:l=d.scoreThreshold};return r.ENGINE.runKernel(n.NonMaxSuppressionV3,{boxes:u,scores:p},c)}})}),x("dpIoR",function(e,t){a(e.exports,"nonMaxSuppSanityCheck",()=>n);var r=g("8cCb2");function n(e,t,a,n,s,o){null==n&&(n=.5),null==s&&(s=Number.NEGATIVE_INFINITY),null==o&&(o=0);let i=e.shape[0];return a=Math.min(a,i),r.assert(0<=n&&n<=1,()=>`iouThreshold must be in [0, 1], but was '${n}'`),r.assert(2===e.rank,()=>`boxes must be a 2D tensor, but was of rank '${e.rank}'`),r.assert(4===e.shape[1],()=>`boxes must have 4 columns, but 2nd dimension was ${e.shape[1]}`),r.assert(1===t.rank,()=>"scores must be a 1D tensor"),r.assert(t.shape[0]===i,()=>`scores has incompatible shape with boxes. Expected ${i}, but was ${t.shape[0]}`),r.assert(0<=o&&o<=1,()=>`softNmsSigma must be in [0, 1], but was '${o}'`),{maxOutputSize:a,iouThreshold:n,scoreThreshold:s,softNmsSigma:o}}}),x("ihqU7",function(e,t){a(e.exports,"nonMaxSuppressionAsync",()=>i);var r=g("KPYos"),n=g("5xBLk"),s=g("dpIoR"),o=g("lalFM");let i=async function(e,t,a,i=.5,l=Number.NEGATIVE_INFINITY){let u=(0,n.convertToTensor)(e,"boxes","nonMaxSuppressionAsync"),p=(0,n.convertToTensor)(t,"scores","nonMaxSuppressionAsync"),d=(0,s.nonMaxSuppSanityCheck)(u,p,a,i,l);a=d.maxOutputSize,i=d.iouThreshold,l=d.scoreThreshold;let c=await Promise.all([u.data(),p.data()]),h=c[0],f=c[1],{selectedIndices:m}=(0,r.nonMaxSuppressionV3Impl)(h,f,a,i,l);return u!==e&&u.dispose(),p!==t&&p.dispose(),(0,o.tensor1d)(m,"int32")}}),x("KPYos",function(e,t){a(e.exports,"nonMaxSuppressionV3Impl",()=>n),a(e.exports,"nonMaxSuppressionV4Impl",()=>s),a(e.exports,"nonMaxSuppressionV5Impl",()=>o);var r=g("k4JiJ");function n(e,t,r,a,n){return i(e,t,r,a,n,0)}function s(e,t,r,a,n,s){return i(e,t,r,a,n,0,!1,s,!0)}function o(e,t,r,a,n,s){return i(e,t,r,a,n,s,!0)}function i(e,t,a,n,s,o,u=!1,p=!1,d=!1){let c=[];for(let e=0;e<t.length;e++)t[e]>s&&c.push({score:t[e],boxIndex:e,suppressBeginIndex:0});c.sort(l);let h=o>0?-.5/o:0,f=[],m=[];for(;f.length<a&&c.length>0;){let t=c.pop(),{score:a,boxIndex:o,suppressBeginIndex:i}=t;if(a<s)break;let u=!1;for(let r=f.length-1;r>=i;--r){let a=function(e,t,r){let a=e.subarray(4*t,4*t+4),n=e.subarray(4*r,4*r+4),s=Math.min(a[0],a[2]),o=Math.min(a[1],a[3]),i=Math.max(a[0],a[2]),l=Math.max(a[1],a[3]),u=Math.min(n[0],n[2]),p=Math.min(n[1],n[3]),d=Math.max(n[0],n[2]),c=Math.max(n[1],n[3]),h=(i-s)*(l-o),f=(d-u)*(c-p);if(h<=0||f<=0)return 0;let m=Math.max(Math.min(i,d)-Math.max(s,u),0)*Math.max(Math.min(l,c)-Math.max(o,p),0);return m/(h+f-m)}(e,o,f[r]);if(a>=n){u=!0;break}if(t.score=t.score*function(e,t,r){let a=Math.exp(t*r*r);return r<=e?a:0}(n,h,a),t.score<=s)break}t.suppressBeginIndex=f.length,!u&&(t.score===a?(f.push(o),m.push(t.score)):t.score>s&&(0,r.binaryInsert)(c,t,l))}let g=f.length,x=a-g;p&&x>0&&(f.push(...Array(x).fill(0)),m.push(...Array(x).fill(0)));let y={selectedIndices:f};return u&&(y.selectedScores=m),d&&(y.validOutputs=g),y}function l(e,t){return e.score-t.score||e.score===t.score&&t.boxIndex-e.boxIndex}}),x("k4JiJ",function(e,t){function r(e,t,r){let a=function(e,t,r){let a=0,n=e.length,s=0,o=!1;for(;a<n;){let i=r(t,e[s=a+(n-a>>>1)]);i>0?a=s+1:(n=s,o=!i)}return o?a:-a-1}(e,t,r||n);e.splice(a<0?-(a+1):a,0,t)}function n(e,t){return e>t?1:e<t?-1:0}a(e.exports,"binaryInsert",()=>r)}),x("gxykK",function(e,t){a(e.exports,"nonMaxSuppressionWithScore",()=>i);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk"),o=g("dpIoR");let i=(0,g("jqSCG").op)({nonMaxSuppressionWithScore_:function(e,t,a,i=.5,l=Number.NEGATIVE_INFINITY,u=0){let p=(0,s.convertToTensor)(e,"boxes","nonMaxSuppression"),d=(0,s.convertToTensor)(t,"scores","nonMaxSuppression"),c=(0,o.nonMaxSuppSanityCheck)(p,d,a,i,l,u);a=c.maxOutputSize,i=c.iouThreshold,l=c.scoreThreshold;let h={maxOutputSize:a,iouThreshold:i,scoreThreshold:l,softNmsSigma:u=c.softNmsSigma},f=r.ENGINE.runKernel(n.NonMaxSuppressionV5,{boxes:p,scores:d},h);return{selectedIndices:f[0],selectedScores:f[1]}}})}),x("8357p",function(e,t){a(e.exports,"nonMaxSuppressionWithScoreAsync",()=>i);var r=g("KPYos"),n=g("5xBLk"),s=g("dpIoR"),o=g("lalFM");let i=async function(e,t,a,i=.5,l=Number.NEGATIVE_INFINITY,u=0){let p=(0,n.convertToTensor)(e,"boxes","nonMaxSuppressionAsync"),d=(0,n.convertToTensor)(t,"scores","nonMaxSuppressionAsync"),c=(0,s.nonMaxSuppSanityCheck)(p,d,a,i,l,u);a=c.maxOutputSize,i=c.iouThreshold,l=c.scoreThreshold,u=c.softNmsSigma;let h=await Promise.all([p.data(),d.data()]),f=h[0],m=h[1],{selectedIndices:g,selectedScores:x}=(0,r.nonMaxSuppressionV5Impl)(f,m,a,i,l,u);return p!==e&&p.dispose(),d!==t&&d.dispose(),{selectedIndices:(0,o.tensor1d)(g,"int32"),selectedScores:(0,o.tensor1d)(x)}}}),x("gzUbZ",function(e,t){a(e.exports,"nonMaxSuppressionPadded",()=>i);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk"),o=g("dpIoR");let i=(0,g("jqSCG").op)({nonMaxSuppressionPadded_:function(e,t,a,i=.5,l=Number.NEGATIVE_INFINITY,u=!1){let p=(0,s.convertToTensor)(e,"boxes","nonMaxSuppression"),d=(0,s.convertToTensor)(t,"scores","nonMaxSuppression"),c=(0,o.nonMaxSuppSanityCheck)(p,d,a,i,l,null),h=c.maxOutputSize,f=c.iouThreshold,m=c.scoreThreshold,g=r.ENGINE.runKernel(n.NonMaxSuppressionV4,{boxes:p,scores:d},{maxOutputSize:h,iouThreshold:f,scoreThreshold:m,padToMaxOutputSize:u});return{selectedIndices:g[0],validOutputs:g[1]}}})}),x("bq0nG",function(e,t){a(e.exports,"nonMaxSuppressionPaddedAsync",()=>l);var r=g("KPYos"),n=g("5xBLk"),s=g("dpIoR"),o=g("3xp7o"),i=g("lalFM");let l=async function(e,t,a,l=.5,u=Number.NEGATIVE_INFINITY,p=!1){let d=(0,n.convertToTensor)(e,"boxes","nonMaxSuppressionAsync"),c=(0,n.convertToTensor)(t,"scores","nonMaxSuppressionAsync"),h=(0,s.nonMaxSuppSanityCheck)(d,c,a,l,u,null),f=h.maxOutputSize,m=h.iouThreshold,g=h.scoreThreshold,[x,y]=await Promise.all([d.data(),c.data()]),{selectedIndices:b,validOutputs:v}=(0,r.nonMaxSuppressionV4Impl)(x,y,f,m,g,p);return d!==e&&d.dispose(),c!==t&&c.dispose(),{selectedIndices:(0,i.tensor1d)(b,"int32"),validOutputs:(0,o.scalar)(v,"int32")}}}),x("6zgXB",function(e,t){a(e.exports,"resizeBilinear",()=>u);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk"),o=g("8cCb2"),i=g("jqSCG"),l=g("4sqA7");let u=(0,i.op)({resizeBilinear_:function(e,t,a=!1,i=!1){let u=(0,s.convertToTensor)(e,"images","resizeBilinear");o.assert(3===u.rank||4===u.rank,()=>`Error in resizeBilinear: x must be rank 3 or 4, but got rank ${u.rank}.`),o.assert(2===t.length,()=>`Error in resizeBilinear: new shape must 2D, but got shape ${t}.`),o.assert(!1===i||!1===a,()=>"Error in resizeBilinear: If halfPixelCenters is true, alignCorners must be false.");let p=u,d=!1;3===u.rank&&(d=!0,p=(0,l.reshape)(u,[1,u.shape[0],u.shape[1],u.shape[2]]));let[]=t,c={images:p},h=r.ENGINE.runKernel(n.ResizeBilinear,c,{alignCorners:a,halfPixelCenters:i,size:t});return d?(0,l.reshape)(h,[h.shape[1],h.shape[2],h.shape[3]]):h}})}),x("ek5OW",function(e,t){a(e.exports,"resizeNearestNeighbor",()=>u);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk"),o=g("8cCb2"),i=g("jqSCG"),l=g("4sqA7");let u=(0,i.op)({resizeNearestNeighbor_:function(e,t,a=!1,i=!1){let u=(0,s.convertToTensor)(e,"images","resizeNearestNeighbor");o.assert(3===u.rank||4===u.rank,()=>`Error in resizeNearestNeighbor: x must be rank 3 or 4, but got rank ${u.rank}.`),o.assert(2===t.length,()=>`Error in resizeNearestNeighbor: new shape must 2D, but got shape ${t}.`),o.assert("float32"===u.dtype||"int32"===u.dtype,()=>"`images` must have `int32` or `float32` as dtype"),o.assert(!1===i||!1===a,()=>"Error in resizeNearestNeighbor: If halfPixelCenters is true, alignCorners must be false.");let p=u,d=!1;3===u.rank&&(d=!0,p=(0,l.reshape)(u,[1,u.shape[0],u.shape[1],u.shape[2]]));let[]=t,c={images:p},h=r.ENGINE.runKernel(n.ResizeNearestNeighbor,c,{alignCorners:a,halfPixelCenters:i,size:t});return d?(0,l.reshape)(h,[h.shape[1],h.shape[2],h.shape[3]]):h}})}),x("2uj2A",function(e,t){a(e.exports,"threshold",()=>S);var r=g("lalFM"),n=g("jqSCG"),s=g("inFmq"),o=g("9fmAX"),i=g("f3UMy"),l=g("7LQ38"),u=g("bRRKf"),p=g("9NgTx"),d=g("hgacW"),c=g("jZc0w"),h=g("1QPqB"),f=g("7kouu"),m=g("9YKoa"),x=g("l2P14"),y=g("gYive"),b=g("79KOG"),v=g("80Ety"),N=g("erbmM"),k=g("8cCb2"),T=g("5xBLk");let S=(0,n.op)({threshold_:function(e,t="binary",a=!1,n=.5){let g,S,I,w,C=(0,T.convertToTensor)(e,"image","threshold"),E=C.shape[0]*C.shape[1],A=(0,c.mul)((0,r.tensor1d)([n]),255);if(k.assert(3===C.rank,()=>`Error in threshold: image must be rank 3,but got rank ${C.rank}.`),k.assert(3===C.shape[2]||1===C.shape[2],()=>`Error in threshold: image color channel must be equal to 3 or 1but got ${C.shape[2]}.`),k.assert("int32"===C.dtype||"float32"===C.dtype,()=>`Error in dtype: image dtype must be int32 or float32,but got dtype ${C.dtype}.`),k.assert("otsu"===t||"binary"===t,()=>`Method must be binary or otsu, but was ${t}`),3===C.shape[2]){[g,S,I]=(0,o.split)(C,[1,1,1],-1);let e=(0,c.mul)(g,.2989),t=(0,c.mul)(S,.587),r=(0,c.mul)(I,.114);w=(0,d.add)((0,d.add)(e,t),r)}else w=e;"otsu"===t&&(A=function(e,t){let a,n,s,o,i,l,m=(0,r.tensor1d)([-1]),g=(0,r.tensor1d)([0]),N=(0,r.tensor1d)([0]);for(let k=0;k<e.size-1;k++){a=(0,b.slice)(e,0,k+1),n=(0,b.slice)(e,k+1),i=(0,h.div)((0,p.sum)(a),t),l=(0,h.div)((0,p.sum)(n),t);let T=(0,p.sum)((0,c.mul)(a,(0,v.range)(0,a.size)));s=(0,h.div)(T,(0,p.sum)(a));let S=(0,y.fill)(n.shape,a.size),I=(0,d.add)((0,v.range)(0,n.size),S),w=(0,c.mul)(n,I);o=(0,h.div)((0,p.sum)(w),(0,p.sum)(n));let C=(0,f.sub)(s,o),E=(0,f.sub)(s,o),A=(0,c.mul)(i,l);N=(0,c.mul)((0,c.mul)(A,C),E);let $=(0,u.greater)(N,g);g=(0,x.where)($,N,g),m=(0,x.where)($,(0,r.tensor1d)([k]),m)}return m}((0,i.bincount)((0,s.cast)((0,m.round)(w),"int32"),(0,N.tensor)([]),256),E));let $=a?(0,l.lessEqual)(w,A):(0,u.greater)(w,A);return(0,s.cast)((0,c.mul)($,255),"int32")}})}),x("53uSk",function(e,t){a(e.exports,"transform",()=>i);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk"),o=g("8cCb2");let i=(0,g("jqSCG").op)({transform_:function(e,t,a="nearest",i="constant",l=0,u){let p=(0,s.convertToTensor)(e,"image","transform","float32"),d=(0,s.convertToTensor)(t,"transforms","transform","float32");return o.assert(4===p.rank,()=>`Error in transform: image must be rank 4,but got rank ${p.rank}.`),o.assert(2===d.rank&&(d.shape[0]===p.shape[0]||1===d.shape[0])&&8===d.shape[1],()=>"Error in transform: Input transform should be batch x 8 or 1 x 8"),o.assert(null==u||2===u.length,()=>`Error in transform: outputShape must be [height, width] or null, but got ${u}.`),r.ENGINE.runKernel(n.Transform,{image:p,transforms:d},{interpolation:a,fillMode:i,fillValue:l,outputShape:u})}})}),x("kGYDg",function(e,t){a(e.exports,"bandPart",()=>v);var r=g("5xBLk"),n=g("8cCb2"),s=g("l0Zxl"),o=g("jTDVJ"),i=g("7LQ38"),l=g("kg1Wp"),u=g("6V8xR"),p=g("15cGp"),d=g("jqSCG"),c=g("80Ety"),h=g("4sqA7"),f=g("8BrLX"),m=g("7kouu"),x=g("gBOC6"),y=g("l2P14"),b=g("hxi4c");let v=(0,d.op)({bandPart_:function(e,t,a){let d,g,v=(0,r.convertToTensor)(e,"a","bandPart");(0,n.assert)(v.rank>=2,()=>`bandPart(): Rank must be at least 2, got ${v.rank}.`);let N=v.shape,[k,T]=v.shape.slice(-2);"number"==typeof t?((0,n.assert)(t%1==0,()=>`bandPart(): numLower must be an integer, got ${t}.`),(0,n.assert)(t<=k,()=>`bandPart(): numLower (${t}) must not be greater than the number of rows (${k}).`),d=(0,r.convertToTensor)(t<0?k:t,"numLower","bandPart")):((0,n.assert)("int32"===t.dtype,()=>"bandPart(): numLower's dtype must be an int32."),d=(0,y.where)((0,o.less)(t,0),k,(0,u.minimum)(t,k))),"number"==typeof a?((0,n.assert)(a%1==0,()=>`bandPart(): numUpper must be an integer, got ${a}.`),(0,n.assert)(a<=T,()=>`bandPart(): numUpper (${a}) must not be greater than the number of columns (${T}).`),g=(0,r.convertToTensor)(a<0?T:a,"numUpper","bandPart")):((0,n.assert)("int32"===a.dtype,()=>"bandPart(): numUpper's dtype must be an int32."),g=(0,y.where)((0,o.less)(a,0),T,(0,u.minimum)(a,T)));let S=(0,h.reshape)((0,c.range)(0,k,1,"int32"),[-1,1]),I=(0,c.range)(0,T,1,"int32"),w=(0,m.sub)(S,I),C=(0,l.logicalAnd)((0,i.lessEqual)(w,d),(0,s.greaterEqual)(w,(0,p.neg)(g))),E=(0,b.zeros)([k,T],v.dtype);return(0,h.reshape)((0,f.stack)((0,x.unstack)((0,h.reshape)(v,[-1,k,T])).map(e=>(0,y.where)(C,e,E))),N)}})}),x("bI4CH",function(e,t){a(e.exports,"gramSchmidt",()=>f);var r=g("38WwN"),n=g("8cCb2"),s=g("1QPqB"),o=g("jZc0w"),i=g("7k6dx"),l=g("jqSCG"),u=g("9fmAX"),p=g("kX8Hd"),d=g("8BrLX"),c=g("7kouu"),h=g("9NgTx");let f=(0,l.op)({gramSchmidt_:function(e){let t;if(Array.isArray(e)){t=!1,(0,n.assert)(null!=e&&e.length>0,()=>"Gram-Schmidt process: input must not be null, undefined, or empty");let r=e[0].shape[0];for(let t=1;t<e.length;++t)(0,n.assert)(e[t].shape[0]===r,()=>`Gram-Schmidt: Non-unique lengths found in the input vectors: (${e[t].shape[0]} vs. ${r})`)}else t=!0,e=(0,u.split)(e,e.shape[0],0).map(e=>(0,p.squeeze)(e,[0]));(0,n.assert)(e.length<=e[0].shape[0],()=>`Gram-Schmidt: Number of vectors (${e.length}) exceeds number of dimensions (${e[0].shape[0]}).`);let a=[],l=e;for(let t=0;t<e.length;++t)a.push(r.ENGINE.tidy(()=>{let e=l[t];if(t>0)for(let r=0;r<t;++r){let t=(0,o.mul)((0,h.sum)((0,o.mul)(a[r],e)),a[r]);e=(0,c.sub)(e,t)}return(0,s.div)(e,(0,i.norm)(e,"euclidean"))}));return t?(0,d.stack)(a,0):a}})}),x("ipM8K",function(e,t){a(e.exports,"qr",()=>w);var r=g("38WwN"),n=g("c2DT1"),s=g("8cCb2"),o=g("5TuCW"),i=g("iTu6j"),l=g("1QPqB"),u=g("9gIZb"),p=g("bRRKf"),d=g("aUFou"),c=g("jZc0w"),h=g("15cGp"),f=g("7k6dx"),m=g("jqSCG"),x=g("4sqA7"),y=g("79KOG"),b=g("8BrLX"),v=g("7kouu"),N=g("gmMlv"),k=g("aDHKy"),T=g("gBOC6"),S=g("l2P14");function I(e,t=!1){return r.ENGINE.tidy(()=>{(0,s.assert)(2===e.shape.length,()=>`qr2d() requires a 2D Tensor, but got a ${e.shape.length}D Tensor.`);let a=e.shape[0],m=e.shape[1],g=(0,u.eye)(a),x=(0,o.clone)(e),b=(0,N.tensor2d)([[1]],[1,1]),T=(0,o.clone)(b),I=a>=m?m:a;for(let e=0;e<I;++e){let t=x,s=T,u=g;[T,x,g]=r.ENGINE.tidy(()=>{let t=(0,y.slice)(x,[e,e],[a-e,1]),r=(0,f.norm)(t),n=(0,y.slice)(x,[e,e],[1,1]),s=(0,S.where)((0,p.greater)(n,0),(0,N.tensor2d)([[-1]]),(0,N.tensor2d)([[1]])),u=(0,v.sub)(n,(0,c.mul)(s,r)),I=(0,l.div)(t,u);T=1===I.shape[0]?(0,o.clone)(b):(0,i.concat)([b,(0,y.slice)(I,[1,0],[I.shape[0]-1,I.shape[1]])],0);let w=(0,h.neg)((0,l.div)((0,d.matMul)(s,u),r)),C=(0,y.slice)(x,[e,0],[a-e,m]),E=(0,c.mul)(w,T),A=(0,k.transpose)(T);if(0===e)x=(0,v.sub)(C,(0,d.matMul)(E,(0,d.matMul)(A,C)));else{let t=(0,v.sub)(C,(0,d.matMul)(E,(0,d.matMul)(A,C)));x=(0,i.concat)([(0,y.slice)(x,[0,0],[e,m]),t],0)}let $=(0,k.transpose)(E),R=(0,y.slice)(g,[0,e],[a,g.shape[1]-e]);if(0===e)g=(0,v.sub)(R,(0,d.matMul)((0,d.matMul)(R,T),$));else{let t=(0,v.sub)(R,(0,d.matMul)((0,d.matMul)(R,T),$));g=(0,i.concat)([(0,y.slice)(g,[0,0],[a,e]),t],1)}return[T,x,g]}),(0,n.dispose)([t,s,u])}return!t&&a>m&&(g=(0,y.slice)(g,[0,0],[a,m]),x=(0,y.slice)(x,[0,0],[m,m])),[g,x]})}let w=(0,m.op)({qr_:function(e,t=!1){if((0,s.assert)(e.rank>=2,()=>`qr() requires input tensor to have a rank >= 2, but got rank ${e.rank}`),2===e.rank)return I(e,t);{let r=e.shape.slice(0,e.shape.length-2).reduce((e,t)=>e*t),a=(0,T.unstack)((0,x.reshape)(e,[r,e.shape[e.shape.length-2],e.shape[e.shape.length-1]]),0),n=[],s=[];return a.forEach(e=>{let[r,a]=I(e,t);n.push(r),s.push(a)}),[(0,x.reshape)((0,b.stack)(n,0),e.shape),(0,x.reshape)((0,b.stack)(s,0),e.shape)]}}})}),x("beFbS",function(e,t){a(e.exports,"absoluteDifference",()=>p);var r=g("5xBLk"),n=g("8cCb2"),s=g("7j49I"),o=g("i8gZm"),i=g("jqSCG"),l=g("7kouu"),u=g("aQ3Nu");let p=(0,i.op)({absoluteDifference_:function(e,t,a,i=o.Reduction.SUM_BY_NONZERO_WEIGHTS){let p=(0,r.convertToTensor)(e,"labels","absoluteDifference"),d=(0,r.convertToTensor)(t,"predictions","absoluteDifference"),c=null;null!=a&&(c=(0,r.convertToTensor)(a,"weights","absoluteDifference")),(0,n.assertShapesMatch)(p.shape,d.shape,"Error in absoluteDifference: ");let h=(0,s.abs)((0,l.sub)(p,d));return(0,u.computeWeightedLoss)(h,c,i)}})}),x("i8gZm",function(e,t){var r,n;a(e.exports,"Reduction",()=>r),(n=r||(r={}))[n.NONE=0]="NONE",n[n.MEAN=1]="MEAN",n[n.SUM=2]="SUM",n[n.SUM_BY_NONZERO_WEIGHTS=3]="SUM_BY_NONZERO_WEIGHTS"}),x("aQ3Nu",function(e,t){a(e.exports,"computeWeightedLoss",()=>f);var r=g("5xBLk"),n=g("inFmq"),s=g("1QPqB"),o=g("i8gZm"),i=g("67GCc"),l=g("jZc0w"),u=g("8WSnu"),p=g("fOBRA"),d=g("jqSCG"),c=g("3xp7o"),h=g("9NgTx");let f=(0,d.op)({computeWeightedLoss_:function(e,t,a=o.Reduction.SUM_BY_NONZERO_WEIGHTS){let d=(0,r.convertToTensor)(e,"losses","computeWeightedLoss"),f=null;null!=t&&(f=(0,r.convertToTensor)(t,"weights","computeWeightedLoss"));let m=null==f?d:(0,l.mul)(d,f);if(a===o.Reduction.NONE)return m;if(a===o.Reduction.SUM)return(0,h.sum)(m);if(a===o.Reduction.MEAN)if(null==f)return(0,i.mean)(m);else{let e=d.size/f.size,t=(0,s.div)((0,h.sum)(m),(0,h.sum)(f));return e>1?(0,s.div)(t,(0,c.scalar)(e)):t}if(a===o.Reduction.SUM_BY_NONZERO_WEIGHTS)if(null==f)return(0,s.div)((0,h.sum)(m),(0,c.scalar)(d.size));else{let e=(0,l.mul)(f,(0,p.ones)(d.shape)),t=(0,n.cast)((0,h.sum)((0,u.notEqual)(e,(0,c.scalar)(0))),"float32");return(0,s.div)((0,h.sum)(m),t)}throw Error(`Unknown reduction: ${a}`)}})}),x("315ft",function(e,t){a(e.exports,"cosineDistance",()=>c);var r=g("5xBLk"),n=g("8cCb2"),s=g("i8gZm"),o=g("jZc0w"),i=g("jqSCG"),l=g("3xp7o"),u=g("7kouu"),p=g("9NgTx"),d=g("aQ3Nu");let c=(0,i.op)({cosineDistance_:function(e,t,a,i,c=s.Reduction.SUM_BY_NONZERO_WEIGHTS){let h=(0,r.convertToTensor)(e,"labels","cosineDistance"),f=(0,r.convertToTensor)(t,"predictions","cosineDistance"),m=null;null!=i&&(m=(0,r.convertToTensor)(i,"weights","cosineDistance")),(0,n.assertShapesMatch)(h.shape,f.shape,"Error in cosineDistance: ");let g=(0,l.scalar)(1),x=(0,u.sub)(g,(0,p.sum)((0,o.mul)(h,f),a,!0));return(0,d.computeWeightedLoss)(x,m,c)}})}),x("aqAKz",function(e,t){a(e.exports,"hingeLoss",()=>c);var r=g("5xBLk"),n=g("8cCb2"),s=g("i8gZm"),o=g("jZc0w"),i=g("jqSCG"),l=g("8wbQq"),u=g("3xp7o"),p=g("7kouu"),d=g("aQ3Nu");let c=(0,i.op)({hingeLoss_:function(e,t,a,i=s.Reduction.SUM_BY_NONZERO_WEIGHTS){let c=(0,r.convertToTensor)(e,"labels","hingeLoss"),h=(0,r.convertToTensor)(t,"predictions","hingeLoss"),f=null;null!=a&&(f=(0,r.convertToTensor)(a,"weights","hingeLoss")),(0,n.assertShapesMatch)(c.shape,h.shape,"Error in hingeLoss: ");let m=(0,u.scalar)(1);c=(0,p.sub)((0,o.mul)((0,u.scalar)(2),c),m);let g=(0,l.relu)((0,p.sub)(m,(0,o.mul)(c,h)));return(0,d.computeWeightedLoss)(g,f,i)}})}),x("2lNlw",function(e,t){a(e.exports,"huberLoss",()=>m);var r=g("5xBLk"),n=g("8cCb2"),s=g("7j49I"),o=g("hgacW"),i=g("i8gZm"),l=g("6V8xR"),u=g("jZc0w"),p=g("jqSCG"),d=g("3xp7o"),c=g("iDd8d"),h=g("7kouu"),f=g("aQ3Nu");let m=(0,p.op)({huberLoss_:function(e,t,a,p=1,m=i.Reduction.SUM_BY_NONZERO_WEIGHTS){let g=(0,r.convertToTensor)(e,"labels","huberLoss"),x=(0,r.convertToTensor)(t,"predictions","huberLoss"),y=null;null!=a&&(y=(0,r.convertToTensor)(a,"weights","huberLoss")),(0,n.assertShapesMatch)(g.shape,x.shape,"Error in huberLoss: ");let b=(0,d.scalar)(p),v=(0,s.abs)((0,h.sub)(x,g)),N=(0,l.minimum)(v,b),k=(0,h.sub)(v,N),T=(0,o.add)((0,u.mul)((0,d.scalar)(.5),(0,c.square)(N)),(0,u.mul)(b,k));return(0,f.computeWeightedLoss)(T,y,m)}})}),x("8Bzf4",function(e,t){a(e.exports,"logLoss",()=>f);var r=g("5xBLk"),n=g("8cCb2"),s=g("hgacW"),o=g("dcoCo"),i=g("i8gZm"),l=g("jZc0w"),u=g("15cGp"),p=g("jqSCG"),d=g("3xp7o"),c=g("7kouu"),h=g("aQ3Nu");let f=(0,p.op)({logLoss_:function(e,t,a,p=1e-7,f=i.Reduction.SUM_BY_NONZERO_WEIGHTS){let m=(0,r.convertToTensor)(e,"labels","logLoss"),g=(0,r.convertToTensor)(t,"predictions","logLoss"),x=null;null!=a&&(x=(0,r.convertToTensor)(a,"weights","logLoss")),(0,n.assertShapesMatch)(m.shape,g.shape,"Error in logLoss: ");let y=(0,d.scalar)(1),b=(0,d.scalar)(p),v=(0,u.neg)((0,l.mul)(m,(0,o.log)((0,s.add)(g,b)))),N=(0,l.mul)((0,c.sub)(y,m),(0,o.log)((0,s.add)((0,c.sub)(y,g),b))),k=(0,c.sub)(v,N);return(0,h.computeWeightedLoss)(k,x,f)}})}),x("2Tkqe",function(e,t){a(e.exports,"meanSquaredError",()=>u);var r=g("5xBLk"),n=g("8cCb2"),s=g("i8gZm"),o=g("jqSCG"),i=g("ay2Nw"),l=g("aQ3Nu");let u=(0,o.op)({meanSquaredError_:function(e,t,a,o=s.Reduction.SUM_BY_NONZERO_WEIGHTS){let u=(0,r.convertToTensor)(e,"labels","meanSquaredError"),p=(0,r.convertToTensor)(t,"predictions","meanSquaredError"),d=null;null!=a&&(d=(0,r.convertToTensor)(a,"weights","meanSquaredError")),(0,n.assertShapesMatch)(u.shape,p.shape,"Error in meanSquaredError: ");let c=(0,i.squaredDifference)(u,p);return(0,l.computeWeightedLoss)(c,d,o)}})}),x("7tTB0",function(e,t){a(e.exports,"sigmoidCrossEntropy",()=>y);var r=g("5xBLk"),n=g("8cCb2"),s=g("7j49I"),o=g("hgacW"),i=g("2PcQK"),l=g("5QUXI"),u=g("i8gZm"),p=g("jZc0w"),d=g("15cGp"),c=g("jqSCG"),h=g("8wbQq"),f=g("3xp7o"),m=g("7kouu"),x=g("aQ3Nu");let y=(0,c.op)({sigmoidCrossEntropy_:function(e,t,a,c=0,g=u.Reduction.SUM_BY_NONZERO_WEIGHTS){let y=(0,r.convertToTensor)(e,"multiClassLabels","sigmoidCrossEntropy"),b=(0,r.convertToTensor)(t,"logits","sigmoidCrossEntropy"),v=null;if(null!=a&&(v=(0,r.convertToTensor)(a,"weights","sigmoidCrossEntropy")),(0,n.assertShapesMatch)(y.shape,b.shape,"Error in sigmoidCrossEntropy: "),c>0){let e=(0,f.scalar)(c),t=(0,f.scalar)(1),r=(0,f.scalar)(.5);y=(0,o.add)((0,p.mul)(y,(0,m.sub)(t,e)),(0,p.mul)(r,e))}let N=function(e,t){let a=(0,r.convertToTensor)(e,"labels","sigmoidCrossEntropyWithLogits"),u=(0,r.convertToTensor)(t,"logits","sigmoidCrossEntropyWithLogits");(0,n.assertShapesMatch)(a.shape,u.shape,"Error in sigmoidCrossEntropyWithLogits: ");let c=(0,h.relu)(u),f=(0,p.mul)(u,a),g=(0,l.log1p)((0,i.exp)((0,d.neg)((0,s.abs)(u))));return(0,o.add)((0,m.sub)(c,f),g)}(y,b);return(0,x.computeWeightedLoss)(N,v,g)}})}),x("5FlUs",function(e,t){a(e.exports,"softmaxCrossEntropy",()=>k);var r=g("92fpA"),n=g("5xBLk"),s=g("8cCb2"),o=g("hgacW"),i=g("kTunp"),l=g("inFmq"),u=g("1QPqB"),p=g("2PcQK"),d=g("9dGIC"),c=g("i8gZm"),h=g("jZc0w"),f=g("15cGp"),m=g("jqSCG"),x=g("4sqA7"),y=g("3xp7o"),b=g("7kouu"),v=g("9NgTx"),N=g("aQ3Nu");let k=(0,m.op)({softmaxCrossEntropy_:function(e,t,a,m=0,g=c.Reduction.SUM_BY_NONZERO_WEIGHTS){let k=(0,n.convertToTensor)(e,"onehotLabels","softmaxCrossEntropy"),T=(0,n.convertToTensor)(t,"logits","softmaxCrossEntropy"),S=null;if(null!=a&&(S=(0,n.convertToTensor)(a,"weights","softmaxCrossEntropy")),(0,s.assertShapesMatch)(k.shape,T.shape,"Error in softmaxCrossEntropy: "),m>0){let e=(0,y.scalar)(m),t=(0,y.scalar)(1),r=(0,y.scalar)(k.shape[1]);k=(0,o.add)((0,h.mul)(k,(0,b.sub)(t,e)),(0,u.div)(e,r))}let I=function(e,t,a=-1){if(-1===a&&(a=t.rank-1),a!==t.rank-1)throw Error(`Softmax cross entropy along a non-last dimension is not yet supported. Labels / logits was rank ${t.rank} and dim was ${a}`);return(0,r.customGrad)((e,t,r)=>{let n=(0,d.logSumExp)(t,[a],!0),s=(0,b.sub)((0,l.cast)(t,"float32"),n);r([e,s]);let o=(0,f.neg)((0,h.mul)(s,e));return{value:(0,v.sum)(o,[a]),gradFunc:(e,t)=>{let[r,n]=t,s=(0,i.expandShapeToKeepDim)(e.shape,[a]);return[(0,h.mul)((0,x.reshape)(e,s),(0,b.sub)((0,l.cast)(r,"float32"),(0,p.exp)(n))),(0,h.mul)((0,x.reshape)(e,s),(0,b.sub)((0,p.exp)(n),(0,l.cast)(r,"float32")))]}}})(e,t)}(k,T);return(0,N.computeWeightedLoss)(I,S,g)}})}),x("gXzaa",function(e,t){a(e.exports,"sparseFillEmptyRows",()=>o);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk");let o=(0,g("jqSCG").op)({sparseFillEmptyRows_:function(e,t,a,o){let i=(0,s.convertToTensor)(e,"indices","sparseFillEmptyRows","int32"),l=(0,s.convertToTensor)(t,"values","sparseFillEmptyRows"),u=(0,s.convertToTensor)(a,"denseShape","sparseFillEmptyRows","int32"),p=(0,s.convertToTensor)(o,"defaultValue","sparseFillEmptyRows",l.dtype);if(2!==i.rank)throw Error(`Indices should be Tensor2D but received shape
        ${i.shape}`);if(1!==l.rank)throw Error(`Values should be Tensor1D but received shape ${l.shape}`);if(1!==u.rank)throw Error(`Dense shape should be Tensor1D but received shape ${u.shape}`);if(0!==p.rank)throw Error(`Default value should be a scalar but received shape ${p.shape}`);let d=r.ENGINE.runKernel(n.SparseFillEmptyRows,{indices:i,values:l,denseShape:u,defaultValue:p});return{outputIndices:d[0],outputValues:d[1],emptyRowIndicator:d[2],reverseIndexMap:d[3]}}})}),x("fMgdQ",function(e,t){a(e.exports,"sparseReshape",()=>o);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk");let o=(0,g("jqSCG").op)({sparseReshape_:function(e,t,a){let o=(0,s.convertToTensor)(e,"inputIndices","sparseReshape","int32"),i=(0,s.convertToTensor)(t,"inputShape","sparseReshape","int32"),l=(0,s.convertToTensor)(a,"newShape","sparseReshape","int32");if(2!==o.rank)throw Error(`Input indices should be Tensor2D but received shape
        ${o.shape}`);if(1!==i.rank)throw Error(`Input shape should be Tensor1D but received shape ${i.shape}`);if(1!==l.rank)throw Error(`New shape should be Tensor1D but received shape ${l.shape}`);let u=r.ENGINE.runKernel(n.SparseReshape,{inputIndices:o,inputShape:i,newShape:l});return{outputIndices:u[0],outputShape:u[1]}}})}),x("22SmX",function(e,t){a(e.exports,"sparseSegmentMean",()=>o);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk");let o=(0,g("jqSCG").op)({sparseSegmentMean_:function(e,t,a){let o=(0,s.convertToTensor)(e,"data","sparseSegmentMean"),i=(0,s.convertToTensor)(t,"indices","sparseSegmentMean","int32"),l=(0,s.convertToTensor)(a,"segmentIds","sparseSegmentMean","int32");if(o.rank<1)throw Error("Data should be at least 1 dimensional but received scalar");if(1!==i.rank)throw Error(`Indices should be Tensor1D but received shape
          ${i.shape}`);if(1!==l.rank)throw Error(`Segment ids should be Tensor1D but received shape
          ${l.shape}`);return r.ENGINE.runKernel(n.SparseSegmentMean,{data:o,indices:i,segmentIds:l})}})}),x("6wGr9",function(e,t){a(e.exports,"sparseSegmentSum",()=>o);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk");let o=(0,g("jqSCG").op)({sparseSegmentSum_:function(e,t,a){let o=(0,s.convertToTensor)(e,"data","sparseSegmentSum"),i=(0,s.convertToTensor)(t,"indices","sparseSegmentSum","int32"),l=(0,s.convertToTensor)(a,"segmentIds","sparseSegmentSum","int32");if(o.rank<1)throw Error("Data should be at least 1 dimensional but received scalar");if(1!==i.rank)throw Error(`Indices should be Tensor1D but received shape
         ${i.shape}`);if(1!==l.rank)throw Error(`Segment ids should be Tensor1D but received shape
         ${l.shape}`);return r.ENGINE.runKernel(n.SparseSegmentSum,{data:o,indices:i,segmentIds:l})}})}),x("brFzl",function(e,t){a(e.exports,"stringNGrams",()=>o);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk");let o=(0,g("jqSCG").op)({stringNGrams_:function(e,t,a,o,i,l,u,p){let d=(0,s.convertToTensor)(e,"data","stringNGrams","string");if("string"!==d.dtype)throw Error("Data must be of datatype string");if(1!==d.shape.length)throw Error(`Data must be a vector, saw: ${d.shape}`);let c=(0,s.convertToTensor)(t,"dataSplits","stringNGrams");if("int32"!==c.dtype)throw Error("Data splits must be of datatype int32");let h=r.ENGINE.runKernel(n.StringNGrams,{data:d,dataSplits:c},{separator:a,nGramWidths:o,leftPad:i,rightPad:l,padWidth:u,preserveShortSequences:p});return{nGrams:h[0],nGramsSplits:h[1]}}})}),x("VUiwf",function(e,t){a(e.exports,"stringSplit",()=>o);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk");let o=(0,g("jqSCG").op)({stringSplit_:function(e,t,a=!0){let o=(0,s.convertToTensor)(e,"input","stringSplit","string"),i=(0,s.convertToTensor)(t,"delimiter","stringSplit","string");if(1!==o.rank)throw Error(`Input should be Tensor1D but received shape ${o.shape}`);if(0!==i.rank)throw Error(`Delimiter should be a scalar but received shape ${i.shape}`);let l=r.ENGINE.runKernel(n.StringSplit,{input:o,delimiter:i},{skipEmpty:a});return{indices:l[0],values:l[1],shape:l[2]}}})}),x("g7F6x",function(e,t){a(e.exports,"stringToHashBucketFast",()=>o);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk");let o=(0,g("jqSCG").op)({stringToHashBucketFast_:function(e,t){let a=(0,s.convertToTensor)(e,"input","stringToHashBucketFast","string");if(t<=0)throw Error("Number of buckets must be at least 1");return r.ENGINE.runKernel(n.StringToHashBucketFast,{input:a},{numBuckets:t})}})}),x("bZL8f",function(e,t){a(e.exports,"staticRegexReplace",()=>o);var r=g("38WwN"),n=g("hl418"),s=g("5xBLk");let o=(0,g("jqSCG").op)({staticRegexReplace_:function(e,t,a,o=!0){let i=(0,s.convertToTensor)(e,"input","staticRegexReplace","string");return r.ENGINE.runKernel(n.StaticRegexReplace,{x:i},{pattern:t,rewrite:a,replaceGlobal:o})}})}),x("dXS8M",function(e,t){a(e.exports,"train",()=>r);let r=g("bO4Xu").OptimizerConstructors}),x("9LtVT",function(e,t){a(e.exports,"nextFrame",()=>n);let r="undefined"!=typeof requestAnimationFrame?requestAnimationFrame:"undefined"!=typeof setImmediate?setImmediate:e=>e();function n(){return new Promise(e=>r(()=>e()))}}),x("7MaPk",function(e,t){a(e.exports,"fromUint8ToStringArray",()=>C),a(e.exports,"fromStringArrayToUint8",()=>E),a(e.exports,"slice_util",()=>g("bszZn")),a(e.exports,"upcastType",()=>g("2MDja").upcastType),a(e.exports,"segment_util",()=>g("fHbAS"));var r=g("jjNRA"),s=g("kTunp"),o=g("8BaGO"),i=g("chyju"),l=g("frznq"),u=g("bzoAL"),p=g("dlbe1"),d=g("kaAdl"),c=g("4ldJF");g("bszZn"),g("2MDja");var h=g("aQHa6"),f=g("4h3p6"),m=g("4EvS9"),x=g("7wQGW"),y=g("eowEY"),b=g("aMsMA"),v=g("cgHNs"),N=g("eCPD4"),k=g("izI5a"),T=g("4pqBf"),S=g("5NPez"),I=g("2A2jF"),w=g("6bLmC");function C(e){try{return e.map(e=>(0,r.decodeString)(e))}catch(e){throw Error(`Failed to decode encoded string bytes into utf-8, error: ${e}`)}}function E(e){return e.map(e=>(0,r.encodeString)(e))}g("fHbAS"),n(e.exports,s),n(e.exports,o),n(e.exports,i),n(e.exports,l),n(e.exports,u),n(e.exports,p),n(e.exports,d),n(e.exports,c),n(e.exports,h),n(e.exports,f),n(e.exports,m),n(e.exports,x),n(e.exports,y),n(e.exports,b),n(e.exports,v),n(e.exports,N),n(e.exports,k),n(e.exports,T),n(e.exports,S),n(e.exports,I),n(e.exports,w)}),x("chyju",function(e,t){a(e.exports,"assertParamsConsistent",()=>n),a(e.exports,"computeOutShape",()=>s);var r=g("8cCb2");function n(e,t){let a=e[0].length;e.forEach((e,t)=>{r.assert(e.length===a,()=>`Error in concat${a}D: rank of tensors[${t}] must be the same as the rank of the rest (${a})`)}),r.assert(t>=0&&t<a,()=>`Error in concat${a}D: axis must be between 0 and ${a-1}.`);let n=e[0];e.forEach((e,s)=>{for(let o=0;o<a;o++)r.assert(o===t||e[o]===n[o],()=>`Error in concat${a}D: Shape of tensors[${s}] (${e}) does not match the shape of the rest (${n}) along the non-concatenated axis ${s}.`)})}function s(e,t){let r=e[0].slice();for(let a=1;a<e.length;a++)r[t]+=e[a][t];return r}}),x("dlbe1",function(e,t){}),x("kaAdl",function(e,t){var r,n;function s(e,t,r){let a=[];if(null==r&&null==t)return a;if(null==t)for(;a.length<e+r.length;)a.push(-1);else a=t.slice();if(null==r)return a;if(e+r.length!==a.length)throw Error(`rt input.shape and shape=${t} are incompatible: rt input.rank = ${e+r.length}, but shape.rank = ${a.length}`);for(let n=1;n<r.length;++n){let s=r[n],o=a[a.length-r.length+n],i=a[o];if(s>=0)if(i>=0){if(i!==s)throw Error(`rt input.shape and shape=${t} are incompatible: rt input.shape[${n+e}] = ${s} but shape[${n+e}] = ${i}`)}else a[o]=s}return a}function o(e){let t={FIRST_DIM_SIZE:r.FIRST_DIM_SIZE,VALUE_ROWIDS:r.VALUE_ROWIDS,ROW_LENGTHS:r.ROW_LENGTHS,ROW_SPLITS:r.ROW_SPLITS,ROW_LIMITS:r.ROW_LIMITS,ROW_STARTS:r.ROW_STARTS},a=[];for(let r of e)if(r in t)a.push(t[r]);else break;return a}function i(e){return 0===e.length?0:e[0]===r.FIRST_DIM_SIZE?e.length-1:e.length}function l(e,t){if(null==e||null==t)return;let r=e.length,a=t.length;if(r>=a)throw Error(`defaultValue.shape=${e} and ragged tensor flatValues.shape=${t}, are incompatible: defaultValue.rank = ${r} must be less than ragged tensor input flatValues.rank = ${a})`);for(let n=0;n<Math.min(r,a-1);++n){let r=e[n],a=t[n+1];if(r>=0&&a>=0&&1!==r&&r!==a)throw Error(`defaultValue.shape=${e}, and ragged tensor input flatValues.shape=${t} are incompatible: defaultValue.shape[${n-e.length}] = ${r} but ragged tensor input.flatValues.shape[${n-e.length}] = ${a}`)}}a(e.exports,"RowPartitionType",()=>r),a(e.exports,"combineRaggedTensorToTensorShapes",()=>s),a(e.exports,"getRowPartitionTypesHelper",()=>o),a(e.exports,"getRaggedRank",()=>i),a(e.exports,"validateDefaultValueShape",()=>l),(n=r||(r={}))[n.FIRST_DIM_SIZE=0]="FIRST_DIM_SIZE",n[n.VALUE_ROWIDS=1]="VALUE_ROWIDS",n[n.ROW_LENGTHS=2]="ROW_LENGTHS",n[n.ROW_SPLITS=3]="ROW_SPLITS",n[n.ROW_LIMITS=4]="ROW_LIMITS",n[n.ROW_STARTS=5]="ROW_STARTS"}),x("4ldJF",function(e,t){a(e.exports,"PARALLELIZE_THRESHOLD",()=>n),a(e.exports,"computeOptimalWindowSize",()=>s);var r=g("8cCb2");let n=30;function s(e){return e<=n?e:(0,r.nearestDivisor)(e,Math.floor(Math.sqrt(e)))}}),x("aQHa6",function(e,t){a(e.exports,"getImageCenter",()=>r);function r(e,t,r){return[r*("number"==typeof e?e:e[0]),t*("number"==typeof e?e:e[1])]}}),x("4h3p6",function(e,t){function r(e,t,a,n=!0){let s=[];if(n)(s=s.concat(t.slice(0))).push(e[0]/a),s=s.concat(e.slice(1));else{s=s.concat(e[0]);let r=t.length;for(let a=0;a<r;++a)s=s.concat([e[a+1]/t[a],t[a]]);s=s.concat(e.slice(r+1))}return s}function n(e,t,r=!0){let a=[];if(r){a.push(t);for(let r=t+1;r<e;++r)r<=2*t?(a.push(r),a.push(r-(t+1))):a.push(r)}else{let r=[],n=[];for(let a=1;a<e;++a)a>=2*t+1||a%2==1?n.push(a):r.push(a);a.push(...r),a.push(0),a.push(...n)}return a}function s(e,t,r,a=!0){let n=[];a?n.push(e[0]/r):n.push(e[0]*r);for(let r=1;r<e.length;++r)r<=t.length?a?n.push(t[r-1]*e[r]):n.push(e[r]/t[r-1]):n.push(e[r]);return n}function o(e,t){let r=[0];for(let a=0;a<t;++a)r.push(e[a][0]);return r}function i(e,t,r){let a=e.slice(0,1);for(let n=0;n<r;++n)a.push(e[n+1]-t[n][0]-t[n][1]);return a}a(e.exports,"getReshaped",()=>r),a(e.exports,"getPermuted",()=>n),a(e.exports,"getReshapedPermuted",()=>s),a(e.exports,"getSliceBeginCoords",()=>o),a(e.exports,"getSliceSize",()=>i)}),x("eowEY",function(e,t){a(e.exports,"SELU_SCALEALPHA",()=>r),a(e.exports,"SELU_SCALE",()=>n);let r=1.7580993408473768,n=1.0507009873554805}),x("aMsMA",function(e,t){a(e.exports,"ERF_P",()=>r),a(e.exports,"ERF_A1",()=>n),a(e.exports,"ERF_A2",()=>s),a(e.exports,"ERF_A3",()=>o),a(e.exports,"ERF_A4",()=>i),a(e.exports,"ERF_A5",()=>l);let r=.3275911,n=.254829592,s=-.284496736,o=1.421413741,i=-1.453152027,l=1.061405429}),x("eCPD4",function(e,t){function r(e,t){if(e.length!==t.length)throw Error(`Cannot merge real and imag arrays of different lengths. real:${e.length}, imag: ${t.length}.`);let r=new Float32Array(2*e.length);for(let a=0;a<r.length;a+=2)r[a]=e[a/2],r[a+1]=t[a/2];return r}function n(e){let t=new Float32Array(e.length/2),r=new Float32Array(e.length/2);for(let a=0;a<e.length;a+=2)t[a/2]=e[a],r[a/2]=e[a+1];return{real:t,imag:r}}function s(e){let t=Math.ceil(e.length/4),r=new Float32Array(t),a=new Float32Array(t);for(let t=0;t<e.length;t+=4)r[Math.floor(t/4)]=e[t],a[Math.floor(t/4)]=e[t+1];return{real:r,imag:a}}function o(e){let t=Math.floor(e.length/4),r=new Float32Array(t),a=new Float32Array(t);for(let t=2;t<e.length;t+=4)r[Math.floor(t/4)]=e[t],a[Math.floor(t/4)]=e[t+1];return{real:r,imag:a}}function i(e,t){return{real:e[2*t],imag:e[2*t+1]}}function l(e,t,r,a){e[2*a]=t,e[2*a+1]=r}function u(e,t){let r=new Float32Array(e/2),a=new Float32Array(e/2);for(let n=0;n<Math.ceil(e/2);n++){let s=(t?2:-2)*Math.PI*(n/e);r[n]=Math.cos(s),a[n]=Math.sin(s)}return{real:r,imag:a}}function p(e,t,r){let a=(r?2:-2)*Math.PI*(e/t);return{real:Math.cos(a),imag:Math.sin(a)}}a(e.exports,"mergeRealAndImagArrays",()=>r),a(e.exports,"splitRealAndImagArrays",()=>n),a(e.exports,"complexWithEvenIndex",()=>s),a(e.exports,"complexWithOddIndex",()=>o),a(e.exports,"getComplexWithIndex",()=>i),a(e.exports,"assignToTypedArray",()=>l),a(e.exports,"exponents",()=>u),a(e.exports,"exponent",()=>p)}),x("izI5a",function(e,t){a(e.exports,"decodeEinsumEquation",()=>s),a(e.exports,"getEinsumPermutation",()=>o),a(e.exports,"checkEinsumDimSizes",()=>i),a(e.exports,"getEinsumComputePath",()=>l),a(e.exports,"isIdentityPermutation",()=>u);var r=g("8cCb2");let n=/->/g;function s(e,t){let a=((e=e.replace(/\s/g,"")).length-e.replace(n,"").length)/2;if(a<1)throw Error("Equations without an arrow are not supported.");if(a>1)throw Error('Equation must contain exactly one arrow ("->").');let[s,o]=e.split("->");(0,r.assert)(-1===s.indexOf("..."),()=>'The ellipsis notation ("...") is not supported yet.');let i=s.split(","),l=i.length;if(t!==l)throw Error(`Expected ${l} input tensors, received ${t}`);if(l>2)throw Error("Support for more than 2 input tensors is not implemented yet.");let u=[];for(let e=0;e<o.length;++e){let t=o[e];if(!i.some(e=>-1!==e.indexOf(t)))throw Error(`Output subscripts contain the label ${t} not present in the input subscripts.`);-1===u.indexOf(t)&&u.push(t)}for(let e=0;e<s.length;++e){let t=s[e];-1===u.indexOf(t)&&","!==t&&u.push(t)}let p=Array(i.length);for(let e=0;e<l;++e){if(new Set(i[e].split("")).size!==i[e].length)throw Error(`Found duplicate axes in input component ${i[e]}. Support for duplicate axes in input is not implemented yet.`);p[e]=[];for(let t=0;t<i[e].length;++t)p[e].push(u.indexOf(i[e][t]))}let d=u.length,c=o.length,h=[];for(let e=c;e<d;++e)h.push(e);return{allDims:u,summedDims:h,idDims:p}}function o(e,t){let r=Array(e);r.fill(-1);for(let e=0;e<t.length;++e)r[t[e]]=e;let a=[];for(let t=0;t<e;++t)-1===r[t]&&a.push(t);return{permutationIndices:r=r.filter(e=>-1!==e),expandDims:a}}function i(e,t,a){let n=Array(e);for(let e=0;e<a.length;++e){let s=a[e].shape;for(let a=0;a<t[e].length;++a)void 0===n[t[e][a]]?n[t[e][a]]=s[a]:(0,r.assert)(n[t[e][a]]===s[a],()=>`Expected dimension ${n[t[e][a]]} at axis ${a} of input shaped ${JSON.stringify(s)}, but got dimension ${s[a]}`)}}function l(e,t){let r=[],a=0;0===e.length&&e.push(-1),a=e.length+1;for(let e=0;e<a;++e)r.push([]);let n=[];for(let a=0;a<e.length;++a)for(let s of function(e,t){let r=[];for(let a=0;a<e.length;++a)(0===e[a].length||-1!==e[a].indexOf(t)||-1===t)&&r.push(a);return r}(t,e[a]))-1===n.indexOf(s)&&(r[a].push(s),n.push(s));return{path:e,steps:r}}function u(e){return e.every((e,t)=>e===t)}}),x("4pqBf",function(e,t){a(e.exports,"prepareSplitSize",()=>n);var r=g("8cCb2");function n(e,t,a=0){let s=[];if("number"==typeof t)(0,r.assert)(e.shape[a]%t==0,()=>"Number of splits must evenly divide the axis."),s=Array(t).fill(e.shape[a]/t);else{let n=t.reduce((e,t)=>(-1===t&&(e+=1),e),0);(0,r.assert)(n<=1,()=>"There should be only one negative value in split array.");let o=t.indexOf(-1);if(-1!==o){let r=t.reduce((e,t)=>t>0?e+t:e);t[o]=e.shape[a]-r}(0,r.assert)(e.shape[a]===t.reduce((e,t)=>e+t),()=>"The sum of sizes must match the size of the axis dimension."),s=t}return s}}),x("5NPez",function(e,t){function r(e){return`Received SparseTensor with denseShape[0] = 0 but
  indices.shape[0] = ${e}`}function n(e,t){return`indices(${e}, 0) is invalid: ${t} < 0`}function s(e,t,r){return`indices(${e}, 0) is invalid: ${t} >= ${r}`}a(e.exports,"getSparseFillEmptyRowsIndicesDenseShapeMismatch",()=>r),a(e.exports,"getSparseFillEmptyRowsNegativeIndexErrorMessage",()=>n),a(e.exports,"getSparseFillEmptyRowsOutOfRangeIndexErrorMessage",()=>s)}),x("2A2jF",function(e,t){a(e.exports,"getSparseReshapeMultipleNegativeOneOutputDimErrorMessage",()=>n),a(e.exports,"getSparseReshapeNegativeOutputDimErrorMessage",()=>s),a(e.exports,"getSparseReshapeEmptyTensorZeroOutputDimErrorMessage",()=>o),a(e.exports,"getSparseReshapeInputOutputMultipleErrorMessage",()=>i),a(e.exports,"getSparseReshapeInputOutputMismatchErrorMessage",()=>l);var r=g("8cCb2");function n(e,t){return`only one output dimension may be -1, not both ${e} and ${t}`}function s(e,t){return`size ${e} must be non-negative, not ${t}`}function o(){return"reshape cannot infer the missing input size for an empty tensor unless all specified input sizes are non-zero"}function i(e,t){let a=(0,r.sizeFromShape)(e),n=(0,r.sizeFromShape)(t);return`Input to reshape is a SparseTensor with ${a}
  dense values, but the requested shape requires a multiple of ${n}. inputShape=${e} outputShape= ${t}`}function l(e,t){let a=(0,r.sizeFromShape)(e),n=(0,r.sizeFromShape)(t);return`Input to reshape is a tensor with ${a} dense values, but the requested shape has ${n}. inputShape=${e} outputShape=${t}`}}),x("6bLmC",function(e,t){function r(){return"segment ids must be >= 0"}function n(){return"segment ids are not increasing"}function s(e,t){return`Segment id ${e} out of range [0, ${t}), possibly because segmentIds input is not sorted.`}function o(e,t,r){return`Bad: indices[${e}] == ${t} out of range [0, ${r})`}a(e.exports,"getSparseSegmentReductionNegativeSegmentIdsErrorMessage",()=>r),a(e.exports,"getSparseSegmentReductionNonIncreasingSegmentIdsErrorMessage",()=>n),a(e.exports,"getSparseSegmentReductionSegmentIdOutOfRangeErrorMessage",()=>s),a(e.exports,"getSparseSegmentReductionIndicesOutOfRangeErrorMessage",()=>o)}),x("fHbAS",function(e,t){a(e.exports,"segOpComputeOptimalWindowSize",()=>s),a(e.exports,"computeOutShape",()=>o),a(e.exports,"collectGatherOpShapeInfo",()=>i);var r=g("8cCb2"),n=g("4ldJF");function s(e,t){let a,s=!1;for(e<=n.PARALLELIZE_THRESHOLD?(a=e,s=!0):a=(0,r.nearestDivisor)(e,Math.floor(Math.sqrt(e)));!s;)a>t||a===e?s=!0:a=(0,r.nearestDivisor)(e,a+1);return a}function o(e,t,r){let a=[],n=e.length;for(let s=0;s<n;s++)s!==t?a.push(e[s]):a.push(r);return a}function i(e,t,r,a){let n=t.shape.length,s=e.shape.length;if(0!==a&&(a<-n||a>n))throw Error(`Expect batchDims in the range of [-${n}, ${n}], but got ${a}`);if(a<0&&(a+=n),a>s)throw Error(`batchDims (${a}) must be less than rank(x) (
    ${s}).`);if(r<a)throw Error(`batchDims (${a}) must be less than or equal to axis (${r}).`);for(let r=0;r<a;++r)if(e.shape[r]!==t.shape[r])throw Error(`x.shape[${r}]: ${e.shape[r]} should be equal to indices.shape[${r}]: ${t.shape[r]}.`);let o=e.shape[r],i=[],l=1,u=1,p=1;for(let t=0;t<a;++t)i.push(e.shape[t]),l*=e.shape[t];for(let t=a;t<r;t++)i.push(e.shape[t]),u*=e.shape[t];for(let e=a;e<n;e++)i.push(t.shape[e]);for(let t=r+1;t<s;t++)i.push(e.shape[t]),p*=e.shape[t];return{batchSize:l,sliceSize:p,outerSize:u,dimSize:o,outputShape:i}}}),x("lzjc8",function(e,t){a(e.exports,"nonMaxSuppressionV3Impl",()=>g("KPYos").nonMaxSuppressionV3Impl),a(e.exports,"nonMaxSuppressionV4Impl",()=>g("KPYos").nonMaxSuppressionV4Impl),a(e.exports,"nonMaxSuppressionV5Impl",()=>g("KPYos").nonMaxSuppressionV5Impl),a(e.exports,"whereImpl",()=>g("kNeGS").whereImpl),g("KPYos"),g("kNeGS")}),x("bVQtG",function(e,t){a(e.exports,"GraphModel",()=>d),a(e.exports,"loadGraphModel",()=>c),a(e.exports,"loadGraphModelSync",()=>h),g("i64bB");var r=g("c2DT1"),n=g("9ELKf"),s=g("9jCh7"),o=g("jjNRA"),i=g("jRFPP"),l=g("eZl48"),u=g("kqYp1"),p=g("4FRLN");class d{get modelVersion(){return this.version}get inputNodes(){return this.executor.inputNodes}get outputNodes(){return this.executor.outputNodes}get inputs(){return this.executor.inputs}get outputs(){return this.executor.outputs}get weights(){return this.executor.weightMap}get metadata(){return this.artifacts.userDefinedMetadata}get modelSignature(){return this.signature}get modelStructuredOutputKeys(){return this.structuredOutputKeys}constructor(e,t={},r=n){this.modelUrl=e,this.loadOptions=t,this.version="n/a",this.io=r,null==t&&(this.loadOptions={}),this.resourceManager=new(0,u.ResourceManager)}findIOHandler(){let e=this.modelUrl;if(null!=e.load)this.handler=e;else if(null!=this.loadOptions.requestInit)this.handler=this.io.browserHTTPRequest(e,this.loadOptions);else{let t=this.io.getLoadHandlers(e,this.loadOptions);if(0===t.length)t.push(this.io.browserHTTPRequest(e,this.loadOptions));else if(t.length>1)throw Error(`Found more than one (${t.length}) load handlers for URL '${[e]}'`);this.handler=t[0]}}load(){if(this.findIOHandler(),null==this.handler.load)throw Error("Cannot proceed with model loading because the IOHandler provided does not have the `load` method implemented.");let e=this.handler.load();return o.isPromise(e)?e.then(e=>null==e.getWeightStream?this.loadSync(e):this.loadStreaming(e)):this.loadSync(e)}loadSync(e){let t=this.io.decodeWeights(e.weightData,e.weightSpecs);return this.loadWithWeightMap(e,t)}async loadStreaming(e){if(null==e.getWeightStream)throw Error("Model artifacts missing streamWeights function");let t=await (0,p.decodeWeightsStream)(e.getWeightStream(),e.weightSpecs);return this.loadWithWeightMap(e,t)}loadWithWeightMap(e,t){this.artifacts=e;let r=this.artifacts.modelTopology,a=this.artifacts.signature;if(null!=this.artifacts.userDefinedMetadata){let e=this.artifacts.userDefinedMetadata;null!=e.signature&&(a=e.signature),null!=e.structuredOutputKeys&&(this.structuredOutputKeys=e.structuredOutputKeys)}if(this.signature=a,this.version=`${r.versions.producer}.${r.versions.minConsumer}`,this.executor=new(0,l.GraphExecutor)(i.OperationMapper.Instance.transformGraph(r,this.signature)),this.executor.weightMap=this.convertTensorMapToTensorsMap(t),this.executor.resourceManager=this.resourceManager,null!=e.modelInitializer&&null!=e.modelInitializer.node){let t=i.OperationMapper.Instance.transformGraph(e.modelInitializer);this.initializer=new(0,l.GraphExecutor)(t),this.initializer.weightMap=this.executor.weightMap,this.initializer.resourceManager=this.resourceManager,this.initializerSignature=e.initializerSignature}return!0}async save(e,t){if("string"==typeof e){let t=this.io.getSaveHandlers(e);if(0===t.length)throw Error(`Cannot find any save handlers for URL '${e}'`);if(t.length>1)throw Error(`Found more than one (${t.length}) save handlers for URL '${e}'`);e=t[0]}if(null==e.save)throw Error("GraphModel.save() cannot proceed because the IOHandler provided does not have the `save` attribute defined.");return e.save(this.artifacts)}addStructuredOutputNames(e){if(this.structuredOutputKeys){let t=e instanceof s.Tensor?[e]:e,r={};return t.forEach((e,t)=>r[this.structuredOutputKeys[t]]=e),r}return e}predict(e,t){let r=this.execute(e,this.outputNodes);return this.addStructuredOutputNames(r)}async predictAsync(e,t){let r=await this.executeAsync(e,this.outputNodes);return this.addStructuredOutputNames(r)}normalizeInputs(e){var t;if(!(e instanceof s.Tensor)&&!Array.isArray(e)){let r=null==(t=this.signature)?void 0:t.inputs;if(null!=r)for(let t in r){let a=r[t];null!=a.resourceId&&(e[t]=this.resourceIdToCapturedInput[a.resourceId])}return e}e=Array.isArray(e)?e:[e];let r=Object.keys(this.resourceIdToCapturedInput).length;if(e.length+r!==this.inputNodes.length)throw Error(`Input tensor count mismatch, the graph model has ${this.inputNodes.length-r} non-resource placeholders, while there are ${e.length} input tensors provided.`);let a=0;return this.inputNodes.reduce((t,r)=>{var n,s,o;let i=null==(o=null==(s=null==(n=this.signature)?void 0:n.inputs)?void 0:s[r])?void 0:o.resourceId;return null!=i?t[r]=this.resourceIdToCapturedInput[i]:t[r]=e[a++],t},{})}normalizeOutputs(e){return Array.isArray(e=e||this.outputNodes)?e:[e]}executeInitializerGraph(){return null==this.initializer?[]:null==this.initializerSignature?this.initializer.execute({},[]):this.initializer.execute({},Object.keys(this.initializerSignature.outputs))}async executeInitializerGraphAsync(){return null==this.initializer?[]:null==this.initializerSignature?this.initializer.executeAsync({},[]):this.initializer.executeAsync({},Object.keys(this.initializerSignature.outputs))}setResourceIdToCapturedInput(e){if(this.resourceIdToCapturedInput={},this.initializerSignature){let t=this.initializerSignature.outputs,r=Object.keys(t);for(let a=0;a<r.length;a++){let n=t[r[a]];this.resourceIdToCapturedInput[n.resourceId]=e[a]}}}execute(e,t){null==this.resourceIdToCapturedInput&&this.setResourceIdToCapturedInput(this.executeInitializerGraph()),e=this.normalizeInputs(e),t=this.normalizeOutputs(t);let r=this.executor.execute(e,t);return r.length>1?r:r[0]}async executeAsync(e,t){null==this.resourceIdToCapturedInput&&this.setResourceIdToCapturedInput(await this.executeInitializerGraphAsync()),e=this.normalizeInputs(e),t=this.normalizeOutputs(t);let r=await this.executor.executeAsync(e,t);return r.length>1?r:r[0]}getIntermediateTensors(){return this.executor.getIntermediateTensors()}disposeIntermediateTensors(){this.executor.disposeIntermediateTensors()}convertTensorMapToTensorsMap(e){return Object.keys(e).reduce((t,r)=>(t[r]=[e[r]],t),{})}dispose(){this.executor.dispose(),this.initializer&&(this.initializer.dispose(),this.resourceIdToCapturedInput&&(0,r.dispose)(this.resourceIdToCapturedInput)),this.resourceManager.dispose()}}async function c(e,t={},r=n){var a;if(null==e)throw Error("modelUrl in loadGraphModel() cannot be null. Please provide a url or an IOHandler that loads the model");null==t&&(t={}),t.fromTFHub&&"string"==typeof e&&((a=e).endsWith("/")||(a+="/"),e=`${a}model.json?tfjs-format=file`);let s=new d(e,t,r);return await s.load(),s}function h(e){let t;if(null==e)throw Error("modelUrl in loadGraphModelSync() cannot be null. Please provide model artifacts or an IOHandler that loads the model");if(e instanceof Array){let[r,a]=e;if(!r)throw Error("modelJSON must be the first element of the array");if(!a||!(a instanceof ArrayBuffer))throw Error("An ArrayBuffer of weights must be the second element of the array");if(!("modelTopology"in r))throw Error("Model JSON is missing 'modelTopology'");if(!("weightsManifest"in r))throw Error("Model JSON is missing 'weightsManifest'");let s=n.getWeightSpecs(r.weightsManifest),o=n.getModelArtifactsForJSONSync(r,s,a);t=n.fromMemorySync(o)}else if("load"in e)t=e;else if("modelTopology"in e&&"weightSpecs"in e&&"weightData"in e)t=n.fromMemorySync(e);else throw Error("Unknown model format");let r=new d(t);return r.load(),r}}),x("jRFPP",function(e,t){a(e.exports,"OperationMapper",()=>E),a(e.exports,"getStringParam",()=>$),a(e.exports,"getStringArrayParam",()=>V),a(e.exports,"getNumberParam",()=>P),a(e.exports,"getNumericArrayParam",()=>L),a(e.exports,"getBoolParam",()=>R),a(e.exports,"getBoolArrayParam",()=>W),a(e.exports,"getTensorShapeParam",()=>_),a(e.exports,"getTensorShapeArrayParam",()=>G),a(e.exports,"getDtypeParam",()=>O),a(e.exports,"getDtypeArrayParam",()=>M),g("i64bB");var r=g("ibsdL"),n=g("iILH2"),s=g("dWfqP"),o=g("9PnRL"),i=g("cCcNy"),l=g("6T10F"),u=g("25do8"),p=g("kQhpu"),d=g("iKevB"),c=g("gul1X"),h=g("8ADHf"),f=g("cf9s6"),m=g("agimj"),x=g("j4qIR"),y=g("gUOFE"),b=g("6seiJ"),v=g("1st1Z"),N=g("l0Shb"),k=g("eTKRE"),T=g("5vXpX"),S=g("kuUeg"),I=g("3Fxik"),w=g("3km3B"),C=g("6ZWSX").Buffer;class E{static get Instance(){return this._instance||(this._instance=new this)}constructor(){let e=[].concat(...[i,l,u,p,d,c,h,f,m,x,y,b,v,N,k,T,S,I,w].map(e=>e.json));this.opMappers=e.reduce((e,t)=>(e[t.tfOpName]=t,e),{})}transformGraph(e,t={}){let r=e.node,a=[],n=[],s=[],i=r.reduce((e,t)=>(e[t.name]=this.mapNode(t),t.op.startsWith("Placeholder")?a.push(e[t.name]):"Const"===t.op?n.push(e[t.name]):(null==t.input||0===t.input.length)&&s.push(e[t.name]),e),{}),l=[],u=[],p={},d={};null!=t&&(p=this.mapSignatureEntries(t.inputs),d=this.mapSignatureEntries(t.outputs));let c=Object.keys(i);c.forEach(e=>{let t=i[e];t.inputNames.forEach((e,r)=>{let[a,,n]=(0,o.getNodeNameAndIndex)(e),s=i[a];if(null!=s.outputs){let e=s.outputs.indexOf(n);if(-1!==e){let n=`${a}:${e}`;t.inputNames[r]=n}}t.inputs.push(s),s.children.push(t)})}),0===Object.keys(d).length?c.forEach(e=>{let t=i[e];0===t.children.length&&u.push(t)}):Object.keys(d).forEach(e=>{let[t]=(0,o.getNodeNameAndIndex)(e),r=i[t];null!=r&&(r.signatureKey=d[e],u.push(r))}),Object.keys(p).length>0?Object.keys(p).forEach(e=>{let[t]=(0,o.getNodeNameAndIndex)(e),r=i[t];r&&(r.signatureKey=p[e],l.push(r))}):l=a;let h={};null!=e.library&&null!=e.library.function&&(h=e.library.function.reduce((e,t)=>(e[t.signature.name]=this.mapFunction(t),e),{}));let f={nodes:i,inputs:l,outputs:u,weights:n,placeholders:a,signature:t,functions:h};return s.length>0&&(f.initNodes=s),f}mapSignatureEntries(e){return Object.keys(e||{}).reduce((t,r)=>(t[e[r].name]=r,t),{})}mapNode(e){let t=(0,s.getRegisteredOp)(e.op)||this.opMappers[e.op]||{};null==e.attr&&(e.attr={});let r={name:e.name,op:e.op,category:t.category,inputNames:(e.input||[]).map(e=>e.startsWith("^")?e.slice(1):e),inputs:[],children:[],inputParams:{},attrParams:{},rawAttrs:e.attr,outputs:t.outputs};return null!=t.inputs&&(r.inputParams=t.inputs.reduce((e,t)=>(e[t.name]={type:t.type,inputIndexStart:t.start,inputIndexEnd:t.end},e),{})),null!=t.attrs&&(r.attrParams=t.attrs.reduce((t,r)=>{let a,n=r.type;switch(r.type){case"string":void 0===(a=$(e.attr,r.tfName,r.defaultValue))&&r.tfDeprecatedName&&(a=$(e.attr,r.tfDeprecatedName,r.defaultValue));break;case"string[]":void 0===(a=V(e.attr,r.tfName,r.defaultValue))&&r.tfDeprecatedName&&(a=V(e.attr,r.tfDeprecatedName,r.defaultValue));break;case"number":void 0===(a=P(e.attr,r.tfName,r.defaultValue||0))&&r.tfDeprecatedName&&(a=P(e.attr,r.tfDeprecatedName,r.defaultValue));break;case"number[]":void 0===(a=L(e.attr,r.tfName,r.defaultValue))&&r.tfDeprecatedName&&(a=L(e.attr,r.tfDeprecatedName,r.defaultValue));break;case"bool":void 0===(a=R(e.attr,r.tfName,r.defaultValue))&&r.tfDeprecatedName&&(a=R(e.attr,r.tfDeprecatedName,r.defaultValue));break;case"bool[]":void 0===(a=W(e.attr,r.tfName,r.defaultValue))&&r.tfDeprecatedName&&(a=W(e.attr,r.tfDeprecatedName,r.defaultValue));break;case"shape":void 0===(a=_(e.attr,r.tfName,r.defaultValue))&&r.tfDeprecatedName&&(a=_(e.attr,r.tfDeprecatedName,r.defaultValue));break;case"shape[]":void 0===(a=G(e.attr,r.tfName,r.defaultValue))&&r.tfDeprecatedName&&(a=G(e.attr,r.tfDeprecatedName,r.defaultValue));break;case"dtype":void 0===(a=O(e.attr,r.tfName,r.defaultValue))&&r.tfDeprecatedName&&(a=O(e.attr,r.tfDeprecatedName,r.defaultValue));break;case"dtype[]":void 0===(a=M(e.attr,r.tfName,r.defaultValue))&&r.tfDeprecatedName&&(a=M(e.attr,r.tfDeprecatedName,r.defaultValue));break;case"func":void 0===(a=F(e.attr,r.tfName,r.defaultValue))&&r.tfDeprecatedName&&(a=F(e.attr,r.tfDeprecatedName,r.defaultValue));break;case"tensor":case"tensors":break;default:throw Error(`Unsupported param type: ${r.type} for op: ${e.op}`)}return t[r.name]={value:a,type:n},t},{})),r}mapFunction(e){let t=e.nodeDef,r=[],a={};null!=t&&(a=t.reduce((e,t)=>(e[t.name]=this.mapNode(t),"Const"===t.op&&r.push(e[t.name]),e),{}));let n=[],s=[];e.signature.inputArg.forEach(e=>{let[t]=(0,o.getNodeNameAndIndex)(e.name),r={name:t,op:"Placeholder",inputs:[],inputNames:[],category:"graph",inputParams:{},attrParams:{dtype:{value:B(e.type),type:"dtype"}},children:[]};r.signatureKey=e.name,n.push(r),a[t]=r}),Object.keys(a).forEach(e=>{let t=a[e];t.inputNames.forEach((e,r)=>{let[n,,s]=(0,o.getNodeNameAndIndex)(e),i=a[n];if(null!=i.outputs){let e=i.outputs.indexOf(s);if(-1!==e){let a=`${n}:${e}`;t.inputNames[r]=a}}t.inputs.push(i),i.children.push(t)})});let i=e.ret;e.signature.outputArg.forEach(e=>{let[t,r]=(0,o.getNodeNameAndIndex)(i[e.name]),n=a[t];null!=n&&(n.defaultOutput=r,s.push(n))});let l=this.mapArgsToSignature(e);return{nodes:a,inputs:n,outputs:s,weights:r,placeholders:[],signature:l}}mapArgsToSignature(e){return{methodName:e.signature.name,inputs:e.signature.inputArg.reduce((e,t)=>(e[t.name]=this.mapArgToTensorInfo(t),e),{}),outputs:e.signature.outputArg.reduce((t,r)=>(t[r.name]=this.mapArgToTensorInfo(r,e.ret),t),{})}}mapArgToTensorInfo(e,t){let r=e.name;return null!=t&&(r=t[r]),{name:r,dtype:e.type}}}function A(e,t){let a=Array.isArray(e)?String.fromCharCode.apply(null,e):function(e){let t=(0,r.env)().global;if(void 0!==t.atob)return t.atob(e);if(void 0!==C)return new C(e,"base64").toString();throw Error("Unable to decode base64 in this environment. Missing built-in atob() or Buffer()")}(e);return t?a:a.toLowerCase()}function $(e,t,r,a=!1){let n=e[t];return null!=n?A(n.s,a):r}function R(e,t,r){let a=e[t];return a?a.b:r}function P(e,t,r){let a=e[t]||{},n=null!=a.i?a.i:null!=a.f?a.f:r;return"number"==typeof n?n:parseInt(n,10)}function B(e){switch("string"==typeof e&&(e=n.DataType[e]),e){case n.DataType.DT_FLOAT:case n.DataType.DT_HALF:return"float32";case n.DataType.DT_INT32:case n.DataType.DT_INT64:case n.DataType.DT_INT8:case n.DataType.DT_UINT8:return"int32";case n.DataType.DT_BOOL:return"bool";case n.DataType.DT_DOUBLE:return"float32";case n.DataType.DT_STRING:return"string";case n.DataType.DT_COMPLEX64:case n.DataType.DT_COMPLEX128:return"complex64";default:return null}}function F(e,t,r){let a=e[t];return a&&a.func?a.func.name:r}function O(e,t,r){let a=e[t];return a&&a.type?B(a.type):r}function M(e,t,r){let a=e[t];return a&&a.list&&a.list.type?a.list.type.map(e=>B(e)):r}function D(e){if(!e.unknownRank)return null!=e.dim?e.dim.map(e=>"number"==typeof e.size?e.size:parseInt(e.size,10)):[]}function _(e,t,r){let a=e[t];return a&&a.shape?D(a.shape):r}function L(e,t,r){let a=e[t];return a?((a.list.f&&a.list.f.length?a.list.f:a.list.i)||[]).map(e=>"number"==typeof e?e:parseInt(e,10)):r}function V(e,t,r,a=!1){let n=e[t];return n&&n.list&&n.list.s?n.list.s.map(e=>A(e,a)):r}function G(e,t,r){let a=e[t];return a&&a.list&&a.list.shape?a.list.shape.map(e=>D(e)):r}function W(e,t,r){let a=e[t];return a&&a.list&&a.list.b?a.list.b:r}}),x("iILH2",function(e,t){var r,n,s,o,i;a(e.exports,"DataType",()=>r),(s=r||(r={}))[s.DT_INVALID=0]="DT_INVALID",s[s.DT_FLOAT=1]="DT_FLOAT",s[s.DT_DOUBLE=2]="DT_DOUBLE",s[s.DT_INT32=3]="DT_INT32",s[s.DT_UINT8=4]="DT_UINT8",s[s.DT_INT16=5]="DT_INT16",s[s.DT_INT8=6]="DT_INT8",s[s.DT_STRING=7]="DT_STRING",s[s.DT_COMPLEX64=8]="DT_COMPLEX64",s[s.DT_INT64=9]="DT_INT64",s[s.DT_BOOL=10]="DT_BOOL",s[s.DT_QINT8=11]="DT_QINT8",s[s.DT_QUINT8=12]="DT_QUINT8",s[s.DT_QINT32=13]="DT_QINT32",s[s.DT_BFLOAT16=14]="DT_BFLOAT16",s[s.DT_QINT16=15]="DT_QINT16",s[s.DT_QUINT16=16]="DT_QUINT16",s[s.DT_UINT16=17]="DT_UINT16",s[s.DT_COMPLEX128=18]="DT_COMPLEX128",s[s.DT_HALF=19]="DT_HALF",s[s.DT_RESOURCE=20]="DT_RESOURCE",s[s.DT_VARIANT=21]="DT_VARIANT",s[s.DT_UINT32=22]="DT_UINT32",s[s.DT_UINT64=23]="DT_UINT64",s[s.DT_FLOAT_REF=101]="DT_FLOAT_REF",s[s.DT_DOUBLE_REF=102]="DT_DOUBLE_REF",s[s.DT_INT32_REF=103]="DT_INT32_REF",s[s.DT_UINT8_REF=104]="DT_UINT8_REF",s[s.DT_INT16_REF=105]="DT_INT16_REF",s[s.DT_INT8_REF=106]="DT_INT8_REF",s[s.DT_STRING_REF=107]="DT_STRING_REF",s[s.DT_COMPLEX64_REF=108]="DT_COMPLEX64_REF",s[s.DT_INT64_REF=109]="DT_INT64_REF",s[s.DT_BOOL_REF=110]="DT_BOOL_REF",s[s.DT_QINT8_REF=111]="DT_QINT8_REF",s[s.DT_QUINT8_REF=112]="DT_QUINT8_REF",s[s.DT_QINT32_REF=113]="DT_QINT32_REF",s[s.DT_BFLOAT16_REF=114]="DT_BFLOAT16_REF",s[s.DT_QINT16_REF=115]="DT_QINT16_REF",s[s.DT_QUINT16_REF=116]="DT_QUINT16_REF",s[s.DT_UINT16_REF=117]="DT_UINT16_REF",s[s.DT_COMPLEX128_REF=118]="DT_COMPLEX128_REF",s[s.DT_HALF_REF=119]="DT_HALF_REF",s[s.DT_RESOURCE_REF=120]="DT_RESOURCE_REF",s[s.DT_VARIANT_REF=121]="DT_VARIANT_REF",s[s.DT_UINT32_REF=122]="DT_UINT32_REF",s[s.DT_UINT64_REF=123]="DT_UINT64_REF",(i=(o=n||(n={})).CheckpointFormatVersion||(o.CheckpointFormatVersion={}))[i.LEGACY=0]="LEGACY",i[i.V1=1]="V1",i[i.V2=2]="V2"}),x("dWfqP",function(e,t){a(e.exports,"registerOp",()=>n),a(e.exports,"getRegisteredOp",()=>s),a(e.exports,"deregisterOp",()=>o);let r={};function n(e,t){r[e]={tfOpName:e,category:"custom",inputs:[],attrs:[],customExecutor:t}}function s(e){return r[e]}function o(e){delete r[e]}}),x("9PnRL",function(e,t){a(e.exports,"getParamValue",()=>s),a(e.exports,"getTensor",()=>o),a(e.exports,"parseNodeName",()=>p),a(e.exports,"getTensorsForCurrentContext",()=>i),a(e.exports,"getNodeNameAndIndex",()=>l),a(e.exports,"getPadding",()=>d),a(e.exports,"cloneTensor",()=>c),g("i64bB");var r=g("5TuCW"),n=g("jjNRA");function s(e,t,r,a,s){let i=t.inputParams[e];if(i&&void 0!==i.inputIndexStart){let e=i.inputIndexStart,l=0===i.inputIndexEnd?void 0:void 0===i.inputIndexEnd?e+1:i.inputIndexEnd,u=e<0?t.inputNames.length+e:e;if("tensor"===i.type)return o(t.inputNames[u],r,a,s);if("tensors"===i.type){let n=t.inputs.slice(e,l);return t.inputNames.slice(e,l).filter((e,t)=>{var r;return(null==(r=n[t])?void 0:r.op)!=="NoOp"}).map(e=>o(e,r,a,s))}let p=o(t.inputNames[u],r,a,s),d=p.dataSync();return"number"===i.type?d[0]:n.toNestedArray(p.shape,d)}let l=t.attrParams[e];return l&&l.value}function o(e,t,r,a){let[n,s]=p(e,r);if(null!=a){let e=a.getHashTableHandleByName(n);if(null!=e)return e}let o=r.currentContextIds.find(e=>!!t[u(n,e)]);return void 0!==o?t[u(n,o)][s]:void 0}function i(e,t,r){return t[u(e,r.currentContextId)]}function l(e,t){let[r,a,n]=p(e,t);return[u(r,t&&t.currentContextId),a,n]}function u(e,t){return t?`${e}-${t}`:e}function p(e,t){let r;if(""===e)return["",0,void 0];let a=null!=t&&null!=t.parseNodeNameCache;if(a){let r=t.parseNodeNameCache.get(e);if(null!=r)return r}let n=e.split(":");if(1===n.length)r=[e,0,void 0];else{let e=n[0],t=3===n.length?n[1]:void 0;r=[e,Number(n[n.length-1]),t]}return a&&t.parseNodeNameCache.set(e,r),r}function d(e,t,r){let a=s("pad",e,t,r);if("explicit"===a){a=s("explicitPaddings",e,t,r);let n=[[0,0],[0,0],[0,0],[0,0]];for(let e=0;e<4;e++)n[e][0]=a[2*e],n[e][1]=a[2*e+1];return n}return a}function c(e){return e.kept?e:(0,r.clone)(e)}}),x("cCcNy",function(e,t){a(e.exports,"json",()=>r);let r=[{tfOpName:"Add",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"AddV2",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"AddN",category:"arithmetic",inputs:[{start:0,end:0,name:"tensors",type:"tensors"}]},{tfOpName:"BiasAdd",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0}]},{tfOpName:"Sub",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"RealDiv",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Div",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"DivNoNan",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"FloorDiv",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Mul",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Maximum",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Minimum",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Pow",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"SquaredDifference",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Mod",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"FloorMod",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]}]}),x("6T10F",function(e,t){a(e.exports,"json",()=>r);let r=[{tfOpName:"Abs",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Acos",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Asin",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Atan",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Atan2",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"y",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Ceil",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"ClipByValue",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"clipValueMin",type:"number"},{start:2,name:"clipValueMax",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Complex",category:"basic_math",inputs:[{start:0,name:"real",type:"tensor"},{start:1,name:"imag",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"ComplexAbs",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Cos",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Cosh",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Elu",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Exp",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Floor",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Log",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Imag",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"Tout",name:"outputType",type:"dtype",notSupported:!0}]},{tfOpName:"Neg",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Real",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"Tout",name:"outputType",type:"dtype",notSupported:!0}]},{tfOpName:"Prelu",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"alpha",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Relu",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Relu6",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Selu",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Sigmoid",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Sin",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Sinh",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Sqrt",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Rsqrt",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Square",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Tan",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Tanh",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Sign",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Round",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Expm1",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Log1p",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Reciprocal",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Softplus",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Asinh",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Acosh",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Atanh",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Erf",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"LeakyRelu",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"alpha",name:"alpha",type:"number",defaultValue:.2},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"IsNan",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"IsFinite",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"IsInf",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]}]}),x("25do8",function(e,t){a(e.exports,"json",()=>r);let r=[{tfOpName:"EmptyTensorList",category:"control",inputs:[{start:0,name:"elementShape",type:"shape"},{start:1,name:"maxNumElements",type:"number"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"LoopCond",category:"control",inputs:[{start:0,name:"pred",type:"tensor"}]},{tfOpName:"Switch",category:"control",inputs:[{start:0,name:"data",type:"tensor"},{start:1,name:"pred",type:"tensor"}]},{tfOpName:"Merge",category:"control",inputs:[{start:0,end:0,name:"tensors",type:"tensors"}]},{tfOpName:"Enter",category:"control",inputs:[{start:0,name:"tensor",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"frame_name",name:"frameName",type:"string"},{tfName:"is_constant",name:"isConstant",type:"bool"}]},{tfOpName:"Exit",category:"control",inputs:[{start:0,name:"tensor",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"NextIteration",category:"control",inputs:[{start:0,name:"tensor",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"TensorArrayV3",category:"control",inputs:[{start:0,name:"size",type:"number"}],attrs:[{tfName:"dtype",name:"dtype",type:"dtype"},{tfName:"element_shape",name:"elementShape",type:"shape"},{tfName:"dynamic_size",name:"dynamicSize",type:"bool"},{tfName:"clear_after_read",name:"clearAfterRead",type:"bool"},{tfName:"identical_element_shapes",name:"identicalElementShapes",type:"bool"},{tfName:"tensor_array_name",name:"name",type:"string"}]},{tfOpName:"TensorArrayWriteV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"},{start:1,name:"index",type:"number"},{start:2,name:"tensor",type:"tensor"},{start:3,name:"flowIn",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"TensorArrayReadV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"},{start:1,name:"index",type:"number"},{start:2,name:"flowIn",type:"number"}],attrs:[{tfName:"dtype",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"TensorArrayGatherV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"},{start:1,name:"indices",type:"number[]"},{start:2,name:"flowIn",type:"number"}],attrs:[{tfName:"dtype",name:"dtype",type:"dtype"},{tfName:"element_shape",name:"elementShape",type:"shape"}]},{tfOpName:"TensorArrayScatterV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"},{start:1,name:"indices",type:"number[]"},{start:2,name:"tensor",type:"tensor"},{start:3,name:"flowIn",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"TensorArrayConcatV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"},{start:1,name:"flowIn",type:"number"}],attrs:[{tfName:"dtype",name:"dtype",type:"dtype"},{tfName:"element_shape_except0",name:"elementShapeExcept0",type:"shape",notSupported:!0}]},{tfOpName:"TensorArraySplitV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"},{start:1,name:"tensor",type:"tensor"},{start:2,name:"lengths",type:"number[]"},{start:3,name:"flowIn",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"TensorArraySizeV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"},{start:1,name:"flowIn",type:"number"}]},{tfOpName:"TensorArrayCloseV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"}]},{tfOpName:"StatelessIf",category:"control",inputs:[{start:0,name:"cond",type:"tensor"},{start:1,end:0,name:"args",type:"tensors"}],attrs:[{tfName:"then_branch",name:"thenBranch",type:"func"},{tfName:"else_branch",name:"elseBranch",type:"func"}]},{tfOpName:"If",category:"control",inputs:[{start:0,name:"cond",type:"tensor"},{start:1,end:0,name:"args",type:"tensors"}],attrs:[{tfName:"then_branch",name:"thenBranch",type:"func"},{tfName:"else_branch",name:"elseBranch",type:"func"}]},{tfOpName:"StatelessWhile",category:"control",inputs:[{start:0,end:0,name:"args",type:"tensors"}],attrs:[{tfName:"cond",name:"cond",type:"func"},{tfName:"body",name:"body",type:"func"}]},{tfOpName:"While",category:"control",inputs:[{start:0,end:0,name:"args",type:"tensors"}],attrs:[{tfName:"cond",name:"cond",type:"func"},{tfName:"body",name:"body",type:"func"}]},{tfOpName:"TensorListScatter",category:"control",inputs:[{start:0,name:"tensor",type:"tensor"},{start:1,name:"indices",type:"number[]"},{start:2,name:"elementShape",type:"shape"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListScatterV2",category:"control",inputs:[{start:0,name:"tensor",type:"tensor"},{start:1,name:"indices",type:"number[]"},{start:2,name:"elementShape",type:"shape"},{start:3,name:"numElements",type:"number"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListGather",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"},{start:1,name:"indices",type:"number[]"},{start:2,name:"elementShape",type:"shape"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListGetItem",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"},{start:1,name:"index",type:"number"},{start:2,name:"elementShape",type:"shape"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListSetItem",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"},{start:1,name:"index",type:"number"},{start:2,name:"tensor",type:"tensor"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListReserve",category:"control",inputs:[{start:0,name:"elementShape",type:"shape"},{start:1,name:"numElements",type:"number"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListFromTensor",category:"control",inputs:[{start:0,name:"tensor",type:"tensor"},{start:1,name:"elementShape",type:"shape"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListStack",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"},{start:1,name:"elementShape",type:"shape"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"},{tfName:"num_elements",name:"numElements",type:"dtype"}]},{tfOpName:"TensorListSplit",category:"control",inputs:[{start:0,name:"tensor",type:"tensor"},{start:1,name:"elementShape",type:"shape"},{start:2,name:"lengths",type:"number[]"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListConcat",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"}],attrs:[{tfName:"element_shape",name:"elementShape",type:"shape"},{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListConcatV2",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"}],attrs:[{tfName:"element_shape",name:"elementShape",type:"shape"},{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListPopBack",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"},{start:1,name:"elementShape",type:"shape"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListPushBack",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"},{start:1,name:"tensor",type:"tensor"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListLength",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"}]},{tfOpName:"TensorListResize",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"},{start:1,name:"size",type:"number"}]}]}),x("kQhpu",function(e,t){a(e.exports,"json",()=>r);let r=[{tfOpName:"AvgPool",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0},{tfName:"ksize",name:"kernelSize",type:"number[]"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"MaxPool",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0},{tfName:"ksize",name:"kernelSize",type:"number[]"},{tfName:"explicit_paddings",name:"explicitPaddings",type:"number[]",defaultValue:[],notSupported:!0},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"MaxPoolWithArgmax",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"ksize",name:"kernelSize",type:"number[]"},{tfName:"include_batch_in_index",name:"includeBatchInIndex",type:"bool"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"AvgPool3D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0},{tfName:"ksize",name:"kernelSize",type:"number[]"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"MaxPool3D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0},{tfName:"ksize",name:"kernelSize",type:"number[]"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Conv1D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"}],attrs:[{tfName:"stride",name:"stride",type:"number"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NWC"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"dilation",name:"dilation",type:"number",defaultValue:1}]},{tfOpName:"Conv2D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"useCudnnOnGpu",name:"useCudnnOnGpu",type:"bool"},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NHWC"},{tfName:"explicit_paddings",name:"explicitPaddings",type:"number[]",defaultValue:[]},{tfName:"dilations",name:"dilations",type:"number[]"}]},{tfOpName:"_FusedConv2D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"},{start:2,end:0,name:"args",type:"tensors"}],attrs:[{tfName:"num_args",name:"numArgs",type:"number"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"explicit_paddings",name:"explicitPaddings",type:"number[]",defaultValue:[]},{tfName:"use_cudnn_on_gpu",name:"useCudnnOnGpu",type:"bool",defaultValue:!0},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NHWC"},{tfName:"dilations",name:"dilations",type:"number[]",defaultValue:[1,1,1,1]},{tfName:"fused_ops",name:"fusedOps",type:"string[]",defaultValue:[]},{tfName:"epsilon",name:"epsilon",type:"number",defaultValue:1e-4},{tfName:"leakyrelu_alpha",name:"leakyreluAlpha",type:"number",defaultValue:.2}]},{tfOpName:"Conv2DBackpropInput",category:"convolution",inputs:[{start:2,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"},{start:0,name:"outputShape",type:"number[]"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0},{tfName:"explicit_paddings",name:"explicitPaddings",type:"number[]",defaultValue:[]},{tfName:"dilations",name:"dilations",type:"number[]",notSupported:!0}]},{tfOpName:"DepthwiseConv2d",category:"convolution",inputs:[{start:0,name:"input",type:"tensor"},{start:1,name:"filter",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NHWC"},{tfName:"explicit_paddings",name:"explicitPaddings",type:"number[]",defaultValue:[]},{tfName:"dilations",name:"dilations",type:"number[]"}]},{tfOpName:"DepthwiseConv2dNative",category:"convolution",inputs:[{start:0,name:"input",type:"tensor"},{start:1,name:"filter",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NHWC"},{tfName:"explicit_paddings",name:"explicitPaddings",type:"number[]",defaultValue:[]},{tfName:"dilations",name:"dilations",type:"number[]"}]},{tfOpName:"FusedDepthwiseConv2dNative",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"},{start:2,end:0,name:"args",type:"tensors"}],attrs:[{tfName:"num_args",name:"numArgs",type:"number"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NHWC"},{tfName:"dilations",name:"dilations",type:"number[]",defaultValue:[1,1,1,1]},{tfName:"fused_ops",name:"fusedOps",type:"string[]",defaultValue:[]},{tfName:"explicit_paddings",name:"explicitPaddings",type:"number[]",defaultValue:[]}]},{tfOpName:"Conv3D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NHWC"},{tfName:"dilations",name:"dilations",type:"number[]"}]},{tfOpName:"Dilation2D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"rates",name:"dilations",type:"number[]"},{tfName:"padding",name:"pad",type:"string"}]}]}),x("iKevB",function(e,t){a(e.exports,"json",()=>r);let r=[{tfOpName:"Fill",category:"creation",inputs:[{start:0,name:"shape",type:"number[]"},{start:1,name:"value",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"LinSpace",category:"creation",inputs:[{start:0,name:"start",type:"number"},{start:1,name:"stop",type:"number"},{start:2,name:"num",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"OneHot",category:"creation",inputs:[{start:0,name:"indices",type:"tensor"},{start:1,name:"depth",type:"number"},{start:2,name:"onValue",type:"number",defaultValue:1},{start:3,name:"offValue",type:"number",defaultValue:0}],attrs:[{tfName:"axis",name:"axis",type:"number",notSupported:!0},{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"Ones",category:"creation",inputs:[{start:0,name:"shape",type:"number[]"}],attrs:[{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"OnesLike",category:"creation",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"dtype",name:"dtype",type:"dtype"}]},{tfOpName:"RandomStandardNormal",category:"creation",inputs:[{start:0,name:"shape",type:"number[]"}],attrs:[{tfName:"seed",name:"seed",type:"number",defaultValue:0},{tfName:"seed2",name:"seed2",type:"number",defaultValue:0,notSupported:!0},{tfName:"dtype",name:"dtype",type:"dtype"},{tfName:"T",name:"T",type:"number",notSupported:!0}]},{tfOpName:"RandomUniform",category:"creation",inputs:[{start:0,name:"shape",type:"number[]"}],attrs:[{tfName:"minval",name:"minval",type:"number",defaultValue:0},{tfName:"maxval",name:"maxval",type:"number",defaultValue:1},{tfName:"dtype",name:"dtype",type:"dtype"},{tfName:"seed",name:"seed",type:"number",defaultValue:0},{tfName:"seed2",name:"seed2",type:"number",defaultValue:0,notSupported:!0},{tfName:"T",name:"T",type:"number",notSupported:!0}]},{tfOpName:"RandomUniformInt",category:"creation",inputs:[{start:0,name:"shape",type:"number[]"}],attrs:[{tfName:"minval",name:"minval",type:"number"},{tfName:"maxval",name:"maxval",type:"number"},{tfName:"seed",name:"seed",type:"number",defaultValue:0},{tfName:"seed2",name:"seed2",type:"number",defaultValue:0,notSupported:!0}]},{tfOpName:"Range",category:"creation",inputs:[{start:0,name:"start",type:"number"},{start:1,name:"stop",type:"number"},{start:2,name:"step",type:"number",defaultValue:0}],attrs:[{tfName:"Tidx",name:"dtype",type:"dtype"}]},{tfOpName:"TruncatedNormal",category:"creation",inputs:[{start:0,name:"shape",type:"number[]"}],attrs:[{tfName:"means",name:"mean",type:"number",defaultValue:0},{tfName:"stddev",name:"stdDev",type:"number",defaultValue:1},{tfName:"seed",name:"seed",type:"number"},{tfName:"seed2",name:"seed2",type:"number",defaultValue:0,notSupported:!0},{tfName:"dtype",name:"dtype",type:"dtype"},{tfName:"T",name:"T",type:"number",notSupported:!0}]},{tfOpName:"Zeros",category:"creation",inputs:[{start:0,name:"shape",type:"number[]"}],attrs:[{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"ZerosLike",category:"creation",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"Multinomial",category:"creation",inputs:[{start:0,name:"logits",type:"tensor"},{start:1,name:"numSamples",type:"number"}],attrs:[{tfName:"seed",name:"seed",type:"number"},{tfName:"seed2",name:"seed2",type:"number"},{tfName:"T",name:"dtype",type:"dtype"},{tfName:"output_dtype",name:"output_dtype",type:"dtype"}]}]}),x("gul1X",function(e,t){a(e.exports,"json",()=>r);let r=[{tfOpName:"NonMaxSuppressionV2",category:"dynamic",inputs:[{start:0,name:"boxes",type:"tensor"},{start:1,name:"scores",type:"tensor"},{start:2,name:"maxOutputSize",type:"number"},{start:3,name:"iouThreshold",type:"number"}]},{tfOpName:"NonMaxSuppressionV3",category:"dynamic",inputs:[{start:0,name:"boxes",type:"tensor"},{start:1,name:"scores",type:"tensor"},{start:2,name:"maxOutputSize",type:"number"},{start:3,name:"iouThreshold",type:"number"},{start:4,name:"scoreThreshold",type:"number"}]},{tfOpName:"NonMaxSuppressionV4",category:"dynamic",inputs:[{start:0,name:"boxes",type:"tensor"},{start:1,name:"scores",type:"tensor"},{start:2,name:"maxOutputSize",type:"number"},{start:3,name:"iouThreshold",type:"number"},{start:4,name:"scoreThreshold",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"T_threshold",name:"threshold",type:"dtype",notSupported:!0},{tfName:"pad_to_max_output_size",name:"padToMaxOutputSize",type:"bool"}]},{tfOpName:"NonMaxSuppressionV5",category:"dynamic",inputs:[{start:0,name:"boxes",type:"tensor"},{start:1,name:"scores",type:"tensor"},{start:2,name:"maxOutputSize",type:"number"},{start:3,name:"iouThreshold",type:"number"},{start:4,name:"scoreThreshold",type:"number"},{start:5,name:"softNmsSigma",type:"number"}]},{tfOpName:"Where",category:"dynamic",inputs:[{start:0,name:"condition",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"ListDiff",category:"dynamic",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"y",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]}]}),x("8ADHf",function(e,t){a(e.exports,"json",()=>r);let r=[{tfOpName:"LowerBound",category:"evaluation",inputs:[{start:0,name:"sortedSequence",type:"tensor"},{start:1,name:"values",type:"tensor"}]},{tfOpName:"TopKV2",category:"evaluation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"k",type:"number"}],attrs:[{tfName:"sorted",name:"sorted",type:"bool"}]},{tfOpName:"UpperBound",category:"evaluation",inputs:[{start:0,name:"sortedSequence",type:"tensor"},{start:1,name:"values",type:"tensor"}]},{tfOpName:"Unique",category:"evaluation",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"UniqueV2",category:"evaluation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number"}]}]}),x("cf9s6",function(e,t){a(e.exports,"json",()=>r);let r=[{tfOpName:"PlaceholderWithDefault",category:"graph",inputs:[{start:0,name:"default",type:"tensor"}],attrs:[{tfName:"shape",name:"shape",type:"shape"},{tfName:"dtype",name:"dtype",type:"dtype"}]},{tfOpName:"Placeholder",category:"graph",attrs:[{tfName:"shape",name:"shape",type:"shape"},{tfName:"dtype",name:"dtype",type:"dtype"}]},{tfOpName:"Const",category:"graph"},{tfOpName:"Identity",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"IdentityN",category:"graph",inputs:[{start:0,end:0,name:"x",type:"tensors"}]},{tfOpName:"Snapshot",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"Rank",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"Size",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"Shape",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"ShapeN",category:"graph",inputs:[{start:0,end:0,name:"x",type:"tensors"}]},{tfOpName:"Print",category:"graph",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"data",type:"tensors"}],attrs:[{tfName:"message",name:"message",type:"string"},{tfName:"first_n",name:"firstN",type:"number",notSupported:!0},{tfName:"summarize",name:"summarize",type:"number",defaultValue:3}]},{tfOpName:"NoOp",category:"graph",inputs:[]},{tfOpName:"StopGradient",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"FakeQuantWithMinMaxVars",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"min",name:"min",type:"number"},{tfName:"max",name:"max",type:"number"}]}]}),x("agimj",function(e,t){a(e.exports,"json",()=>r);let r=[{tfOpName:"HashTable",category:"hash_table",inputs:[],attrs:[{tfName:"shared_name",name:"sharedName",type:"string"},{tfName:"use_node_name_sharing",name:"useNodeNameSharing",type:"bool"},{tfName:"key_dtype",name:"keyDType",type:"dtype"},{tfName:"value_dtype",name:"valueDType",type:"dtype"}]},{tfOpName:"HashTableV2",category:"hash_table",inputs:[],attrs:[{tfName:"shared_name",name:"sharedName",type:"string"},{tfName:"use_node_name_sharing",name:"useNodeNameSharing",type:"bool"},{tfName:"key_dtype",name:"keyDType",type:"dtype"},{tfName:"value_dtype",name:"valueDType",type:"dtype"}]},{tfOpName:"LookupTableImport",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"},{start:1,name:"keys",type:"tensor"},{start:2,name:"values",type:"tensor"}],attrs:[{tfName:"Tin",name:"tIn",type:"dtype",notSupported:!0},{tfName:"Tout",name:"tOut",type:"dtype",notSupported:!0}]},{tfOpName:"LookupTableImportV2",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"},{start:1,name:"keys",type:"tensor"},{start:2,name:"values",type:"tensor"}],attrs:[{tfName:"Tin",name:"tIn",type:"dtype",notSupported:!0},{tfName:"Tout",name:"tOut",type:"dtype",notSupported:!0}]},{tfOpName:"LookupTableFind",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"},{start:1,name:"keys",type:"tensor"},{start:2,name:"defaultValue",type:"tensor"}],attrs:[{tfName:"Tin",name:"tIn",type:"dtype",notSupported:!0},{tfName:"Tout",name:"tOut",type:"dtype",notSupported:!0}]},{tfOpName:"LookupTableFindV2",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"},{start:1,name:"keys",type:"tensor"},{start:2,name:"defaultValue",type:"tensor"}],attrs:[{tfName:"Tin",name:"tIn",type:"dtype",notSupported:!0},{tfName:"Tout",name:"tOut",type:"dtype",notSupported:!0}]},{tfOpName:"LookupTableSize",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"}]},{tfOpName:"LookupTableSizeV2",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"}]},{tfOpName:"InitializeTable",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"},{start:1,name:"keys",type:"tensor"},{start:2,name:"values",type:"tensor"}]},{tfOpName:"InitializeTableV2",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"},{start:1,name:"keys",type:"tensor"},{start:2,name:"values",type:"tensor"}]}]}),x("j4qIR",function(e,t){a(e.exports,"json",()=>r);let r=[{tfOpName:"ResizeBilinear",category:"image",inputs:[{start:0,name:"images",type:"tensor"},{start:1,name:"size",type:"number[]"}],attrs:[{tfName:"align_corners",name:"alignCorners",type:"bool"},{tfName:"half_pixel_centers",name:"halfPixelCenters",type:"bool"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"ResizeNearestNeighbor",category:"image",inputs:[{start:0,name:"images",type:"tensor"},{start:1,name:"size",type:"number[]"}],attrs:[{tfName:"align_corners",name:"alignCorners",type:"bool"},{tfName:"half_pixel_centers",name:"halfPixelCenters",type:"bool"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"CropAndResize",category:"image",inputs:[{start:0,name:"image",type:"tensor"},{start:1,name:"boxes",type:"tensor"},{start:2,name:"boxInd",type:"tensor"},{start:3,name:"cropSize",type:"number[]"}],attrs:[{tfName:"method",name:"method",type:"string"},{tfName:"extrapolation_value",name:"extrapolationValue",type:"number"}]},{tfOpName:"ImageProjectiveTransformV3",category:"image",inputs:[{start:0,name:"images",type:"tensor"},{start:1,name:"transforms",type:"tensor"},{start:2,name:"outputShape",type:"number[]"},{start:3,name:"fillValue",type:"number"}],attrs:[{tfName:"interpolation",name:"interpolation",type:"string"},{tfName:"fill_mode",name:"fillMode",type:"string"}]}]}),x("gUOFE",function(e,t){a(e.exports,"json",()=>r);let r=[{tfOpName:"Equal",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"NotEqual",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Greater",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"GreaterEqual",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Less",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"LessEqual",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"LogicalAnd",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"LogicalNot",category:"logical",inputs:[{start:0,name:"a",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"LogicalOr",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Select",category:"logical",inputs:[{start:0,name:"condition",type:"tensor"},{start:1,name:"a",type:"tensor"},{start:2,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"SelectV2",category:"logical",inputs:[{start:0,name:"condition",type:"tensor"},{start:1,name:"a",type:"tensor"},{start:2,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"BitwiseAnd",category:"logical",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"y",type:"tensor"}]}]}),x("6seiJ",function(e,t){a(e.exports,"json",()=>r);let r=[{tfOpName:"_FusedMatMul",category:"matrices",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"},{start:2,end:0,name:"args",type:"tensors"}],attrs:[{tfName:"num_args",name:"numArgs",type:"number"},{tfName:"fused_ops",name:"fusedOps",type:"string[]",defaultValue:[]},{tfName:"epsilon",name:"epsilon",type:"number",defaultValue:1e-4},{tfName:"transpose_a",name:"transposeA",type:"bool",defaultValue:!1},{tfName:"transpose_b",name:"transposeB",type:"bool",defaultValue:!1},{tfName:"leakyrelu_alpha",name:"leakyreluAlpha",type:"number",defaultValue:.2},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"MatMul",category:"matrices",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"transpose_a",name:"transposeA",type:"bool",defaultValue:!1},{tfName:"transpose_b",name:"transposeB",type:"bool",defaultValue:!1},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"BatchMatMul",category:"matrices",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"adj_x",name:"transposeA",type:"bool",defaultValue:!1},{tfName:"adj_y",name:"transposeB",type:"bool",defaultValue:!1},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"BatchMatMulV2",category:"matrices",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"adj_x",name:"transposeA",type:"bool",defaultValue:!1},{tfName:"adj_y",name:"transposeB",type:"bool",defaultValue:!1},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Transpose",category:"matrices",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"perm",type:"number[]"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Einsum",category:"matrices",inputs:[{start:0,end:0,name:"tensors",type:"tensors"}],attrs:[{tfName:"equation",name:"equation",type:"string"},{tfName:"N",name:"n",type:"number",defaultValue:2},{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"MatrixBandPart",category:"matrices",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"numLower",type:"tensor"},{start:1,name:"numUpper",type:"tensor"}]}]}),x("1st1Z",function(e,t){a(e.exports,"json",()=>r);let r=[{tfOpName:"EuclideanNorm",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool",defaultValue:!1}]},{tfOpName:"FusedBatchNorm",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"scale",type:"tensor"},{start:2,name:"offset",type:"tensor"},{start:3,name:"mean",type:"tensor"},{start:4,name:"variance",type:"tensor"}],attrs:[{tfName:"epsilon",name:"epsilon",type:"number",defaultValue:.001},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0}]},{tfOpName:"FusedBatchNormV2",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"scale",type:"tensor"},{start:2,name:"offset",type:"tensor"},{start:3,name:"mean",type:"tensor"},{start:4,name:"variance",type:"tensor"}],attrs:[{tfName:"epsilon",name:"epsilon",type:"number",defaultValue:.001},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0}]},{tfOpName:"FusedBatchNormV3",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"scale",type:"tensor"},{start:2,name:"offset",type:"tensor"},{start:3,name:"mean",type:"tensor"},{start:4,name:"variance",type:"tensor"}],attrs:[{tfName:"epsilon",name:"epsilon",type:"number",defaultValue:.001},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0}]},{tfOpName:"LRN",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"depth_radius",name:"radius",type:"number",defaultValue:5},{tfName:"bias",name:"bias",type:"number",defaultValue:1},{tfName:"alpha",name:"alpha",type:"number",defaultValue:1},{tfName:"beta",name:"beta",type:"number",defaultValue:.5}]},{tfOpName:"Softmax",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"LogSoftmax",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"}]}]}),x("l0Shb",function(e,t){a(e.exports,"json",()=>r);let r=[{tfOpName:"Bincount",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"size",type:"number"},{start:2,name:"weights",type:"tensor"}]},{tfOpName:"DenseBincount",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"size",type:"number"},{start:2,name:"weights",type:"tensor"}],attrs:[{tfName:"binary_output",name:"binaryOutput",type:"bool"}]},{tfOpName:"Max",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"}]},{tfOpName:"Mean",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"}]},{tfOpName:"Min",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"}]},{tfOpName:"Sum",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"}]},{tfOpName:"All",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"}]},{tfOpName:"Any",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"}]},{tfOpName:"ArgMax",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number"}]},{tfOpName:"ArgMin",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number"}]},{tfOpName:"Prod",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Cumprod",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number"}],attrs:[{tfName:"exclusive",name:"exclusive",type:"bool"},{tfName:"reverse",name:"reverse",type:"bool"}]},{tfOpName:"Cumsum",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number"}],attrs:[{tfName:"exclusive",name:"exclusive",type:"bool"},{tfName:"reverse",name:"reverse",type:"bool"}]}]}),x("eTKRE",function(e,t){a(e.exports,"json",()=>r);let r=[{tfOpName:"ConcatV2",category:"slice_join",inputs:[{start:0,end:-1,name:"tensors",type:"tensors"},{start:-1,name:"axis",type:"number"}],attrs:[{tfName:"N",name:"n",type:"number",defaultValue:2}]},{tfOpName:"Concat",category:"slice_join",inputs:[{start:1,end:0,name:"tensors",type:"tensors"},{start:0,name:"axis",type:"number"}],attrs:[{tfName:"N",name:"n",type:"number",defaultValue:2}]},{tfOpName:"GatherV2",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"indices",type:"tensor"},{start:2,name:"axis",type:"number",defaultValue:0}],attrs:[{tfName:"batch_dims",name:"batchDims",type:"number",defaultValue:0}]},{tfOpName:"Gather",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"indices",type:"tensor"}],attrs:[{tfName:"validate_indices",name:"validateIndices",type:"bool",notSupported:!0}]},{tfOpName:"Reverse",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"dims",type:"bool[]"}]},{tfOpName:"ReverseV2",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}]},{tfOpName:"Slice",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"begin",type:"number[]"},{start:2,name:"size",type:"number[]"}]},{tfOpName:"StridedSlice",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"begin",type:"number[]"},{start:2,name:"end",type:"number[]"},{start:3,name:"strides",type:"number[]"}],attrs:[{tfName:"begin_mask",name:"beginMask",type:"number",defaultValue:0},{tfName:"end_mask",name:"endMask",type:"number",defaultValue:0},{tfName:"new_axis_mask",name:"newAxisMask",type:"number",defaultValue:0},{tfName:"ellipsis_mask",name:"ellipsisMask",type:"number",defaultValue:0},{tfName:"shrink_axis_mask",name:"shrinkAxisMask",type:"number",defaultValue:0}]},{tfOpName:"Pack",category:"slice_join",inputs:[{start:0,end:0,name:"tensors",type:"tensors"}],attrs:[{tfName:"axis",name:"axis",type:"number",defaultValue:0}]},{tfOpName:"Unpack",category:"slice_join",inputs:[{start:0,name:"tensor",type:"tensor"}],attrs:[{tfName:"axis",name:"axis",type:"number",defaultValue:0},{tfName:"num",name:"num",type:"number",defaultValue:0,notSupported:!0}]},{tfOpName:"Tile",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"reps",type:"number[]"}]},{tfOpName:"Split",category:"slice_join",inputs:[{start:0,name:"axis",type:"number",defaultValue:0},{start:1,name:"x",type:"tensor"}],attrs:[{tfName:"num_split",name:"numOrSizeSplits",type:"number",defaultValue:1}]},{tfOpName:"SplitV",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"numOrSizeSplits",type:"number[]"},{start:2,name:"axis",type:"number",defaultValue:0}]},{tfOpName:"ScatterNd",category:"slice_join",inputs:[{start:0,name:"indices",type:"tensor"},{start:1,name:"values",type:"tensor"},{start:2,name:"shape",type:"number[]"}]},{tfOpName:"GatherNd",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"indices",type:"tensor"}]},{tfOpName:"SparseToDense",category:"slice_join",inputs:[{start:0,name:"sparseIndices",type:"tensor"},{start:1,name:"outputShape",type:"number[]"},{start:2,name:"sparseValues",type:"tensor"},{start:3,name:"defaultValue",type:"tensor"}],attrs:[{tfName:"validate_indices",name:"validateIndices",type:"bool",defaultValue:!1,notSupported:!0}]},{tfOpName:"TensorScatterUpdate",category:"slice_join",inputs:[{start:0,name:"tensor",type:"tensor"},{start:1,name:"indices",type:"tensor"},{start:2,name:"values",type:"tensor"}]}]}),x("5vXpX",function(e,t){a(e.exports,"json",()=>r);let r=[{tfOpName:"SparseFillEmptyRows",category:"sparse",inputs:[{start:0,name:"indices",type:"tensor"},{start:1,name:"values",type:"tensor"},{start:2,name:"denseShape",type:"tensor"},{start:3,name:"defaultValue",type:"tensor"}]},{tfOpName:"SparseReshape",category:"sparse",inputs:[{start:0,name:"inputIndices",type:"tensor"},{start:1,name:"inputShape",type:"tensor"},{start:2,name:"newShape",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"SparseSegmentMean",category:"sparse",inputs:[{start:0,name:"data",type:"tensor"},{start:1,name:"indices",type:"tensor"},{start:2,name:"segmentIds",type:"tensor"}]},{tfOpName:"SparseSegmentSum",category:"sparse",inputs:[{start:0,name:"data",type:"tensor"},{start:1,name:"indices",type:"tensor"},{start:2,name:"segmentIds",type:"tensor"}]}]}),x("kuUeg",function(e,t){a(e.exports,"json",()=>r);let r=[{tfOpName:"FFT",category:"spectral",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"IFFT",category:"spectral",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"RFFT",category:"spectral",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"fft_length",type:"number",notSupported:!0}]},{tfOpName:"IRFFT",category:"spectral",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"fft_length",type:"number",notSupported:!0}]}]}),x("3Fxik",function(e,t){a(e.exports,"json",()=>r);let r=[{tfOpName:"StaticRegexReplace",category:"string",inputs:[{start:0,name:"input",type:"tensor"}],attrs:[{tfName:"pattern",name:"pattern",type:"string"},{tfName:"rewrite",name:"rewrite",type:"string"},{tfName:"replace_global",name:"replaceGlobal",type:"bool"}]},{tfOpName:"StringNGrams",category:"string",inputs:[{start:0,name:"data",type:"tensor"},{start:1,name:"dataSplits",type:"tensor"}],attrs:[{tfName:"separator",name:"separator",type:"string"},{tfName:"ngram_widths",name:"nGramWidths",type:"number[]"},{tfName:"left_pad",name:"leftPad",type:"string"},{tfName:"right_pad",name:"rightPad",type:"string"},{tfName:"pad_width",name:"padWidth",type:"number"},{tfName:"preserve_short_sequences",name:"preserveShortSequences",type:"bool"}],outputs:["ngrams","ngrams_splits"]},{tfOpName:"StringSplit",category:"string",inputs:[{start:0,name:"input",type:"tensor"},{start:1,name:"delimiter",type:"tensor"}],attrs:[{tfName:"skip_empty",name:"skipEmpty",type:"bool"}],outputs:["indices","values","shape"]},{tfOpName:"StringToHashBucketFast",category:"string",inputs:[{start:0,name:"input",type:"tensor"}],attrs:[{tfName:"num_buckets",name:"numBuckets",type:"number"}]}]}),x("3km3B",function(e,t){a(e.exports,"json",()=>r);let r=[{tfOpName:"Cast",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"SrcT",name:"sdtype",type:"dtype",notSupported:!0},{tfName:"DstT",name:"dtype",type:"dtype"}]},{tfOpName:"ExpandDims",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number"}]},{tfOpName:"MirrorPad",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"padding",type:"number[]"}],attrs:[{tfName:"mode",name:"mode",type:"string"}]},{tfOpName:"Pad",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"padding",type:"number[]"}],attrs:[{tfName:"constant_value",name:"constantValue",type:"number",defaultValue:0}]},{tfOpName:"PadV2",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"padding",type:"number[]"},{start:2,name:"constantValue",type:"number",defaultValue:0}]},{tfOpName:"Reshape",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"shape",type:"number[]"}]},{tfOpName:"EnsureShape",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"shape",type:"number[]"}]},{tfOpName:"Squeeze",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"axis",tfDeprecatedName:"squeeze_dims",name:"axis",type:"number[]"}]},{tfOpName:"SpaceToBatchND",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"blockShape",type:"number[]"},{start:2,name:"paddings",type:"number[]"}]},{tfOpName:"BatchToSpaceND",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"blockShape",type:"number[]"},{start:2,name:"crops",type:"number[]"}]},{tfOpName:"DepthToSpace",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"block_size",name:"blockSize",type:"number"},{tfName:"data_format",name:"dataFormat",type:"string"}]},{tfOpName:"BroadcastTo",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"shape",type:"number[]"}],attrs:[]},{tfOpName:"BroadcastArgs",category:"transformation",inputs:[{start:0,name:"s0",type:"tensor"},{start:1,name:"s1",type:"tensor"}],attrs:[]}]}),x("eZl48",function(e,t){a(e.exports,"GraphExecutor",()=>p),g("i64bB");var r=g("ibsdL"),n=g("c2DT1"),s=g("jjNRA"),o=g("9PnRL"),i=g("11iKq"),l=g("hv42p"),u=g("a96bd");class p{get weightIds(){return this.parent?this.parent.weightIds:this._weightIds}get functionExecutorMap(){return this.parent?this.parent.functionExecutorMap:this._functionExecutorMap}get weightMap(){return this.parent?this.parent.weightMap:this._weightMap}set weightMap(e){let t=Object.keys(e).map(t=>e[t].map(e=>e.id));this._weightIds=[].concat(...t),this._weightMap=e}set resourceManager(e){this._resourceManager=e}get inputs(){return this._inputs.map(e=>({name:e.name,shape:e.attrParams.shape?e.attrParams.shape.value:void 0,dtype:e.attrParams.dtype?e.attrParams.dtype.value:void 0}))}get outputs(){return this._outputs.map(e=>({name:e.name,shape:e.attrParams.shape?e.attrParams.shape.value:void 0,dtype:e.attrParams.dtype?e.attrParams.dtype.value:void 0}))}get inputNodes(){return this._inputs.map(e=>e.signatureKey||e.name)}get outputNodes(){return this._outputs.map(e=>{let t=e.signatureKey||e.name;return e.defaultOutput?`${t}:${e.defaultOutput}`:t})}get functions(){return Object.keys(this._functions).reduce((e,t)=>(e[t]=this._functions[t].signature,e),{})}constructor(e,t){this.graph=e,this.parent=t,this.compiledMap=new Map,this.parseNodeNameCache=new Map,this._weightMap={},this.SEPARATOR=",",this._functions={},this._functionExecutorMap={},this.keepIntermediateTensors=!1,this._outputs=e.outputs,this._inputs=e.inputs,this._initNodes=e.initNodes,this._signature=e.signature,this._functions=e.functions,null!=e.functions&&Object.keys(e.functions).forEach(t=>{this._functionExecutorMap[t]=new p(e.functions[t],this)})}getCompilationKey(e,t){let r=e.map(e=>e.name).sort(),a=t.map(e=>e.name).sort();return r.join(this.SEPARATOR)+"--"+a.join(this.SEPARATOR)}compile(e,t){let r=(0,u.getExecutionSubgraph)(e,t,this.weightMap,this._initNodes),{missingInputs:a,dynamicNode:n,syncInputs:s}=r;if(null!=n)throw Error(`This execution contains the node '${n.name}', which has the dynamic op '${n.op}'. Please use model.executeAsync() instead. Alternatively, to avoid the dynamic ops, specify the inputs [${s}]`);if(a.length>0){let r=t.map(e=>e.name),n=Object.keys(e);throw Error(`Cannot compute the outputs [${r}] from the provided inputs [${n}]. Missing the following inputs: [${a}]`)}let o=(0,u.getNodesInTopologicalOrder)(this.graph,r),i=(0,u.getNodeLiveUntilMap)(o);return{orderedNodes:o,nodeLiveUntilMap:i}}cloneAndKeepTensor(e){if(null==e)return null;let t=e.clone();return(0,n.keep)(t),t}cloneTensorList(e){return e?e.map(e=>this.cloneAndKeepTensor(e)):null}cloneTensorMap(e){return Object.fromEntries(Object.entries(e).map(([e,t])=>[e,this.cloneTensorList(t)]))}execute(e,t){this.disposeIntermediateTensors();let a=Object.keys(e=this.mapInputs(e)).sort();this.checkInputs(e),this.checkInputShapeAndType(e),t=this.mapOutputs(t),this.checkOutputs(t);let u=a.map(e=>this.graph.nodes[(0,o.parseNodeName)(e)[0]]),p=t.map(e=>(0,o.parseNodeName)(e)[0]),d=new Set(p),c=p.map(e=>this.graph.nodes[e]);0===c.length&&(c=this._outputs);let h=this.getCompilationKey(u,c),f=this.compiledMap.get(h);null==f&&(f=this.compile(e,c),this.compiledMap.set(h,f));try{this.keepIntermediateTensors=(0,r.env)().getBool("KEEP_INTERMEDIATE_TENSORS")}catch(e){this.keepIntermediateTensors=!1,console.warn(e.message)}let m={},g={};return(0,n.tidy)(()=>{let r=new(0,l.ExecutionContext)(this.weightMap,m,g,this.functionExecutorMap,this.parseNodeNameCache),a=Object.assign({},this.weightMap);this.keepIntermediateTensors&&(this.clonedTensorsMap=this.cloneTensorMap(this.weightMap)),Object.keys(e).forEach(t=>{let[n,s]=(0,o.parseNodeName)(t,r),i=[];i[s]=e[t],a[n]=i,this.keepIntermediateTensors&&(this.clonedTensorsMap[n]=this.cloneTensorList(i))});let n=this.getFrozenTensorIds(a),{orderedNodes:u,nodeLiveUntilMap:p}=f;for(let e of u){if(a[e.name])continue;let t=(0,i.executeOp)(e,a,r,this._resourceManager);if(s.isPromise(t))throw Error(`The execution of the op '${e.op}' returned a promise. Please use model.executeAsync() instead.`);a[e.name]=t,this.keepIntermediateTensors&&(this.clonedTensorsMap[e.name]=this.cloneTensorList(t)),this.checkTensorForDisposalWithNodeLiveUntilInfo(e,a,r,n,d,p.get(e.name))}return null==this.parent&&r.dispose(n),t.map(e=>(0,o.getTensor)(e,a,r))})}getFrozenTensorIds(e){return new Set([].concat.apply([],Object.keys(e).map(t=>e[t]).map(e=>e.map(e=>e.id))))}checkTensorForDisposal(e,t,r,a,n,s,i){if(!((0,u.isControlFlow)(t)||s.has(e))){for(let a of r[e])null!=a&&(i[a.id]=(i[a.id]||0)+t.children.length);for(let e of t.inputs){if((0,u.isControlFlow)(e))continue;let t=(0,o.getTensorsForCurrentContext)(e.name,r,a);if(null!=t)for(let e of t){if(!e||e.kept||n.has(e.id))continue;let t=i[e.id];1===t?(e.dispose(),delete i[e.id]):null!=t&&i[e.id]--}}}}checkTensorForDisposalWithNodeLiveUntilInfo(e,t,r,a,n,s){if(!(0,u.isControlFlow)(e)&&null!=s){for(let e of s)if(!((0,u.isControlFlow)(e)||n.has(e.name)))for(let n of(0,o.getTensorsForCurrentContext)(e.name,t,r))!n||n.kept||a.has(n.id)||n.dispose()}}async executeAsync(e,t){return this._executeAsync(e,t)}disposeIntermediateTensors(){this.clonedTensorsMap&&(Object.values(this.clonedTensorsMap).forEach(e=>{for(let t of e)t&&!t.isDisposed&&t.dispose()}),this.clonedTensorsMap=null)}getIntermediateTensors(){return this.clonedTensorsMap}async _executeAsync(e,t,a=!1,n={},s={}){this.disposeIntermediateTensors(),a||(e=this.mapInputs(e),this.checkInputs(e),this.checkInputShapeAndType(e),t=this.mapOutputs(t),this.checkOutputs(t));try{this.keepIntermediateTensors=(0,r.env)().getBool("KEEP_INTERMEDIATE_TENSORS")}catch(e){this.keepIntermediateTensors=!1,console.warn(e.message)}let i=new(0,l.ExecutionContext)(this.weightMap,n,s,this.functionExecutorMap,this.parseNodeNameCache);this.keepIntermediateTensors&&(this.clonedTensorsMap=this.cloneTensorMap(this.weightMap));let u=await this.executeWithControlFlow(e,i,t,a),p=t.map(e=>(0,o.getTensor)(e,u,i)),d=new Set([...p.map(e=>e.id),...Object.keys(e).map(t=>e[t].id),...this.weightIds]);return Object.values(u).forEach(e=>{e.forEach(e=>{!e||e.isDisposed||d.has(e.id)||e.dispose()})}),null==this.parent&&i.dispose(d),p}async executeFunctionAsync(e,t,r){let a=e.reduce((e,t,r)=>(e[this.inputs[r].name]=t,e),{});return this._executeAsync(a,this.outputNodes,!0,t,r)}async executeWithControlFlow(e,t,r,a){let n=Object.keys(e),s=n.map(e=>this.graph.nodes[(0,o.parseNodeName)(e)[0]]),i=r.map(e=>(0,o.parseNodeName)(e)[0]),l=new Set(i),p=i.map(e=>this.graph.nodes[e]);0===p.length&&(p=this._outputs);let{usedNodes:d,missingInputs:c,dynamicNode:h,syncInputs:f}=(0,u.getExecutionSubgraph)(e,p,this.weightMap,this._initNodes),m=[...s,...this.graph.weights,...this._initNodes||[]].map(e=>({node:e,contexts:t.currentContext})),g=Object.assign({},this.weightMap);Object.keys(e).forEach(t=>{let[r,a]=(0,o.parseNodeName)(t),n=[];n[a]=e[t],g[r]=n});let x={},y=this.getFrozenTensorIds(g),b={};for(;m.length>0;){let e=this.processStack(s,m,t,g,b,y,l,x,d);await Promise.all(e)}null!=h||a||console.warn("This model execution did not contain any nodes with control flow or dynamic output shapes. You can use model.execute() instead.");let v=p.filter(e=>!(0,u.isControlFlow)(e)&&!(0,o.getTensor)(e.name,g,t)).map(e=>e.name);if(v.length>0){let e="";throw null!=h&&(e=`Alternatively, to avoid the dynamic ops, use model.execute() and specify the inputs [${f}]`),Error(`Cannot compute the outputs [${v}] from the provided inputs [${n}]. Consider providing the following inputs: [${c}]. ${e}`)}return g}processStack(e,t,r,a,n,l,u,p,d){let c=[];for(;t.length>0;){let e=t.pop();r.currentContext=e.contexts;let h="";if("Enter"===e.node.op&&(0,o.getParamValue)("isConstant",e.node,a,r)&&([h]=(0,o.getNodeNameAndIndex)(e.node.name,r)),null==a[e.node.name]){let f=(0,i.executeOp)(e.node,a,r,this._resourceManager);h||([h]=(0,o.getNodeNameAndIndex)(e.node.name,r));let m=r.currentContext;s.isPromise(f)?c.push(f.then(s=>(a[h]=s,this.keepIntermediateTensors&&(this.clonedTensorsMap[h]=this.cloneTensorList(s)),r.currentContext=m,this.checkTensorForDisposal(h,e.node,a,r,l,u,p),this.processChildNodes(e.node,t,r,a,n,d),s))):(a[h]=f,this.keepIntermediateTensors&&(this.clonedTensorsMap[h]=this.cloneTensorList(f)),this.checkTensorForDisposal(h,e.node,a,r,l,u,p),this.processChildNodes(e.node,t,r,a,n,d))}else this.processChildNodes(e.node,t,r,a,n,d)}return c}processChildNodes(e,t,r,a,n,s){e.children.forEach(e=>{let[i]=(0,o.getNodeNameAndIndex)(e.name,r);!n[i]&&s.has(e.name)&&("Merge"===e.op?e.inputNames.some(e=>!!(0,o.getTensor)(e,a,r))&&(n[i]=!0,t.push({contexts:r.currentContext,node:e})):e.inputNames.every(e=>!!(0,o.getTensor)(e,a,r))&&(n[i]=!0,t.push({contexts:r.currentContext,node:e})))})}dispose(){Object.keys(this.weightMap).forEach(e=>this.weightMap[e].forEach(e=>e.dispose()))}checkInputShapeAndType(e){Object.keys(e).forEach(t=>{let r=e[t],[a]=(0,o.parseNodeName)(t),n=this.graph.nodes[a];if(n.attrParams.shape&&n.attrParams.shape.value){let e=n.attrParams.shape.value,t=e.length===r.shape.length&&r.shape.every((t,r)=>-1===e[r]||e[r]===t);s.assert(t,()=>`The shape of dict['${n.name}'] provided in model.execute(dict) must be [${e}], but was [${r.shape}]`)}n.attrParams.dtype&&n.attrParams.dtype.value&&s.assert(r.dtype===n.attrParams.dtype.value,()=>`The dtype of dict['${n.name}'] provided in model.execute(dict) must be ${n.attrParams.dtype.value}, but was ${r.dtype}`)})}mapInputs(e){var t,r;let a={};for(let n in e){let s=null==(r=null==(t=this._signature)?void 0:t.inputs)?void 0:r[n];null!=s?a[s.name]=e[n]:a[n]=e[n]}return a}checkInputs(e){let t=Object.keys(e).filter(e=>{let[t]=(0,o.parseNodeName)(e);return null==this.graph.nodes[t]});if(t.length>0)throw Error(`The dict provided in model.execute(dict) has keys: [${t}] that are not part of graph`)}mapOutputs(e){return e.map(e=>{var t,r;let a=null==(r=null==(t=this._signature)?void 0:t.outputs)?void 0:r[e];return null!=a?a.name:e},{})}checkOutputs(e){e.forEach(e=>{let[t]=(0,o.parseNodeName)(e);if(!this.graph.nodes[t])throw Error(`The output '${e}' is not found in the graph`)})}}}),x("11iKq",function(e,t){a(e.exports,"executeOp",()=>E),g("i64bB");var r=g("c2DT1"),n=g("jjNRA"),s=g("1EcJz"),o=g("dWfqP"),i=g("cWPX8"),l=g("4c4iS"),u=g("c3X9P"),p=g("gT6Ou"),d=g("3TPMs"),c=g("c0ywX"),h=g("gPS1H"),f=g("ln7DR"),m=g("c6NzH"),x=g("dQiCM"),y=g("h1Kl3"),b=g("7TMBo"),v=g("9lSzv"),N=g("bPan9"),k=g("bHY7p"),T=g("9Buta"),S=g("3pwdq"),I=g("7RSIj"),w=g("j4Rla"),C=g("cXzgX");function E(e,t,a,g,A=r.tidy){let $=((e,t,r)=>{switch(e.category){case"arithmetic":return A(()=>i.executeOp(e,t,r));case"basic_math":return A(()=>l.executeOp(e,t,r));case"control":return u.executeOp(e,t,r);case"convolution":return A(()=>p.executeOp(e,t,r));case"creation":return A(()=>d.executeOp(e,t,r));case"dynamic":return c.executeOp(e,t,r);case"evaluation":return A(()=>h.executeOp(e,t,r));case"image":return A(()=>x.executeOp(e,t,r));case"graph":return A(()=>f.executeOp(e,t,r));case"logical":return A(()=>y.executeOp(e,t,r));case"matrices":return A(()=>b.executeOp(e,t,r));case"normalization":return A(()=>v.executeOp(e,t,r));case"ragged":return A(()=>N.executeOp(e,t,r));case"reduction":return A(()=>k.executeOp(e,t,r));case"slice_join":return A(()=>T.executeOp(e,t,r));case"sparse":return A(()=>S.executeOp(e,t,r));case"spectral":return A(()=>I.executeOp(e,t,r));case"string":return A(()=>w.executeOp(e,t,r));case"transformation":return A(()=>C.executeOp(e,t,r));case"hash_table":return m.executeOp(e,t,r,g);case"custom":let a=(0,o.getRegisteredOp)(e.op);if(a&&a.customExecutor)return a.customExecutor(new(0,s.NodeValueImpl)(e,t,r));throw TypeError(`Custom op ${e.op} is not registered.`);default:throw TypeError(`Unknown op '${e.op}'. File an issue at https://github.com/tensorflow/tfjs/issues so we can add it, or register a custom execution with tf.registerOp()`)}})(e,t,a);return n.isPromise($)?$.then(e=>[].concat(e)):[].concat($)}}),x("1EcJz",function(e,t){a(e.exports,"NodeValueImpl",()=>s);var r=g("9PnRL"),n=g("jRFPP");class s{constructor(e,t,r){this.node=e,this.tensorMap=t,this.context=r,this.inputs=[],this.attrs={},this.inputs=e.inputNames.map(e=>this.getInput(e)),null!=e.rawAttrs&&(this.attrs=Object.keys(e.rawAttrs).reduce((e,t)=>(e[t]=this.getAttr(t),e),{}))}getInput(e){return(0,r.getTensor)(e,this.tensorMap,this.context)}getAttr(e,t){let a=this.node.rawAttrs[e];if(null!=a.tensor)return(0,r.getTensor)(e,this.tensorMap,this.context);if(null!=a.i||null!=a.f)return(0,n.getNumberParam)(this.node.rawAttrs,e,t);if(null!=a.s)return(0,n.getStringParam)(this.node.rawAttrs,e,t);if(null!=a.b)return(0,n.getBoolParam)(this.node.rawAttrs,e,t);if(null!=a.shape)return(0,n.getTensorShapeParam)(this.node.rawAttrs,e,t);if(null!=a.type)return(0,n.getDtypeParam)(this.node.rawAttrs,e,t);if(null!=a.list){if(null!=a.list.i||null!=a.list.f)return(0,n.getNumericArrayParam)(this.node.rawAttrs,e,t);if(null!=a.list.s)return(0,n.getStringArrayParam)(this.node.rawAttrs,e,t);if(null!=a.list.shape)return(0,n.getTensorShapeArrayParam)(this.node.rawAttrs,e,t);if(null!=a.list.b)return(0,n.getBoolArrayParam)(this.node.rawAttrs,e,t);if(null!=a.list.type)return(0,n.getDtypeArrayParam)(this.node.rawAttrs,e,t)}return t}}}),x("cWPX8",function(e,t){a(e.exports,"executeOp",()=>s);var r=g("h8nZK"),n=g("9PnRL");let s=(e,t,a,s=r)=>{switch(e.op){case"BiasAdd":case"AddV2":case"Add":return[s.add((0,n.getParamValue)("a",e,t,a),(0,n.getParamValue)("b",e,t,a))];case"AddN":return[s.addN((0,n.getParamValue)("tensors",e,t,a))];case"FloorMod":case"Mod":return[s.mod((0,n.getParamValue)("a",e,t,a),(0,n.getParamValue)("b",e,t,a))];case"Mul":return[s.mul((0,n.getParamValue)("a",e,t,a),(0,n.getParamValue)("b",e,t,a))];case"RealDiv":case"Div":return[s.div((0,n.getParamValue)("a",e,t,a),(0,n.getParamValue)("b",e,t,a))];case"DivNoNan":return[s.divNoNan((0,n.getParamValue)("a",e,t,a),(0,n.getParamValue)("b",e,t,a))];case"FloorDiv":return[s.floorDiv((0,n.getParamValue)("a",e,t,a),(0,n.getParamValue)("b",e,t,a))];case"Sub":return[s.sub((0,n.getParamValue)("a",e,t,a),(0,n.getParamValue)("b",e,t,a))];case"Minimum":return[s.minimum((0,n.getParamValue)("a",e,t,a),(0,n.getParamValue)("b",e,t,a))];case"Maximum":return[s.maximum((0,n.getParamValue)("a",e,t,a),(0,n.getParamValue)("b",e,t,a))];case"Pow":return[s.pow((0,n.getParamValue)("a",e,t,a),(0,n.getParamValue)("b",e,t,a))];case"SquaredDifference":return[s.squaredDifference((0,n.getParamValue)("a",e,t,a),(0,n.getParamValue)("b",e,t,a))];default:throw TypeError(`Node type ${e.op} is not implemented`)}}}),x("h8nZK",function(e,t){var r=g("aosGd");n(e.exports,r)}),x("4c4iS",function(e,t){a(e.exports,"executeOp",()=>s);var r=g("h8nZK"),n=g("9PnRL");let s=(e,t,a,s=r)=>{switch(e.op){case"Abs":case"ComplexAbs":return[s.abs((0,n.getParamValue)("x",e,t,a))];case"Acos":return[s.acos((0,n.getParamValue)("x",e,t,a))];case"Acosh":return[s.acosh((0,n.getParamValue)("x",e,t,a))];case"Asin":return[s.asin((0,n.getParamValue)("x",e,t,a))];case"Asinh":return[s.asinh((0,n.getParamValue)("x",e,t,a))];case"Atan":return[s.atan((0,n.getParamValue)("x",e,t,a))];case"Atan2":return[s.atan2((0,n.getParamValue)("x",e,t,a),(0,n.getParamValue)("y",e,t,a))];case"Atanh":return[s.atanh((0,n.getParamValue)("x",e,t,a))];case"Ceil":return[s.ceil((0,n.getParamValue)("x",e,t,a))];case"Complex":return[s.complex((0,n.getParamValue)("real",e,t,a),(0,n.getParamValue)("imag",e,t,a))];case"Cos":return[s.cos((0,n.getParamValue)("x",e,t,a))];case"Cosh":return[s.cosh((0,n.getParamValue)("x",e,t,a))];case"Elu":return[s.elu((0,n.getParamValue)("x",e,t,a))];case"Erf":return[s.erf((0,n.getParamValue)("x",e,t,a))];case"Exp":return[s.exp((0,n.getParamValue)("x",e,t,a))];case"Expm1":return[s.expm1((0,n.getParamValue)("x",e,t,a))];case"Floor":return[s.floor((0,n.getParamValue)("x",e,t,a))];case"Log":return[s.log((0,n.getParamValue)("x",e,t,a))];case"Log1p":return[s.log1p((0,n.getParamValue)("x",e,t,a))];case"Imag":return[s.imag((0,n.getParamValue)("x",e,t,a))];case"Neg":return[s.neg((0,n.getParamValue)("x",e,t,a))];case"Reciprocal":return[s.reciprocal((0,n.getParamValue)("x",e,t,a))];case"Real":return[s.real((0,n.getParamValue)("x",e,t,a))];case"Relu":return[s.relu((0,n.getParamValue)("x",e,t,a))];case"Round":return[s.round((0,n.getParamValue)("x",e,t,a))];case"Selu":return[s.selu((0,n.getParamValue)("x",e,t,a))];case"Sigmoid":return[s.sigmoid((0,n.getParamValue)("x",e,t,a))];case"Sin":return[s.sin((0,n.getParamValue)("x",e,t,a))];case"Sign":return[s.sign((0,n.getParamValue)("x",e,t,a))];case"Sinh":return[s.sinh((0,n.getParamValue)("x",e,t,a))];case"Softplus":return[s.softplus((0,n.getParamValue)("x",e,t,a))];case"Sqrt":return[s.sqrt((0,n.getParamValue)("x",e,t,a))];case"Square":return[s.square((0,n.getParamValue)("x",e,t,a))];case"Tanh":return[s.tanh((0,n.getParamValue)("x",e,t,a))];case"Tan":return[s.tan((0,n.getParamValue)("x",e,t,a))];case"ClipByValue":return[s.clipByValue((0,n.getParamValue)("x",e,t,a),(0,n.getParamValue)("clipValueMin",e,t,a),(0,n.getParamValue)("clipValueMax",e,t,a))];case"Relu6":return[s.relu6((0,n.getParamValue)("x",e,t,a))];case"Rsqrt":return[s.rsqrt((0,n.getTensor)(e.inputNames[0],t,a))];case"LeakyRelu":return[s.leakyRelu((0,n.getParamValue)("x",e,t,a),(0,n.getParamValue)("alpha",e,t,a))];case"Prelu":return[s.prelu((0,n.getParamValue)("x",e,t,a),(0,n.getParamValue)("alpha",e,t,a))];case"IsNan":return[s.isNaN((0,n.getTensor)(e.inputNames[0],t,a))];case"IsInf":return[s.isInf((0,n.getTensor)(e.inputNames[0],t,a))];case"IsFinite":return[s.isFinite((0,n.getTensor)(e.inputNames[0],t,a))];default:throw TypeError(`Node type ${e.op} is not implemented`)}}}),x("c3X9P",function(e,t){a(e.exports,"executeOp",()=>i),g("i64bB");var r=g("3xp7o"),n=g("gwwf3"),s=g("7TU8D"),o=g("9PnRL");let i=async(e,t,a)=>{switch(e.op){case"If":case"StatelessIf":{let r=(0,o.getParamValue)("thenBranch",e,t,a),n=(0,o.getParamValue)("elseBranch",e,t,a),s=(0,o.getParamValue)("cond",e,t,a),i=(0,o.getParamValue)("args",e,t,a);if((await s.data())[0])return a.functionMap[r].executeFunctionAsync(i,a.tensorArrayMap,a.tensorListMap);return a.functionMap[n].executeFunctionAsync(i,a.tensorArrayMap,a.tensorListMap)}case"While":case"StatelessWhile":{let r=(0,o.getParamValue)("body",e,t,a),n=(0,o.getParamValue)("cond",e,t,a),s=(0,o.getParamValue)("args",e,t,a),i=await a.functionMap[n].executeFunctionAsync(s,a.tensorArrayMap,a.tensorListMap),l=s.map(e=>e.id),u=await i[0].data();i.forEach(e=>{e.kept||-1!==l.indexOf(e.id)||e.dispose()});let p=s;for(;u[0];){let e=p,t=(p=await a.functionMap[r].executeFunctionAsync(p,a.tensorArrayMap,a.tensorListMap)).map(e=>e.id);e.forEach(e=>{e.kept||-1!==l.indexOf(e.id)||-1!==t.indexOf(e.id)||e.dispose()});let s=await a.functionMap[n].executeFunctionAsync(p,a.tensorArrayMap,a.tensorListMap);u=await s[0].data(),s.forEach(e=>{e.kept||-1!==l.indexOf(e.id)||-1!==t.indexOf(e.id)||e.dispose()})}return p}case"LoopCond":{let r=(0,o.getParamValue)("pred",e,t,a);return[(0,o.cloneTensor)(r)]}case"Switch":{let r=(0,o.getParamValue)("pred",e,t,a),n=(0,o.getParamValue)("data",e,t,a);return n.kept||(n=(0,o.cloneTensor)(n)),(await r.data())[0]?[void 0,n]:[n,void 0]}case"Merge":{let r=e.inputNames.find(e=>void 0!==(0,o.getTensor)(e,t,a));if(r){let e=(0,o.getTensor)(r,t,a);return[(0,o.cloneTensor)(e)]}return}case"Enter":{let r=(0,o.getParamValue)("frameName",e,t,a),n=(0,o.getParamValue)("tensor",e,t,a);return a.enterFrame(r),[(0,o.cloneTensor)(n)]}case"Exit":{let r=(0,o.getParamValue)("tensor",e,t,a);return a.exitFrame(),[(0,o.cloneTensor)(r)]}case"NextIteration":{let r=(0,o.getParamValue)("tensor",e,t,a);return a.nextIteration(),[(0,o.cloneTensor)(r)]}case"TensorArrayV3":{let s=(0,o.getParamValue)("size",e,t,a),i=(0,o.getParamValue)("dtype",e,t,a),l=(0,o.getParamValue)("elementShape",e,t,a),u=(0,o.getParamValue)("dynamicSize",e,t,a),p=(0,o.getParamValue)("clearAfterRead",e,t,a),d=(0,o.getParamValue)("identicalElementShapes",e,t,a),c=(0,o.getParamValue)("name",e,t,a),h=new(0,n.TensorArray)(c,i,s,l,d,u,p);return a.addTensorArray(h),[h.idTensor,(0,r.scalar)(1)]}case"TensorArrayWriteV3":{let r=(0,o.getParamValue)("tensorArrayId",e,t,a),n=(0,o.getParamValue)("index",e,t,a),s=(0,o.getParamValue)("tensor",e,t,a),i=a.getTensorArray(r.id);return i.write(n,s),[i.idTensor]}case"TensorArrayReadV3":{let r=(0,o.getParamValue)("tensorArrayId",e,t,a),n=(0,o.getParamValue)("index",e,t,a);return[a.getTensorArray(r.id).read(n)]}case"TensorArrayGatherV3":{let r=(0,o.getParamValue)("tensorArrayId",e,t,a),n=(0,o.getParamValue)("indices",e,t,a),s=(0,o.getParamValue)("dtype",e,t,a);return[a.getTensorArray(r.id).gather(n,s)]}case"TensorArrayScatterV3":{let r=(0,o.getParamValue)("tensorArrayId",e,t,a),n=(0,o.getParamValue)("indices",e,t,a),s=(0,o.getParamValue)("tensor",e,t,a),i=a.getTensorArray(r.id);return i.scatter(n,s),[i.idTensor]}case"TensorArrayConcatV3":{let r=(0,o.getParamValue)("tensorArrayId",e,t,a),n=a.getTensorArray(r.id),s=(0,o.getParamValue)("dtype",e,t,a);return[n.concat(s)]}case"TensorArraySplitV3":{let r=(0,o.getParamValue)("tensorArrayId",e,t,a),n=(0,o.getParamValue)("tensor",e,t,a),s=(0,o.getParamValue)("lengths",e,t,a),i=a.getTensorArray(r.id);return i.split(s,n),[i.idTensor]}case"TensorArraySizeV3":{let n=(0,o.getParamValue)("tensorArrayId",e,t,a),s=a.getTensorArray(n.id);return[(0,r.scalar)(s.size(),"int32")]}case"TensorArrayCloseV3":{let r=(0,o.getParamValue)("tensorArrayId",e,t,a),n=a.getTensorArray(r.id);return n.clearAndClose(),[n.idTensor]}case"TensorListSetItem":{let r=(0,o.getParamValue)("tensorListId",e,t,a),n=(0,o.getParamValue)("index",e,t,a),s=(0,o.getParamValue)("tensor",e,t,a),i=a.getTensorList(r.id);return i.setItem(n,s),[i.idTensor]}case"TensorListGetItem":{let r=(0,o.getParamValue)("tensorListId",e,t,a),n=(0,o.getParamValue)("index",e,t,a),s=(0,o.getParamValue)("elementShape",e,t,a),i=(0,o.getParamValue)("elementDType",e,t,a);return[a.getTensorList(r.id).getItem(n,s,i)]}case"TensorListScatterV2":case"TensorListScatter":{let r=(0,o.getParamValue)("indices",e,t,a),n=(0,o.getParamValue)("tensor",e,t,a),i=(0,o.getParamValue)("elementShape",e,t,a),l=(0,o.getParamValue)("numElements",e,t,a),u=(0,s.scatter)(n,r,i,l);return a.addTensorList(u),[u.idTensor]}case"TensorListReserve":case"EmptyTensorList":{let r,n=(0,o.getParamValue)("elementShape",e,t,a),i=(0,o.getParamValue)("elementDType",e,t,a);r="TensorListReserve"===e.op?"numElements":"maxNumElements";let l=(0,o.getParamValue)(r,e,t,a),u="TensorListReserve"===e.op?-1:l,p=(0,s.reserve)(n,i,l,u);return a.addTensorList(p),[p.idTensor]}case"TensorListGather":{let r=(0,o.getParamValue)("tensorListId",e,t,a),n=(0,o.getParamValue)("indices",e,t,a),s=(0,o.getParamValue)("elementShape",e,t,a),i=(0,o.getParamValue)("elementDType",e,t,a);return[a.getTensorList(r.id).gather(n,i,s)]}case"TensorListStack":{let r=(0,o.getParamValue)("tensorListId",e,t,a),n=(0,o.getParamValue)("elementShape",e,t,a),s=(0,o.getParamValue)("elementDType",e,t,a),i=(0,o.getParamValue)("numElements",e,t,a);return[a.getTensorList(r.id).stack(n,s,i)]}case"TensorListFromTensor":{let r=(0,o.getParamValue)("tensor",e,t,a),n=(0,o.getParamValue)("elementShape",e,t,a),i=(0,o.getParamValue)("elementDType",e,t,a),l=(0,s.fromTensor)(r,n,i);return a.addTensorList(l),[l.idTensor]}case"TensorListConcat":case"TensorListConcatV2":{let r=(0,o.getParamValue)("tensorListId",e,t,a),n=a.getTensorList(r.id),s=(0,o.getParamValue)("dtype",e,t,a),i=(0,o.getParamValue)("elementShape",e,t,a);return[n.concat(s,i)]}case"TensorListPushBack":{let r=(0,o.getParamValue)("tensorListId",e,t,a),n=(0,o.getParamValue)("tensor",e,t,a),s=a.getTensorList(r.id);return s.pushBack(n),[s.idTensor]}case"TensorListPopBack":{let r=(0,o.getParamValue)("tensorListId",e,t,a),n=(0,o.getParamValue)("elementShape",e,t,a),s=(0,o.getParamValue)("elementDType",e,t,a);return[a.getTensorList(r.id).popBack(n,s)]}case"TensorListSplit":{let r=(0,o.getParamValue)("tensor",e,t,a),n=(0,o.getParamValue)("elementShape",e,t,a),i=(0,o.getParamValue)("lengths",e,t,a),l=(0,s.split)(r,i,n);return a.addTensorList(l),[l.idTensor]}case"TensorListLength":{let n=(0,o.getParamValue)("tensorListId",e,t,a),s=a.getTensorList(n.id);return[(0,r.scalar)(s.size(),"int32")]}case"TensorListResize":{let r=(0,o.getParamValue)("tensorListId",e,t,a),n=(0,o.getParamValue)("size",e,t,a),s=a.getTensorList(r.id).resize(n);return a.addTensorList(s),[s.idTensor]}default:throw TypeError(`Node type ${e.op} is not implemented`)}}}),x("gwwf3",function(e,t){a(e.exports,"TensorArray",()=>c),g("i64bB");var r=g("iTu6j"),n=g("c2DT1"),s=g("4sqA7"),o=g("3xp7o"),i=g("79KOG"),l=g("8BrLX"),u=g("erbmM"),p=g("gBOC6"),d=g("cC9h5");class c{constructor(e,t,r,a,s,i,l){this.name=e,this.dtype=t,this.maxSize=r,this.elementShape=a,this.identicalElementShapes=s,this.dynamicSize=i,this.clearAfterRead=l,this.tensors=[],this.closed_=!1,this.idTensor=(0,o.scalar)(0),(0,n.keep)(this.idTensor)}get id(){return this.idTensor.id}get closed(){return this.closed_}clearAndClose(e){this.tensors.forEach(t=>{null!=e&&e.has(t.tensor.id)||t.tensor.dispose()}),this.tensors=[],this.closed_=!0,this.idTensor.dispose()}size(){return this.tensors.length}read(e){if(this.closed_)throw Error(`TensorArray ${this.name} has already been closed.`);if(e<0||e>=this.size())throw Error(`Tried to read from index ${e}, but array size is: ${this.size()}`);let t=this.tensors[e];if(t.cleared)throw Error(`TensorArray ${this.name}: Could not read index ${e} twice because it was cleared after a previous read (perhaps try setting clear_after_read = false?).`);return this.clearAfterRead&&(t.cleared=!0),t.read=!0,t.tensor}readMany(e){return e.map(e=>this.read(e))}write(e,t){if(this.closed_)throw Error(`TensorArray ${this.name} has already been closed.`);if(e<0||!this.dynamicSize&&e>=this.maxSize)throw Error(`Tried to write to index ${e}, but array is not resizeable and size is: ${this.maxSize}`);let r=this.tensors[e]||{};if(t.dtype!==this.dtype)throw Error(`TensorArray ${this.name}: Could not write to TensorArray index ${e},
          because the value dtype is ${t.dtype}, but TensorArray dtype is ${this.dtype}.`);if(0===this.size()&&(null==this.elementShape||0===this.elementShape.length)&&(this.elementShape=t.shape),(0,d.assertShapesMatchAllowUndefinedSize)(this.elementShape,t.shape,`TensorArray ${this.name}: Could not write to TensorArray index ${e}.`),r.read)throw Error(`TensorArray ${this.name}: Could not write to TensorArray index ${e}, because it has already been read.`);if(r.written)throw Error(`TensorArray ${this.name}: Could not write to TensorArray index ${e}, because it has already been written.`);r.tensor=t,(0,n.keep)(t),r.written=!0,this.tensors[e]=r}writeMany(e,t){if(e.length!==t.length)throw Error(`TensorArray ${this.name}: could not write multiple tensors,because the index size: ${e.length} is not the same as tensors size: ${t.length}.`);e.forEach((e,r)=>this.write(e,t[r]))}gather(e,t){if(t&&t!==this.dtype)throw Error(`TensorArray dtype is ${this.dtype} but gather requested dtype ${t}`);if(e)e=e.slice(0,this.size());else{e=[];for(let t=0;t<this.size();t++)e.push(t)}if(0===e.length)return(0,u.tensor)([],[0].concat(this.elementShape));let r=this.readMany(e);return(0,d.assertShapesMatchAllowUndefinedSize)(this.elementShape,r[0].shape,"TensorArray shape mismatch: "),(0,l.stack)(r,0)}concat(e){if(e&&e!==this.dtype)throw Error(`TensorArray dtype is ${this.dtype} but concat requested dtype ${e}`);if(0===this.size())return(0,u.tensor)([],[0].concat(this.elementShape));let t=[];for(let e=0;e<this.size();e++)t.push(e);let a=this.readMany(t);return(0,d.assertShapesMatchAllowUndefinedSize)(this.elementShape,a[0].shape,`TensorArray shape mismatch: tensor array shape (${this.elementShape}) vs first tensor shape (${a[0].shape})`),(0,r.concat)(a,0)}scatter(e,t){if(t.dtype!==this.dtype)throw Error(`TensorArray dtype is ${this.dtype} but tensor has dtype ${t.dtype}`);if(e.length!==t.shape[0])throw Error(`Expected len(indices) == tensor.shape[0], but saw: ${e.length} vs. ${t.shape[0]}`);let r=Math.max(...e);if(!this.dynamicSize&&r>=this.maxSize)throw Error(`Max index must be < array size (${r}  vs. ${this.maxSize})`);this.writeMany(e,(0,p.unstack)(t,0))}split(e,t){if(t.dtype!==this.dtype)throw Error(`TensorArray dtype is ${this.dtype} but tensor has dtype ${t.dtype}`);let r=0,a=e.map(e=>r+=e);if(r!==t.shape[0])throw Error(`Expected sum of lengths to be equal to
          tensor.shape[0], but sum of lengths is
        ${r}, and tensor's shape is: ${t.shape}`);if(!this.dynamicSize&&e.length!==this.maxSize)throw Error(`TensorArray's size is not equal to the size of lengths (${this.maxSize} vs. ${e.length}), and the TensorArray is not marked as dynamically resizeable`);let o=0===r?0:t.size/r,l=[];(0,n.tidy)(()=>{t=(0,s.reshape)(t,[1,r,o]);for(let r=0;r<e.length;++r){let n=[0,0===r?0:a[r-1],0],u=[1,e[r],o];l[r]=(0,s.reshape)((0,i.slice)(t,n,u),this.elementShape)}return l});let u=[];for(let t=0;t<e.length;t++)u[t]=t;this.writeMany(u,l)}}}),x("cC9h5",function(e,t){a(e.exports,"assertShapesMatchAllowUndefinedSize",()=>n),a(e.exports,"inferElementShape",()=>o),a(e.exports,"mergeElementShape",()=>i),g("i64bB");var r=g("jjNRA");function n(e,t,a=""){if("number"!=typeof e&&"number"!=typeof t){r.assert(e.length===t.length,()=>a+` Shapes ${e} and ${t} must match`);for(let n=0;n<e.length;n++){let s=e[n],o=t[n];r.assert(s<0||o<0||s===o,()=>a+` Shapes ${e} and ${t} must match`)}}}function s(e){return!("number"==typeof e||e.some(e=>e<0))}function o(e,t,r){let a=i(e,r),n=!s(a);if(n&&0===t.length)throw Error(`Tried to calculate elements of an empty list with non-fully-defined elementShape: ${a}`);if(n&&t.forEach(e=>{a=i(e.shape,a)}),!s(a))throw Error(`Non-fully-defined elementShape: ${a}`);return a}function i(e,t){if("number"==typeof e)return t;if("number"==typeof t)return e;if(e.length!==t.length)throw Error(`Incompatible ranks during merge: ${e} vs. ${t}`);let r=[];for(let a=0;a<e.length;++a){let n=e[a],s=t[a];if(n>=0&&s>=0&&n!==s)throw Error(`Incompatible shape during merge: ${e} vs. ${t}`);r[a]=n>=0?n:s}return r}}),x("7TU8D",function(e,t){a(e.exports,"fromTensor",()=>h),a(e.exports,"reserve",()=>f),a(e.exports,"scatter",()=>m),a(e.exports,"split",()=>x),g("i64bB");var r=g("iTu6j"),n=g("c2DT1"),s=g("4sqA7"),o=g("3xp7o"),i=g("79KOG"),l=g("8BrLX"),u=g("erbmM"),p=g("gBOC6"),d=g("cC9h5");class c{get id(){return this.idTensor.id}constructor(e,t,r,a=-1){this.tensors=e,this.elementShape=t,this.elementDtype=r,null!=e&&e.forEach(e=>{if(r!==e.dtype)throw Error(`Invalid data types; op elements ${r}, but list elements ${e.dtype}`);(0,d.assertShapesMatchAllowUndefinedSize)(t,e.shape,"TensorList shape mismatch: "),(0,n.keep)(e)}),this.idTensor=(0,o.scalar)(0),this.maxNumElements=a,(0,n.keep)(this.idTensor)}copy(){return new c([...this.tensors],this.elementShape,this.elementDtype)}clearAndClose(e){this.tensors.forEach(t=>{null!=e&&e.has(t.id)||t.dispose()}),this.tensors.length=0,this.idTensor.dispose()}size(){return this.tensors.length}stack(e,t,r=-1){if(t!==this.elementDtype)throw Error(`Invalid data types; op elements ${t}, but list elements ${this.elementDtype}`);if(-1!==r&&this.tensors.length!==r)throw Error(`Operation expected a list with ${r} elements but got a list with ${this.tensors.length} elements.`);(0,d.assertShapesMatchAllowUndefinedSize)(e,this.elementShape,"TensorList shape mismatch: ");let a=(0,d.inferElementShape)(this.elementShape,this.tensors,e);return(0,n.tidy)(()=>{let e=this.tensors.map(e=>(0,s.reshape)(e,a));return(0,l.stack)(e,0)})}popBack(e,t){if(t!==this.elementDtype)throw Error(`Invalid data types; op elements ${t}, but list elements ${this.elementDtype}`);if(0===this.size())throw Error("Trying to pop from an empty list.");let r=(0,d.inferElementShape)(this.elementShape,this.tensors,e),a=this.tensors.pop();return a.kept=!1,(0,d.assertShapesMatchAllowUndefinedSize)(a.shape,e,"TensorList shape mismatch: "),(0,s.reshape)(a,r)}pushBack(e){if(e.dtype!==this.elementDtype)throw Error(`Invalid data types; op elements ${e.dtype}, but list elements ${this.elementDtype}`);if((0,d.assertShapesMatchAllowUndefinedSize)(e.shape,this.elementShape,"TensorList shape mismatch: "),this.maxNumElements===this.size())throw Error("Trying to push element into a full list.");(0,n.keep)(e),this.tensors.push(e)}resize(e){if(e<0)throw Error(`TensorListResize expects size to be non-negative. Got: ${e}`);if(-1!==this.maxNumElements&&e>this.maxNumElements)throw Error(`TensorListResize input size ${e} is greater maxNumElement ${this.maxNumElements}.`);let t=new c([],this.elementShape,this.elementDtype,this.maxNumElements);t.tensors.length=e;for(let r=0;r<Math.min(this.tensors.length,e);++r)t.tensors[r]=this.tensors[r];return t}getItem(e,t,r){if(r!==this.elementDtype)throw Error(`Invalid data types; op elements ${r}, but list elements ${this.elementDtype}`);if(e<0||e>this.tensors.length)throw Error(`Trying to access element ${e} in a list with ${this.tensors.length} elements.`);if(null==this.tensors[e])throw Error(`element at index ${e} is null.`);(0,d.assertShapesMatchAllowUndefinedSize)(this.tensors[e].shape,t,"TensorList shape mismatch: ");let a=(0,d.inferElementShape)(this.elementShape,this.tensors,t);return(0,s.reshape)(this.tensors[e],a)}setItem(e,t){if(t.dtype!==this.elementDtype)throw Error(`Invalid data types; op elements ${t.dtype}, but list elements ${this.elementDtype}`);if(e<0||-1!==this.maxNumElements&&e>=this.maxNumElements)throw Error(`Trying to set element ${e} in a list with max ${this.maxNumElements} elements.`);(0,d.assertShapesMatchAllowUndefinedSize)(this.elementShape,t.shape,"TensorList shape mismatch: "),(0,n.keep)(t),null!=this.tensors[e]&&(this.tensors[e].kept=!1),this.tensors[e]=t}gather(e,t,r){if(t!==this.elementDtype)throw Error(`Invalid data types; op elements ${t}, but list elements ${this.elementDtype}`);(0,d.assertShapesMatchAllowUndefinedSize)(this.elementShape,r,"TensorList shape mismatch: "),e=e.slice(0,this.size());let a=(0,d.inferElementShape)(this.elementShape,this.tensors,r);return 0===e.length?(0,u.tensor)([],[0].concat(a)):(0,n.tidy)(()=>{let t=e.map(e=>(0,s.reshape)(this.tensors[e],a));return(0,l.stack)(t,0)})}concat(e,t){if(e&&e!==this.elementDtype)throw Error(`TensorList dtype is ${this.elementDtype} but concat requested dtype ${e}`);(0,d.assertShapesMatchAllowUndefinedSize)(this.elementShape,t,"TensorList shape mismatch: ");let a=(0,d.inferElementShape)(this.elementShape,this.tensors,t);return 0===this.size()?(0,u.tensor)([],[0].concat(a)):(0,n.tidy)(()=>{let e=this.tensors.map(e=>(0,s.reshape)(e,a));return(0,r.concat)(e,0)})}}function h(e,t,r){let a=e.dtype;if(e.shape.length<1)throw Error(`Tensor must be at least a vector, but saw shape: ${e.shape}`);if(e.dtype!==r)throw Error(`Invalid data types; op elements ${e.dtype}, but list elements ${r}`);let n=e.shape.slice(1);return(0,d.assertShapesMatchAllowUndefinedSize)(n,t,"TensorList shape mismatch: "),new c((0,p.unstack)(e),t,a)}function f(e,t,r,a){return new c([],e,t,a)}function m(e,t,r,a){if(t.length!==e.shape[0])throw Error(`Expected len(indices) == tensor.shape[0], but saw: ${t.length} vs. ${e.shape[0]}`);let n=Math.max(...t);if(null!=a&&-1!==a&&n>=a)throw Error(`Max index must be < array size (${n}  vs. ${a})`);let s=new c([],r,e.dtype,a),o=(0,p.unstack)(e,0);return t.forEach((e,t)=>{s.setItem(e,o[t])}),s}function x(e,t,r){let a=0,o=t.map(e=>a+=e);if(a!==e.shape[0])throw Error(`Expected sum of lengths to be equal to
          tensor.shape[0], but sum of lengths is
        ${a}, and tensor's shape is: ${e.shape}`);let l=e.shape.slice(1),u=(0,d.mergeElementShape)(l,r),p=0===a?0:e.size/a,h=(0,n.tidy)(()=>{let r=[];e=(0,s.reshape)(e,[1,a,p]);for(let a=0;a<t.length;++a){let n=[0,0===a?0:o[a-1],0],l=[1,t[a],p];r[a]=(0,s.reshape)((0,i.slice)(e,n,l),u)}return e.dispose(),r}),f=new c([],r,e.dtype,t.length);for(let e=0;e<h.length;e++)f.setItem(e,h[e]);return f}}),x("gT6Ou",function(e,t){a(e.exports,"executeOp",()=>o);var r=g("h8nZK"),n=g("9PnRL");function s(e,t,r){let[a,s]=(0,n.getParamValue)("fusedOps",e,t,r),o="biasadd"===a,i="prelu"===s,l=(0,n.getParamValue)("numArgs",e,t,r);if(o){if(i&&2!==l)throw Error("FusedConv2d and DepthwiseConv2d with BiasAdd and Prelu must have two extra arguments: bias and alpha.");if(!i&&o&&1!==l)throw Error("FusedConv2d and DepthwiseConv2d with BiasAdd must have one extra argument: bias.")}if("fusedbatchnorm"===a)throw Error("FusedConv2d and DepthwiseConv2d with FusedBatchNorm is not supported");let u=(0,n.getParamValue)("strides",e,t,r),p=(0,n.getPadding)(e,t,r),d=(0,n.getParamValue)("dataFormat",e,t,r).toUpperCase(),c=(0,n.getParamValue)("dilations",e,t,r),[h,f]=(0,n.getParamValue)("args",e,t,r);return o||(f=h,h=void 0),{stride:u,pad:p,dataFormat:d,dilations:c,biasArg:h,preluArg:f,activationFunc:s,leakyreluAlpha:(0,n.getParamValue)("leakyreluAlpha",e,t,r)}}let o=(e,t,a,o=r)=>{switch(e.op){case"Conv1D":{let r=(0,n.getParamValue)("stride",e,t,a),s=(0,n.getParamValue)("pad",e,t,a),i=(0,n.getParamValue)("dataFormat",e,t,a).toUpperCase(),l=(0,n.getParamValue)("dilation",e,t,a);return[o.conv1d((0,n.getParamValue)("x",e,t,a),(0,n.getParamValue)("filter",e,t,a),r,s,i,l)]}case"Conv2D":{let r=(0,n.getParamValue)("strides",e,t,a),s=(0,n.getPadding)(e,t,a),i=(0,n.getParamValue)("dataFormat",e,t,a).toUpperCase(),l=(0,n.getParamValue)("dilations",e,t,a);return[o.conv2d((0,n.getParamValue)("x",e,t,a),(0,n.getParamValue)("filter",e,t,a),[r[1],r[2]],s,i,[l[1],l[2]])]}case"_FusedConv2D":{let{stride:r,pad:i,dataFormat:l,dilations:u,biasArg:p,preluArg:d,activationFunc:c,leakyreluAlpha:h}=s(e,t,a);return[o.fused.conv2d({x:(0,n.getParamValue)("x",e,t,a),filter:(0,n.getParamValue)("filter",e,t,a),strides:[r[1],r[2]],pad:i,dataFormat:l,dilations:[u[1],u[2]],bias:p,activation:c,preluActivationWeights:d,leakyreluAlpha:h})]}case"FusedDepthwiseConv2dNative":{let{stride:r,pad:i,dataFormat:l,dilations:u,biasArg:p,preluArg:d,activationFunc:c,leakyreluAlpha:h}=s(e,t,a);return[o.fused.depthwiseConv2d({x:(0,n.getParamValue)("x",e,t,a),filter:(0,n.getParamValue)("filter",e,t,a),strides:[r[1],r[2]],pad:i,dataFormat:l,dilations:[u[1],u[2]],bias:p,activation:c,preluActivationWeights:d,leakyreluAlpha:h})]}case"Conv2DBackpropInput":case"Conv2dTranspose":{let r=(0,n.getParamValue)("outputShape",e,t,a),s=(0,n.getParamValue)("strides",e,t,a),i=(0,n.getPadding)(e,t,a);return[o.conv2dTranspose((0,n.getParamValue)("x",e,t,a),(0,n.getParamValue)("filter",e,t,a),r,[s[1],s[2]],i)]}case"DepthwiseConv2dNative":case"DepthwiseConv2d":{let r=(0,n.getParamValue)("strides",e,t,a),s=(0,n.getPadding)(e,t,a),i=(0,n.getParamValue)("dilations",e,t,a),l=(0,n.getParamValue)("dataFormat",e,t,a).toUpperCase();return[o.depthwiseConv2d((0,n.getParamValue)("input",e,t,a),(0,n.getParamValue)("filter",e,t,a),[r[1],r[2]],s,l,[i[1],i[2]])]}case"Conv3D":{let r=(0,n.getParamValue)("strides",e,t,a),s=(0,n.getParamValue)("pad",e,t,a),i=(0,n.getParamValue)("dataFormat",e,t,a).toUpperCase(),l=(0,n.getParamValue)("dilations",e,t,a);return[o.conv3d((0,n.getParamValue)("x",e,t,a),(0,n.getParamValue)("filter",e,t,a),[r[1],r[2],r[3]],s,i,[l[1],l[2],l[3]])]}case"AvgPool":{let r=(0,n.getParamValue)("strides",e,t,a),s=(0,n.getParamValue)("pad",e,t,a),i=(0,n.getParamValue)("kernelSize",e,t,a);return[o.avgPool((0,n.getParamValue)("x",e,t,a),[i[1],i[2]],[r[1],r[2]],s)]}case"MaxPool":{let r=(0,n.getParamValue)("strides",e,t,a),s=(0,n.getParamValue)("pad",e,t,a),i=(0,n.getParamValue)("kernelSize",e,t,a);return[o.maxPool((0,n.getParamValue)("x",e,t,a),[i[1],i[2]],[r[1],r[2]],s)]}case"MaxPoolWithArgmax":{let r=(0,n.getParamValue)("strides",e,t,a),s=(0,n.getParamValue)("pad",e,t,a),i=(0,n.getParamValue)("kernelSize",e,t,a),l=(0,n.getParamValue)("includeBatchInIndex",e,t,a),{result:u,indexes:p}=o.maxPoolWithArgmax((0,n.getParamValue)("x",e,t,a),[i[1],i[2]],[r[1],r[2]],s,l);return[u,p]}case"AvgPool3D":{let r=(0,n.getParamValue)("strides",e,t,a),s=(0,n.getParamValue)("pad",e,t,a),i=(0,n.getParamValue)("kernelSize",e,t,a);return[o.avgPool3d((0,n.getParamValue)("x",e,t,a),[i[1],i[2],i[3]],[r[1],r[2],r[3]],s)]}case"MaxPool3D":{let r=(0,n.getParamValue)("strides",e,t,a),s=(0,n.getParamValue)("pad",e,t,a),i=(0,n.getParamValue)("kernelSize",e,t,a);return[o.maxPool3d((0,n.getParamValue)("x",e,t,a),[i[1],i[2],i[3]],[r[1],r[2],r[3]],s)]}case"Dilation2D":{let r=(0,n.getParamValue)("strides",e,t,a),s=(0,n.getParamValue)("pad",e,t,a),i=(0,n.getParamValue)("dilations",e,t,a),l=r[1],u=r[2],p=i[1],d=i[2];return[o.dilation2d((0,n.getParamValue)("x",e,t,a),(0,n.getParamValue)("filter",e,t,a),[l,u],s,[p,d],"NHWC")]}default:throw TypeError(`Node type ${e.op} is not implemented`)}}}),x("3TPMs",function(e,t){a(e.exports,"executeOp",()=>s);var r=g("h8nZK"),n=g("9PnRL");let s=(e,t,a,s=r)=>{switch(e.op){case"Fill":{let r=(0,n.getParamValue)("shape",e,t,a),o=(0,n.getParamValue)("dtype",e,t,a),i=(0,n.getParamValue)("value",e,t,a);return[s.fill(r,i,o)]}case"LinSpace":{let r=(0,n.getParamValue)("start",e,t,a),o=(0,n.getParamValue)("stop",e,t,a),i=(0,n.getParamValue)("num",e,t,a);return[s.linspace(r,o,i)]}case"Multinomial":{let r=(0,n.getParamValue)("logits",e,t,a),o=(0,n.getParamValue)("numSamples",e,t,a),i=(0,n.getParamValue)("seed",e,t,a);return[s.multinomial(r,o,i)]}case"OneHot":{let r=(0,n.getParamValue)("indices",e,t,a),o=(0,n.getParamValue)("depth",e,t,a),i=(0,n.getParamValue)("onValue",e,t,a),l=(0,n.getParamValue)("offValue",e,t,a),u=(0,n.getParamValue)("dtype",e,t,a);return[s.oneHot(r,o,i,l,u)]}case"Ones":return[s.ones((0,n.getParamValue)("shape",e,t,a),(0,n.getParamValue)("dtype",e,t,a))];case"OnesLike":return[s.onesLike((0,n.getParamValue)("x",e,t,a))];case"RandomStandardNormal":return[s.randomStandardNormal((0,n.getParamValue)("shape",e,t,a),(0,n.getParamValue)("dtype",e,t,a),(0,n.getParamValue)("seed",e,t,a))];case"RandomUniform":return[s.randomUniform((0,n.getParamValue)("shape",e,t,a),(0,n.getParamValue)("minval",e,t,a),(0,n.getParamValue)("maxval",e,t,a),(0,n.getParamValue)("dtype",e,t,a))];case"RandomUniformInt":return[s.randomUniformInt((0,n.getParamValue)("shape",e,t,a),(0,n.getParamValue)("minval",e,t,a),(0,n.getParamValue)("maxval",e,t,a),(0,n.getParamValue)("seed",e,t,a))];case"Range":{let r=(0,n.getParamValue)("start",e,t,a),o=(0,n.getParamValue)("stop",e,t,a),i=(0,n.getParamValue)("step",e,t,a);return[s.range(r,o,i,(0,n.getParamValue)("dtype",e,t,a))]}case"TruncatedNormal":{let r=(0,n.getParamValue)("shape",e,t,a),o=(0,n.getParamValue)("mean",e,t,a),i=(0,n.getParamValue)("stdDev",e,t,a),l=(0,n.getParamValue)("seed",e,t,a);return[s.truncatedNormal(r,o,i,(0,n.getParamValue)("dtype",e,t,a),l)]}case"Zeros":return[s.zeros((0,n.getParamValue)("shape",e,t,a),(0,n.getParamValue)("dtype",e,t,a))];case"ZerosLike":return[s.zerosLike((0,n.getParamValue)("x",e,t,a))];default:throw TypeError(`Node type ${e.op} is not implemented`)}}}),x("c0ywX",function(e,t){a(e.exports,"executeOp",()=>o);var r=g("h8nZK"),n=g("9PnRL");function s(e,t,r){let a=(0,n.getParamValue)("boxes",e,t,r),s=(0,n.getParamValue)("scores",e,t,r),o=(0,n.getParamValue)("maxOutputSize",e,t,r),i=(0,n.getParamValue)("iouThreshold",e,t,r);return{boxes:a,scores:s,maxOutputSize:o,iouThreshold:i,scoreThreshold:(0,n.getParamValue)("scoreThreshold",e,t,r),softNmsSigma:(0,n.getParamValue)("softNmsSigma",e,t,r)}}let o=async(e,t,a,o,i=r)=>{switch(e.op){case"NonMaxSuppressionV5":{let{boxes:r,scores:n,maxOutputSize:o,iouThreshold:l,scoreThreshold:u,softNmsSigma:p}=s(e,t,a),d=await i.image.nonMaxSuppressionWithScoreAsync(r,n,o,l,u,p);return[d.selectedIndices,d.selectedScores]}case"NonMaxSuppressionV4":{let{boxes:r,scores:o,maxOutputSize:l,iouThreshold:u,scoreThreshold:p}=s(e,t,a),d=(0,n.getParamValue)("padToMaxOutputSize",e,t,a),c=await i.image.nonMaxSuppressionPaddedAsync(r,o,l,u,p,d);return[c.selectedIndices,c.validOutputs]}case"NonMaxSuppressionV3":case"NonMaxSuppressionV2":{let{boxes:r,scores:n,maxOutputSize:o,iouThreshold:l,scoreThreshold:u}=s(e,t,a);return[await i.image.nonMaxSuppressionAsync(r,n,o,l,u)]}case"Where":{let r=i.cast((0,n.getParamValue)("condition",e,t,a),"bool"),s=[await i.whereAsync(r)];return r.dispose(),s}case"ListDiff":return i.setdiff1dAsync((0,n.getParamValue)("x",e,t,a),(0,n.getParamValue)("y",e,t,a));default:throw TypeError(`Node type ${e.op} is not implemented`)}}}),x("gPS1H",function(e,t){a(e.exports,"executeOp",()=>s);var r=g("h8nZK"),n=g("9PnRL");let s=(e,t,a,s=r)=>{switch(e.op){case"LowerBound":{let r=(0,n.getParamValue)("sortedSequence",e,t,a),o=(0,n.getParamValue)("values",e,t,a);return[s.lowerBound(r,o)]}case"TopKV2":{let r=(0,n.getParamValue)("x",e,t,a),o=(0,n.getParamValue)("k",e,t,a),i=(0,n.getParamValue)("sorted",e,t,a),l=s.topk(r,o,i);return[l.values,l.indices]}case"UpperBound":{let r=(0,n.getParamValue)("sortedSequence",e,t,a),o=(0,n.getParamValue)("values",e,t,a);return[s.upperBound(r,o)]}case"Unique":{let r=(0,n.getParamValue)("x",e,t,a),o=s.unique(r);return[o.values,o.indices]}case"UniqueV2":{let r=(0,n.getParamValue)("x",e,t,a),o=(0,n.getParamValue)("axis",e,t,a),i=s.unique(r,o);return[i.values,i.indices]}default:throw TypeError(`Node type ${e.op} is not implemented`)}}}),x("ln7DR",function(e,t){a(e.exports,"executeOp",()=>s);var r=g("h8nZK"),n=g("9PnRL");let s=(e,t,a,s=r)=>{switch(e.op){case"Const":return t[e.name];case"PlaceholderWithDefault":let o=(0,n.getParamValue)("default",e,t,a);return[(0,n.getTensor)(e.name,t,a)||o];case"Placeholder":return[(0,n.getTensor)(e.name,t,a)];case"Identity":case"StopGradient":case"FakeQuantWithMinMaxVars":{let r=(0,n.getParamValue)("x",e,t,a);return[(0,n.cloneTensor)(r)]}case"IdentityN":return(0,n.getParamValue)("x",e,t,a).map(e=>(0,n.cloneTensor)(e));case"Snapshot":let i=(0,n.getParamValue)("x",e,t,a);return[(0,n.cloneTensor)(i)];case"Shape":return[s.tensor1d((0,n.getParamValue)("x",e,t,a).shape,"int32")];case"ShapeN":return(0,n.getParamValue)("x",e,t,a).map(e=>s.tensor1d(e.shape));case"Size":return[s.scalar((0,n.getParamValue)("x",e,t,a).size,"int32")];case"Rank":return[s.scalar((0,n.getParamValue)("x",e,t,a).rank,"int32")];case"NoOp":return[s.scalar(1)];case"Print":let l=(0,n.getParamValue)("x",e,t,a),u=(0,n.getParamValue)("data",e,t,a),p=(0,n.getParamValue)("message",e,t,a),d=(0,n.getParamValue)("summarize",e,t,a);console.warn("The graph has a tf.print() operation,usually used for debugging, which slows down performance."),console.log(p);for(let e=0;e<u.length;e++)console.log(Array.prototype.slice.call(u[e].dataSync()).slice(0,d));return[l];default:throw TypeError(`Node type ${e.op} is not implemented`)}}}),x("c6NzH",function(e,t){a(e.exports,"executeOp",()=>s);var r=g("8pINL"),n=g("9PnRL");let s=async(e,t,a,s)=>{switch(e.op){case"HashTable":case"HashTableV2":{let o=s.getHashTableHandleByName(e.name);if(null!=o)return[o];{let o=(0,n.getParamValue)("keyDType",e,t,a),i=(0,n.getParamValue)("valueDType",e,t,a),l=new(0,r.HashTable)(o,i);return s.addHashTable(e.name,l),[l.handle]}}case"InitializeTable":case"InitializeTableV2":case"LookupTableImport":case"LookupTableImportV2":{let r=(0,n.getParamValue)("tableHandle",e,t,a,s),o=(0,n.getParamValue)("keys",e,t,a),i=(0,n.getParamValue)("values",e,t,a),l=s.getHashTableById(r.id);return[await l.import(o,i)]}case"LookupTableFind":case"LookupTableFindV2":{let r=(0,n.getParamValue)("tableHandle",e,t,a,s),o=(0,n.getParamValue)("keys",e,t,a),i=(0,n.getParamValue)("defaultValue",e,t,a),l=s.getHashTableById(r.id);return[await l.find(o,i)]}case"LookupTableSize":case"LookupTableSizeV2":{let r=(0,n.getParamValue)("tableHandle",e,t,a,s);return[s.getHashTableById(r.id).tensorSize()]}default:throw TypeError(`Node type ${e.op} is not implemented`)}}}),x("8pINL",function(e,t){a(e.exports,"HashTable",()=>l),g("i64bB");var r=g("c2DT1"),n=g("3xp7o"),s=g("8BrLX"),o=g("gBOC6"),i=g("jjNRA"),n=g("3xp7o");class l{get id(){return this.handle.id}constructor(e,t){this.keyDType=e,this.valueDType=t,this.handle=(0,n.scalar)(0),this.tensorMap=new Map,(0,r.keep)(this.handle)}clearAndClose(){this.tensorMap.forEach(e=>e.dispose()),this.tensorMap.clear(),this.handle.dispose()}size(){return this.tensorMap.size}tensorSize(){return n.scalar(this.size(),"int32")}async import(e,t){this.checkKeyAndValueTensor(e,t);let a=await e.data();return this.tensorMap.forEach(e=>e.dispose()),this.tensorMap.clear(),(0,r.tidy)(()=>{let e=(0,o.unstack)(t),n=a.length,s=e.length;i.assert(n===s,()=>`The number of elements doesn't match, keys has ${n} elements, the values has ${s} elements.`);for(let t=0;t<n;t++){let n=a[t],s=e[t];(0,r.keep)(s),this.tensorMap.set(n,s)}return this.handle})}async find(e,t){this.checkKeyAndValueTensor(e,t);let a=await e.data();return(0,r.tidy)(()=>{let e=[];for(let r=0;r<a.length;r++){let n=a[r],s=this.findWithDefault(n,t);e.push(s)}return(0,s.stack)(e)})}findWithDefault(e,t){let r=this.tensorMap.get(e);return null!=r?r:t}checkKeyAndValueTensor(e,t){if(e.dtype!==this.keyDType)throw Error(`Expect key dtype ${this.keyDType}, but got ${e.dtype}`);if(t.dtype!==this.valueDType)throw Error(`Expect value dtype ${this.valueDType}, but got ${t.dtype}`)}}}),x("dQiCM",function(e,t){a(e.exports,"executeOp",()=>s);var r=g("h8nZK"),n=g("9PnRL");let s=(e,t,a,s=r)=>{switch(e.op){case"ResizeBilinear":{let r=(0,n.getParamValue)("images",e,t,a),o=(0,n.getParamValue)("size",e,t,a),i=(0,n.getParamValue)("alignCorners",e,t,a),l=(0,n.getParamValue)("halfPixelCenters",e,t,a);return[s.image.resizeBilinear(r,[o[0],o[1]],i,l)]}case"ResizeNearestNeighbor":{let r=(0,n.getParamValue)("images",e,t,a),o=(0,n.getParamValue)("size",e,t,a),i=(0,n.getParamValue)("alignCorners",e,t,a),l=(0,n.getParamValue)("halfPixelCenters",e,t,a);return[s.image.resizeNearestNeighbor(r,[o[0],o[1]],i,l)]}case"CropAndResize":{let r=(0,n.getParamValue)("image",e,t,a),o=(0,n.getParamValue)("boxes",e,t,a),i=(0,n.getParamValue)("boxInd",e,t,a),l=(0,n.getParamValue)("cropSize",e,t,a),u=(0,n.getParamValue)("method",e,t,a),p=(0,n.getParamValue)("extrapolationValue",e,t,a);return[s.image.cropAndResize(r,o,i,l,u,p)]}case"ImageProjectiveTransformV3":{let r=(0,n.getParamValue)("images",e,t,a),o=(0,n.getParamValue)("transforms",e,t,a),i=(0,n.getParamValue)("outputShape",e,t,a),l=(0,n.getParamValue)("fillValue",e,t,a),u=(0,n.getParamValue)("interpolation",e,t,a),p=(0,n.getParamValue)("fillMode",e,t,a);return[s.image.transform(r,o,u.toLowerCase(),p.toLowerCase(),l,i)]}default:throw TypeError(`Node type ${e.op} is not implemented`)}}}),x("h1Kl3",function(e,t){a(e.exports,"executeOp",()=>s);var r=g("h8nZK"),n=g("9PnRL");let s=(e,t,a,s=r)=>{switch(e.op){case"Equal":return[s.equal((0,n.getParamValue)("a",e,t,a),(0,n.getParamValue)("b",e,t,a))];case"NotEqual":return[s.notEqual((0,n.getParamValue)("a",e,t,a),(0,n.getParamValue)("b",e,t,a))];case"Greater":return[s.greater((0,n.getParamValue)("a",e,t,a),(0,n.getParamValue)("b",e,t,a))];case"GreaterEqual":return[s.greaterEqual((0,n.getParamValue)("a",e,t,a),(0,n.getParamValue)("b",e,t,a))];case"Less":return[s.less((0,n.getParamValue)("a",e,t,a),(0,n.getParamValue)("b",e,t,a))];case"LessEqual":return[s.lessEqual((0,n.getParamValue)("a",e,t,a),(0,n.getParamValue)("b",e,t,a))];case"LogicalAnd":return[s.logicalAnd((0,n.getParamValue)("a",e,t,a),(0,n.getParamValue)("b",e,t,a))];case"LogicalNot":return[s.logicalNot((0,n.getParamValue)("a",e,t,a))];case"LogicalOr":return[s.logicalOr((0,n.getParamValue)("a",e,t,a),(0,n.getParamValue)("b",e,t,a))];case"Select":case"SelectV2":return[s.where((0,n.getParamValue)("condition",e,t,a),(0,n.getParamValue)("a",e,t,a),(0,n.getParamValue)("b",e,t,a))];case"BitwiseAnd":return[s.bitwiseAnd((0,n.getParamValue)("a",e,t,a),(0,n.getParamValue)("b",e,t,a))];default:throw TypeError(`Node type ${e.op} is not implemented`)}}}),x("7TMBo",function(e,t){a(e.exports,"executeOp",()=>s);var r=g("h8nZK"),n=g("9PnRL");let s=(e,t,a,s=r)=>{switch(e.op){case"BatchMatMul":case"BatchMatMulV2":case"MatMul":return[s.matMul((0,n.getParamValue)("a",e,t,a),(0,n.getParamValue)("b",e,t,a),(0,n.getParamValue)("transposeA",e,t,a),(0,n.getParamValue)("transposeB",e,t,a))];case"Einsum":return[s.einsum((0,n.getParamValue)("equation",e,t,a),...(0,n.getParamValue)("tensors",e,t,a))];case"Transpose":return[s.transpose((0,n.getParamValue)("x",e,t,a),(0,n.getParamValue)("perm",e,t,a))];case"_FusedMatMul":let[o,i]=(0,n.getParamValue)("fusedOps",e,t,a),l="prelu"===i,u=(0,n.getParamValue)("numArgs",e,t,a),p=(0,n.getParamValue)("leakyreluAlpha",e,t,a);if("biasadd"===o){if(l&&2!==u)throw Error("Fused MatMul with BiasAdd and Prelu must have two extra arguments: bias and alpha.");if(!l&&1!==u)throw Error("Fused MatMul with BiasAdd must have one extra argument: bias.")}let[d,c]=(0,n.getParamValue)("args",e,t,a);return[s.fused.matMul({a:(0,n.getParamValue)("a",e,t,a),b:(0,n.getParamValue)("b",e,t,a),transposeA:(0,n.getParamValue)("transposeA",e,t,a),transposeB:(0,n.getParamValue)("transposeB",e,t,a),bias:d,activation:i,preluActivationWeights:c,leakyreluAlpha:p})];case"MatrixBandPart":return[s.linalg.bandPart((0,n.getParamValue)("a",e,t,a),(0,n.getParamValue)("numLower",e,t,a),(0,n.getParamValue)("numUpper",e,t,a))];default:throw TypeError(`Node type ${e.op} is not implemented`)}}}),x("9lSzv",function(e,t){a(e.exports,"executeOp",()=>s);var r=g("h8nZK"),n=g("9PnRL");let s=(e,t,a,s=r)=>{switch(e.op){case"EuclideanNorm":return[s.euclideanNorm((0,n.getParamValue)("x",e,t,a),(0,n.getParamValue)("axis",e,t,a),(0,n.getParamValue)("keepDims",e,t,a))];case"FusedBatchNorm":case"FusedBatchNormV2":case"FusedBatchNormV3":return[s.batchNorm((0,n.getParamValue)("x",e,t,a),(0,n.getParamValue)("mean",e,t,a),(0,n.getParamValue)("variance",e,t,a),(0,n.getParamValue)("offset",e,t,a),(0,n.getParamValue)("scale",e,t,a),(0,n.getParamValue)("epsilon",e,t,a))];case"LRN":return[s.localResponseNormalization((0,n.getParamValue)("x",e,t,a),(0,n.getParamValue)("radius",e,t,a),(0,n.getParamValue)("bias",e,t,a),(0,n.getParamValue)("alpha",e,t,a),(0,n.getParamValue)("beta",e,t,a))];case"Softmax":return[s.softmax((0,n.getParamValue)("x",e,t,a))];case"LogSoftmax":return[s.logSoftmax((0,n.getParamValue)("x",e,t,a))];default:throw TypeError(`Node type ${e.op} is not implemented`)}}}),x("bPan9",function(e,t){a(e.exports,"executeOp",()=>s);var r=g("h8nZK"),n=g("9PnRL");let s=(e,t,a,s=r)=>{switch(e.op){case"RaggedGather":{let{outputNestedSplits:r,outputDenseValues:o}=s.raggedGather((0,n.getParamValue)("paramsNestedSplits",e,t,a),(0,n.getParamValue)("paramsDenseValues",e,t,a),(0,n.getParamValue)("indices",e,t,a),(0,n.getParamValue)("outputRaggedRank",e,t,a));return r.concat(o)}case"RaggedRange":{let{rtNestedSplits:r,rtDenseValues:o}=s.raggedRange((0,n.getParamValue)("starts",e,t,a),(0,n.getParamValue)("limits",e,t,a),(0,n.getParamValue)("splits",e,t,a));return[r,o]}case"RaggedTensorToTensor":return[s.raggedTensorToTensor((0,n.getParamValue)("shape",e,t,a),(0,n.getParamValue)("values",e,t,a),(0,n.getParamValue)("defaultValue",e,t,a),(0,n.getParamValue)("rowPartitionTensors",e,t,a),(0,n.getParamValue)("rowPartitionTypes",e,t,a))];default:throw TypeError(`Node type ${e.op} is not implemented`)}}}),x("bHY7p",function(e,t){a(e.exports,"executeOp",()=>s);var r=g("h8nZK"),n=g("9PnRL");let s=(e,t,a,s=r)=>{switch(e.op){case"Max":{let r=(0,n.getParamValue)("axis",e,t,a),o=(0,n.getParamValue)("keepDims",e,t,a);return[s.max((0,n.getParamValue)("x",e,t,a),r,o)]}case"Mean":{let r=(0,n.getParamValue)("axis",e,t,a),o=(0,n.getParamValue)("keepDims",e,t,a);return[s.mean((0,n.getParamValue)("x",e,t,a),r,o)]}case"Min":{let r=(0,n.getParamValue)("axis",e,t,a),o=(0,n.getParamValue)("keepDims",e,t,a);return[s.min((0,n.getParamValue)("x",e,t,a),r,o)]}case"Sum":{let r=(0,n.getParamValue)("axis",e,t,a),o=(0,n.getParamValue)("keepDims",e,t,a);return[s.sum((0,n.getParamValue)("x",e,t,a),r,o)]}case"All":{let r=(0,n.getParamValue)("axis",e,t,a),o=(0,n.getParamValue)("keepDims",e,t,a);return[s.all((0,n.getParamValue)("x",e,t,a),r,o)]}case"Any":{let r=(0,n.getParamValue)("axis",e,t,a),o=(0,n.getParamValue)("keepDims",e,t,a);return[s.any((0,n.getParamValue)("x",e,t,a),r,o)]}case"ArgMax":{let r=(0,n.getParamValue)("axis",e,t,a);return[s.argMax((0,n.getParamValue)("x",e,t,a),r)]}case"ArgMin":{let r=(0,n.getParamValue)("axis",e,t,a);return[s.argMin((0,n.getParamValue)("x",e,t,a),r)]}case"Prod":{let r=(0,n.getParamValue)("axis",e,t,a),o=(0,n.getParamValue)("keepDims",e,t,a);return[s.prod((0,n.getParamValue)("x",e,t,a),r,o)]}case"Cumprod":{let r=(0,n.getParamValue)("axis",e,t,a),o=(0,n.getParamValue)("exclusive",e,t,a),i=(0,n.getParamValue)("reverse",e,t,a);return[s.cumprod((0,n.getParamValue)("x",e,t,a),r,o,i)]}case"Cumsum":{let r=(0,n.getParamValue)("axis",e,t,a),o=(0,n.getParamValue)("exclusive",e,t,a),i=(0,n.getParamValue)("reverse",e,t,a);return[s.cumsum((0,n.getParamValue)("x",e,t,a),r,o,i)]}case"Bincount":let o=(0,n.getParamValue)("x",e,t,a),i=(0,n.getParamValue)("weights",e,t,a),l=(0,n.getParamValue)("size",e,t,a);return[s.bincount(o,i,l)];case"DenseBincount":{let r=(0,n.getParamValue)("x",e,t,a),o=(0,n.getParamValue)("weights",e,t,a),i=(0,n.getParamValue)("size",e,t,a),l=(0,n.getParamValue)("binaryOutput",e,t,a);return[s.denseBincount(r,o,i,l)]}default:throw TypeError(`Node type ${e.op} is not implemented`)}}}),x("9Buta",function(e,t){a(e.exports,"executeOp",()=>i),g("i64bB");var r=g("c2DT1"),n=g("jjNRA"),s=g("h8nZK"),o=g("9PnRL");let i=(e,t,a,i=s)=>{switch(e.op){case"ConcatV2":case"Concat":{let r=(0,o.getParamValue)("n",e,t,a),n=(0,o.getParamValue)("axis",e,t,a),s=(0,o.getParamValue)("tensors",e,t,a);return s=s.slice(0,r),[i.concat(s,n)]}case"Gather":{let r=(0,o.getParamValue)("x",e,t,a),n=(0,o.getParamValue)("indices",e,t,a);return[i.gather(r,i.cast(n,"int32"),0)]}case"GatherV2":{let r=(0,o.getParamValue)("axis",e,t,a),n=(0,o.getParamValue)("batchDims",e,t,a),s=(0,o.getParamValue)("x",e,t,a),l=(0,o.getParamValue)("indices",e,t,a);return[i.gather(s,i.cast(l,"int32"),r,n)]}case"Reverse":{let r=(0,o.getParamValue)("dims",e,t,a),n=[];for(let e=0;e<r.length;e++)r[e]&&n.push(e);let s=(0,o.getParamValue)("x",e,t,a);return[i.reverse(s,n)]}case"ReverseV2":{let r=(0,o.getParamValue)("axis",e,t,a),n=(0,o.getParamValue)("x",e,t,a);return[i.reverse(n,r)]}case"Slice":{let r=(0,o.getParamValue)("begin",e,t,a),n=(0,o.getParamValue)("size",e,t,a);return[i.slice((0,o.getParamValue)("x",e,t,a),r,n)]}case"StridedSlice":{let r=(0,o.getParamValue)("begin",e,t,a),n=(0,o.getParamValue)("end",e,t,a),s=(0,o.getParamValue)("strides",e,t,a),l=(0,o.getParamValue)("beginMask",e,t,a),u=(0,o.getParamValue)("endMask",e,t,a),p=(0,o.getParamValue)("ellipsisMask",e,t,a),d=(0,o.getParamValue)("newAxisMask",e,t,a),c=(0,o.getParamValue)("shrinkAxisMask",e,t,a),h=(0,o.getParamValue)("x",e,t,a);return[i.stridedSlice(h,r,n,s,l,u,p,d,c)]}case"Pack":return(0,r.tidy)(()=>{let r=(0,o.getParamValue)("axis",e,t,a),s=(0,o.getParamValue)("tensors",e,t,a),l=s[0].shape,u=i.squeeze(s[0]).shape,p=s.map(e=>{let t=n.arraysEqual(e.shape,l);if(!t&&!n.arraysEqual(i.squeeze(e).shape,u))throw Error("the input tensors shape does not match");return t?e:i.reshape(e,l)});return[i.stack(p,r)]});case"Unpack":{let r=(0,o.getParamValue)("axis",e,t,a),n=(0,o.getParamValue)("tensor",e,t,a);return i.unstack(n,r)}case"Tile":{let r=(0,o.getParamValue)("reps",e,t,a);return[i.tile((0,o.getParamValue)("x",e,t,a),r)]}case"Split":case"SplitV":{let r=(0,o.getParamValue)("axis",e,t,a),n=(0,o.getParamValue)("numOrSizeSplits",e,t,a),s=(0,o.getParamValue)("x",e,t,a);return i.split(s,n,r)}case"ScatterNd":{let r=(0,o.getParamValue)("indices",e,t,a),n=(0,o.getParamValue)("values",e,t,a),s=(0,o.getParamValue)("shape",e,t,a);return[i.scatterND(r,n,s)]}case"GatherNd":{let r=(0,o.getParamValue)("x",e,t,a),n=(0,o.getParamValue)("indices",e,t,a);return[i.gatherND(r,n)]}case"SparseToDense":{let r=(0,o.getParamValue)("sparseIndices",e,t,a),n=(0,o.getParamValue)("outputShape",e,t,a),s=(0,o.getParamValue)("sparseValues",e,t,a),l=(0,o.getParamValue)("defaultValue",e,t,a);return[i.sparseToDense(r,s,n,s.dtype===l.dtype?l:i.cast(l,s.dtype))]}case"TensorScatterUpdate":{let r=(0,o.getParamValue)("indices",e,t,a),n=(0,o.getParamValue)("values",e,t,a),s=(0,o.getParamValue)("tensor",e,t,a);return[i.tensorScatterUpdate(s,r,n)]}default:throw TypeError(`Node type ${e.op} is not implemented`)}}}),x("3pwdq",function(e,t){a(e.exports,"executeOp",()=>s);var r=g("h8nZK"),n=g("9PnRL");let s=(e,t,a,s=r)=>{switch(e.op){case"SparseFillEmptyRows":{let{outputIndices:r,outputValues:o,emptyRowIndicator:i,reverseIndexMap:l}=s.sparse.sparseFillEmptyRows((0,n.getParamValue)("indices",e,t,a),(0,n.getParamValue)("values",e,t,a),(0,n.getParamValue)("denseShape",e,t,a),(0,n.getParamValue)("defaultValue",e,t,a));return[r,o,i,l]}case"SparseReshape":{let{outputIndices:r,outputShape:o}=s.sparse.sparseReshape((0,n.getParamValue)("inputIndices",e,t,a),(0,n.getParamValue)("inputShape",e,t,a),(0,n.getParamValue)("newShape",e,t,a));return[r,o]}case"SparseSegmentMean":return[s.sparse.sparseSegmentMean((0,n.getParamValue)("data",e,t,a),(0,n.getParamValue)("indices",e,t,a),(0,n.getParamValue)("segmentIds",e,t,a))];case"SparseSegmentSum":return[s.sparse.sparseSegmentSum((0,n.getParamValue)("data",e,t,a),(0,n.getParamValue)("indices",e,t,a),(0,n.getParamValue)("segmentIds",e,t,a))];default:throw TypeError(`Node type ${e.op} is not implemented`)}}}),x("7RSIj",function(e,t){a(e.exports,"executeOp",()=>s);var r=g("h8nZK"),n=g("9PnRL");let s=(e,t,a,s=r)=>{switch(e.op){case"FFT":return[s.fft((0,n.getParamValue)("x",e,t,a))];case"IFFT":return[s.ifft((0,n.getParamValue)("x",e,t,a))];case"RFFT":return[s.rfft((0,n.getParamValue)("x",e,t,a))];case"IRFFT":return[s.irfft((0,n.getParamValue)("x",e,t,a))];default:throw TypeError(`Node type ${e.op} is not implemented`)}}}),x("j4Rla",function(e,t){a(e.exports,"executeOp",()=>s);var r=g("h8nZK"),n=g("9PnRL");let s=(e,t,a,s=r)=>{switch(e.op){case"StaticRegexReplace":return[s.string.staticRegexReplace((0,n.getParamValue)("input",e,t,a),(0,n.getParamValue)("pattern",e,t,a),(0,n.getParamValue)("rewrite",e,t,a),(0,n.getParamValue)("replaceGlobal",e,t,a))];case"StringNGrams":{let{nGrams:r,nGramsSplits:o}=s.string.stringNGrams((0,n.getParamValue)("data",e,t,a),(0,n.getParamValue)("dataSplits",e,t,a),(0,n.getParamValue)("separator",e,t,a),(0,n.getParamValue)("nGramWidths",e,t,a),(0,n.getParamValue)("leftPad",e,t,a),(0,n.getParamValue)("rightPad",e,t,a),(0,n.getParamValue)("padWidth",e,t,a),(0,n.getParamValue)("preserveShortSequences",e,t,a));return[r,o]}case"StringSplit":{let{indices:r,values:o,shape:i}=s.string.stringSplit((0,n.getParamValue)("input",e,t,a),(0,n.getParamValue)("delimiter",e,t,a),(0,n.getParamValue)("skipEmpty",e,t,a));return[r,o,i]}case"StringToHashBucketFast":return[s.string.stringToHashBucketFast((0,n.getParamValue)("input",e,t,a),(0,n.getParamValue)("numBuckets",e,t,a))];default:throw TypeError(`Node type ${e.op} is not implemented`)}}}),x("cXzgX",function(e,t){a(e.exports,"executeOp",()=>s);var r=g("h8nZK"),n=g("9PnRL");let s=(e,t,a,s=r)=>{switch(e.op){case"Cast":return[s.cast((0,n.getParamValue)("x",e,t,a),(0,n.getParamValue)("dtype",e,t,a))];case"ExpandDims":{let r=(0,n.getParamValue)("axis",e,t,a);return[s.expandDims((0,n.getParamValue)("x",e,t,a),r)]}case"Squeeze":{let r=(0,n.getParamValue)("axis",e,t,a);return[s.squeeze((0,n.getParamValue)("x",e,t,a),r)]}case"Reshape":return[s.reshape((0,n.getParamValue)("x",e,t,a),(0,n.getParamValue)("shape",e,t,a))];case"EnsureShape":return[s.ensureShape((0,n.getParamValue)("x",e,t,a),(0,n.getParamValue)("shape",e,t,a))];case"MirrorPad":return[s.mirrorPad((0,n.getParamValue)("x",e,t,a),(0,n.getParamValue)("padding",e,t,a),(0,n.getParamValue)("mode",e,t,a))];case"PadV2":case"Pad":return[s.pad((0,n.getParamValue)("x",e,t,a),(0,n.getParamValue)("padding",e,t,a),(0,n.getParamValue)("constantValue",e,t,a))];case"SpaceToBatchND":{let r=(0,n.getParamValue)("blockShape",e,t,a),o=(0,n.getParamValue)("paddings",e,t,a);return[s.spaceToBatchND((0,n.getParamValue)("x",e,t,a),r,o)]}case"BatchToSpaceND":{let r=(0,n.getParamValue)("blockShape",e,t,a),o=(0,n.getParamValue)("crops",e,t,a);return[s.batchToSpaceND((0,n.getParamValue)("x",e,t,a),r,o)]}case"DepthToSpace":{let r=(0,n.getParamValue)("blockSize",e,t,a),o=(0,n.getParamValue)("dataFormat",e,t,a).toUpperCase();return[s.depthToSpace((0,n.getParamValue)("x",e,t,a),r,o)]}case"BroadcastTo":return[s.broadcastTo((0,n.getParamValue)("x",e,t,a),(0,n.getParamValue)("shape",e,t,a))];case"BroadcastArgs":return[s.broadcastArgs((0,n.getParamValue)("s0",e,t,a),(0,n.getParamValue)("s1",e,t,a))];default:throw TypeError(`Node type ${e.op} is not implemented`)}}}),x("hv42p",function(e,t){a(e.exports,"ExecutionContext",()=>r);class r{constructor(e={},t={},r={},a={},n){this.weightMap=e,this.tensorArrayMap=t,this.tensorListMap=r,this.functionMap=a,this.parseNodeNameCache=n,this.rootContext={id:0,frameName:"",iterationId:0},this.contexts=[this.rootContext],this.lastId=0,this.generateCurrentContextIds()}newFrame(e,t){return{id:e,frameName:t,iterationId:0}}set currentContext(e){this.contexts!==e&&(this.contexts=e,this.generateCurrentContextIds())}get currentContext(){return this.contexts}get currentContextId(){return this._currentContextIds[0]}get currentContextIds(){return this._currentContextIds}generateCurrentContextIds(){let e=[];for(let t=0;t<this.contexts.length-1;t++){let r=this.contexts.slice(0,this.contexts.length-t);e.push(this.contextIdforContexts(r))}e.push(""),this._currentContextIds=e}contextIdforContexts(e){return e?e.map(e=>0===e.id&&0===e.iterationId?"":`${e.frameName}-${e.iterationId}`).join("/"):""}enterFrame(e){this.contexts&&(this.lastId++,this.contexts=this.contexts.slice(),this.contexts.push(this.newFrame(this.lastId,e)),this._currentContextIds.unshift(this.contextIdforContexts(this.contexts)))}exitFrame(){if(this.contexts&&this.contexts.length>1)this.contexts=this.contexts.slice(),this.contexts.splice(-1),this.currentContextIds.shift();else throw Error("Cannot exit frame, the context is empty")}nextIteration(){if(this.contexts&&this.contexts.length>0){this.contexts=this.contexts.slice(),this.lastId++;let e=Object.assign({},this.contexts[this.contexts.length-1]);e.iterationId+=1,e.id=this.lastId,this.contexts.splice(-1,1,e),this._currentContextIds.splice(0,1,this.contextIdforContexts(this.contexts))}else throw Error("Cannot increase frame iteration, the context is empty")}getWeight(e){return this.weightMap[e]}addTensorArray(e){this.tensorArrayMap[e.id]=e}getTensorArray(e){return this.tensorArrayMap[e]}addTensorList(e){this.tensorListMap[e.id]=e}getTensorList(e){return this.tensorListMap[e]}dispose(e){for(let t in this.tensorArrayMap)this.tensorArrayMap[t].clearAndClose(e);for(let t in this.tensorListMap)this.tensorListMap[t].clearAndClose(e)}}}),x("a96bd",function(e,t){a(e.exports,"getExecutionSubgraph",()=>n),a(e.exports,"isControlFlow",()=>d),a(e.exports,"getNodesInTopologicalOrder",()=>s),a(e.exports,"getNodeLiveUntilMap",()=>i);var r=g("9PnRL");function n(e,t,a,n){let s=new Set,o=[],i=null,l=null,c=new Set,h=new Set(Object.keys(e).map(e=>(0,r.parseNodeName)(e)[0])),f=new Set((n=n||[]).map(e=>(0,r.parseNodeName)(e.name)[0])),m=[...t];for(;m.length>0;){var g,x;let e=m.pop();if((d(e)||(g=e,u.has(g.op))||(x=e,p.has(x.op)))&&null==i&&(l=(i=e).children.map(e=>e.name).filter(e=>s.has(e))),s.add(e.name),!(null!=a[e.name]||h.has(e.name)||f.has(e.name))){if(0===e.inputs.length){o.push(e.name);continue}e.inputs.forEach(e=>{c.has(e.name)||(c.add(e.name),m.push(e))})}}return{inputs:e,outputs:t,usedNodes:s,missingInputs:o,dynamicNode:i,syncInputs:l}}function s(e,t){let{usedNodes:a,inputs:n}=t,s=Object.keys(n).map(e=>(0,r.parseNodeName)(e)[0]).map(t=>e.nodes[t]),i=e.initNodes||[],l=e=>a.has("string"==typeof e?e:e.name);function u(e){return[...new Map(e.map(e=>[e.name,e])).values()]}let p=u([...s,...e.weights,...i]).filter(l),d=u([...p,...Object.values(e.nodes)]).filter(l),c=new Map(d.map(e=>[e.name,e])),h={};for(let e of d)for(let t of(h[e.name]=h[e.name]||0,e.children))l(t)||(h[t.name]=Number.POSITIVE_INFINITY),h[t.name]=(h[t.name]||0)+1;let f=Object.entries(h).filter(([,e])=>0===e).map(([e])=>e),m=[...f];for(;f.length>0;){let e=f.pop();for(let t of c.get(e).children.filter(l))0==--h[t.name]&&(m.push(t.name),f.push(t.name))}let g=function(e,t){let r=new Map(e.map(e=>[e.name,e])),a=t.map(e=>e.name),n=new Set(a);for(;a.length>0;){let e=a.pop();for(let t of r.get(e).children)!r.has(t.name)||n.has(t.name)||(n.add(t.name),a.push(t.name))}return e.filter(e=>n.has(e.name))}(m.map(e=>c.get(e)),p);return function(e,t){let r=new Map(e.map((e,t)=>[e.name,t])),a=new Set(t.map(e=>e.name)),n=e=>a.has("string"==typeof e?e:e.name),s=new Set(e.map(e=>e.name)),i=e=>s.has("string"==typeof e?e:e.name);for(let t of e){for(let e of t.children.filter(i)){if(!r.has(e.name))throw new o(`Child ${e.name} of node ${t.name} is unreachable.`);if(r.get(t.name)>r.get(e.name))throw new o(`Node ${t.name} is scheduled to run after its child ${e.name}.`)}if(!n(t))for(let e of t.inputs){if(!r.has(e.name))throw new o(`Input ${e.name} of node ${t.name} is unreachable.`);if(r.get(e.name)>r.get(t.name))throw new o(`Node ${t.name} is scheduled to run before its input ${e.name}.`)}}}(g,p),g}class o extends Error{constructor(e){super(`NodesExecutionOrderError: ${e}`)}}function i(e){let t=new Map(e.map((e,t)=>[e.name,t])),r=Number.MAX_SAFE_INTEGER,a=e.map((e,t)=>d(e)?r:t),n=e=>{let r=a[t.get(e.name)];return null==r?-1:r},s=e.map((e,t)=>e.children.map(n).reduce((e,t)=>Math.max(e,t),a[t])),o=new Map;for(let t=0;t<e.length;++t){let a=s[t];if(a===r)continue;let n=e[t],i=e[a];o.has(i.name)||o.set(i.name,[]),o.get(i.name).push(n)}return o}let l=new Set(["Switch","Merge","Enter","Exit","NextIteration","StatelessIf","StatelessWhile","if","While"]),u=new Set(["NonMaxSuppressionV2","NonMaxSuppressionV3","NonMaxSuppressionV5","Where"]),p=new Set(["HashTable","HashTableV2","LookupTableImport","LookupTableImportV2","LookupTableFind","LookupTableFindV2","LookupTableSize","LookupTableSizeV2"]);function d(e){return l.has(e.op)}}),x("kqYp1",function(e,t){a(e.exports,"ResourceManager",()=>r);class r{constructor(e={},t={}){this.hashTableNameToHandle=e,this.hashTableMap=t}addHashTable(e,t){this.hashTableNameToHandle[e]=t.handle,this.hashTableMap[t.id]=t}getHashTableHandleByName(e){return this.hashTableNameToHandle[e]}getHashTableById(e){return this.hashTableMap[e]}dispose(){for(let e in this.hashTableMap)this.hashTableMap[e].clearAndClose(),delete this.hashTableMap[e];for(let e in this.hashTableNameToHandle)this.hashTableNameToHandle[e].dispose(),delete this.hashTableNameToHandle[e]}}}),x("1SddR",function(e,t){a(e.exports,"version",()=>r);let r="4.22.0"});var y={};(function(e,t,r){let a={1:{name:"/m/01g317",id:1,displayName:"person"},2:{name:"/m/0199g",id:2,displayName:"bicycle"},3:{name:"/m/0k4j",id:3,displayName:"car"},4:{name:"/m/04_sv",id:4,displayName:"motorcycle"},5:{name:"/m/05czz6l",id:5,displayName:"airplane"},6:{name:"/m/01bjv",id:6,displayName:"bus"},7:{name:"/m/07jdr",id:7,displayName:"train"},8:{name:"/m/07r04",id:8,displayName:"truck"},9:{name:"/m/019jd",id:9,displayName:"boat"},10:{name:"/m/015qff",id:10,displayName:"traffic light"},11:{name:"/m/01pns0",id:11,displayName:"fire hydrant"},13:{name:"/m/02pv19",id:13,displayName:"stop sign"},14:{name:"/m/015qbp",id:14,displayName:"parking meter"},15:{name:"/m/0cvnqh",id:15,displayName:"bench"},16:{name:"/m/015p6",id:16,displayName:"bird"},17:{name:"/m/01yrx",id:17,displayName:"cat"},18:{name:"/m/0bt9lr",id:18,displayName:"dog"},19:{name:"/m/03k3r",id:19,displayName:"horse"},20:{name:"/m/07bgp",id:20,displayName:"sheep"},21:{name:"/m/01xq0k1",id:21,displayName:"cow"},22:{name:"/m/0bwd_0j",id:22,displayName:"elephant"},23:{name:"/m/01dws",id:23,displayName:"bear"},24:{name:"/m/0898b",id:24,displayName:"zebra"},25:{name:"/m/03bk1",id:25,displayName:"giraffe"},27:{name:"/m/01940j",id:27,displayName:"backpack"},28:{name:"/m/0hnnb",id:28,displayName:"umbrella"},31:{name:"/m/080hkjn",id:31,displayName:"handbag"},32:{name:"/m/01rkbr",id:32,displayName:"tie"},33:{name:"/m/01s55n",id:33,displayName:"suitcase"},34:{name:"/m/02wmf",id:34,displayName:"frisbee"},35:{name:"/m/071p9",id:35,displayName:"skis"},36:{name:"/m/06__v",id:36,displayName:"snowboard"},37:{name:"/m/018xm",id:37,displayName:"sports ball"},38:{name:"/m/02zt3",id:38,displayName:"kite"},39:{name:"/m/03g8mr",id:39,displayName:"baseball bat"},40:{name:"/m/03grzl",id:40,displayName:"baseball glove"},41:{name:"/m/06_fw",id:41,displayName:"skateboard"},42:{name:"/m/019w40",id:42,displayName:"surfboard"},43:{name:"/m/0dv9c",id:43,displayName:"tennis racket"},44:{name:"/m/04dr76w",id:44,displayName:"bottle"},46:{name:"/m/09tvcd",id:46,displayName:"wine glass"},47:{name:"/m/08gqpm",id:47,displayName:"cup"},48:{name:"/m/0dt3t",id:48,displayName:"fork"},49:{name:"/m/04ctx",id:49,displayName:"knife"},50:{name:"/m/0cmx8",id:50,displayName:"spoon"},51:{name:"/m/04kkgm",id:51,displayName:"bowl"},52:{name:"/m/09qck",id:52,displayName:"banana"},53:{name:"/m/014j1m",id:53,displayName:"apple"},54:{name:"/m/0l515",id:54,displayName:"sandwich"},55:{name:"/m/0cyhj_",id:55,displayName:"orange"},56:{name:"/m/0hkxq",id:56,displayName:"broccoli"},57:{name:"/m/0fj52s",id:57,displayName:"carrot"},58:{name:"/m/01b9xk",id:58,displayName:"hot dog"},59:{name:"/m/0663v",id:59,displayName:"pizza"},60:{name:"/m/0jy4k",id:60,displayName:"donut"},61:{name:"/m/0fszt",id:61,displayName:"cake"},62:{name:"/m/01mzpv",id:62,displayName:"chair"},63:{name:"/m/02crq1",id:63,displayName:"couch"},64:{name:"/m/03fp41",id:64,displayName:"potted plant"},65:{name:"/m/03ssj5",id:65,displayName:"bed"},67:{name:"/m/04bcr3",id:67,displayName:"dining table"},70:{name:"/m/09g1w",id:70,displayName:"toilet"},72:{name:"/m/07c52",id:72,displayName:"tv"},73:{name:"/m/01c648",id:73,displayName:"laptop"},74:{name:"/m/020lf",id:74,displayName:"mouse"},75:{name:"/m/0qjjc",id:75,displayName:"remote"},76:{name:"/m/01m2v",id:76,displayName:"keyboard"},77:{name:"/m/050k8",id:77,displayName:"cell phone"},78:{name:"/m/0fx9l",id:78,displayName:"microwave"},79:{name:"/m/029bxz",id:79,displayName:"oven"},80:{name:"/m/01k6s3",id:80,displayName:"toaster"},81:{name:"/m/0130jx",id:81,displayName:"sink"},82:{name:"/m/040b_t",id:82,displayName:"refrigerator"},84:{name:"/m/0bt_c3",id:84,displayName:"book"},85:{name:"/m/01x3z",id:85,displayName:"clock"},86:{name:"/m/02s195",id:86,displayName:"vase"},87:{name:"/m/01lsmm",id:87,displayName:"scissors"},88:{name:"/m/0kmg4",id:88,displayName:"teddy bear"},89:{name:"/m/03wvsk",id:89,displayName:"hair drier"},90:{name:"/m/012xff",id:90,displayName:"toothbrush"}};class n{constructor(e,t){this.modelPath=t||`https://storage.googleapis.com/tfjs-models/savedmodel/${this.getPrefix(e)}/model.json`}getPrefix(e){return"lite_mobilenet_v2"===e?`ssd${e}`:`ssd_${e}`}async load(){this.model=await t.loadGraphModel(this.modelPath);let e=r.zeros([1,300,300,3],"int32"),a=await this.model.executeAsync(e);await Promise.all(a.map(e=>e.data())),a.map(e=>e.dispose()),e.dispose()}async infer(e,t,a){let n=r.tidy(()=>(e instanceof r.Tensor||(e=r.browser.fromPixels(e)),r.expandDims(e))),s=n.shape[1],o=n.shape[2],i=await this.model.executeAsync(n),l=i[0].dataSync(),u=i[1].dataSync();n.dispose(),r.dispose(i);let[p,d]=this.calculateMaxScores(l,i[0].shape[1],i[0].shape[2]),c=r.getBackend();"webgl"===r.getBackend()&&r.setBackend("cpu");let h=r.tidy(()=>{let e=r.tensor2d(u,[i[1].shape[1],i[1].shape[3]]);return r.image.nonMaxSuppression(e,p,t,a,a)}),f=h.dataSync();return h.dispose(),c!==r.getBackend()&&r.setBackend(c),this.buildDetectedObjects(o,s,u,p,f,d)}buildDetectedObjects(e,t,r,n,s,o){let i=s.length,l=[];for(let u=0;u<i;u++){let i=[];for(let e=0;e<4;e++)i[e]=r[4*s[u]+e];let p=i[0]*t,d=i[1]*e,c=i[2]*t,h=i[3]*e;i[0]=d,i[1]=p,i[2]=h-d,i[3]=c-p,l.push({bbox:i,class:a[o[s[u]]+1].displayName,score:n[s[u]]})}return l}calculateMaxScores(e,t,r){let a=[],n=[];for(let s=0;s<t;s++){let t=Number.MIN_VALUE,o=-1;for(let a=0;a<r;a++)e[s*r+a]>t&&(t=e[s*r+a],o=a);a[s]=t,n[s]=o}return[a,n]}async detect(e,t=20,r=.5){return this.infer(e,t,r)}dispose(){null!=this.model&&this.model.dispose()}}e.ObjectDetection=n,e.load=async function(e={}){if(null==r)throw Error("Cannot find TensorFlow.js. If you are using a <script> tag, please also include @tensorflow/tfjs on the page before using this model.");let t=e.base||"lite_mobilenet_v2",a=e.modelUrl;if(-1===["mobilenet_v1","mobilenet_v2","lite_mobilenet_v2"].indexOf(t))throw Error(`ObjectDetection constructed with invalid base model ${t}. Valid names are 'mobilenet_v1', 'mobilenet_v2' and 'lite_mobilenet_v2'.`);let s=new n(t,a);return await s.load(),s},e.version="2.2.3",Object.defineProperty(e,"__esModule",{value:!0})})(y,g("40l72"),g("i64bB")),g("i64bB");var b=g("c2DT1");g("i64bB");var v=g("7MaPk"),N=g("iG87S"),k=g("fJqML"),b=g("c2DT1"),T=g("ibsdL"),S=g("lzjc8"),I=g("jjNRA");g("i64bB");var I=g("jjNRA");function w(e,t){Array.isArray(e)||(e=[e]),e.forEach(e=>{null!=e&&I.assert("complex64"!==e.dtype,()=>`${t} does not support complex64 tensors in the CPU backend.`)})}const C=S.whereImpl;class E extends k.KernelBackend{nextDataId(){return E.nextDataId++}constructor(){super(),this.blockSize=48,this.firstUse=!0,this.data=new(0,k.DataStorage)(this,(0,b.engine)())}write(e,t,r){this.firstUse&&(this.firstUse=!1,(0,T.env)().get("IS_NODE")&&v.warn("\n============================\nHi, looks like you are running TensorFlow.js in Node.js. To speed things up dramatically, install our node backend, visit https://github.com/tensorflow/tfjs-node for more details. \n============================"));let a={id:this.nextDataId()};return this.data.set(a,{values:e,dtype:r,refCount:1}),a}makeTensorInfo(e,t,r){let a;if("string"===t&&null!=r&&r.length>0&&I.isString(r[0])){let n=r.map(e=>I.encodeString(e));a=this.write(n,e,t)}else a=this.write(r,e,t);return{dataId:a,shape:e,dtype:t}}refCount(e){return this.data.has(e)?this.data.get(e).refCount:0}incRef(e){let t=this.data.get(e);t.refCount++}decRef(e){if(this.data.has(e)){let t=this.data.get(e);t.refCount--}}move(e,t,r,a,n){this.data.set(e,{values:t,dtype:a,refCount:n})}numDataIds(){return this.data.numDataIds()}async read(e){return this.readSync(e)}readSync(e){let{dtype:t,complexTensorInfos:r}=this.data.get(e);if("complex64"===t){let e=this.readSync(r.real.dataId),t=this.readSync(r.imag.dataId);return v.mergeRealAndImagArrays(e,t)}return I.convertBackendValuesAndArrayBuffer(this.data.get(e).values,t)}bufferSync(e){let t=this.readSync(e.dataId);if("string"===e.dtype)try{let r=t.map(e=>I.decodeString(e));return(0,N.buffer)(e.shape,e.dtype,r)}catch(e){throw Error("Failed to decode encoded string bytes into utf-8")}return(0,N.buffer)(e.shape,e.dtype,t)}makeOutput(e,t,r){return(0,b.engine)().makeTensorFromTensorInfo(this.makeTensorInfo(t,r,e),this)}disposeData(e,t=!1){if(this.data.has(e)){if(this.data.get(e).refCount--,!t&&this.data.get(e).refCount>0)return!1;let{complexTensorInfos:r}=this.data.get(e);null!=r&&(this.disposeData(r.real.dataId,!0),this.disposeData(r.imag.dataId,!0)),this.data.delete(e)}return!0}disposeIntermediateTensorInfo(e){this.disposeData(e.dataId)}async time(e){let t=I.now();return e(),{kernelMs:I.now()-t}}memory(){return{unreliable:!0,reasons:["The reported memory is an upper bound. Due to automatic garbage collection, the true allocated memory may be less."]}}where(e){w([e],"where");let t=this.readSync(e.dataId);return C(e.shape,t)}dispose(){}floatPrecision(){return 32}epsilon(){return super.epsilon()}}E.nextDataId=0,(0,b.registerBackend)("cpu",()=>new E,1),g("i64bB");var A=g("eky5o");g("i64bB");var $=g("hl418");g("i64bB");var $=g("hl418");g("i64bB");var v=g("7MaPk");g("i64bB");var I=g("jjNRA");function R(e){return(t,r,a)=>{let n=I.getArrayFromDType(r,t.length);for(let r=0;r<t.length;++r)n[r]=e(t[r],a);return n}}function P(e,t,r){return B(e,R(t),r)}function B(e,t,r){return({inputs:a,attrs:n,backend:s})=>{let o,{x:i}=a;w(i,e);let l=s.data.get(i.dataId).values;if("string"===i.dtype){if(!Array.isArray(l))throw Error("String tensor's value was not an instance of Array");o=v.fromUint8ToStringArray(l)}else o=l;let u=r||i.dtype,p=t(o,u,n);return s.makeTensorInfo(i.shape,u,p)}}const F=P($.Elu,e=>e>=0?e:Math.exp(e)-1),O={kernelName:$.Elu,backendName:"cpu",kernelFunc:F};g("i64bB");var $=g("hl418");function M(e){let{inputs:t,backend:r}=e,{x:a}=t;return r.incRef(a.dataId),{dataId:a.dataId,shape:a.shape,dtype:a.dtype}}const D={kernelName:$.Identity,backendName:"cpu",kernelFunc:M};g("i64bB");var $=g("hl418"),I=g("jjNRA");function _(e){let{inputs:t,backend:r,attrs:a}=e,{x:n}=t,{alpha:s}=a;w([n],"leakyRelu");let o=I.sizeFromShape(n.shape),i=r.data.get(n.dataId).values,l=I.getTypedArrayFromDType("float32",o);for(let e=0;e<i.length;e++)l[e]=i[e]<0?s*i[e]:i[e];return r.makeTensorInfo(n.shape,"float32",l)}const L={kernelName:$.LeakyRelu,backendName:"cpu",kernelFunc:_};g("i64bB");var $=g("hl418");g("i64bB");var v=g("7MaPk"),I=g("jjNRA");function V(e){return(t,r,a,n,s)=>{let o=v.assertAndGetBroadcastShape(t,r),i=o.length,l=I.computeStrides(o),u=I.sizeFromShape(o),p=I.getTypedArrayFromDType(s,u),d=t.length,c=r.length,h=I.computeStrides(t),f=I.computeStrides(r),m=v.getBroadcastDims(t,o),g=v.getBroadcastDims(r,o);if(m.length+g.length===0)for(let t=0;t<p.length;++t)p[t]=e(a[t%a.length],n[t%n.length]);else for(let t=0;t<p.length;++t){let r=I.indexToLoc(t,i,l),s=r.slice(-d);m.forEach(e=>s[e]=0);let o=I.locToIndex(s,d,h),u=r.slice(-c);g.forEach(e=>u[e]=0);let x=I.locToIndex(u,c,f);p[t]=e(a[o],n[x])}return[p,o]}}const G=V((e,t)=>e<0?t*e:e);function W(e){let{inputs:t,backend:r}=e,{x:a,alpha:n}=t;w([a,n],"prelu");let s=r.data.get(a.dataId).values,o=r.data.get(n.dataId).values,[i,l]=G(a.shape,n.shape,s,o,"float32");return r.makeTensorInfo(l,"float32",i)}const z={kernelName:$.Prelu,backendName:"cpu",kernelFunc:W};g("i64bB");var $=g("hl418");const j=P($.Relu,e=>Math.max(0,e)),U={kernelName:$.Relu,backendName:"cpu",kernelFunc:j};g("i64bB");var $=g("hl418");const q=P($.Relu6,e=>Math.min(Math.max(0,e),6)),H={kernelName:$.Relu6,backendName:"cpu",kernelFunc:q};g("i64bB");var $=g("hl418");const K=R(e=>1/(1+Math.exp(-e))),X=P($.Sigmoid,e=>1/(1+Math.exp(-e))),Z={kernelName:$.Sigmoid,backendName:"cpu",kernelFunc:X};function Y(e,t,r,a,n){if("linear"===r)return M({inputs:{x:t},backend:e});if("relu"===r)return j({inputs:{x:t},backend:e});if("elu"===r)return F({inputs:{x:t},backend:e});if("relu6"===r)return q({inputs:{x:t},backend:e});if("prelu"===r)return W({inputs:{x:t,alpha:a},backend:e});else if("leakyrelu"===r)return _({inputs:{x:t},backend:e,attrs:{alpha:n}});else if("sigmoid"===r)return X({inputs:{x:t},backend:e});throw Error(`Activation ${r} has not been implemented for the CPU backend.`)}g("i64bB");var $=g("hl418");g("i64bB");var v=g("7MaPk"),I=g("jjNRA");g("i64bB");var $=g("hl418"),I=g("jjNRA");g("i64bB");var I=g("jjNRA");g("i64bB");var $=g("hl418");function Q(e){let{inputs:t,backend:r}=e,{real:a,imag:n}=t,s=r.data.get(a.dataId).values,o=r.data.get(n.dataId).values,i=r.makeTensorInfo(a.shape,"complex64");return r.data.get(i.dataId).complexTensorInfos={real:r.makeTensorInfo(a.shape,"float32",s),imag:r.makeTensorInfo(n.shape,"float32",o)},i}const J={kernelName:$.Complex,backendName:"cpu",kernelFunc:Q};function ee(e,t,r="float32"){if("complex64"===r)return Q({inputs:{real:ee(e,t,"float32"),imag:ee(e,t,"float32")},backend:e});let a=I.makeZerosTypedArray(I.sizeFromShape(t),r);return e.makeTensorInfo(t,r,a)}g("i64bB");var $=g("hl418");function et(e){let{inputs:t,backend:r}=e,{input:a}=t,n=r.data.get(a.dataId).complexTensorInfos.real,s=r.data.get(n.dataId).values;return r.makeTensorInfo(n.shape,n.dtype,s)}const er={kernelName:$.Real,backendName:"cpu",kernelFunc:et};function ea(e,t,r,a){if("int32"===a)return[t,"int32",Int32Array.from(e)];if("bool"===a){let a=I.toTypedArray([0],r),[n,s]=V((e,t)=>+(e!==t))(t,[],e,a,"bool");return[s,"bool",n]}throw Error(`Error in Cast: failed to cast ${r} to ${a}`)}function en(e){let{inputs:t,backend:r,attrs:a}=e,{x:n}=t,{dtype:s}=a;if("complex64"===s){if("complex64"===n.dtype)return M({inputs:{x:n},backend:r});let e=ee(r,n.shape,n.dtype),t=en({inputs:{x:n},backend:r,attrs:{dtype:"float32"}}),a=Q({inputs:{real:t,imag:e},backend:r});return r.disposeIntermediateTensorInfo(e),r.disposeIntermediateTensorInfo(t),a}if("complex64"===n.dtype){let e=et({inputs:{input:n},backend:r}),t=en({inputs:{x:e},backend:r,attrs:{dtype:s}});return r.disposeIntermediateTensorInfo(e),t}if(!I.hasEncodingLoss(n.dtype,s)){let e=M({inputs:{x:n},backend:r});return{dataId:e.dataId,shape:e.shape,dtype:s}}let[o,i,l]=ea(r.data.get(n.dataId).values,n.shape,n.dtype,s);return r.makeTensorInfo(o,i,l)}const es={kernelName:$.Cast,backendName:"cpu",kernelFunc:en};function eo(e,t,r,a){return null==r?({inputs:r,backend:n})=>{let{a:s,b:o}=r;w([s,o],e);let i=n.data.get(s.dataId).values,l=n.data.get(o.dataId).values,u="string"===s.dtype?v.fromUint8ToStringArray(i):i,p="string"===s.dtype?v.fromUint8ToStringArray(l):l,d=a||s.dtype,[c,h]=t(s.shape,o.shape,u,p,d);return n.makeTensorInfo(h,d,c)}:({inputs:e,backend:n})=>{let{a:s,b:o}=e;if("complex64"===s.dtype||"complex64"===o.dtype){let e=en({inputs:{x:s},backend:n,attrs:{dtype:"complex64"}}),t=n.data.get(e.dataId),a=t.complexTensorInfos.real,i=t.complexTensorInfos.imag,l=n.data.get(a.dataId).values,u=n.data.get(i.dataId).values,p=en({inputs:{x:o},backend:n,attrs:{dtype:"complex64"}}),d=n.data.get(p.dataId),c=d.complexTensorInfos.real,h=d.complexTensorInfos.imag,f=n.data.get(c.dataId).values,m=n.data.get(h.dataId).values,[g,x,y]=r(s.shape,o.shape,l,u,f,m),b=n.makeTensorInfo(y,"float32",g),v=n.makeTensorInfo(y,"float32",x),N=Q({inputs:{real:b,imag:v},backend:n});return n.disposeIntermediateTensorInfo(e),n.disposeIntermediateTensorInfo(p),n.disposeIntermediateTensorInfo(b),n.disposeIntermediateTensorInfo(v),N}{let e=n.data.get(s.dataId).values,r=n.data.get(o.dataId).values,i=a||s.dtype,[l,u]=t(s.shape,o.shape,e,r,i);return n.makeTensorInfo(u,i,l)}}}function ei(e){return(t,r,a,n,s,o)=>{let i=v.assertAndGetBroadcastShape(t,r),l=I.sizeFromShape(i),u=i.length,p=I.computeStrides(i),d=I.getTypedArrayFromDType("float32",l),c=I.getTypedArrayFromDType("float32",l),h=v.getBroadcastDims(t,i),f=v.getBroadcastDims(r,i),m=v.mergeRealAndImagArrays(a,n),g=v.mergeRealAndImagArrays(s,o),x=t.length,y=I.computeStrides(t),b=r.length,N=I.computeStrides(r);if(h.length+f.length===0)for(let t=0;t<d.length;t++){let r=t%m.length,a=t%g.length,n=e(m[2*r],m[2*r+1],g[2*a],g[2*a+1]);d[t]=n.real,c[t]=n.imag}else for(let t=0;t<d.length;t++){let r=I.indexToLoc(t,u,p),a=r.slice(-x);h.forEach(e=>a[e]=0);let n=I.locToIndex(a,x,y),s=r.slice(-b);f.forEach(e=>s[e]=0);let o=I.locToIndex(s,b,N),i=e(m[2*n],m[2*n+1],g[2*o],g[2*o+1]);d[t]=i.real,c[t]=i.imag}return[d,c,i]}}const el=V((e,t)=>e+t),eu=ei((e,t,r,a)=>({real:e+r,imag:t+a})),ep=eo($.Add,el,eu),ed={kernelName:$.Add,backendName:"cpu",kernelFunc:ep};g("i64bB");var $=g("hl418"),ec=g("8BaGO"),N=g("iG87S"),I=g("jjNRA");g("i64bB");var $=g("hl418"),I=g("jjNRA");function eh(e){let{inputs:t,backend:r,attrs:a}=e,{x:n}=t,{shape:s}=a,o=I.sizeFromShape(n.shape),i=I.inferFromImplicitShape(s,o),l=I.sizeFromShape(i);I.assert(o===l,()=>`The new shape (${i}) has ${l} elements and the old shape (${n.shape}) has ${o} elements. The new shape and old shape must have the same number of elements.`),r.incRef(n.dataId);let u=r.data.get(n.dataId);if(null!=u.complexTensorInfos){let e=u.complexTensorInfos.real,t=u.complexTensorInfos.imag;e.shape=i,t.shape=i}return{dataId:n.dataId,shape:i,dtype:n.dtype}}const ef={kernelName:$.Reshape,backendName:"cpu",kernelFunc:eh};function em(e){let{inputs:t,backend:r,attrs:a}=e,{a:n,b:s}=t,{transposeA:o,transposeB:i}=a;w([n,s],"matMul");let l=n.shape.length,u=s.shape.length,p=o?n.shape[l-2]:n.shape[l-1],d=i?s.shape[u-1]:s.shape[u-2],c=o?n.shape[l-1]:n.shape[l-2],h=i?s.shape[u-2]:s.shape[u-1],f=n.shape.slice(0,-2),m=s.shape.slice(0,-2),g=I.sizeFromShape(f),x=I.sizeFromShape(m),y=ec.assertAndGetBroadcastShape(n.shape.slice(0,-2),s.shape.slice(0,-2)).concat([c,h]);I.assert(p===d,()=>`Error in matMul: inner shapes (${p}) and (${d}) of Tensors with shapes ${n.shape} and ${s.shape} and transposeA=${o} and transposeB=${i} must match.`);let b=eh({inputs:{x:n},backend:r,attrs:{shape:o?[g,p,c]:[g,c,p]}}),v=eh({inputs:{x:s},backend:r,attrs:{shape:i?[x,h,d]:[x,d,h]}}),k=o?b.shape[1]:b.shape[2],T=o?b.shape[2]:b.shape[1],S=i?v.shape[1]:v.shape[2],C=Math.max(g,x),E=r.data.get(b.dataId).values,A=r.data.get(v.dataId).values,$=I.computeStrides(b.shape),R=I.computeStrides(v.shape),[P,B,F]=o?[$[0],1,$[1]]:[$[0],$[1],1],[O,M,D]=i?[1,R[1],R[0]]:[R[1],1,R[0]],_=T*S,L=(0,N.buffer)([C,T,S],b.dtype),V=L.values,G=r.blockSize;for(let e=0;e<C;e++){let t=e%g,r=e%x;for(let a=0;a<T;a+=G){let n=Math.min(a+G,T);for(let s=0;s<S;s+=G){let o=Math.min(s+G,S);for(let i=0;i<k;i+=G){let l=Math.min(i+G,k);for(let u=a;u<n;u++)for(let a=s;a<o;a++){let n=0;for(let e=i;e<l;e++)n+=E[t*P+u*B+e*F]*A[e*O+a*M+r*D];V[e*_+(u*S+a)]+=n}}}}}return r.disposeIntermediateTensorInfo(b),r.disposeIntermediateTensorInfo(v),r.makeTensorInfo(y,L.dtype,L.values)}const eg={kernelName:$.BatchMatMul,backendName:"cpu",kernelFunc:em},ex={kernelName:$._FusedMatMul,backendName:"cpu",kernelFunc:function(e){let t,r,a,{inputs:n,backend:s,attrs:o}=e,{a:i,b:l,bias:u,preluActivationWeights:p}=n,{transposeA:d,transposeB:c,activation:h,leakyreluAlpha:f}=o,m=[];for(let e of(t=em({inputs:{a:i,b:l},attrs:{transposeA:d,transposeB:c},backend:s}),u&&(r=ep({inputs:{a:t,b:u},backend:s}),m.push(t),t=r),h&&(a=Y(s,t,h,p,f),m.push(t),t=a),m))s.disposeIntermediateTensorInfo(e);return t}};g("i64bB");var $=g("hl418"),I=g("jjNRA");function ey(e){let t=new Float32Array(e.length);for(let r=0;r<e.length;++r)t[r]=Math.abs(e[r]);return t}const eb={kernelName:$.Abs,backendName:"cpu",kernelFunc:e=>{let{x:t}=e.inputs,r=e.backend;w(t,"abs");let a=new Float32Array(I.sizeFromShape(t.shape));return a=ey(r.data.get(t.dataId).values),r.makeOutput(a,t.shape,t.dtype)}};g("i64bB");var $=g("hl418");const ev=P($.Acos,e=>Math.acos(e)),eN={kernelName:$.Acos,backendName:"cpu",kernelFunc:ev};g("i64bB");var $=g("hl418");const ek=P($.Acosh,e=>Math.acosh(e)),eT={kernelName:$.Acosh,backendName:"cpu",kernelFunc:ek};g("i64bB");var $=g("hl418"),N=g("iG87S");const eS={kernelName:$.AddN,backendName:"cpu",kernelFunc:function(e){let{inputs:t,backend:r}=e;w(t,"addN");let a=t.map(e=>r.data.get(e.dataId).values),n=(0,N.buffer)(t[0].shape,t[0].dtype),s=n.values;for(let e=0;e<t.length;e++){let t=a[e];for(let e=0;e<s.length;e++)s[e]+=t[e]}return r.makeTensorInfo(n.shape,n.dtype,n.values)}};g("i64bB");var $=g("hl418"),v=g("7MaPk"),I=g("jjNRA");g("i64bB");var $=g("hl418");g("i64bB");var I=g("jjNRA");function eI(e,t,r,a,n){let s=t.length,o=I.sizeFromShape(t),i=I.computeStrides(t),l=I.computeStrides(n),u=I.getTypedArrayFromDType(r,I.sizeFromShape(n));for(let t=0;t<o;++t){let r=I.indexToLoc(t,s,i),n=Array(r.length);for(let e=0;e<n.length;e++)n[e]=r[a[e]];u[I.locToIndex(n,s,l)]=e[t]}return u}function ew(e){let{inputs:t,attrs:r,backend:a}=e,{x:n}=t,{perm:s}=r;w(n,"transpose");let o=Array(n.shape.length);for(let e=0;e<o.length;e++)o[e]=n.shape[s[e]];let i=eI(a.data.get(n.dataId).values,n.shape,n.dtype,s,o);return{dataId:a.write(i,o,n.dtype),shape:o,dtype:n.dtype}}const eC={kernelName:$.Transpose,backendName:"cpu",kernelFunc:ew},eE={kernelName:$.All,backendName:"cpu",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{x:n}=t,{axis:s,keepDims:o}=a;w(n,"all");let i=I.parseAxisParam(s,n.shape),l=i,u=v.getAxesPermutation(l,n.shape.length),p=n;null!=u&&(p=ew({inputs:{x:n},backend:r,attrs:{perm:u}}),l=v.getInnerMostAxes(l.length,n.shape.length)),v.assertAxesAreInnerMostDims("all",l,p.shape.length);let[d,c]=v.computeOutAndReduceShapes(p.shape,l),h=I.sizeFromShape(c),f=I.makeZerosTypedArray(I.sizeFromShape(d),p.dtype),m=r.data.get(p.dataId).values;for(let e=0;e<f.length;++e){let t=e*h,r=m[t];for(let e=0;e<h;++e){let a=m[t+e];r=r&&a}f[e]=r}null!=u&&r.disposeIntermediateTensorInfo(p);let g=r.makeTensorInfo(d,p.dtype,f);if(o){let e=eh({inputs:{x:g},backend:r,attrs:{shape:v.expandShapeToKeepDim(d,i)}});return r.disposeIntermediateTensorInfo(g),e}return g}};g("i64bB");var $=g("hl418"),v=g("7MaPk"),I=g("jjNRA");const eA={kernelName:$.Any,backendName:"cpu",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{x:n}=t,{axis:s,keepDims:o}=a;w(n,"any");let i=I.parseAxisParam(s,n.shape),l=i,u=v.getAxesPermutation(l,n.shape.length),p=n;null!=u&&(p=ew({inputs:{x:n},backend:r,attrs:{perm:u}}),l=v.getInnerMostAxes(l.length,n.shape.length)),v.assertAxesAreInnerMostDims("any",l,p.shape.length);let[d,c]=v.computeOutAndReduceShapes(p.shape,l),h=I.sizeFromShape(c),f=I.makeZerosTypedArray(I.sizeFromShape(d),p.dtype),m=r.data.get(p.dataId).values;for(let e=0;e<f.length;++e){let t=e*h,r=m[t];for(let e=0;e<h;++e){let a=m[t+e];r=r||a}f[e]=r}null!=u&&r.disposeIntermediateTensorInfo(p);let g=r.makeTensorInfo(d,p.dtype,f);if(o){let e=eh({inputs:{x:g},backend:r,attrs:{shape:v.expandShapeToKeepDim(d,i)}});return r.disposeIntermediateTensorInfo(g),e}return g}};g("i64bB");var $=g("hl418"),v=g("7MaPk"),I=g("jjNRA");const e$={kernelName:$.ArgMax,backendName:"cpu",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{x:n}=t,{axis:s}=a;w(n,"argMax");let o=I.parseAxisParam(s,n.shape),i=v.getAxesPermutation(o,n.shape.length),l=n,u=[];null!=i&&(u.push(l=ew({inputs:{x:n},backend:r,attrs:{perm:i}})),o=v.getInnerMostAxes(o.length,l.shape.length)),o=[o[0]],v.assertAxesAreInnerMostDims("argMax",o,l.shape.length);let[p,d]=v.computeOutAndReduceShapes(l.shape,o),c=I.sizeFromShape(p),h=I.makeZerosTypedArray(c,"int32"),f=I.sizeFromShape(d),m=r.data.get(l.dataId).values;for(let e=0;e<h.length;++e){let t=e*f,r=m[t],a=0;for(let e=0;e<f;++e){let n=m[t+e];n>r&&(r=n,a=e)}h[e]=a}return u.forEach(e=>r.disposeIntermediateTensorInfo(e)),r.makeTensorInfo(p,"int32",h)}};g("i64bB");var $=g("hl418"),v=g("7MaPk"),I=g("jjNRA");const eR={kernelName:$.ArgMin,backendName:"cpu",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{x:n}=t,{axis:s}=a;w(n,"argMin");let o=I.parseAxisParam(s,n.shape),i=v.getAxesPermutation(o,n.shape.length),l=n,u=[];null!=i&&(u.push(l=ew({inputs:{x:n},backend:r,attrs:{perm:i}})),o=v.getInnerMostAxes(o.length,l.shape.length)),o=[o[0]],v.assertAxesAreInnerMostDims("argMin",o,l.shape.length);let[p,d]=v.computeOutAndReduceShapes(l.shape,o),c=I.sizeFromShape(p),h=I.makeZerosTypedArray(c,"int32"),f=I.sizeFromShape(d),m=r.data.get(l.dataId).values;for(let e=0;e<h.length;++e){let t=e*f,r=m[t],a=0;for(let e=0;e<f;++e){let n=m[t+e];n<r&&(r=n,a=e)}h[e]=a}return u.forEach(e=>r.disposeIntermediateTensorInfo(e)),r.makeTensorInfo(p,"int32",h)}};g("i64bB");var $=g("hl418");const eP=P($.Asin,e=>Math.asin(e)),eB={kernelName:$.Asin,backendName:"cpu",kernelFunc:eP};g("i64bB");var $=g("hl418");const eF=P($.Asinh,e=>Math.asinh(e)),eO={kernelName:$.Asinh,backendName:"cpu",kernelFunc:eF};g("i64bB");var $=g("hl418");const eM=P($.Atan,e=>Math.atan(e)),eD={kernelName:$.Atan,backendName:"cpu",kernelFunc:eM};g("i64bB");var $=g("hl418");const e_=V((e,t)=>Math.atan2(e,t)),eL=eo($.Atan2,e_),eV={kernelName:$.Atan2,backendName:"cpu",kernelFunc:eL};g("i64bB");var $=g("hl418");const eG=P($.Atanh,e=>Math.atanh(e)),eW={kernelName:$.Atanh,backendName:"cpu",kernelFunc:eG};g("i64bB");var $=g("hl418"),v=g("7MaPk"),I=g("jjNRA");g("i64bB");var N=g("iG87S");function ez(e,t,r,a,n,s){let o=n.strideHeight,i=n.strideWidth,l=n.dilationHeight,u=n.dilationWidth,p=n.effectiveFilterHeight,d=n.effectiveFilterWidth,c=n.padInfo.top,h=n.padInfo.left,f="max"===s?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,m=(0,N.buffer)(n.outShape,r),g=m.values,x=n.outShape[1]*n.outShape[2]*n.outShape[3],y=n.outShape[2]*n.outShape[3],b=n.outShape[3];for(let t=0;t<n.batchSize;++t){let r=t*x,m=t*a[0];for(let t=0;t<n.inChannels;++t)for(let x=0;x<n.outHeight;++x){let v=x*o-c,N=Math.max(0,v),k=Math.min(n.inHeight,p+v),T=r+x*y;for(let r=0;r<n.outWidth;++r){let o=r*i-h,p=Math.max(0,o),c=Math.min(n.inWidth,d+o),x=f,y=0,v=0;for(let r=N;r<k;r+=l){let n=m+r*a[1];for(let r=p;r<c;r+=u){let o=e[n+r*a[2]+t];"max"===s&&o>x?x=o:"avg"===s&&(y+=o,v++)}if(isNaN(x))break}g[T+r*b+t]="avg"===s?y/v:x}}}return m}function ej(e,t,r,a,n=!1,s=!1){let o=(0,N.buffer)(a.outShape,"int32"),i=a.strideHeight,l=a.strideWidth,u=a.dilationHeight,p=a.dilationWidth,d=a.effectiveFilterHeight,c=a.effectiveFilterWidth,h=a.padInfo.top,f=a.padInfo.left,m=(0,N.buffer)(t,r,e);for(let e=0;e<a.batchSize;++e)for(let t=0;t<a.inChannels;++t)for(let r=0;r<a.outHeight;++r){let g=r*i-h,x=g;for(;x<0;)x+=u;let y=Math.min(a.inHeight,d+g);for(let i=0;i<a.outWidth;++i){let d=i*l-f,h=d;for(;h<0;)h+=p;let b=Math.min(a.inWidth,c+d),v=Number.NEGATIVE_INFINITY,N=-1;for(let r=x;r<y;r+=u){let o=r-g;for(let i=h;i<b;i+=p){let l=i-d,u=m.get(e,r,i,t);u>v&&(v=u,N=n?s?((e*a.inHeight+r)*a.inWidth+i)*a.inChannels+t:(r*a.inWidth+i)*a.inChannels+t:o*c+l)}}o.set(N,e,r,i,t)}}return o}function eU(e,t,r,a,n,s){let o=n.strideDepth,i=n.strideHeight,l=n.strideWidth,u=n.dilationDepth,p=n.dilationHeight,d=n.dilationWidth,c=n.effectiveFilterDepth,h=n.effectiveFilterHeight,f=n.effectiveFilterWidth,m=n.padInfo.front,g=n.padInfo.top,x=n.padInfo.left,y="max"===s?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,b=(0,N.buffer)(n.outShape,r),v=b.values,k=n.outShape[1]*n.outShape[2]*n.outShape[3]*n.outShape[4],T=n.outShape[2]*n.outShape[3]*n.outShape[4],S=n.outShape[3]*n.outShape[4],I=n.outShape[4];for(let t=0;t<n.batchSize;++t){let r=t*k,b=t*a[0];for(let t=0;t<n.inChannels;++t)for(let N=0;N<n.outDepth;++N){let k=N*o-m,w=k;for(;w<0;)w+=u;let C=Math.min(n.inDepth,c+k),E=r+N*T;for(let r=0;r<n.outHeight;++r){let o=r*i-g,c=o;for(;c<0;)c+=p;let m=Math.min(n.inHeight,h+o),N=E+r*S;for(let r=0;r<n.outWidth;++r){let o=r*l-x,i=o;for(;i<0;)i+=d;let h=Math.min(n.inWidth,f+o),g=N+r*I,k=y,T=0,S=0;for(let r=w;r<C;r+=u){let n=b+r*a[1];for(let r=c;r<m;r+=p){let o=n+r*a[2];for(let r=i;r<h;r+=d){let n=e[o+r*a[3]+t];if("max"===s&&n>k?k=n:"avg"===s&&(T+=n,S++),isNaN(k))break}if(isNaN(k))break}if(isNaN(k))break}v[g+t]="avg"===s?T/Math.max(S,1):k}}}}return b}const eq={kernelName:$.AvgPool,backendName:"cpu",kernelFunc:function(e){let t,{inputs:r,backend:a,attrs:n}=e,{x:s}=r;w(s,"avgPool");let{filterSize:o,strides:i,pad:l,dimRoundingMode:u}=n;I.assert(v.eitherStridesOrDilationsAreOne(i,1),()=>`Error in avgPool: Either strides or dilations must be 1. Got strides ${i} and dilations '1'`);let p=v.computePool2DInfo(s.shape,o,i,1,l,u);if(1===p.filterWidth&&1===p.filterHeight&&I.arraysEqual(p.inShape,p.outShape))t=M({inputs:{x:s},backend:a});else{let e=a.data.get(s.dataId).values,r=I.computeStrides(s.shape),n=ez(e,s.shape,s.dtype,r,p,"avg");t=a.makeTensorInfo(p.outShape,s.dtype,n.values)}return t}};g("i64bB");var $=g("hl418"),v=g("7MaPk"),I=g("jjNRA");const eH={kernelName:$.AvgPool3D,backendName:"cpu",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{x:n}=t,{filterSize:s,strides:o,pad:i,dimRoundingMode:l,dataFormat:u}=a;w(n,"avgPool3d");let p=v.computePool3DInfo(n.shape,s,o,1,i,l,u),d=eU(r.data.get(n.dataId).values,n.shape,n.dtype,I.computeStrides(n.shape),p,"avg");return r.makeTensorInfo(d.shape,"float32",d.values)}};g("i64bB");var $=g("hl418"),v=g("7MaPk"),N=g("iG87S");const eK={kernelName:$.AvgPool3DGrad,backendName:"cpu",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{dy:n,input:s}=t,{filterSize:o,strides:i,pad:l,dimRoundingMode:u}=a;w([n,s],"avgPool3DGrad");let p=v.computePool3DInfo(s.shape,o,i,1,l,u),d=p.strideDepth,c=p.strideHeight,h=p.strideWidth,f=p.filterDepth,m=p.filterHeight,g=p.filterWidth,x=p.dilationDepth,y=p.dilationHeight,b=p.dilationWidth,k=p.effectiveFilterDepth,T=p.effectiveFilterHeight,S=p.effectiveFilterWidth,I=k-1-p.padInfo.front,C=S-1-p.padInfo.left,E=T-1-p.padInfo.top,A=(0,N.buffer)(s.shape,"float32"),$=1/(f*m*g),R=r.bufferSync(n);for(let e=0;e<p.batchSize;++e)for(let t=0;t<p.inChannels;++t)for(let r=0;r<p.inDepth;++r)for(let a=0;a<p.inHeight;++a)for(let n=0;n<p.inWidth;++n){let s=r-I,o=a-E,i=n-C,l=0;for(let r=0;r<k;r+=x){let a=(s+r)/d;if(!(a<0)&&!(a>=p.outDepth)&&Math.floor(a)===a)for(let r=0;r<T;r+=y){let n=(o+r)/c;if(!(n<0)&&!(n>=p.outHeight)&&Math.floor(n)===n)for(let r=0;r<S;r+=b){let s=(i+r)/h;s<0||s>=p.outWidth||Math.floor(s)!==s||(l+=R.get(e,a,n,s,t))}}}A.set(l*$,e,r,a,n,t)}return r.makeTensorInfo(A.shape,A.dtype,A.values)}};g("i64bB");var $=g("hl418"),v=g("7MaPk"),N=g("iG87S");const eX={kernelName:$.AvgPoolGrad,backendName:"cpu",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{dy:n,input:s}=t;w([n,s],"avgPoolGrad");let{filterSize:o,strides:i,pad:l}=a,u=v.computePool2DInfo(s.shape,o,i,1,l),p=u.strideHeight,d=u.strideWidth,c=u.filterHeight,h=u.filterWidth,f=u.dilationHeight,m=u.dilationWidth,g=u.effectiveFilterHeight,x=u.effectiveFilterWidth,y=x-1-u.padInfo.left,b=g-1-u.padInfo.top,k=(0,N.buffer)(s.shape,"float32"),T=1/(c*h),S=r.data.get(n.dataId).values,I=(0,N.buffer)(n.shape,"float32",S);for(let e=0;e<u.batchSize;++e)for(let t=0;t<u.inChannels;++t)for(let r=0;r<u.inHeight;++r)for(let a=0;a<u.inWidth;++a){let n=r-b,s=a-y,o=0;for(let r=0;r<g;r+=f){let a=(n+r)/p;if(!(a<0)&&!(a>=u.outHeight)&&Math.floor(a)===a)for(let r=0;r<x;r+=m){let n=(s+r)/d;n<0||n>=u.outWidth||Math.floor(n)!==n||(o+=I.get(e,a,n,t))}}k.set(o*T,e,r,a,t)}return r.makeTensorInfo(k.shape,k.dtype,k.values)}};g("i64bB");var $=g("hl418"),I=g("jjNRA");const eZ={kernelName:$.FusedBatchNorm,backendName:"cpu",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{x:n,scale:s,offset:o,mean:i,variance:l}=t;I.assert(i.shape.length===l.shape.length,()=>"Batch normalization gradient requires mean and variance to have equal ranks."),I.assert(null==o||i.shape.length===o.shape.length,()=>"Batch normalization gradient requires mean and offset to have equal ranks."),I.assert(null==s||i.shape.length===s.shape.length,()=>"Batch normalization gradient requires mean and scale to have equal ranks."),w([n,i,l,s,o],"batchNorm");let{varianceEpsilon:u}=a;null==u&&(u=.001);let p=r.data.get(n.dataId).values,d=r.data.get(i.dataId).values,c=r.data.get(l.dataId).values,h=s?r.data.get(s.dataId).values:new Float32Array([1]),f=o?r.data.get(o.dataId).values:new Float32Array([0]),m=new Float32Array(p.length),g=f.length,x=h.length,y=c.length,b=d.length,v=0,N=0,k=0,T=0;for(let e=0;e<p.length;++e)m[e]=f[v++]+(p[e]-d[N++])*h[k++]/Math.sqrt(c[T++]+u),v>=g&&(v=0),N>=b&&(N=0),k>=x&&(k=0),T>=y&&(T=0);return r.makeTensorInfo(n.shape,n.dtype,m)}};g("i64bB");var v=g("7MaPk"),$=g("hl418");g("i64bB");var v=g("7MaPk"),N=g("iG87S"),$=g("hl418"),eY=g("bszZn"),I=g("jjNRA");function eQ(e,t,r,a,n){let s=eY.isSliceContinous(a,t,r),o=I.sizeFromShape(r),i=I.computeStrides(a);if(s){let r=eY.computeFlatOffset(t,i);return"string"===n?e.slice(r,r+o):e.subarray(r,r+o)}let l="string"===n?v.fromUint8ToStringArray(e):e,u=(0,N.buffer)(a,n,l),p=(0,N.buffer)(r,n);for(let e=0;e<p.size;++e){let r=p.indexToLoc(e),a=r.map((e,r)=>e+t[r]);p.set(u.get(...a),...r)}return"string"===n?v.fromStringArrayToUint8(p.values):p.values}function eJ(e){let{inputs:t,backend:r,attrs:a}=e,{x:n}=t,{begin:s,size:o}=a;w(n,"slice");let[i,l]=eY.parseSliceParams(n,s,o);eY.assertParamsValid(n,i,l);let u=eQ(r.data.get(n.dataId).values,i,l,n.shape,n.dtype);return r.makeTensorInfo(l,n.dtype,u)}const e0={kernelName:$.Slice,backendName:"cpu",kernelFunc:eJ},e1={kernelName:$.BatchToSpaceND,backendName:"cpu",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{x:n}=t,{blockShape:s,crops:o}=a;w([n],"batchToSpaceND");let i=s.reduce((e,t)=>e*t),l=v.getReshaped(n.shape,s,i),u=v.getPermuted(l.length,s.length),p=v.getReshapedPermuted(n.shape,s,i),d=v.getSliceBeginCoords(o,s.length),c=v.getSliceSize(p,o,s.length),h=eh({inputs:{x:n},backend:r,attrs:{shape:l}}),f=ew({inputs:{x:h},backend:r,attrs:{perm:u}}),m=eh({inputs:{x:f},backend:r,attrs:{shape:p}}),g=eJ({inputs:{x:m},backend:r,attrs:{begin:d,size:c}});return r.disposeIntermediateTensorInfo(h),r.disposeIntermediateTensorInfo(f),r.disposeIntermediateTensorInfo(m),g}};g("i64bB");var $=g("hl418");g("i64bB");var N=g("iG87S"),I=g("jjNRA");function e2(e,t,r,a,n){let s=I.sizeFromShape(a),o=I.makeZerosTypedArray(n,r);for(let r=0;r<e.length;r++){let a=e[r];if(a<0)throw Error("Input x must be non-negative!");a>=n||(s>0?o[a]+=t[r]:o[a]+=1)}return o}function e4(e,t,r,a=!1){let n=e.shape[0],s=e.shape[1],o=(0,N.buffer)([n,r],t.dtype);for(let i=0;i<n;i++)for(let n=0;n<s;n++){let s=e.get(i,n);if(s<0)throw Error("Input x must be non-negative!");s>=r||(a?o.set(1,i,s):t.size>0?o.set(o.get(i,s)+t.get(i,n),i,s):o.set(o.get(i,s)+1,i,s))}return o}const e3={kernelName:$.Bincount,backendName:"cpu",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{x:n,weights:s}=t,{size:o}=a,i=e2(r.data.get(n.dataId).values,r.data.get(s.dataId).values,s.dtype,s.shape,o);return r.makeTensorInfo([o],s.dtype,i)}};g("i64bB");var $=g("hl418");const e8=V((e,t)=>e&t),e6=eo($.BitwiseAnd,e8),e5={kernelName:$.BitwiseAnd,backendName:"cpu",kernelFunc:e6};g("i64bB");var v=g("7MaPk"),$=g("hl418");const e7={kernelName:$.BroadcastArgs,backendName:"cpu",kernelFunc:function(e){let{inputs:t,backend:r}=e,{s0:a,s1:n}=t,s=r.data.get(a.dataId).values,o=r.data.get(n.dataId).values,i=v.assertAndGetBroadcastShape(Array.from(s),Array.from(o));return r.makeTensorInfo([i.length],"int32",Int32Array.from(i))}};g("i64bB");var $=g("hl418");const e9=R(e=>Math.ceil(e)),te=B($.Ceil,e9),tt={kernelName:$.Ceil,backendName:"cpu",kernelFunc:te};g("i64bB");var $=g("hl418");const tr=P($.ClipByValue,(e,t)=>e>t.clipValueMax?t.clipValueMax:e<t.clipValueMin?t.clipValueMin:e),ta={kernelName:$.ClipByValue,backendName:"cpu",kernelFunc:tr};g("i64bB");var $=g("hl418"),I=g("jjNRA");const tn={kernelName:$.ComplexAbs,backendName:"cpu",kernelFunc:e=>{let{x:t}=e.inputs,r=e.backend,a=new Float32Array(I.sizeFromShape(t.shape)),n=r.data.get(t.dataId),s=n.complexTensorInfos.real,o=n.complexTensorInfos.imag,i=r.data.get(s.dataId).values,l=r.data.get(o.dataId).values;for(let e=0;e<i.length;e++){let t=i[e],r=l[e];a[e]=Math.hypot(t,r)}return r.makeOutput(a,t.shape,"float32")}};g("i64bB");var v=g("7MaPk"),$=g("hl418"),I=g("jjNRA");g("i64bB");var v=g("7MaPk"),I=g("jjNRA");function ts(e,t,r,a){let n=I.getArrayFromDType(r,I.sizeFromShape(t));if(a&&"string"!==r){let t=0;e.forEach(e=>{let r=I.sizeFromShape(e.shape);n.set(e.vals,t),t+=r})}else{let a=0;e.forEach(e=>{let s="string"===r?v.fromUint8ToStringArray(e.vals):e.vals,o=0;for(let r=0;r<e.shape[0];++r){let i=r*t[1]+a;for(let t=0;t<e.shape[1];++t)n[i+t]=s[o++]}a+=e.shape[1]})}return n}g("i64bB");var $=g("hl418");function to(e){let{inputs:t,backend:r}=e,{input:a}=t,n=r.data.get(a.dataId).complexTensorInfos.imag,s=r.data.get(n.dataId).values;return r.makeTensorInfo(n.shape,n.dtype,s)}const ti={kernelName:$.Imag,backendName:"cpu",kernelFunc:to};function tl(e){let{inputs:t,backend:r,attrs:a}=e,{axis:n}=a,s=I.parseAxisParam(n,t[0].shape)[0],o=t.map(e=>e.shape);v.assertParamsConsistent(o,s);let i=v.computeOutShape(t.map(e=>e.shape),s);if(0===I.sizeFromShape(i))return r.makeTensorInfo(i,t[0].dtype,[]);let l=t.filter(e=>I.sizeFromShape(e.shape)>0);if(1===l.length)return M({inputs:{x:l[0]},backend:r});if("complex64"===l[0].dtype){let e=l.map(e=>et({inputs:{input:e},backend:r})),t=l.map(e=>to({inputs:{input:e},backend:r})),a=tl({inputs:e,backend:r,attrs:{axis:s}}),n=tl({inputs:t,backend:r,attrs:{axis:s}}),o=Q({inputs:{real:a,imag:n},backend:r});return e.forEach(e=>r.disposeIntermediateTensorInfo(e)),t.forEach(e=>r.disposeIntermediateTensorInfo(e)),r.disposeIntermediateTensorInfo(a),r.disposeIntermediateTensorInfo(n),o}let u=l.map(e=>{let t=I.sizeFromShape(e.shape.slice(s));return eh({inputs:{x:e},backend:r,attrs:{shape:[-1,t]}})}),p=u.map(e=>({vals:r.data.get(e.dataId).values,shape:e.shape}));i=v.computeOutShape(u.map(e=>e.shape),1);let d=1===u[0].shape[0],c=ts(p,i,t[0].dtype,d),h=v.computeOutShape(l.map(e=>e.shape),s),f=r.makeTensorInfo(h,t[0].dtype,c);return u.forEach(e=>r.disposeIntermediateTensorInfo(e)),f}const tu={kernelName:$.Concat,backendName:"cpu",kernelFunc:tl};g("i64bB");var v=g("7MaPk"),$=g("hl418"),tp=g("9jCh7"),I=g("jjNRA");function td(e){let{inputs:t,backend:r,attrs:a}=e,{x:n,filter:s}=t,{strides:o,pad:i,dataFormat:l,dilations:u,dimRoundingMode:p}=a;w([n,s],"conv2d");let d=v.convertConv2DDataFormat(l),c=v.computeConv2DInfo(n.shape,s.shape,o,u,i,p,!1,d),h=c.filterHeight,f=c.filterWidth,m=c.dilationHeight,g=c.dilationWidth,x=c.padInfo.left,y=c.padInfo.top,b="channelsLast"===c.dataFormat,N=new(0,tp.TensorBuffer)(c.outShape,n.dtype),k=I.computeStrides(n.shape),T=I.computeStrides(s.shape),S=k[0],C=b?k[1]:k[2],E=b?k[2]:1,A=b?1:k[1],$=N.strides[0],R=b?N.strides[1]:N.strides[2],P=b?N.strides[2]:1,B=b?1:N.strides[1],F=r.data.get(n.dataId).values,O=r.data.get(s.dataId).values,M=N.values;for(let e=0;e<c.batchSize;++e){let t=e*S,r=e*$;for(let e=0;e<c.outHeight;++e){let a=r+e*R,n=e*c.strideHeight-y;for(let e=0;e<h;++e){let r=n+e*m;if(r<0||r>=c.inHeight)continue;let s=e*T[0],o=t+r*C;for(let e=0;e<c.outWidth;++e){let t=a+e*P,r=e*c.strideWidth-x;for(let e=0;e<f;++e){let a=r+e*g;if(a<0||a>=c.inWidth)continue;let n=s+e*T[1],i=o+a*E,l=n;for(let e=0;e<c.inChannels;++e){let r=F[i+e*A];for(let e=0;e<c.outChannels;++e)M[t+e*B]+=r*O[l+e];l+=c.outChannels}}}}}}return r.makeTensorInfo(N.shape,N.dtype,M)}const tc={kernelName:$.Conv2D,backendName:"cpu",kernelFunc:td};g("i64bB");var v=g("7MaPk"),$=g("hl418"),tp=g("9jCh7");const th={kernelName:$.Conv2DBackpropFilter,backendName:"cpu",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{x:n,dy:s}=t,{strides:o,pad:i,dataFormat:l,dimRoundingMode:u,filterShape:p}=a;w([n,s],"conv2dBackpropFilter");let d=v.convertConv2DDataFormat(l),c=v.computeConv2DInfo(n.shape,p,o,1,i,u,!1,d),{strideHeight:h,strideWidth:f,filterHeight:m,filterWidth:g}=c,x="channelsLast"===c.dataFormat,y=new(0,tp.TensorBuffer)(c.filterShape,"float32"),b=c.padInfo.left,N=c.padInfo.top,k=r.data.get(n.dataId).values,T=r.data.get(s.dataId).values,S=new(0,tp.TensorBuffer)(n.shape,n.dtype,k),I=new(0,tp.TensorBuffer)(s.shape,s.dtype,T);for(let e=0;e<m;++e){let t=Math.max(0,Math.ceil((N-e)/h)),r=Math.min(c.outHeight,(c.inHeight+N-e)/h);for(let a=0;a<g;++a){let n=Math.max(0,Math.ceil((b-a)/f)),s=Math.min(c.outWidth,(c.inWidth+b-a)/f);for(let o=0;o<c.inChannels;++o)for(let i=0;i<c.outChannels;++i){let l=0;for(let u=0;u<c.batchSize;++u)for(let p=t;p<r;++p){let t=e+p*h-N;for(let e=n;e<s;++e){let r=a+e*f-b;x?l+=S.get(u,t,r,o)*I.get(u,p,e,i):l+=S.get(u,o,t,r)*I.get(u,i,p,e)}}y.set(l,e,a,o,i)}}}return r.makeTensorInfo(y.shape,y.dtype,y.values)}};g("i64bB");var v=g("7MaPk"),$=g("hl418"),tp=g("9jCh7"),I=g("jjNRA");const tf={kernelName:$.Conv2DBackpropInput,backendName:"cpu",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{dy:n,filter:s}=t,{inputShape:o,strides:i,pad:l,dataFormat:u,dimRoundingMode:p}=a;w([n,s],"conv2dBackpropInput");let d=I.computeStrides(s.shape),c=I.computeStrides(n.shape),h=v.convertConv2DDataFormat(u),f=v.computeConv2DInfo(o,s.shape,i,1,l,p,!1,h),m=new(0,tp.TensorBuffer)(f.inShape,"float32"),g=m.values,x=r.data.get(n.dataId).values,y=r.data.get(s.dataId).values,[b,N,k]=d,{batchSize:T,filterHeight:S,filterWidth:C,inChannels:E,inHeight:A,inWidth:$,outChannels:R,outHeight:P,outWidth:B,strideHeight:F,strideWidth:O}=f;h=f.dataFormat;let M=S-1-f.padInfo.top,D=C-1-f.padInfo.left,_="channelsLast"===h,L=m.strides[0],V=_?m.strides[1]:m.strides[2],G=_?m.strides[2]:1,W=_?1:m.strides[1],z=c[0],j=_?c[1]:c[2],U=_?c[2]:1,q=_?1:c[1];for(let e=0;e<T;++e)for(let t=0;t<E;++t)for(let r=0;r<A;++r){let a=r-M,n=Math.max(0,Math.ceil(a/F)),s=Math.min(P,(S+a)/F);for(let o=0;o<$;++o){let i=o-D,l=Math.max(0,Math.ceil(i/O)),u=Math.min(B,(C+i)/O),p=0;for(let r=n;r<s;++r){let n=r*F-a;for(let a=l;a<u;++a){let s=a*O-i,o=z*e+j*r+U*a,l=b*(S-1-n)+N*(C-1-s)+k*t;for(let e=0;e<R;++e)p+=x[o+q*e]*y[l+e]}}g[L*e+V*r+G*o+W*t]=p}}return r.makeTensorInfo(m.shape,m.dtype,m.values)}};g("i64bB");var v=g("7MaPk"),$=g("hl418"),tp=g("9jCh7"),I=g("jjNRA");const tm={kernelName:$.Conv3D,backendName:"cpu",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{x:n,filter:s}=t,{strides:o,pad:i,dilations:l}=a;w([n,s],"conv3d");let u=v.computeConv3DInfo(n.shape,s.shape,o,l,i),{filterDepth:p,filterHeight:d,filterWidth:c,dilationDepth:h,dilationHeight:f,dilationWidth:m,padInfo:g}=u,x=g.front,y=g.left,b=g.top,N=new(0,tp.TensorBuffer)(u.outShape,n.dtype),k=r.data.get(n.dataId).values,T=r.data.get(s.dataId).values,S=N.values,C=I.computeStrides(n.shape),E=I.computeStrides(s.shape);for(let e=0;e<u.batchSize;++e){let t=e*C[0],r=e*N.strides[0];for(let e=0;e<u.outDepth;++e){let a=r+e*N.strides[1],n=e*u.strideDepth-x;for(let e=0;e<p;++e){let r=n+e*h;if(r<0||r>=u.inDepth)continue;let s=e*E[0],o=t+r*C[1];for(let e=0;e<u.outHeight;++e){let t=a+e*N.strides[2],r=e*u.strideHeight-b;for(let e=0;e<d;++e){let a=r+e*f;if(a<0||a>=u.inHeight)continue;let n=s+e*E[1],i=o+a*C[2];for(let e=0;e<u.outWidth;++e){let r=t+e*u.outChannels,a=e*u.strideWidth-y;for(let e=0;e<c;++e){let t=a+e*m;if(t<0||t>=u.inWidth)continue;let s=n+e*E[2],o=i+t*u.inChannels,l=s;for(let e=0;e<u.inChannels;++e){let t=k[o+e];for(let e=0;e<u.outChannels;++e)S[r+e]+=t*T[l+e];l+=u.outChannels}}}}}}}}return r.makeTensorInfo(N.shape,N.dtype,N.values)}};g("i64bB");var v=g("7MaPk"),$=g("hl418"),tp=g("9jCh7"),I=g("jjNRA");const tg={kernelName:$.Conv3DBackpropFilterV2,backendName:"cpu",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{x:n,dy:s}=t,{strides:o,pad:i,filterShape:l}=a;w([n,s],"conv3dBackpropFilterV2");let u=I.computeStrides(n.shape),p=I.computeStrides(s.shape),d=v.computeConv3DInfo(n.shape,l,o,1,i),c=d.strideDepth,h=d.strideHeight,f=d.strideWidth,m=d.filterDepth,g=d.filterHeight,x=d.filterWidth,y=new(0,tp.TensorBuffer)(d.filterShape,"float32"),b=y.values,[N,k,T,S]=y.strides,C=r.data.get(s.dataId).values,[E,A,$,R]=p,P=r.data.get(n.dataId).values,[B,F,O,M]=u,D=d.padInfo.front,_=d.padInfo.left,L=d.padInfo.top;for(let e=0;e<m;++e){let t=Math.max(0,Math.ceil((D-e)/c)),r=Math.min(d.outDepth,(d.inDepth+D-e)/c),a=e*N;for(let n=0;n<g;++n){let s=Math.max(0,Math.ceil((L-n)/h)),o=Math.min(d.outHeight,(d.inHeight+L-n)/h),i=n*k+a;for(let a=0;a<x;++a){let l=Math.max(0,Math.ceil((_-a)/f)),u=Math.min(d.outWidth,(d.inWidth+_-a)/f),p=a*T+i;for(let i=0;i<d.inChannels;++i){let m=i*S+p;for(let p=0;p<d.outChannels;++p){let g=0;for(let m=0;m<d.batchSize;++m){let d=m*B,x=m*E;for(let m=t;m<r;++m){let t=(e+m*c-D)*F+d,r=m*A+x;for(let e=s;e<o;++e){let s=(n+e*h-L)*O+t,o=e*$+r;for(let e=l;e<u;++e){let t=(a+e*f-_)*M+s,r=e*R+o;g+=P[t+i]*C[r+p]}}}}b[m+p]=g}}}}}return r.makeTensorInfo(y.shape,y.dtype,y.values)}};g("i64bB");var v=g("7MaPk"),$=g("hl418"),tp=g("9jCh7"),I=g("jjNRA");const tx={kernelName:$.Conv3DBackpropInputV2,backendName:"cpu",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{dy:n,filter:s}=t,{pad:o,strides:i,inputShape:l}=a;w([n],"conv3dBackpropInputV2");let u=I.computeStrides(n.shape),p=I.computeStrides(s.shape),d=v.computeConv3DInfo(l,s.shape,i,1,o),c=new(0,tp.TensorBuffer)(d.inShape,"float32"),h=c.values,[f,m,g,x]=c.strides,y=r.data.get(n.dataId).values,[b,N,k,T]=u,S=r.data.get(s.dataId).values,[C,E,A,$]=p,{batchSize:R,filterDepth:P,filterHeight:B,filterWidth:F,inChannels:O,inDepth:M,inHeight:D,inWidth:_,outChannels:L,outDepth:V,outHeight:G,outWidth:W,strideDepth:z,strideHeight:j,strideWidth:U}=d,q=P-1-d.padInfo.front,H=B-1-d.padInfo.top,K=F-1-d.padInfo.left;for(let e=0;e<R;++e)for(let t=0;t<O;++t)for(let r=0;r<M;++r){let a=r-q,n=Math.max(0,Math.ceil(a/z)),s=Math.min(V,(P+a)/z);for(let o=0;o<D;++o){let i=o-H,l=Math.max(0,Math.ceil(i/j)),u=Math.min(G,(B+i)/j);for(let p=0;p<_;++p){let d=p-K,c=Math.max(0,Math.ceil(d/U)),v=Math.min(W,(F+d)/U),I=0;for(let r=n;r<s;++r){let n=r*z-a;for(let a=l;a<u;++a){let s=a*j-i;for(let o=c;o<v;++o){let i=o*U-d,l=b*e+N*r+k*a+T*o,u=C*(P-1-n)+E*(B-1-s)+A*(F-1-i)+$*t;for(let e=0;e<L;++e)I+=y[l+e]*S[u+e]}}}h[f*e+m*r+g*o+x*p+t]=I}}}return r.makeTensorInfo(c.shape,c.dtype,c.values)}};g("i64bB");var $=g("hl418");const ty=P($.Cos,e=>Math.cos(e)),tb={kernelName:$.Cos,backendName:"cpu",kernelFunc:ty};g("i64bB");var $=g("hl418");const tv=P($.Cosh,e=>Math.cosh(e)),tN={kernelName:$.Cosh,backendName:"cpu",kernelFunc:tv};g("i64bB");var N=g("iG87S"),$=g("hl418"),I=g("jjNRA");const tk={kernelName:$.CropAndResize,backendName:"cpu",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{image:n,boxes:s,boxInd:o}=t,{cropSize:i,method:l,extrapolationValue:u}=a,[p,d,c,h]=n.shape,f=s.shape[0],[m,g]=i,x=(0,N.buffer)([f,m,g,h],"float32"),y=r.data.get(s.dataId).values,b=r.data.get(o.dataId).values,v=r.data.get(n.dataId).values,k=I.computeStrides(n.shape),T=I.computeStrides(x.shape);for(let e=0;e<f;e++){let t=4*e,r=y[t],a=y[t+1],n=y[t+2],s=y[t+3],o=b[e];if(o>=p)continue;let i=m>1?(n-r)*(d-1)/(m-1):0,f=g>1?(s-a)*(c-1)/(g-1):0;for(let t=0;t<m;t++){let p=m>1?r*(d-1)+t*i:.5*(r+n)*(d-1);if(p<0||p>d-1){for(let r=0;r<g;r++)for(let a=0;a<h;a++){let n=a+r*T[2]+t*T[1]+e*T[0];x.values[n]=u}continue}if("bilinear"===l){let r=Math.floor(p),n=Math.ceil(p),i=p-r;for(let l=0;l<g;l++){let p=g>1?a*(c-1)+l*f:.5*(a+s)*(c-1);if(p<0||p>c-1){for(let r=0;r<h;r++){let a=r+l*T[2]+t*T[1]+e*T[0];x.values[a]=u}continue}let d=Math.floor(p),m=Math.ceil(p),y=p-d;for(let a=0;a<h;a++){let s=a+d*k[2]+r*k[1]+o*k[0],u=v[s],p=v[s=a+m*k[2]+r*k[1]+o*k[0]],c=v[s=a+d*k[2]+n*k[1]+o*k[0]],h=v[s=a+m*k[2]+n*k[1]+o*k[0]],f=u+(p-u)*y,g=c+(h-c)*y;s=a+l*T[2]+t*T[1]+e*T[0],x.values[s]=f+(g-f)*i}}}else for(let r=0;r<g;++r){let n=g>1?a*(c-1)+r*f:.5*(a+s)*(c-1);if(n<0||n>c-1){for(let a=0;a<h;a++){let n=a+r*T[2]+t*T[1]+e*T[0];x.values[n]=u}continue}let i=Math.round(n),l=Math.round(p);for(let a=0;a<h;a++){let n=a+i*k[2]+l*k[1]+o*k[0],s=a+r*T[2]+t*T[1]+e*T[0];x.values[s]=v[n]}}}}return r.makeTensorInfo(x.shape,x.dtype,x.values)}};g("i64bB");var v=g("7MaPk"),$=g("hl418"),tT=g("2MDja"),I=g("jjNRA");const tS={kernelName:$.Cumprod,backendName:"cpu",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{x:n}=t,{axis:s,exclusive:o,reverse:i}=a;w(n,"cumprod");let l=v.getAxesPermutation([s],n.shape.length),u=n;null!=l&&(u=ew({inputs:{x:n},backend:r,attrs:{perm:l}}));let p=v.getInnerMostAxes(1,n.shape.length)[0];if(p!==u.shape.length-1)throw Error(`backend.cumprod in CPU expects an inner-most axis=${u.shape.length-1} but got axis=${p}`);let d=(0,tT.upcastType)(u.dtype,"int32"),c=I.makeOnesTypedArray(I.sizeFromShape(u.shape),d),h=r.data.get(u.dataId).values,f=u.shape[u.shape.length-1],m=i?(e,t)=>e+f-t-1:(e,t)=>e+t;for(let e=0;e<h.length;e+=f)for(let t=0;t<f;t++){let r=m(e,t);if(0===t)c[r]=o?1:h[r];else{let a=m(e,t-1);c[r]=o?h[a]*c[a]:h[r]*c[a]}}let g=r.makeTensorInfo(u.shape,d,c);if(null!=l){let e=ew({inputs:{x:g},backend:r,attrs:{perm:v.getUndoAxesPermutation(l)}});return r.disposeIntermediateTensorInfo(g),r.disposeIntermediateTensorInfo(u),e}return g}};g("i64bB");var v=g("7MaPk"),$=g("hl418"),tT=g("2MDja"),I=g("jjNRA");const tI={kernelName:$.Cumsum,backendName:"cpu",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{x:n}=t,{axis:s,exclusive:o,reverse:i}=a;w(n,"cumsum");let l=v.getAxesPermutation([s],n.shape.length),u=n;null!=l&&(u=ew({inputs:{x:n},backend:r,attrs:{perm:l}}));let p=v.getInnerMostAxes(1,n.shape.length)[0];if(p!==u.shape.length-1)throw Error(`backend.cumsum in CPU expects an inner-most axis=${u.shape.length-1} but got axis=${p}`);let d=(0,tT.upcastType)(u.dtype,"int32"),c=I.makeZerosTypedArray(I.sizeFromShape(u.shape),d),h=r.data.get(u.dataId).values,f=u.shape[u.shape.length-1],m=i?(e,t)=>e+f-t-1:(e,t)=>e+t;for(let e=0;e<h.length;e+=f)for(let t=0;t<f;t++){let r=m(e,t);if(0===t)c[r]=o?0:h[r];else{let a=m(e,t-1);c[r]=o?h[a]+c[a]:h[r]+c[a]}}let g=r.makeTensorInfo(u.shape,d,c);if(null!=l){let e=ew({inputs:{x:g},backend:r,attrs:{perm:v.getUndoAxesPermutation(l)}});return r.disposeIntermediateTensorInfo(g),r.disposeIntermediateTensorInfo(u),e}return g}};g("i64bB");var $=g("hl418");const tw={kernelName:$.DenseBincount,backendName:"cpu",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{x:n,weights:s}=t,{size:o,binaryOutput:i}=a;if(1===n.shape.length){let e=e2(r.data.get(n.dataId).values,r.data.get(s.dataId).values,s.dtype,s.shape,o);return r.makeTensorInfo([o],s.dtype,e)}if(2===n.shape.length){let e=e4(r.bufferSync(n),r.bufferSync(s),o,i);return r.makeTensorInfo(e.shape,s.dtype,e.values)}throw Error(`Error in denseBincount: input must be at most rank 2, but got rank${n.shape.length}.`)}};g("i64bB");var $=g("hl418"),I=g("jjNRA");const tC={kernelName:$.DepthToSpace,backendName:"cpu",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{x:n}=t,{blockSize:s,dataFormat:o}=a;I.assert("NHWC"===o,()=>`Only NHWC dataFormat supported on CPU for depthToSpace. Got ${o}`);let i=n.shape[0],l=n.shape[1],u=n.shape[2],p=n.shape[3],d=l*s,c=u*s,h=p/(s*s),f=r.data.get(n.dataId).values,m=new Float32Array(i*d*c*h),g=0;for(let e=0;e<i;++e)for(let t=0;t<d;++t){let r=Math.floor(t/s),a=t%s;for(let t=0;t<c;++t){let n=Math.floor(t/s),o=t%s,i=(a*s+o)*h;for(let t=0;t<h;++t){let a=t+i+p*(n+u*(r+l*e));m[g++]=f[a]}}}return r.makeTensorInfo([i,d,c,h],n.dtype,m)}};g("i64bB");var v=g("7MaPk"),$=g("hl418"),tp=g("9jCh7"),I=g("jjNRA");function tE(e){let{inputs:t,backend:r,attrs:a}=e,{x:n,filter:s}=t,{strides:o,pad:i,dilations:l,dimRoundingMode:u}=a;w([n,s],"depthwiseConv2DNative");let p=I.computeStrides(n.shape),d=I.computeStrides(s.shape),c=l;null==c&&(c=[1,1]),I.assert(v.eitherStridesOrDilationsAreOne(o,c),()=>`Error in depthwiseConv2d: Either strides or dilations must be 1. Got strides ${o} and dilations '${c}'`);let h=v.computeConv2DInfo(n.shape,s.shape,o,c,i,u,!0),{filterHeight:f,filterWidth:m,dilationHeight:g,dilationWidth:x,padInfo:y}=h,b=y.left,N=y.top,k=h.outChannels/h.inChannels,T=new(0,tp.TensorBuffer)(h.outShape,n.dtype),S=r.data.get(n.dataId).values,C=r.data.get(s.dataId).values,E=T.values;for(let e=0;e<h.batchSize;++e){let t=e*p[0],r=e*T.strides[0];for(let e=0;e<h.outHeight;++e){let a=r+e*T.strides[1],n=e*h.strideHeight-N;for(let e=0;e<f;++e){let r=n+e*g;if(r<0||r>=h.inHeight)continue;let s=e*d[0],o=t+r*p[1];for(let e=0;e<h.outWidth;++e){let t=a+e*T.strides[2],r=e*h.strideWidth-b;for(let e=0;e<m;++e){let a=r+e*x;if(a<0||a>=h.inWidth)continue;let n=s+e*d[1],i=o+a*h.inChannels,l=t,u=n;for(let e=0;e<h.inChannels;++e){let t=S[i+e];for(let e=0;e<k;++e)E[l+e]+=t*C[u+e];l+=k,u+=k}}}}}}return r.makeTensorInfo(T.shape,T.dtype,T.values)}const tA={kernelName:$.DepthwiseConv2dNative,backendName:"cpu",kernelFunc:tE};g("i64bB");var v=g("7MaPk"),$=g("hl418"),tp=g("9jCh7");const t$={kernelName:$.DepthwiseConv2dNativeBackpropFilter,backendName:"cpu",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{x:n,dy:s}=t,{strides:o,dilations:i,pad:l,dimRoundingMode:u,filterShape:p}=a;w([n,s],"depthwiseConv2dNativeBackpropFilter");let d=v.computeConv2DInfo(n.shape,p,o,i,l,u,!0),{strideHeight:c,strideWidth:h,filterHeight:f,filterWidth:m}=d,g=new(0,tp.TensorBuffer)(d.filterShape,"float32"),x=d.padInfo.left,y=d.padInfo.top,b=d.outChannels/d.inChannels,N=r.data.get(n.dataId).values,k=new(0,tp.TensorBuffer)(n.shape,n.dtype,N),T=r.data.get(s.dataId).values,S=new(0,tp.TensorBuffer)(s.shape,s.dtype,T);for(let e=0;e<f;++e){let t=Math.max(0,Math.ceil((y-e)/c)),r=Math.min(d.outHeight,(d.inHeight+y-e)/c);for(let a=0;a<m;++a){let n=Math.max(0,Math.ceil((x-a)/h)),s=Math.min(d.outWidth,(d.inWidth+x-a)/h);for(let o=0;o<d.outChannels;++o){let i=Math.trunc(o/b),l=o%b,u=0;for(let l=0;l<d.batchSize;++l)for(let p=t;p<r;++p){let t=e+p*c-y;for(let e=n;e<s;++e){let r=a+e*h-x;u+=k.get(l,t,r,i)*S.get(l,p,e,o)}}g.set(u,e,a,i,l)}}}return r.makeTensorInfo(g.shape,g.dtype,g.values)}};g("i64bB");var v=g("7MaPk"),$=g("hl418"),tp=g("9jCh7"),I=g("jjNRA");const tR={kernelName:$.DepthwiseConv2dNativeBackpropInput,backendName:"cpu",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{dy:n,filter:s}=t,{strides:o,dilations:i,pad:l,dimRoundingMode:u,inputShape:p}=a;w([n,s],"depthwiseConv2DNativeBackpropInput");let d=I.computeStrides(n.shape),c=I.computeStrides(s.shape),h=v.computeConv2DInfo(p,s.shape,o,i,l,u,!0),f=new(0,tp.TensorBuffer)(h.inShape,"float32"),m=f.values,[g,x,y]=f.strides,b=r.data.get(n.dataId).values,[N,k,T]=d,S=r.data.get(s.dataId).values,[C,E,A]=c,{batchSize:$,filterHeight:R,filterWidth:P,inChannels:B,inHeight:F,inWidth:O,outChannels:M,outHeight:D,outWidth:_,strideHeight:L,strideWidth:V}=h,G=R-1-h.padInfo.top,W=P-1-h.padInfo.left,z=M/B;for(let e=0;e<$;++e)for(let t=0;t<B;++t)for(let r=0;r<F;++r){let a=r-G,n=Math.max(0,Math.ceil(a/L)),s=Math.min(D,(R+a)/L);for(let o=0;o<O;++o){let i=o-W,l=Math.max(0,Math.ceil(i/V)),u=Math.min(_,(P+i)/V),p=0;for(let r=n;r<s;++r){let n=r*L-a;for(let a=l;a<u;++a){let s=a*V-i,o=N*e+k*r+T*a,l=C*(R-1-n)+E*(P-1-s)+A*t;for(let e=0;e<z;++e)p+=b[o+(t*z+e)]*S[l+e]}}m[g*e+x*r+y*o+t]=p}}return r.makeTensorInfo(f.shape,f.dtype,f.values)}};g("i64bB");var N=g("iG87S"),$=g("hl418"),I=g("jjNRA");const tP={kernelName:$.Diag,backendName:"cpu",kernelFunc:function(e){let{inputs:t,backend:r}=e,{x:a}=t,n=I.sizeFromShape(a.shape),s=r.data.get(a.dataId).values,o=(0,N.buffer)([n,n],a.dtype),i=o.values;for(let e=0;e<s.length;e++)i[e*n+e]=s[e];let l=[...a.shape,...a.shape];return r.makeTensorInfo(l,o.dtype,o.values)}};g("i64bB");var v=g("7MaPk"),$=g("hl418"),I=g("jjNRA");const tB={kernelName:$.Dilation2D,backendName:"cpu",kernelFunc:({inputs:e,backend:t,attrs:r})=>{let{x:a,filter:n}=e,{strides:s,pad:o,dilations:i}=r,l=t.data.get(a.dataId).values,u=a.shape.length,p=t.data.get(n.dataId).values,d=n.shape.length,{batchSize:c,inHeight:h,inWidth:f,inChannels:m,outHeight:g,outWidth:x,padInfo:y,strideHeight:b,strideWidth:N,filterHeight:k,filterWidth:T,dilationHeight:S,dilationWidth:w,outShape:C}=v.computeDilation2DInfo(a.shape,n.shape,s,o,"NHWC",i),E=I.sizeFromShape(C),A=C.length,$=I.getArrayFromDType(a.dtype,E);for(let e=0;e<c;++e)for(let t=0;t<g;++t){let r=t*b-y.top;for(let s=0;s<x;++s){let o=s*N-y.left;for(let i=0;i<m;++i){let c=Number.MIN_SAFE_INTEGER;for(let t=0;t<k;++t){let s=r+t*S;if(s>=0&&s<h)for(let r=0;r<T;++r){let h=o+r*w;if(h>=0&&h<f){let o=I.locToIndex([e,s,h,i],u,I.computeStrides(a.shape)),f=I.locToIndex([t,r,i],d,I.computeStrides(n.shape)),m=l[o]+p[f];m>c&&(c=m)}}}$[I.locToIndex([e,t,s,i],A,I.computeStrides(C))]=c}}}return{dataId:t.write(I.toTypedArray($,a.dtype),C,a.dtype),shape:C,dtype:a.dtype}}};g("i64bB");var v=g("7MaPk"),$=g("hl418"),I=g("jjNRA");const tF={kernelName:$.Dilation2DBackpropFilter,backendName:"cpu",kernelFunc:({inputs:e,backend:t,attrs:r})=>{let{x:a,filter:n,dy:s}=e,{strides:o,pad:i,dilations:l}=r,u=I.toNestedArray(a.shape,t.data.get(a.dataId).values),p=I.toNestedArray(n.shape,t.data.get(n.dataId).values),{batchSize:d,inHeight:c,inWidth:h,inChannels:f,outHeight:m,outWidth:g,padInfo:x,strideHeight:y,strideWidth:b,filterHeight:N,filterWidth:k,dilationHeight:T,dilationWidth:S,outShape:w}=v.computeDilation2DInfo(a.shape,n.shape,o,i,"NHWC",l);I.assert(s.rank===w.length,()=>`Error in ${$.Dilation2DBackpropFilter}, dy must have the same rank as output ${w.length}, but got ${s.rank}`);let C=I.toNestedArray(w,t.data.get(s.dataId).values),E=I.makeZerosNestedTypedArray(n.shape,n.dtype);for(let e=0;e<d;++e)for(let t=0;t<m;++t){let r=t*y-x.top;for(let a=0;a<g;++a){let n=a*b-x.left;for(let s=0;s<f;++s){let o=Number.MIN_SAFE_INTEGER,i=0,l=0;for(let t=0;t<N;++t){let a=r+t*T;if(a>=0&&a<c)for(let r=0;r<k;++r){let d=n+r*S;if(d>=0&&d<h){let n=u[e][a][d][s]+p[t][r][s];n>o&&(o=n,i=t,l=r)}}}E[i][l][s]+=C[e][t][a][s]}}}return{dataId:t.write(I.toTypedArray(E,a.dtype),n.shape,n.dtype),shape:n.shape,dtype:n.dtype}}};g("i64bB");var v=g("7MaPk"),$=g("hl418"),I=g("jjNRA");const tO={kernelName:$.Dilation2DBackpropInput,backendName:"cpu",kernelFunc:({inputs:e,backend:t,attrs:r})=>{let{x:a,filter:n,dy:s}=e,{strides:o,pad:i,dilations:l}=r,u=I.toNestedArray(a.shape,t.data.get(a.dataId).values),p=I.toNestedArray(n.shape,t.data.get(n.dataId).values),{batchSize:d,inHeight:c,inWidth:h,inChannels:f,outHeight:m,outWidth:g,padInfo:x,strideHeight:y,strideWidth:b,filterHeight:N,filterWidth:k,dilationHeight:T,dilationWidth:S,outShape:w}=v.computeDilation2DInfo(a.shape,n.shape,o,i,"NHWC",l);I.assert(s.rank===w.length,()=>`Error in ${$.Dilation2DBackpropInput}, dy must have the same rank as output ${w.length}, but got ${s.rank}`);let C=I.toNestedArray(w,t.data.get(s.dataId).values),E=I.makeZerosNestedTypedArray(a.shape,a.dtype);for(let e=0;e<d;++e)for(let t=0;t<m;++t){let r=t*y-x.top;for(let a=0;a<g;++a){let n=a*b-x.left;for(let s=0;s<f;++s){let o=Number.MIN_SAFE_INTEGER,i=r<0?0:r,l=n<0?0:n;for(let t=0;t<N;++t){let a=r+t*T;if(a>=0&&a<c)for(let r=0;r<k;++r){let d=n+r*S;if(d>=0&&d<h){let n=u[e][a][d][s]+p[t][r][s];n>o&&(o=n,i=a,l=d)}}}E[e][i][l][s]+=C[e][t][a][s]}}}return{dataId:t.write(I.toTypedArray(E,a.dtype),a.shape,a.dtype),shape:a.shape,dtype:a.dtype}}};g("i64bB");var $=g("hl418");const tM={kernelName:$.Draw,backendName:"cpu",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{image:n}=t,{canvas:s,options:o}=a,{contextOptions:i,imageOptions:l}=o||{},u=(null==l?void 0:l.alpha)||1,p=(null==i?void 0:i.contextType)||"2d";if("2d"!==p)throw Error(`Context type ${i.contextType} is not supported by the CPU backend.`);let d=s.getContext(p,(null==i?void 0:i.contextAttributes)||{});if(null==d)throw Error(`Could not get the context with ${p} type.`);let[c,h]=n.shape.slice(0,2),f=2===n.shape.length?1:n.shape[2],m=r.data.get(n.dataId).values,g="float32"===n.dtype?255:1,x=new Uint8ClampedArray(h*c*4);for(let e=0;e<c*h;++e){let t=[0,0,0,255*u];for(let r=0;r<f;r++){let a=m[e*f+r];if("float32"===n.dtype){if(a<0||a>1)throw Error(`Tensor values for a float32 Tensor must be in the range [0 - 1] but encountered ${a}.`)}else if("int32"===n.dtype&&(a<0||a>255))throw Error(`Tensor values for a int32 Tensor must be in the range [0 - 255] but encountered ${a}.`);1===f?(t[0]=a*g,t[1]=a*g,t[2]=a*g):t[r]=a*g}let r=4*e;x[r+0]=Math.round(t[0]),x[r+1]=Math.round(t[1]),x[r+2]=Math.round(t[2]),x[r+3]=Math.round(t[3])}s.width=h,s.height=c;let y=new ImageData(x,h,c);return d.putImageData(y,0,0),n}};g("i64bB");var v=g("7MaPk"),$=g("hl418"),I=g("jjNRA");g("i64bB");var $=g("hl418");const tD=V((e,t)=>e*t),t_=ei((e,t,r,a)=>({real:e*r-t*a,imag:e*a+t*r})),tL=eo($.Multiply,tD,t_),tV={kernelName:$.Multiply,backendName:"cpu",kernelFunc:tL};g("i64bB");var v=g("7MaPk"),$=g("hl418"),I=g("jjNRA");function tG(e){let t,{inputs:r,backend:a,attrs:n}=e,{x:s}=r,{axis:o,keepDims:i}=n;w(s,"sum");let l=(t="bool"===s.dtype?en({inputs:{x:s},backend:a,attrs:{dtype:"int32"}}):M({inputs:{x:s},backend:a})).shape.length,u=I.parseAxisParam(o,t.shape),p=v.getAxesPermutation(u,l),d=u,c=t;null!=p&&(c=ew({inputs:{x:t},backend:a,attrs:{perm:p}}),d=v.getInnerMostAxes(d.length,l)),v.assertAxesAreInnerMostDims("sum",d,c.shape.length);let[h,f]=v.computeOutAndReduceShapes(c.shape,d),m=ee(a,h,v.upcastType(c.dtype,"int32")),g=I.sizeFromShape(f),x=a.data.get(m.dataId).values,y=a.data.get(c.dataId).values;for(let e=0;e<x.length;++e){let t=e*g,r=0;for(let e=0;e<g;++e)r+=y[t+e];x[e]=r}if(i){let e=v.expandShapeToKeepDim(m.shape,u),t=m;m=eh({inputs:{x:m},backend:a,attrs:{shape:e}}),a.disposeIntermediateTensorInfo(t)}return a.disposeIntermediateTensorInfo(t),null!=p&&a.disposeIntermediateTensorInfo(c),m}const tW={kernelName:$.Sum,backendName:"cpu",kernelFunc:tG},tz={kernelName:$.Einsum,backendName:"cpu",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{equation:n}=a,{allDims:s,summedDims:o,idDims:i}=v.decodeEinsumEquation(n,t.length);v.checkEinsumDimSizes(s.length,i,t);let{path:l,steps:u}=v.getEinsumComputePath(o,i),p=u.length,d=null,c=s.length,h=[];for(let e=0;e<p;++e){for(let a of u[e]){let e,{permutationIndices:n,expandDims:s}=v.getEinsumPermutation(c,i[a]);v.isIdentityPermutation(n)?e=t[a]:(e=ew({inputs:{x:t[a]},backend:r,attrs:{perm:n}}),h.push(e));let o=e.shape.slice();for(let e=0;e<s.length;++e)o.splice(s[e],0,1);I.arraysEqual(e.shape,o)||(e=eh({inputs:{x:e},backend:r,attrs:{shape:o}}),h.push(e)),null===d?d=e:(d=tL({inputs:{a:e,b:d},backend:r}),h.push(d))}e<p-1&&(l[e]>=0&&(d=tG({inputs:{x:d},backend:r,attrs:{axis:l[e]-(s.length-c),keepDims:!1}}),h.push(d)),c--)}for(let e of h)e!==d&&r.disposeIntermediateTensorInfo(e);return d}};g("i64bB");var $=g("hl418"),I=g("jjNRA");const tj={kernelName:$.EluGrad,backendName:"cpu",kernelFunc:function(e){let{inputs:t,backend:r}=e,{dy:a,y:n}=t;w([a,n],"eluGrad");let s=new Float32Array(I.sizeFromShape(n.shape)),o=r.data.get(n.dataId).values,i=r.data.get(a.dataId).values;for(let e=0;e<o.length;++e){let t=o[e];t>=0?s[e]=i[e]:s[e]=i[e]*(t+1)}return r.makeTensorInfo(n.shape,"float32",s)}};g("i64bB");var $=g("hl418");const tU=V((e,t)=>+(e===t)),tq=eo($.Equal,tU,null,"bool"),tH={kernelName:$.Equal,backendName:"cpu",kernelFunc:tq};g("i64bB");var v=g("7MaPk"),$=g("hl418");const tK=v.ERF_P,tX=v.ERF_A1,tZ=v.ERF_A2,tY=v.ERF_A3,tQ=v.ERF_A4,tJ=v.ERF_A5,t0=P($.Erf,e=>{let t=Math.sign(e),r=Math.abs(e),a=1/(1+tK*r);return t*(1-((((tJ*a+tQ)*a+tY)*a+tZ)*a+tX)*a*Math.exp(-r*r))}),t1={kernelName:$.Erf,backendName:"cpu",kernelFunc:t0};g("i64bB");var $=g("hl418");const t2=R(e=>Math.exp(e)),t4=B($.Exp,t2,"float32"),t3={kernelName:$.Exp,backendName:"cpu",kernelFunc:t4};g("i64bB");var $=g("hl418"),I=g("jjNRA");function t8(e){let{inputs:t,backend:r,attrs:a}=e,{input:n}=t,{dim:s}=a,o=n.shape.length,i=n.shape.slice(),l=s;return s<0&&(I.assert(-(o+1)<=s,()=>`Axis must be in the interval [${-(o+1)}, ${o}]`),l=o+s+1),i.splice(l,0,1),eh({inputs:{x:n},backend:r,attrs:{shape:i}})}const t6={kernelName:$.ExpandDims,backendName:"cpu",kernelFunc:t8};g("i64bB");var $=g("hl418");const t5=R(e=>Math.expm1(e)),t7=B($.Expm1,t5),t9={kernelName:$.Expm1,backendName:"cpu",kernelFunc:t7};g("i64bB");var $=g("hl418"),I=g("jjNRA");g("i64bB");var v=g("7MaPk"),I=g("jjNRA");g("i64bB");var $=g("hl418");const re=V((e,t)=>e/t),rt=eo($.RealDiv,re),rr={kernelName:$.RealDiv,backendName:"cpu",kernelFunc:rt};g("i64bB");var $=g("hl418");const ra=V((e,t)=>e-t),rn=ei((e,t,r,a)=>({real:e-r,imag:t-a})),rs=eo($.Sub,ra,rn),ro={kernelName:$.Sub,backendName:"cpu",kernelFunc:rs};function ri(e,t,r){let a=e.shape,n=a[0],s=a[1],o=r.data.get(e.dataId),i=o.complexTensorInfos.real,l=o.complexTensorInfos.imag,u=[n,s],p=I.sizeFromShape(u),d=I.getTypedArrayFromDType("float32",p),c=I.getTypedArrayFromDType("float32",p);for(let e=0;e<n;e++){let a=eJ({inputs:{x:i},backend:r,attrs:{begin:[e,0],size:[1,s]}}),n=eJ({inputs:{x:l},backend:r,attrs:{begin:[e,0],size:[1,s]}}),o=Q({inputs:{real:a,imag:n},backend:r}),{real:u,imag:p}=function(e,t,r){var a;let n=I.sizeFromShape(e.shape),s=r.data.get(e.dataId),o=r.data.get(s.complexTensorInfos.real.dataId).values,i=r.data.get(s.complexTensorInfos.imag.dataId).values;if(((a=n)&a-1)==0){let a=function e(t,r,a,n,s){if(1===a)return{real:t,imag:r};let o=v.mergeRealAndImagArrays(t,r),i=a/2,l=v.complexWithEvenIndex(o),u=l.real,p=l.imag,d=[u.length],c=s.makeTensorInfo(d,"float32",u),h=s.makeTensorInfo(d,"float32",p),f=Q({inputs:{real:c,imag:h},backend:s}),m=v.complexWithOddIndex(o),g=m.real,x=m.imag,y=[g.length],b=s.makeTensorInfo(y,"float32",g),N=s.makeTensorInfo(y,"float32",x),k=Q({inputs:{real:b,imag:N},backend:s}),T=e(u,p,i,n,s),S=T.real,I=T.imag,w=[S.length],C=s.makeTensorInfo(w,"float32",S),E=s.makeTensorInfo(w,"float32",I),A=Q({inputs:{real:C,imag:E},backend:s}),$=e(g,x,i,n,s),R=$.real,P=$.imag,B=[R.length],F=s.makeTensorInfo(B,"float32",R),O=s.makeTensorInfo(B,"float32",P),M=Q({inputs:{real:F,imag:O},backend:s}),D=v.exponents(a,n),_=[D.real.length],L=s.makeTensorInfo(_,"float32",D.real),V=s.makeTensorInfo(_,"float32",D.imag),G=Q({inputs:{real:L,imag:V},backend:s}),W=tL({inputs:{a:G,b:M},backend:s}),z=ep({inputs:{a:A,b:W},backend:s}),j=rs({inputs:{a:A,b:W},backend:s}),U=et({inputs:{input:z},backend:s}),q=et({inputs:{input:j},backend:s}),H=to({inputs:{input:z},backend:s}),K=to({inputs:{input:j},backend:s}),X=tl({inputs:[U,q],backend:s,attrs:{axis:0}}),Z=tl({inputs:[H,K],backend:s,attrs:{axis:0}}),Y=s.data.get(X.dataId).values,J=s.data.get(Z.dataId).values;return s.disposeIntermediateTensorInfo(c),s.disposeIntermediateTensorInfo(h),s.disposeIntermediateTensorInfo(f),s.disposeIntermediateTensorInfo(b),s.disposeIntermediateTensorInfo(N),s.disposeIntermediateTensorInfo(k),s.disposeIntermediateTensorInfo(C),s.disposeIntermediateTensorInfo(E),s.disposeIntermediateTensorInfo(A),s.disposeIntermediateTensorInfo(F),s.disposeIntermediateTensorInfo(O),s.disposeIntermediateTensorInfo(M),s.disposeIntermediateTensorInfo(L),s.disposeIntermediateTensorInfo(V),s.disposeIntermediateTensorInfo(G),s.disposeIntermediateTensorInfo(W),s.disposeIntermediateTensorInfo(z),s.disposeIntermediateTensorInfo(j),s.disposeIntermediateTensorInfo(U),s.disposeIntermediateTensorInfo(H),s.disposeIntermediateTensorInfo(q),s.disposeIntermediateTensorInfo(K),s.disposeIntermediateTensorInfo(X),s.disposeIntermediateTensorInfo(Z),{real:Y,imag:J}}(o,i,n,t,r),s=[e.shape[0],e.shape[1]];if(t){let e=r.makeTensorInfo(s,"float32",a.real),t=r.makeTensorInfo(s,"float32",a.imag),o=r.makeTensorInfo([],"float32",I.createScalarValue(n,"float32")),i=M({inputs:{x:o},backend:r}),l=rr.kernelFunc({inputs:{a:e,b:o},backend:r}),u=rr.kernelFunc({inputs:{a:t,b:i},backend:r}),p=r.data.get(l.dataId).values,d=r.data.get(u.dataId).values;return r.disposeIntermediateTensorInfo(e),r.disposeIntermediateTensorInfo(t),r.disposeIntermediateTensorInfo(o),r.disposeIntermediateTensorInfo(i),r.disposeIntermediateTensorInfo(l),r.disposeIntermediateTensorInfo(u),{real:p,imag:d}}return a}{let e=function(e,t,r){let a=new Float32Array(2*t);for(let n=0;n<t;n++){let s=0,o=0;for(let a=0;a<t;a++){let i=v.exponent(n*a,t,r),l=v.getComplexWithIndex(e,a);s+=l.real*i.real-l.imag*i.imag,o+=l.real*i.imag+l.imag*i.real}r&&(s/=t,o/=t),v.assignToTypedArray(a,s,o,n)}return a}(v.mergeRealAndImagArrays(o,i),n,t);return v.splitRealAndImagArrays(e)}}(o,t,r),h=v.mergeRealAndImagArrays(u,p);for(let t=0;t<s;t++){let r=v.getComplexWithIndex(h,t);d[e*s+t]=r.real,c[e*s+t]=r.imag}r.disposeIntermediateTensorInfo(a),r.disposeIntermediateTensorInfo(n),r.disposeIntermediateTensorInfo(o)}let h=r.makeTensorInfo(u,"float32",d),f=r.makeTensorInfo(u,"float32",c),m=Q({inputs:{real:h,imag:f},backend:r});return r.disposeIntermediateTensorInfo(h),r.disposeIntermediateTensorInfo(f),m}const rl={kernelName:$.FFT,backendName:"cpu",kernelFunc:function(e){let{inputs:t,backend:r}=e,{input:a}=t,n=I.sizeFromShape(a.shape),s=a.shape[a.shape.length-1],o=eh({inputs:{x:a},backend:r,attrs:{shape:[n/s,s]}}),i=ri(o,!1,r),l=eh({inputs:{x:i},backend:r,attrs:{shape:a.shape}});return r.disposeIntermediateTensorInfo(o),r.disposeIntermediateTensorInfo(i),l}};g("i64bB");var $=g("hl418"),I=g("jjNRA");function ru(e){var t,r,a;let{backend:n,attrs:s}=e,{shape:o,value:i,dtype:l}=s,u=l||I.inferDtype(i),p=I.getArrayFromDType(u,I.sizeFromShape(o));return t=p,r=i,a=0,t.fill(r),n.makeTensorInfo(o,u,p)}const rp={kernelName:$.Fill,backendName:"cpu",kernelFunc:ru};g("i64bB");var $=g("hl418"),I=g("jjNRA");const rd={kernelName:$.FlipLeftRight,backendName:"cpu",kernelFunc:({inputs:e,attrs:t,backend:r})=>{let{image:a}=e,n=I.getTypedArrayFromDType(a.dtype,I.sizeFromShape(a.shape)),[s,o,i,l]=a.shape,u=r.data.get(a.dataId).values;for(let e=0;e<s;e++){let t=e*i*o*l;for(let e=0;e<o;e++){let r=i*l*e;for(let e=0;e<i;e++){let a=e*l;for(let s=0;s<l;s++){let o=Math.round(i-e-1),p=t+r+a+s,d=u[p];o>=0&&o<i&&(d=u[t+r+o*l+s]),n[p]=d}}}}return{dataId:r.write(n,a.shape,a.dtype),shape:a.shape,dtype:a.dtype}}};g("i64bB");var $=g("hl418");const rc=R(e=>Math.floor(e)),rh=B($.Floor,rc),rf={kernelName:$.Floor,backendName:"cpu",kernelFunc:rh};g("i64bB");var $=g("hl418");const rm=V((e,t)=>Math.floor(e/t)),rg=eo($.FloorDiv,rm,null,"int32"),rx={kernelName:$.FloorDiv,backendName:"cpu",kernelFunc:rg};g("i64bB");var $=g("hl418");const ry={kernelName:$.FusedConv2D,backendName:"cpu",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{x:n,filter:s,bias:o,preluActivationWeights:i}=t,{strides:l,pad:u,dataFormat:p,dilations:d,dimRoundingMode:c,activation:h,leakyreluAlpha:f}=a,m=td({inputs:{x:n,filter:s},backend:r,attrs:{strides:l,pad:u,dataFormat:p,dilations:d,dimRoundingMode:c}});if(o){let e=m;if("NCHW"===p&&1===o.shape.length&&1!==o.shape[0]){let e=eh({inputs:{x:o},backend:r,attrs:{shape:[o.shape[0],1,1]}});m=ep({inputs:{a:m,b:e},backend:r}),r.disposeIntermediateTensorInfo(e)}else m=ep({inputs:{a:m,b:o},backend:r});r.disposeIntermediateTensorInfo(e)}if(h){let e=m;if("NCHW"===p&&"prelu"===h&&1===i.shape.length&&1!==i.shape[0]){let e=eh({inputs:{x:i},backend:r,attrs:{shape:[i.shape[0],1,1]}});m=Y(r,m,h,e,f),r.disposeIntermediateTensorInfo(e)}else m=Y(r,m,h,i,f);r.disposeIntermediateTensorInfo(e)}return m}};g("i64bB");var $=g("hl418");const rb={kernelName:$.FusedDepthwiseConv2D,backendName:"cpu",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{x:n,filter:s,bias:o,preluActivationWeights:i}=t,{strides:l,pad:u,dataFormat:p,dilations:d,dimRoundingMode:c,activation:h,leakyreluAlpha:f}=a,m=tE({inputs:{x:n,filter:s},backend:r,attrs:{strides:l,pad:u,dataFormat:p,dilations:d,dimRoundingMode:c}});if(o){let e=m;m=ep({inputs:{a:m,b:o},backend:r}),r.disposeIntermediateTensorInfo(e)}if(h){let e=m;m=Y(r,m,h,i,f),r.disposeIntermediateTensorInfo(e)}return m}};g("i64bB");var v=g("7MaPk"),$=g("hl418"),I=g("jjNRA");g("i64bB");var N=g("iG87S");function rv(e,t,r,a,n,s,o,i,l){let u=(0,N.buffer)([a,s],r);for(let r=0;r<a;r++){let a=[],p=0;for(let t=0;t<n;t++){let s=e[r*n+t];p+=s*o[t],a.push(s)}if(p<0||p>=l/s)throw Error(`Invalid indices: ${a} does not index into ${i}`);for(let e=0;e<s;e++)u.values[r*s+e]=t.get(...t.indexToLoc(p*s+e))}return u}const rN={kernelName:$.GatherNd,backendName:"cpu",kernelFunc:function(e){let{inputs:t,backend:r}=e,{params:a,indices:n}=t,s=I.sizeFromShape(a.shape),o=n.shape,i=o[o.length-1],[l,u,p,d]=v.prepareAndValidate(a,n);if(0===u)return r.makeTensorInfo(l,a.dtype,[]);let c=rv(r.data.get(n.dataId).values,r.bufferSync(a),a.dtype,u,i,p,d,a.shape,s);return r.makeTensorInfo(l,a.dtype,c.values)}};g("i64bB");var v=g("7MaPk"),$=g("hl418"),I=g("jjNRA");g("i64bB");var N=g("iG87S");function rk(e,t,r){let a=(0,N.buffer)(r,e.dtype);for(let r=0;r<a.size;++r){let n=a.indexToLoc(r).slice(),s=n[0],o=n[2],i=t.locToIndex([s,o]);n[2]=t.values[i];let l=e.locToIndex(n);0<=l&&l<e.values.length&&(a.values[r]=e.values[l])}return a}const rT={kernelName:$.GatherV2,backendName:"cpu",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{x:n,indices:s}=t,{axis:o,batchDims:i}=a;w([n,s],"gatherV2");let l=I.parseAxisParam(o,n.shape)[0],u=r.data.get(s.dataId).values,p=n.shape[l];for(let e=0;e<u.length;++e){let t=u[e];I.assert(t<=p-1&&t>=0,()=>`GatherV2: the index value ${t} is not in [0, ${p-1}]`)}let d=i;null==i&&(d=0);let c=I.sizeFromShape(s.shape),h=v.segment_util.collectGatherOpShapeInfo(n,s,l,d),f=eh({inputs:{x:n},backend:r,attrs:{shape:[h.batchSize,h.outerSize,h.dimSize,h.sliceSize]}}),m=eh({inputs:{x:s},backend:r,attrs:{shape:[h.batchSize,c/h.batchSize]}}),g=[h.batchSize,h.outerSize,c/h.batchSize,h.sliceSize],x=r.bufferSync(m),y=rk(r.bufferSync(f),x,g);return r.disposeIntermediateTensorInfo(f),r.disposeIntermediateTensorInfo(m),r.makeTensorInfo(h.outputShape,y.dtype,y.values)}};g("i64bB");var $=g("hl418");const rS=V((e,t)=>+(e>t)),rI=eo($.Greater,rS,null,"bool"),rw={kernelName:$.Greater,backendName:"cpu",kernelFunc:rI};g("i64bB");var $=g("hl418");const rC=V((e,t)=>+(e>=t)),rE=eo($.GreaterEqual,rC,null,"bool"),rA={kernelName:$.GreaterEqual,backendName:"cpu",kernelFunc:rE};g("i64bB");var $=g("hl418"),I=g("jjNRA");const r$={kernelName:$.IFFT,backendName:"cpu",kernelFunc:function(e){let{inputs:t,backend:r}=e,{input:a}=t,n=I.sizeFromShape(a.shape),s=a.shape[a.shape.length-1],o=eh({inputs:{x:a},backend:r,attrs:{shape:[n/s,s]}}),i=ri(o,!0,r),l=eh({inputs:{x:i},backend:r,attrs:{shape:a.shape}});return r.disposeIntermediateTensorInfo(o),r.disposeIntermediateTensorInfo(i),l}};g("i64bB");var $=g("hl418");const rR=P($.IsFinite,e=>+!!Number.isFinite(e),"bool"),rP={kernelName:$.IsFinite,backendName:"cpu",kernelFunc:rR};g("i64bB");var $=g("hl418");const rB=P($.IsInf,e=>+(Math.abs(e)===1/0),"bool"),rF={kernelName:$.IsInf,backendName:"cpu",kernelFunc:rB};g("i64bB");var $=g("hl418");const rO=P($.IsNan,e=>+!!Number.isNaN(e),"bool"),rM={kernelName:$.IsNan,backendName:"cpu",kernelFunc:rO};g("i64bB");var $=g("hl418");const rD=V((e,t)=>+(e<t)),r_=eo($.Less,rD,null,"bool"),rL={kernelName:$.Less,backendName:"cpu",kernelFunc:r_};g("i64bB");var $=g("hl418");const rV=V((e,t)=>+(e<=t)),rG=eo($.LessEqual,rV,null,"bool"),rW={kernelName:$.LessEqual,backendName:"cpu",kernelFunc:rG};g("i64bB");var $=g("hl418");g("i64bB");var I=g("jjNRA");function rz(e,t,r){let a=(t-e)/(r-1),n=I.makeZerosTypedArray(r,"float32");n[0]=e;for(let e=1;e<n.length;e++)n[e]=n[e-1]+a;return n}const rj={kernelName:$.LinSpace,backendName:"cpu",kernelFunc:function(e){let{backend:t,attrs:r}=e,{start:a,stop:n,num:s}=r,o=rz(a,n,s);return t.makeTensorInfo([o.length],"float32",o)}};g("i64bB");var $=g("hl418");const rU=R(e=>Math.log(e)),rq=B($.Log,rU),rH={kernelName:$.Log,backendName:"cpu",kernelFunc:rq};g("i64bB");var $=g("hl418");const rK=P($.Log1p,e=>Math.log1p(e)),rX={kernelName:$.Log1p,backendName:"cpu",kernelFunc:rK};g("i64bB");var $=g("hl418");const rZ=V((e,t)=>e&&t),rY=eo($.LogicalAnd,rZ,null,"bool"),rQ={kernelName:$.LogicalAnd,backendName:"cpu",kernelFunc:rY};g("i64bB");var $=g("hl418");const rJ=P($.LogicalNot,e=>+!e,"bool"),r0={kernelName:$.LogicalNot,backendName:"cpu",kernelFunc:rJ};g("i64bB");var $=g("hl418");const r1=V((e,t)=>e||t),r2=eo($.LogicalOr,r1,null,"bool"),r4={kernelName:$.LogicalOr,backendName:"cpu",kernelFunc:r2};g("i64bB");var $=g("hl418"),I=g("jjNRA");const r3={kernelName:$.LRN,backendName:"cpu",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{x:n}=t,{depthRadius:s,bias:o,alpha:i,beta:l}=a;w(n,"LRN");let u=n.shape[3],p=u-1,d=r.data.get(n.dataId).values,c=I.sizeFromShape(n.shape),h=new Float32Array(c);for(let e=0;e<c;e++){let t=function(e){let t=e%u,r=e-t+Math.max(0,t-s),a=e-t+Math.min(t+s,p),n=0;for(;r<=a;r++){let e=d[r];n+=e*e}return n}(e),r=d[e]*Math.pow(o+i*t,-l);h[e]=r}return r.makeTensorInfo(n.shape,n.dtype,h)}};g("i64bB");var $=g("hl418"),I=g("jjNRA");const r8={kernelName:$.LRNGrad,backendName:"cpu",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{x:n,y:s,dy:o}=t,{depthRadius:i,bias:l,alpha:u,beta:p}=a;w(o,"LRNGrad");let d=I.sizeFromShape(o.shape),c=o.shape[3],h=r.data.get(o.dataId).values,f=r.data.get(n.dataId).values,m=r.data.get(s.dataId).values,g=new Float32Array(d);for(let e=0;e<d;e++){let t=e%c,r=e-t+Math.max(0,t-i),a=e-t+Math.min(c,t+i+1),n=0;for(let e=r;e<a;e++)n+=Math.pow(f[e],2);n=u*n+l;for(let t=r;t<a;t++){let r=-2*u*p*f[t]*m[e]/n;e===t&&(r+=Math.pow(n,-p)),r*=h[e],g[t]+=r}}return r.makeTensorInfo(o.shape,n.dtype,g)}};g("i64bB");var v=g("7MaPk"),$=g("hl418"),I=g("jjNRA");g("i64bB");var I=g("jjNRA");function r6(e,t,r,a){let n=I.getTypedArrayFromDType(a,I.sizeFromShape(r));for(let r=0;r<n.length;++r){let a=r*t,s=e[a];for(let r=0;r<t;++r){let t=e[a+r];(Number.isNaN(t)||t>s)&&(s=t)}n[r]=s}return n}function r5(e){let{inputs:t,backend:r,attrs:a}=e,{x:n}=t,{reductionIndices:s,keepDims:o}=a,i=n.shape,l=i.length,u=I.parseAxisParam(s,i),p=u,d=v.getAxesPermutation(p,l),c=r.data.get(n.dataId).values;if(null!=d){let e=Array(l);for(let t=0;t<e.length;t++)e[t]=i[d[t]];c=eI(c,i,n.dtype,d,e),p=v.getInnerMostAxes(p.length,l),i=e}w(n,"max"),v.assertAxesAreInnerMostDims("max",p,l);let[h,f]=v.computeOutAndReduceShapes(i,p),m=r6(c,I.sizeFromShape(f),h,n.dtype),g=r.write(m,h,n.dtype),x=h;return o&&(x=v.expandShapeToKeepDim(h,u)),{dataId:g,shape:x,dtype:n.dtype}}const r7={kernelName:$.Max,backendName:"cpu",kernelFunc:r5};g("i64bB");var $=g("hl418");const r9=V((e,t)=>Math.max(e,t)),ae=eo($.Maximum,r9),at={kernelName:$.Maximum,backendName:"cpu",kernelFunc:ae};g("i64bB");var v=g("7MaPk"),$=g("hl418"),I=g("jjNRA");const ar={kernelName:$.MaxPool,backendName:"cpu",kernelFunc:function(e){let t,{inputs:r,backend:a,attrs:n}=e,{x:s}=r;w(s,"maxPool");let{filterSize:o,strides:i,pad:l,dimRoundingMode:u}=n;I.assert(v.eitherStridesOrDilationsAreOne(i,1),()=>`Error in maxPool: Either strides or dilations must be 1. Got strides ${i} and dilations '1'`);let p=v.computePool2DInfo(s.shape,o,i,1,l,u);if(1===p.filterWidth&&1===p.filterHeight&&I.arraysEqual(p.inShape,p.outShape))t=M({inputs:{x:s},backend:a});else{let e=a.data.get(s.dataId).values,r=I.computeStrides(s.shape),n=ez(e,s.shape,s.dtype,r,p,"max");t=a.makeTensorInfo(p.outShape,s.dtype,n.values)}return t}};g("i64bB");var v=g("7MaPk"),$=g("hl418"),I=g("jjNRA");const aa={kernelName:$.MaxPool3D,backendName:"cpu",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{x:n}=t,{filterSize:s,strides:o,pad:i,dimRoundingMode:l,dataFormat:u}=a;w(n,"maxPool3d");let p=v.computePool3DInfo(n.shape,s,o,1,i,l,u),d=eU(r.data.get(n.dataId).values,n.shape,n.dtype,I.computeStrides(n.shape),p,"max");return r.makeTensorInfo(d.shape,"float32",d.values)}};g("i64bB");var v=g("7MaPk"),N=g("iG87S"),$=g("hl418");const an={kernelName:$.MaxPool3DGrad,backendName:"cpu",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{dy:n,input:s}=t,{filterSize:o,strides:i,pad:l,dimRoundingMode:u}=a;w([n,s],"maxPool3DGrad");let p=v.computePool3DInfo(s.shape,o,i,1,l,u),d=function(e,t){let r=(0,N.buffer)(t.outShape,"int32"),a=t.strideDepth,n=t.strideHeight,s=t.strideWidth,o=t.dilationDepth,i=t.dilationHeight,l=t.dilationWidth,u=t.effectiveFilterDepth,p=t.effectiveFilterHeight,d=t.effectiveFilterWidth,c=t.padInfo.front,h=t.padInfo.top,f=t.padInfo.left;for(let m=0;m<t.batchSize;++m)for(let g=0;g<t.inChannels;++g)for(let x=0;x<t.outDepth;++x){let y=x*a-c,b=y;for(;b<0;)b+=o;let v=Math.min(t.inDepth,u+y);for(let a=0;a<t.outHeight;++a){let u=a*n-h,c=u;for(;c<0;)c+=i;let N=Math.min(t.inHeight,p+u);for(let n=0;n<t.outWidth;++n){let h=n*s-f,k=h;for(;k<0;)k+=l;let T=Math.min(t.inWidth,d+h),S=Number.NEGATIVE_INFINITY,I=-1;for(let t=b;t<v;t+=o){let r=t-y;for(let a=c;a<N;a+=i){let n=a-u;for(let s=k;s<T;s+=l){let o=s-h,i=e.get(m,t,a,s,g);i>=S&&(S=i,I=r*p*d+n*p+o)}}}r.set(I,m,x,a,n,g)}}}return r}(r.bufferSync(s),p),c=p.strideDepth,h=p.strideHeight,f=p.strideWidth,m=p.dilationDepth,g=p.dilationHeight,x=p.dilationWidth,y=p.effectiveFilterDepth,b=p.effectiveFilterHeight,k=p.effectiveFilterWidth,T=y-1-p.padInfo.front,S=k-1-p.padInfo.left,I=b-1-p.padInfo.top,C=(0,N.buffer)(s.shape,"float32"),E=r.bufferSync(n);for(let e=0;e<p.batchSize;++e)for(let t=0;t<p.inChannels;++t)for(let r=0;r<p.inDepth;++r)for(let a=0;a<p.inHeight;++a)for(let n=0;n<p.inWidth;++n){let s=r-T,o=a-I,i=n-S,l=0;for(let r=0;r<y;r+=m){let a=(s+r)/c;if(!(a<0)&&!(a>=p.outDepth)&&Math.floor(a)===a)for(let n=0;n<b;n+=g){let s=(o+n)/h;if(!(s<0)&&!(s>=p.outHeight)&&Math.floor(s)===s)for(let o=0;o<k;o+=x){let u=(i+o)/f;if(u<0||u>=p.outWidth||Math.floor(u)!==u)continue;let c=+(y*b*k-1-d.get(e,a,s,u,t)===r*b*k+n*k+o);0!==c&&(l+=E.get(e,a,s,u,t)*c)}}}C.set(l,e,r,a,n,t)}return r.makeTensorInfo(C.shape,C.dtype,C.values)}};g("i64bB");var v=g("7MaPk"),N=g("iG87S"),$=g("hl418");const as={kernelName:$.MaxPoolGrad,backendName:"cpu",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{dy:n,input:s,output:o}=t;w([s,o],"maxPoolGrad");let{filterSize:i,strides:l,pad:u,dimRoundingMode:p}=a,d=v.computePool2DInfo(s.shape,i,l,1,u,p),c=r.data.get(s.dataId).values,h=(0,N.buffer)(d.outShape,s.dtype,ej(c,s.shape,s.dtype,d).values),f=d.strideHeight,m=d.strideWidth,g=d.dilationHeight,x=d.dilationWidth,y=d.effectiveFilterHeight,b=d.effectiveFilterWidth,k=b-1-d.padInfo.left,T=y-1-d.padInfo.top,S=(0,N.buffer)(s.shape,"float32"),I=r.data.get(n.dataId).values,C=(0,N.buffer)(n.shape,"float32",I);for(let e=0;e<d.batchSize;++e)for(let t=0;t<d.inChannels;++t)for(let r=0;r<d.inHeight;++r)for(let a=0;a<d.inWidth;++a){let n=r-T,s=a-k,o=0;for(let r=0;r<y;r+=g){let a=(n+r)/f;if(!(a<0)&&!(a>=d.outHeight)&&Math.floor(a)===a)for(let n=0;n<b;n+=x){let i=(s+n)/m;if(i<0||i>=d.outWidth||Math.floor(i)!==i)continue;let l=+(y*b-1-h.get(e,a,i,t)===r*b+n);0!==l&&(o+=C.get(e,a,i,t)*l)}}S.set(o,e,r,a,t)}return r.makeTensorInfo(S.shape,S.dtype,S.values)}};g("i64bB");var v=g("7MaPk"),$=g("hl418");g("i64bB");var I=g("jjNRA");const ao={kernelName:$.MaxPoolWithArgmax,backendName:"cpu",kernelFunc:({inputs:e,attrs:t,backend:r})=>{let{x:a}=e,{filterSize:n,strides:s,pad:o,includeBatchInIndex:i}=t;w(a,"MaxPoolWithArgmax");let l=r.data.get(a.dataId).values,u=v.computePool2DInfo(a.shape,n,s,[1,1],o),[p,d]=function(e,t,r,a,n){let s=I.computeStrides(t),o=ez(e,t,r,s,n,"max"),i=ej(e,t,r,n,!0,a);return[o.values,i.values]}(l,a.shape,a.dtype,i,u),c=r.write(p,u.outShape,a.dtype),h=r.write(d,u.outShape,a.dtype);return[{dataId:c,shape:u.outShape,dtype:a.dtype},{dataId:h,shape:u.outShape,dtype:"int32"}]}};g("i64bB");var v=g("7MaPk"),$=g("hl418"),I=g("jjNRA");const ai={kernelName:$.Mean,backendName:"cpu",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{x:n}=t,{axis:s,keepDims:o}=a,i=I.parseAxisParam(s,n.shape),l=v.computeOutAndReduceShapes(n.shape,i)[1],u=I.sizeFromShape(l),p=[],d=r.makeTensorInfo([],"float32",new Float32Array([u]));p.push(d);let c=en({inputs:{x:n},backend:r,attrs:{dtype:"float32"}});p.push(c);let h=rt({inputs:{a:c,b:d},backend:r});p.push(h);let f=tG({inputs:{x:h},backend:r,attrs:{axis:s,keepDims:o}});return p.forEach(e=>r.disposeIntermediateTensorInfo(e)),f}};g("i64bB");var v=g("7MaPk"),$=g("hl418"),I=g("jjNRA");const al={kernelName:$.Min,backendName:"cpu",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{x:n}=t,{axis:s,keepDims:o}=a;w(n,"min");let i=I.parseAxisParam(s,n.shape),l=i,u=v.getAxesPermutation(l,n.shape.length),p=n;null!=u&&(p=ew({inputs:{x:n},backend:r,attrs:{perm:u}}),l=v.getInnerMostAxes(l.length,n.shape.length)),v.assertAxesAreInnerMostDims("min",l,p.shape.length);let[d,c]=v.computeOutAndReduceShapes(p.shape,l),h=I.sizeFromShape(c),f=I.makeZerosTypedArray(I.sizeFromShape(d),p.dtype),m=r.data.get(p.dataId).values;for(let e=0;e<f.length;++e){let t=e*h,r=m[t];for(let e=0;e<h;++e){let a=m[t+e];(Number.isNaN(a)||a<r)&&(r=a)}f[e]=r}null!=u&&r.disposeIntermediateTensorInfo(p);let g=r.makeTensorInfo(d,p.dtype,f);if(o){let e=eh({inputs:{x:g},backend:r,attrs:{shape:v.expandShapeToKeepDim(d,i)}});return r.disposeIntermediateTensorInfo(g),e}return g}};g("i64bB");var $=g("hl418");const au=V((e,t)=>Math.min(e,t)),ap=eo($.Minimum,au),ad={kernelName:$.Minimum,backendName:"cpu",kernelFunc:ap};g("i64bB");var $=g("hl418"),I=g("jjNRA");const ac={kernelName:$.MirrorPad,backendName:"cpu",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{x:n}=t,{paddings:s,mode:o}=a;w(n,"mirrorPad");let i=s.map((e,t)=>e[0]+n.shape[t]+e[1]),l=s.map(e=>e[0]),u=s.map((e,t)=>e[0]+n.shape[t]),p=+("reflect"!==o),d=r.data.get(n.dataId).values,c=n.shape.length,h=I.computeStrides(n.shape),f=I.sizeFromShape(i),m=i.length,g=I.computeStrides(i),x=I.getTypedArrayFromDType(n.dtype,f);for(let e=0;e<f;e++){let t=I.indexToLoc(e,m,g);for(let e=0;e<m;e++)t[e]<l[e]?t[e]=2*l[e]-t[e]-p:t[e]>=u[e]&&(t[e]=(u[e]-1)*2-t[e]+p);t=t.map((e,t)=>e-l[t]);let r=I.locToIndex(t,c,h);x[e]=d[r]}return{dataId:r.write(x,i,n.dtype),shape:i,dtype:n.dtype}}};g("i64bB");var $=g("hl418");const ah=V((e,t)=>{let r=e%t;return e<0&&t<0||e>=0&&t>=0?r:(r+t)%t}),af=eo($.Mod,ah),am={kernelName:$.Mod,backendName:"cpu",kernelFunc:af};g("i64bB");var $=g("hl418"),I=g("jjNRA"),ag=g("3mnBW");g("i64bB");var v=g("7MaPk"),$=g("hl418"),I=g("jjNRA");function ax(e){let{inputs:t,backend:r,attrs:a}=e,{logits:n}=t,{dim:s}=a,o=n.shape.length,i=s;if(-1===i&&(i=o-1),i!==o-1)throw Error(`Softmax along a non-last dimension is not yet supported. Logits was rank ${o} and dim was ${i}`);let l=I.parseAxisParam([i],n.shape),u=r5({inputs:{x:n},backend:r,attrs:{reductionIndices:l,keepDims:!1}}),p=v.expandShapeToKeepDim(u.shape,l),d=eh({inputs:{x:u},backend:r,attrs:{shape:p}}),c=rs({inputs:{a:n,b:d},backend:r}),h=t4({inputs:{x:c},backend:r}),f=tG({inputs:{x:h},backend:r,attrs:{axis:l,keepDims:!1}}),m=eh({inputs:{x:f},backend:r,attrs:{shape:p}}),g=rt({inputs:{a:h,b:m},backend:r});return r.disposeIntermediateTensorInfo(u),r.disposeIntermediateTensorInfo(d),r.disposeIntermediateTensorInfo(c),r.disposeIntermediateTensorInfo(h),r.disposeIntermediateTensorInfo(f),r.disposeIntermediateTensorInfo(m),g}const ay={kernelName:$.Softmax,backendName:"cpu",kernelFunc:ax},ab={kernelName:$.Multinomial,backendName:"cpu",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{logits:n}=t,{numSamples:s,seed:o,normalized:i}=a;w(n,"multinomial");let l=i?n:ax({inputs:{logits:n},backend:r,attrs:{dim:-1}}),u=l.shape[0],p=l.shape[1],d=r.data.get(l.dataId).values,c=[u,s],h=I.makeZerosTypedArray(I.sizeFromShape(c),"int32");for(let e=0;e<u;++e){let t=e*p,r=new Float32Array(p-1);r[0]=d[t];for(let e=1;e<r.length;++e)r[e]=r[e-1]+d[t+e];let a=ag.alea(o.toString()),n=e*s;for(let e=0;e<s;++e){let t=a();h[n+e]=r.length;for(let a=0;a<r.length;a++)if(t<r[a]){h[n+e]=a;break}}}return i||r.disposeIntermediateTensorInfo(l),r.makeTensorInfo(c,"int32",h)}};g("i64bB");var $=g("hl418"),I=g("jjNRA");function av(e,t,r){return tD([],t,I.createScalarValue(-1,r),e,r)}const aN={kernelName:$.Neg,backendName:"cpu",kernelFunc:function(e){let{inputs:t,backend:r}=e,{x:a}=t;w(a,"neg");let[n,s]=av(r.data.get(a.dataId).values,a.shape,a.dtype);return r.makeTensorInfo(s,a.dtype,n)}};g("i64bB");var S=g("lzjc8"),$=g("hl418");const ak=S.nonMaxSuppressionV3Impl,aT={kernelName:$.NonMaxSuppressionV3,backendName:"cpu",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{boxes:n,scores:s}=t,{maxOutputSize:o,iouThreshold:i,scoreThreshold:l}=a;w(n,"NonMaxSuppression");let{selectedIndices:u}=ak(r.data.get(n.dataId).values,r.data.get(s.dataId).values,o,i,l);return r.makeTensorInfo([u.length],"int32",new Int32Array(u))}};g("i64bB");var S=g("lzjc8"),$=g("hl418");const aS=S.nonMaxSuppressionV4Impl,aI={kernelName:$.NonMaxSuppressionV4,backendName:"cpu",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{boxes:n,scores:s}=t,{maxOutputSize:o,iouThreshold:i,scoreThreshold:l,padToMaxOutputSize:u}=a;w(n,"NonMaxSuppressionPadded");let{selectedIndices:p,validOutputs:d}=aS(r.data.get(n.dataId).values,r.data.get(s.dataId).values,o,i,l,u);return[r.makeTensorInfo([p.length],"int32",new Int32Array(p)),r.makeTensorInfo([],"int32",new Int32Array([d]))]}};g("i64bB");var S=g("lzjc8"),$=g("hl418");const aw=S.nonMaxSuppressionV5Impl,aC={kernelName:$.NonMaxSuppressionV5,backendName:"cpu",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{boxes:n,scores:s}=t,{maxOutputSize:o,iouThreshold:i,scoreThreshold:l,softNmsSigma:u}=a;w(n,"NonMaxSuppressionWithScore");let p=r.data.get(n.dataId).values,{selectedIndices:d,selectedScores:c}=aw(p,r.data.get(s.dataId).values,o,i,l,u);return[r.makeTensorInfo([d.length],"int32",new Int32Array(d)),r.makeTensorInfo([c.length],"float32",new Float32Array(c))]}};g("i64bB");var $=g("hl418");const aE=V((e,t)=>+(e!==t)),aA=eo($.NotEqual,aE,null,"bool"),a$={kernelName:$.NotEqual,backendName:"cpu",kernelFunc:aA};g("i64bB");var $=g("hl418"),I=g("jjNRA");const aR={kernelName:$.OneHot,backendName:"cpu",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{indices:n}=t,{dtype:s,depth:o,onValue:i,offValue:l}=a;w(n,"oneHot");let u=I.sizeFromShape(n.shape),p=new Float32Array(u*o);p.fill(l);let d=r.data.get(n.dataId).values;for(let e=0;e<u;++e)d[e]>=0&&d[e]<o&&(p[e*o+d[e]]=i);return r.makeTensorInfo([...n.shape,o],s,p)}};g("i64bB");var $=g("hl418");g("i64bB");var $=g("hl418");function aP(e){let{inputs:t,backend:r}=e,{x:a}=t;if("string"===a.dtype)throw Error("zerosLike is not supported for string tensors");if("complex64"!==a.dtype)return ru({backend:r,attrs:{shape:a.shape,value:0,dtype:a.dtype}});{let e=et({inputs:{input:a},backend:r}),t=aP({inputs:{x:e},backend:r}),n=to({inputs:{input:a},backend:r}),s=aP({inputs:{x:n},backend:r}),o=Q({inputs:{real:t,imag:s},backend:r});return r.disposeIntermediateTensorInfo(e),r.disposeIntermediateTensorInfo(t),r.disposeIntermediateTensorInfo(n),r.disposeIntermediateTensorInfo(s),o}}const aB={kernelName:$.ZerosLike,backendName:"cpu",kernelFunc:aP},aF={kernelName:$.OnesLike,backendName:"cpu",kernelFunc:function e(t){let{inputs:r,backend:a}=t,{x:n}=r;if("string"===n.dtype)throw Error("onesLike is not supported for string tensors");if("complex64"!==n.dtype)return ru({backend:a,attrs:{shape:n.shape,value:1,dtype:n.dtype}});{let t=et({inputs:{input:n},backend:a}),r=e({inputs:{x:t},backend:a}),s=to({inputs:{input:n},backend:a}),o=aP({inputs:{x:s},backend:a}),i=Q({inputs:{real:r,imag:o},backend:a});return a.disposeIntermediateTensorInfo(t),a.disposeIntermediateTensorInfo(r),a.disposeIntermediateTensorInfo(s),a.disposeIntermediateTensorInfo(o),i}}};g("i64bB");var $=g("hl418"),I=g("jjNRA");function aO(e){let{inputs:t,backend:r,attrs:a}=e,{axis:n}=a;if(1===t.length)return t8({inputs:{input:t[0]},backend:r,attrs:{dim:n}});let s=t[0].shape,o=t[0].dtype;t.forEach(e=>{I.assertShapesMatch(s,e.shape,"All tensors passed to stack must have matching shapes"),I.assert(o===e.dtype,()=>"All tensors passed to stack must have matching dtypes")});let i=[],l=tl({inputs:t.map(e=>{let t=t8({inputs:{input:e},backend:r,attrs:{dim:n}});return i.push(t),t}),backend:r,attrs:{axis:n}});return i.forEach(e=>r.disposeIntermediateTensorInfo(e)),l}const aM={kernelName:$.Pack,backendName:"cpu",kernelFunc:aO};g("i64bB");var $=g("hl418"),I=g("jjNRA");const aD={kernelName:$.PadV2,backendName:"cpu",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{x:n}=t,{paddings:s,constantValue:o}=a;w(n,"pad");let i=s.map((e,t)=>e[0]+n.shape[t]+e[1]),l=s.map(e=>e[0]),u=r.data.get(n.dataId).values,p=I.sizeFromShape(n.shape),d=n.shape.length,c=I.computeStrides(n.shape),h=I.sizeFromShape(i),f=i.length,m=I.computeStrides(i),g=I.getTypedArrayFromDType(n.dtype,h);0!==o&&g.fill(o);for(let e=0;e<p;e++){let t=I.indexToLoc(e,d,c).map((e,t)=>e+l[t]);g[I.locToIndex(t,f,m)]=u[e]}return{dataId:r.write(g,i,n.dtype),shape:i,dtype:n.dtype}}};g("i64bB");var $=g("hl418");const a_=V((e,t)=>Math.pow(e,t)),aL=eo($.Pow,a_),aV={kernelName:$.Pow,backendName:"cpu",kernelFunc:aL};g("i64bB");var v=g("7MaPk"),$=g("hl418"),tT=g("2MDja"),I=g("jjNRA");function aG(e,t,r,a){let[n,s]=v.computeOutAndReduceShapes(e,a),o=(0,tT.upcastType)(t,"int32"),i=I.makeZerosTypedArray(I.sizeFromShape(n),o),l=I.sizeFromShape(s);for(let e=0;e<i.length;++e){let t=e*l,a=1;for(let e=0;e<l;++e)a*=r[t+e];i[e]=a}return{outVals:i,outShape:n,outDtype:o}}const aW={kernelName:$.Prod,backendName:"cpu",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{x:n}=t,{axis:s,keepDims:o}=a;w(n,"prod");let i=n.shape.length,l=I.parseAxisParam(s,n.shape),u=v.getAxesPermutation(l,i),p=l,d=n,c=[];null!=u&&(c.push(d=ew({inputs:{x:n},backend:r,attrs:{perm:u}})),p=v.getInnerMostAxes(p.length,i));let h=r.data.get(d.dataId).values,{outVals:f,outShape:m,outDtype:g}=aG(d.shape,d.dtype,h,p),x=m;return o&&(x=v.expandShapeToKeepDim(m,l)),c.forEach(e=>r.disposeIntermediateTensorInfo(e)),r.makeTensorInfo(x,g,f)}};g("i64bB");var $=g("hl418");g("i64bB");var I=g("jjNRA");function az(e,t){let r=e.slice(0,t);for(;r.length<t;)r.push(1);for(let a=t;a<e.length;a++)r[t-1]*=e[a];return r}function aj(e,t,r,a,n,s,o,i){if(0===e.length)throw Error("paramsNestedSplits must be non empty");if(0===t[0].length)throw Error("Split tensors must not be scalars");let l=t[0][0]-1;if(s.forEach((e,t)=>{if(e<0||e>=l){let r=I.indexToLoc(t,o.length,I.computeStrides(o)).join(",");throw Error(`indices[${r}] = ${e} is not in [0, ${l})`)}}),0===a.length)throw Error("params.rank must be nonzero");let{outSplits:u,valueSlices:p,numValues:d}=function(e,t,r,a){let n=[],s=0,o=Array(t.length-1+r.length).fill(null).map(()=>[0]);for(let e=0;e<r.length;++e){let t=r[e],n=e===r.length-1?a:r[e+1].length;if(0===t.length)throw Error("Ragged splits may not be empty");if(t[0]<0)throw Error("Ragged splits must be non-negative");if(t[t.length-1]>n)throw Error("Ragged splits must not point past values");for(let e=1;e<t.length;++e)if(t[e-1]>t[e])throw Error("Ragged splits must be sorted in ascending order")}let i=1;for(let e=0;e<t.length-1;++e){i*=t[e];let r=t[e+1];for(let t=1;t<i+1;++t)o[e].push(t*r)}for(let a=0;a<e.length;++a){let i=e[a],l=e[a]+1;for(let e=0;e<r.length;++e){let a=r[e],n=e+t.length-1;if(n>=0){let e=o[n],t=e[e.length-1]-a[i];for(let e=i;e<l;++e)o[n].push(a[e+1]+t)}i=a[i],l=a[l]}l!==i&&(n.push([i,l]),s+=l-i)}return{outSplits:o,valueSlices:n,numValues:s}}(s,o,e,a[0]),c=function(e){let t=[];for(let r=0;r<e.length;++r){let a=e[r].length,n=I.getArrayFromDType("int32",a);t.push(n),e[r].forEach((e,t)=>n[t]=e)}return t}(u),h=function(e,t,r,a,n){let s=t.slice();s[0]=n;let o=I.getArrayFromDType(r,I.sizeFromShape(s)),i=e.length,l=0===i?0:i/t[0];return!function(e,t,r,a,n,s){let o=az(t,2)[1],i=az(s,2)[1],l=0;for(let t of r)for(let r=t[0];r<t[1];++r){for(let t=0;t<a;++t)n[l*i+t]=e[r*o+t];++l}}(e,t,a,l,o,s),[o,s]}(r,a,n,p,d);return[c,h[0],h[1]]}const aU={kernelName:$.RaggedGather,backendName:"cpu",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{paramsNestedSplits:n,paramsDenseValues:s,indices:o}=t,{outputRaggedRank:i}=a,l=n.map(e=>r.data.get(e.dataId).values),u=n.map(e=>e.shape),p=r.data.get(s.dataId).values,d=r.data.get(o.dataId).values,[c,h,f]=aj(l,u,p,s.shape,s.dtype,d,o.shape,i),m=c.map(e=>r.makeTensorInfo([e.length],"int32",e)),g=r.makeTensorInfo(f,s.dtype,h);return m.concat([g])}};g("i64bB");var $=g("hl418");g("i64bB");var I=g("jjNRA");function aq(e,t,r,a,n,s,o){if(t.length>1)throw Error("starts must be a scalar or vector");if(n.length>1)throw Error("limits must be a scalar or vector");if(o.length>1)throw Error("deltas must be a scalar or vector");let i=0===t.length,l=0===n.length,u=0===o.length,p=[];i||p.push(t[0]),l||p.push(n[0]),u||p.push(o[0]);for(let e=1;e<p.length;++e)if(p[e]!==p[e-1])throw Error("starts, limits, and deltas must have the same shape");let d=0===p.length?1:p[0],c=I.getArrayFromDType("int32",d+1);c[0]=0;for(let t=0;t<d;++t){let r,n=i?e[0]:e[t],o=l?a[0]:a[t],p=u?s[0]:s[t];if(0===p)throw Error("Requires delta != 0");if(p>0&&o<n||p<0&&o>n)r=0;else if((r=Math.ceil(Math.abs((o-n)/p)))>0x7fffffff)throw Error("Requires ((limit - start) / delta) <= 2147483647");c[t+1]=c[t]+r}let h=c[d],f=I.getArrayFromDType(r,h),m=0;for(let t=0;t<d;++t){let r=c[t+1]-c[t],a=i?e[0]:e[t],n=u?s[0]:s[t];for(let e=0;e<r;++e)f[m++]=a,a+=n}return[c,f]}const aH={kernelName:$.RaggedRange,backendName:"cpu",kernelFunc:function(e){let{inputs:t,backend:r}=e,{starts:a,limits:n,deltas:s}=t,o=r.data.get(a.dataId).values,i=r.data.get(n.dataId).values,l=r.data.get(s.dataId).values,[u,p]=aq(o,a.shape,a.dtype,i,n.shape,l,s.shape);return[r.makeTensorInfo([u.length],"int32",u),r.makeTensorInfo([p.length],a.dtype,p)]}};g("i64bB");var $=g("hl418");g("i64bB");var v=g("7MaPk"),aK=g("aeB3Z"),aX=g("4sqA7"),b=g("c2DT1"),I=g("jjNRA"),aZ=v.RowPartitionType;class aY{constructor(e,t,r,a,n,s,o,i,l,u){this.shape=e,this.shapeShape=t,this.values=r,this.valuesShape=a,this.valuesDType=n,this.defaultValue=s,this.defaultValueShape=o,this.rowPartitionValues=i,this.rowPartitionValuesShapes=l,this.rowPartitionTypes=v.getRowPartitionTypesHelper(u),this.raggedRank=v.getRaggedRank(this.rowPartitionTypes)}getRowPartitionTypeByDimension(e){return this.rowPartitionTypes[0]===aZ.FIRST_DIM_SIZE?this.rowPartitionTypes[e+1]:this.rowPartitionTypes[e]}getRowPartitionTensor(e){return this.rowPartitionTypes[0]===aZ.FIRST_DIM_SIZE?this.rowPartitionValues[e+1]:this.rowPartitionValues[e]}getMaxWidth(e){let t=this.getRowPartitionTensor(e-1);switch(this.getRowPartitionTypeByDimension(e-1)){case aZ.VALUE_ROWIDS:return aY.getMaxWidthValueRowID(t);case aZ.ROW_SPLITS:return aY.getMaxWidthRowSplit(t);default:throw Error(`Cannot handle partition type ${aZ[this.getRowPartitionTypeByDimension(e-1)]}`)}}static getMaxWidthRowSplit(e){let t=e.length;if(0===t||1===t)return 0;let r=0;for(let a=0;a<t-1;++a){let t=e[a+1]-e[a];t>r&&(r=t)}return r}static getMaxWidthValueRowID(e){let t=e.length;if(0===t)return 0;let r=0,a=e[0],n=0;for(let s=1;s<t;++s){let t=e[s];t!==a&&(a=t,n=Math.max(s-r,n),r=s)}return Math.max(t-r,n)}tensorShapeFromTensor(e,t,r=!0){if(0===t.length){if(-1===e[0])return[];throw Error("The only valid scalar shape tensor is the fully unknown shape specified as -1.")}return aJ(e,r)}calculateOutputSize(e){let t=this.valuesShape,r=this.defaultValueShape;v.validateDefaultValueShape(r,t);let a=this.tensorShapeFromTensor(this.shape,this.shapeShape),n=v.combineRaggedTensorToTensorShapes(this.raggedRank,a,t);n[0]<0&&(n[0]=e);for(let e=1;e<=this.raggedRank;++e)n[e]<0&&(n[e]=this.getMaxWidth(e));return n}calculateFirstParentOutputIndex(e,t,r){let a=Math.min(e,r),n=[],s=0;for(let e=0;e<a;++e,s+=t)n.push(s);for(let t=a;t<e;++t)n.push(-1);return I.assert(n.length===e,()=>"Final length of result must be equal to firstDimension."),n}calculateOutputIndexRowSplit(e,t,r,a){let n=e.length,s=[];for(let o=0;o<n-1;++o){let n=e[o+1]-e[o],i=Math.min(a,n),l=t[o];-1===l&&(i=0);for(let e=0;e<i;++e)s.push(l),l+=r;for(let e=0;e<n-i;++e)s.push(-1)}if(n>0&&s.length!==e[n-1])throw Error("Invalid row split size.");return s}calculateOutputIndexValueRowID(e,t,r,a){let n=e.length,s=[];if(0===n)return[];let o=0,i=e[0];if(i>=t.length)throw Error(`Got currentValueRowId=${i}, which is not less than ${t.length}`);let l=t[i];s.push(l);for(let u=1;u<n;++u){let n=e[u];if(n===i)l>=0&&(++o<a?l+=r:l=-1);else{if(o=0,i=n,n>=t.length)throw Error(`Got nextValueRowId=${n} which is not less than ${t.length}`);l=t[n]}s.push(l)}if(s.length!==e.length)throw Error("Invalid row ids.");return s}calculateOutputIndex(e,t,r,a){let n=this.getRowPartitionTensor(e),s=this.getRowPartitionTypeByDimension(e);switch(s){case aZ.VALUE_ROWIDS:return this.calculateOutputIndexValueRowID(n,t,r,a);case aZ.ROW_SPLITS:if(n.length-1>t.length)throw Error(`Row partition size is greater than output size: ${n.length-1} > ${t.length}`);return this.calculateOutputIndexRowSplit(n,t,r,a);default:throw Error(`Unsupported partition type: ${aZ[s]}`)}}getFirstDimensionSize(){let e=this.rowPartitionValues[0];if(0===this.rowPartitionTypes.length)throw Error("No row_partition_types given.");let t=this.rowPartitionTypes[0];switch(t){case aZ.FIRST_DIM_SIZE:return e[0];case aZ.VALUE_ROWIDS:throw Error("Cannot handle VALUE_ROWIDS in first dimension.");case aZ.ROW_SPLITS:return this.rowPartitionValuesShapes[0][0]-1;default:throw Error(`Cannot handle type ${aZ[t]}`)}}compute(){if(this.rowPartitionValues[0].length<=0)throw Error("Invalid first partition input. Tensor requires at least one element.");let e=this.getFirstDimensionSize(),t=this.calculateOutputSize(e),r=Array(this.raggedRank+1);r[r.length-1]=1;for(let e=r.length-2;e>=0;--e)r[e]=r[e+1]*t[e+1];let a=aJ(t,!1),n=I.getArrayFromDType(this.valuesDType,I.sizeFromShape(a));if(r[0]*t[0]>0){let s=this.calculateFirstParentOutputIndex(e,r[0],t[0]);for(let e=1;e<=this.raggedRank;++e)s=this.calculateOutputIndex(e-1,s,r[e],t[e]);this.setOutput(this.raggedRank,s,n,a)}return[a,n]}setOutput(e,t,r,a){if(0===r.length)return;let n=this.values,s=a.slice();s=s.slice(e+1);let o=I.sizeFromShape(s),i=t.length,l=this.defaultValue;if(l.length!==o&&1!==l.length){let e=this.defaultValueShape;(0,b.tidy)(()=>{let t=(0,aX.reshape)(l,e);l=(0,aK.broadcastTo)(t,s).dataSync()})}let u=0,p=0,d=0;for(let e=0;e<=i;++e){let a=e<i?t[e]:-1;if(a===d){++d;continue}if(p<d){let e=n.subarray(u*o);aQ(r.subarray(p*o),e,(d-p)*o)}if(e>=i&&(a=Math.floor(r.length/o)),a>d)if(1===this.defaultValue.length)r.subarray(d*o,a*o).fill(this.defaultValue[0]),d=a;else for(;a>d;)aQ(r.slice(d*o),l,o),++d;a<0?(u=e+1,p=d):(u=e,d=(p=d)+1)}}}function aQ(e,t,r){for(let a=0;a<r;a++)e[a]=t[a]}function aJ(e,t){let r=[];for(let a of e){if(a<0){if(!t)throw Error(`Dimension ${a} must be >= 0`);if(a<-1)throw Error(`Dimension ${a} must be >= -1`);a=-1}r.push(a)}return r}function a0(e,t,r,a,n,s,o,i,l,u){return new aY(e,t,r,a,n,s,o,i,l,u).compute()}const a1={kernelName:$.RaggedTensorToTensor,backendName:"cpu",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{shape:n,values:s,defaultValue:o,rowPartitionTensors:i}=t,{rowPartitionTypes:l}=a,u=r.data.get(n.dataId).values,p=r.data.get(s.dataId).values,d=r.data.get(o.dataId).values,c=i.map(e=>r.data.get(e.dataId).values),h=i.map(e=>e.shape),[f,m]=a0(u,n.shape,p,s.shape,s.dtype,d,o.shape,c,h,l);return r.makeTensorInfo(f,s.dtype,m)}};g("i64bB");var $=g("hl418");g("i64bB");var I=g("jjNRA");function a2(e,t,r,a){let n=e===t,s=e<t&&r<0,o=t<e&&r>1;if(n||s||o)return I.makeZerosTypedArray(0,a);let i=Math.abs(Math.ceil((t-e)/r)),l=I.makeZerosTypedArray(i,a);t<e&&1===r&&(r=-1),l[0]=e;for(let e=1;e<l.length;e++)l[e]=l[e-1]+r;return l}const a4={kernelName:$.Range,backendName:"cpu",kernelFunc:function(e){let{backend:t,attrs:r}=e,{start:a,stop:n,dtype:s,step:o}=r,i=a2(a,n,o,s);return t.makeTensorInfo([i.length],s,i)}};g("i64bB");var $=g("hl418");const a3=P($.Reciprocal,e=>1/e),a8={kernelName:$.Reciprocal,backendName:"cpu",kernelFunc:a3};g("i64bB");var $=g("hl418"),I=g("jjNRA");const a6={kernelName:$.ResizeBilinear,backendName:"cpu",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{images:n}=t,{alignCorners:s,halfPixelCenters:o,size:i}=a;w(n,"resizeBilinear");let l=I.computeStrides(n.shape),[u,p]=i,[d,c,h,f]=n.shape,m=r.data.get(n.dataId).values,g=new Float32Array(I.sizeFromShape([d,u,p,f])),x=[s&&u>1?c-1:c,s&&p>1?h-1:h],y=[s&&u>1?u-1:u,s&&p>1?p-1:p],b=0,v=x[0]/y[0],N=x[1]/y[1];for(let e=0;e<d;e++)for(let t=0;t<u;t++){let r,a=Math.max(0,Math.floor(r=o?v*(t+.5)-.5:v*t)),n=r-a,s=Math.min(c-1,Math.ceil(r)),i=e*l[0]+a*l[1],u=e*l[0]+s*l[1];for(let e=0;e<p;e++){let t,r=Math.max(0,Math.floor(t=o?N*(e+.5)-.5:N*e)),a=t-r,s=Math.min(h-1,Math.ceil(t)),p=i+r*l[2],d=u+r*l[2],c=i+s*l[2],x=u+s*l[2];for(let e=0;e<f;e++){let t=m[p+e],r=m[d+e],s=m[c+e],o=m[x+e],i=t+(s-t)*a,l=i+(r+(o-r)*a-i)*n;g[b++]=l}}}return r.makeTensorInfo([d,u,p,f],"float32",g)}};g("i64bB");var $=g("hl418"),I=g("jjNRA");const a5={kernelName:$.ResizeBilinearGrad,backendName:"cpu",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{images:n,dy:s}=t,{alignCorners:o}=a;w([s,n],"resizeBilinearGrad");let i=I.computeStrides(n.shape),[l,u,p,d]=n.shape,[,c,h]=s.shape,f=new Float32Array(l*u*p*d),m=[o&&c>1?u-1:u,o&&h>1?p-1:p],g=[o&&c>1?c-1:c,o&&h>1?h-1:h],x=m[0]/g[0],y=m[1]/g[1],b=r.data.get(s.dataId).values,v=0;for(let e=0;e<l;e++){let t=e*i[0];for(let e=0;e<c;e++){let r=e*x,a=Math.floor(r),n=Math.min(Math.ceil(r),u-1),s=t+a*i[1],o=t+n*i[1],l=r-a,c=1-l;for(let e=0;e<h;e++){let t=e*y,r=Math.floor(t),a=Math.min(Math.ceil(t),p-1),n=t-r,u=1-n,h=s+r*i[2],m=s+a*i[2],g=o+r*i[2],x=o+a*i[2],N=c*u,k=c*n,T=l*u,S=l*n;for(let e=0;e<d;e++){let t=b[v++];f[h+e]+=t*N,f[m+e]+=t*k,f[g+e]+=t*T,f[x+e]+=t*S}}}}return r.makeTensorInfo([l,p,u,d],"float32",f)}};g("i64bB");var $=g("hl418"),I=g("jjNRA");const a7={kernelName:$.ResizeNearestNeighbor,backendName:"cpu",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{images:n}=t,{alignCorners:s,halfPixelCenters:o,size:i}=a;w(n,"resizeNearestNeighbor");let l=I.computeStrides(n.shape),[u,p]=i,[d,c,h,f]=n.shape,m=r.data.get(n.dataId).values,g=new Float32Array(d*u*p*f),x=[s&&u>1?c-1:c,s&&p>1?h-1:h],y=[s&&u>1?u-1:u,s&&p>1?p-1:p],b=x[0]/y[0],v=x[1]/y[1],N=0;for(let e=0;e<d;e++){let t=e*l[0];for(let e=0;e<u;e++){let r=o?b*(e+.5):b*e,a=Math.min(c-1,s?Math.round(r):Math.floor(r));o&&(a=Math.max(0,a));let n=t+a*l[1];for(let e=0;e<p;e++){let t=o?v*(e+.5):v*e,r=Math.min(h-1,s?Math.round(t):Math.floor(t));o&&(r=Math.max(0,r));let a=n+r*l[2];for(let e=0;e<f;e++){let t=m[a+e];g[N++]=t}}}}return r.makeTensorInfo([d,u,p,f],n.dtype,g)}};g("i64bB");var $=g("hl418"),I=g("jjNRA");const a9={kernelName:$.ResizeNearestNeighborGrad,backendName:"cpu",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{images:n,dy:s}=t,{alignCorners:o}=a;w([s,n],"resizeNearestNeighborGrad");let i=I.computeStrides(n.shape),l=I.computeStrides(s.shape),[u,p,d,c]=n.shape,[,h,f]=s.shape,m=new Float32Array(u*p*d*c),g=r.data.get(s.dataId).values,x=[o&&h>1?p-1:p,o&&f>1?d-1:d],y=[o&&h>1?h-1:h,o&&f>1?f-1:f],b=x[0]/y[0],v=x[1]/y[1],N=1/b,k=1/v,T=2*Math.ceil(N)+2,S=2*Math.ceil(k)+2;for(let e=0;e<u;e++){let t=e*i[0];for(let e=0;e<p;e++){let r=t+e*i[1],a=Math.floor(Math.floor(e*N)-T/2);for(let n=0;n<d;n++){let s=r+n*i[2],u=Math.floor(Math.floor(n*k)-S/2);for(let r=0;r<c;r++){let i=0;for(let s=0;s<T;s++){let c=s+a;if(c<0||c>=h)continue;let m=t+c*l[1],x=c*b;if(e===Math.min(p-1,o?Math.round(x):Math.floor(x)))for(let e=0;e<S;e++){let t=e+u;if(t<0||t>=f)continue;let a=m+t*l[2],s=t*v;n===Math.min(d-1,o?Math.round(s):Math.floor(s))&&(i+=g[a+r])}}m[s+r]=i}}}}return r.makeTensorInfo(n.shape,n.dtype,m)}};g("i64bB");var $=g("hl418"),tp=g("9jCh7"),I=g("jjNRA");const ne={kernelName:$.Reverse,backendName:"cpu",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{x:n}=t,{dims:s}=a;w(n,"reverse");let o=n.shape.length,i=I.parseAxisParam(s,n.shape);if(0===o)return M({inputs:{x:n},backend:r});let l=new(0,tp.TensorBuffer)(n.shape,n.dtype),u=r.bufferSync(n);for(let e=0;e<l.size;e++){let t=l.indexToLoc(e),r=t.slice();i.forEach(e=>r[e]=n.shape[e]-1-r[e]),l.set(u.get(...r),...t)}return r.makeTensorInfo(l.shape,l.dtype,l.values)}};g("i64bB");var v=g("7MaPk"),$=g("hl418"),I=g("jjNRA");const nt={kernelName:$.RotateWithOffset,backendName:"cpu",kernelFunc:({inputs:e,attrs:t,backend:r})=>{let{image:a}=e,{radians:n,fillValue:s,center:o}=t,i=I.getTypedArrayFromDType(a.dtype,I.sizeFromShape(a.shape)),[l,u,p,d]=a.shape,[c,h]=v.getImageCenter(o,u,p),f=Math.sin(n),m=Math.cos(n),g=r.data.get(a.dataId).values;for(let e=0;e<l;e++){let t=e*p*u*d;for(let e=0;e<u;e++){let r=p*d*e;for(let a=0;a<p;a++){let n=a*d;for(let o=0;o<d;o++){let x=[l,e,a,o],y=x[2],b=x[1],v=(y-c)*m-(b-h)*f,N=(y-c)*f+(b-h)*m;v=Math.round(v+c),N=Math.round(N+h);let k=s;"number"!=typeof s&&(k=3===o?255:s[o]),v>=0&&v<p&&N>=0&&N<u&&(k=g[t+p*d*N+v*d+o]),i[t+r+n+o]=k}}}}return{dataId:r.write(i,a.shape,a.dtype),shape:a.shape,dtype:a.dtype}}};g("i64bB");var $=g("hl418");const nr=P($.Round,e=>{let t=Math.floor(e);return e-t<.5?Math.floor(e):e-t>.5?Math.ceil(e):t%2==0?t:t+1}),na={kernelName:$.Round,backendName:"cpu",kernelFunc:nr};g("i64bB");var $=g("hl418");const nn=R(e=>1/Math.sqrt(e)),ns=B($.Rsqrt,nn),no={kernelName:$.Rsqrt,backendName:"cpu",kernelFunc:ns};g("i64bB");var v=g("7MaPk"),$=g("hl418");g("i64bB");var N=g("iG87S"),tp=g("9jCh7");function ni(e,t,r,a,n,s,o,i,l,u){let p=e.values,d=t.values;if(0===a)return(0,N.buffer)(r,t.dtype);let c=l instanceof tp.TensorBuffer?l:(0,N.buffer)([a/n,n],t.dtype);"string"==typeof l||"number"==typeof l?c.values.fill(l):"boolean"==typeof l&&c.values.fill(+l);for(let e=0;e<s;e++){let s=[],l=0;for(let t=0;t<o;t++){let r=p[e*o+t];s.push(r),l+=r*i[t]}if(l<0||l>=a/n)throw Error(`Invalid indices: ${s} does not index into ${r}`);for(let r=0;r<n;r++)u?c.values[l*n+r]+=d[e*n+r]:c.values[l*n+r]=0===t.rank?d[0]:d[e*n+r]}return c}const nl={kernelName:$.ScatterNd,backendName:"cpu",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{indices:n,updates:s}=t,{shape:o}=a,{sliceRank:i,numUpdates:l,sliceSize:u,strides:p,outputSize:d}=v.calculateShapes(s,n,o),c=ni(r.bufferSync(n),r.bufferSync(s),o,d,u,l,i,p,0,!0);return r.makeTensorInfo(o,c.dtype,c.values)}};g("i64bB");var $=g("hl418");g("i64bB");var I=g("jjNRA");const nu={kernelName:$.SearchSorted,backendName:"cpu",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{sortedSequence:n,values:s}=t,{side:o}=a,i=function(e,t,r,a,n,s){let o=I.getArrayFromDType("int32",r*n);for(let i=0;i<r;++i){let r=e.slice(i*a,(i+1)*a),l=i*n;for(let e=0;e<n;++e)o[l+e]="left"===s?function(e,t){let r=0,a=e.length,n=0;for(;r<a;)e[n=Math.floor((r+a)/2)]<t?r=n+1:a=n;return a}(r,t[e+l]):function(e,t){let r=0,a=e.length,n=0;for(;r<a;)e[n=Math.floor((r+a)/2)]<=t?r=n+1:a=n;return a}(r,t[e+l])}return o}(r.data.get(n.dataId).values,r.data.get(s.dataId).values,n.shape[0],n.shape[1],s.shape[1],o);return r.makeTensorInfo(s.shape,"int32",i)}};g("i64bB");var $=g("hl418"),tT=g("2MDja"),I=g("jjNRA");const np={kernelName:$.Select,backendName:"cpu",kernelFunc:function(e){let{inputs:t,backend:r}=e,{condition:a,t:n,e:s}=t;w([a,n,s],"select");let o=a.shape.length,i=r.data.get(a.dataId).values,l=r.data.get(n.dataId).values,u=r.data.get(s.dataId).values,p=(0,tT.upcastType)(n.dtype,s.dtype),d=I.makeZerosTypedArray(I.sizeFromShape(n.shape),p),c=0,h=0===o||o>1||1===n.shape.length?1:I.sizeFromShape(n.shape.slice(1));for(let e=0;e<i.length;e++)for(let t=0;t<h;t++)1===i[e]?d[c++]=l[e]:d[c++]=u[e];return r.makeTensorInfo(n.shape,p,d)}};g("i64bB");var v=g("7MaPk"),$=g("hl418");const nd=v.SELU_SCALEALPHA,nc=v.SELU_SCALE,nh=P($.Selu,e=>e>=0?nc*e:nd*(Math.exp(e)-1)),nf={kernelName:$.Selu,backendName:"cpu",kernelFunc:nh};g("i64bB");var $=g("hl418");const nm=P($.Sign,e=>e<0?-1:+(e>0)),ng={kernelName:$.Sign,backendName:"cpu",kernelFunc:nm};g("i64bB");var $=g("hl418");const nx=P($.Sin,e=>Math.sin(e)),ny={kernelName:$.Sin,backendName:"cpu",kernelFunc:nx};g("i64bB");var $=g("hl418");const nb=P($.Sinh,e=>Math.sinh(e)),nv={kernelName:$.Sinh,backendName:"cpu",kernelFunc:nb};g("i64bB");var $=g("hl418");const nN=Math.log(11920928955078125e-23)+2,nk=P($.Softplus,e=>{let t,r=Math.exp(e);return e<nN?r:e>-nN?e:Math.log(1+r)}),nT={kernelName:$.Softplus,backendName:"cpu",kernelFunc:nk};g("i64bB");var v=g("7MaPk"),$=g("hl418"),I=g("jjNRA");const nS={kernelName:$.SpaceToBatchND,backendName:"cpu",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{x:n}=t,{blockShape:s,paddings:o}=a;w([n],"spaceToBatchND");let i=I.sizeFromShape(s),l=[[0,0]];l.push(...o);for(let e=1+s.length;e<n.shape.length;++e)l.push([0,0]);let u=aD.kernelFunc({inputs:{x:n},backend:r,attrs:{paddings:l,constantValue:0}}),p=v.getReshaped(u.shape,s,i,!1),d=v.getPermuted(p.length,s.length,!1),c=v.getReshapedPermuted(u.shape,s,i,!1),h=eh({inputs:{x:u},backend:r,attrs:{shape:p}}),f=ew({inputs:{x:h},backend:r,attrs:{perm:d}}),m=eh({inputs:{x:f},backend:r,attrs:{shape:c}});return r.disposeIntermediateTensorInfo(u),r.disposeIntermediateTensorInfo(h),r.disposeIntermediateTensorInfo(f),m}};g("i64bB");var $=g("hl418");g("i64bB");var v=g("7MaPk"),I=g("jjNRA");function nI(e,t,r,a,n,s,o){let i=t[0],l=s[0],u=Array(l),p=Array(i),d=t[1];if(0===l){if(0!==i)throw Error(v.getSparseFillEmptyRowsIndicesDenseShapeMismatch(i));return[I.getArrayFromDType(r,0),[0,d],I.getArrayFromDType(n,0),u,p]}let c=!0,h=0,f=Array(l).fill(0);for(let t=0;t<i;++t){let r=e[t*d];if(r<0)throw Error(v.getSparseFillEmptyRowsNegativeIndexErrorMessage(t,r));if(r>=l)throw Error(v.getSparseFillEmptyRowsOutOfRangeIndexErrorMessage(t,r,l));++f[r],c=c&&r>=h,h=r}let m=!0;for(let e=0;e<l;++e){let t=0===f[e];u[e]=t,m=m&&!t,f[e]=Math.max(f[e],1),e>0&&(f[e]+=f[e-1])}if(m&&c){for(let e=0;e<i;++e)p[e]=e;return[e,[i,d],a,u,p]}{let t=f[l-1],s=I.getArrayFromDType(r,t*d),c=I.getArrayFromDType(n,t),h=Array(l).fill(0);for(let t=0;t<i;++t){let r=e[t*d],n=h[r],o=(0===r?0:f[r-1])+n;h[r]++;for(let r=0;r<d;++r)s[o*d+r]=e[t*d+r];c[o]=a[t],p[t]=o}for(let e=0;e<l;++e)if(0===h[e]){let t=0===e?0:f[e-1];s[t*d+0]=e;for(let e=1;e<d;++e)s[t*d+e]=0;c[t]=o}return[s,[t,d],c,u,p]}}const nw={kernelName:$.SparseFillEmptyRows,backendName:"cpu",kernelFunc:function(e){let{inputs:t,backend:r}=e,{indices:a,values:n,denseShape:s,defaultValue:o}=t;if(1!==s.shape.length)throw Error(`Dense shape must be a vector, saw:
        ${s.shape}`);if(2!==a.shape.length)throw Error(`Indices must be a matrix, saw:
        ${a.shape}`);if(1!==n.shape.length)throw Error(`Values must be a vector, saw:
        ${n.shape}`);if(0!==o.shape.length)throw Error(`Default value must be a scalar, saw:
        ${o.shape}`);let i=r.data.get(a.dataId).values,l=r.data.get(n.dataId).values,u=r.data.get(s.dataId).values,p=r.data.get(o.dataId).values[0],[d,c,h,f,m]=nI(i,a.shape,a.dtype,l,n.dtype,u,p);return[r.makeTensorInfo(c,a.dtype,d),r.makeTensorInfo([c[0]],n.dtype,h),r.makeTensorInfo([f.length],"bool",new Uint8Array(f.map(e=>Number(e)))),r.makeTensorInfo([m.length],a.dtype,new Int32Array(m))]}};g("i64bB");var $=g("hl418");g("i64bB");var v=g("7MaPk"),I=g("jjNRA");function nC(e,t,r,a,n){let s=I.sizeFromShape(a),o=t[0],i=n.length,l=[],u=1,p=-1;for(let e=0;e<i;++e){let t=n[e];if(-1===t){if(-1!==p)throw Error(v.getSparseReshapeMultipleNegativeOneOutputDimErrorMessage(p,e));p=e,l.push(1)}else{if(t<0)throw Error(v.getSparseReshapeNegativeOutputDimErrorMessage(e,t));u*=t,l.push(t)}}if(-1!==p){if(u<=0)throw Error(v.getSparseReshapeEmptyTensorZeroOutputDimErrorMessage());let e=Math.trunc(s/u);if(u*e!==s)throw Error(v.getSparseReshapeInputOutputMultipleErrorMessage(a,l));l[p]=e}if(I.sizeFromShape(l)!==s)throw Error(v.getSparseReshapeInputOutputMismatchErrorMessage(a,l));let d=a.length,c=[];if(d>0){c[d-1]=1;for(let e=d-2;e>=0;--e)c[e]=c[e+1]*a[e+1]}let h=[];if(i>0){h[i-1]=1;for(let e=i-2;e>=0;--e)h[e]=h[e+1]*l[e+1]}let f=I.getArrayFromDType(r,o*i);for(let t=0;t<o;++t){let r=0;for(let a=0;a<d;++a)r+=e[t*d+a]*c[a];for(let e=0;e<i;++e)f[t*i+e]=Math.trunc(r/h[e]),r%=h[e]}return[f,[o,i],l]}const nE={kernelName:$.SparseReshape,backendName:"cpu",kernelFunc:function(e){let{inputs:t,backend:r}=e,{inputIndices:a,inputShape:n,newShape:s}=t;if(2!==a.shape.length)throw Error(`Input indices should be a matrix but received shape
        ${a.shape}`);if(1!==n.shape.length)throw Error(`Input shape should be a vector but received shape
        ${n.shape}`);if(1!==s.shape.length)throw Error(`Target shape should be a vector but received shape ${s.shape}`);let o=Array.from(r.data.get(n.dataId).values),i=r.data.get(a.dataId).values,l=Array.from(r.data.get(s.dataId).values),[u,p,d]=nC(i,a.shape,a.dtype,o,l);return[r.makeTensorInfo(p,a.dtype,u),r.makeTensorInfo([d.length],s.dtype,new Int32Array(d))]}};g("i64bB");var $=g("hl418");g("i64bB");var v=g("7MaPk"),I=g("jjNRA");function nA(e,t,r,a,n,s=!1,o=0){let i=a.length,l=[t[0],e.length/t[0]],u=l[1],p=i>0?n[i-1]+1:0;if(p<0)throw Error(v.getSparseSegmentReductionNegativeSegmentIdsErrorMessage());let d=t.slice();d[0]=p;let c=d.reduce((e,t)=>e*t,1),h=I.getArrayFromDType(r,c);if(0===i)return p>0&&h.fill(o),[h,d];if(p<=0)throw Error(v.getSparseSegmentReductionNegativeSegmentIdsErrorMessage());let f=0,m=1,g=0,x=n[0];for(;;){let t=0;if(m<i){if(x===(t=n[m])){++m;continue}if(x>=t)throw Error(v.getSparseSegmentReductionNonIncreasingSegmentIdsErrorMessage())}if(x<0||x>=p)throw Error(v.getSparseSegmentReductionSegmentIdOutOfRangeErrorMessage(x,p));x>g&&h.fill(o,g*u,x*u);for(let t=f;t<m;++t){let r=a[t];if(r<0||r>=l[0])throw Error(v.getSparseSegmentReductionIndicesOutOfRangeErrorMessage(t,a[t],l[0]));for(let t=0;t<u;t++)h[x*u+t]+=e[r*u+t]}if(s)for(let e=0;e<u;e++)h[x*u+e]/=m-f;if(f=m,++m,g=x+1,x=t,m>i)break}return g<p&&h.fill(o,g*u,p*u),[h,d]}const n$={kernelName:$.SparseSegmentMean,backendName:"cpu",kernelFunc:function(e){let{inputs:t,backend:r}=e,{data:a,indices:n,segmentIds:s}=t;if(a.shape.length<1)throw Error("Data should be at least 1 dimensional but received scalar");if(1!==n.shape.length)throw Error(`Indices should be a vector but received shape
          ${n.shape}`);if(1!==s.shape.length)throw Error(`Segment ids should be a vector but received shape
          ${s.shape}`);if(n.shape[0]!==s.shape[0])throw Error("segmentIds and indices should have same size.");let o=r.data.get(a.dataId).values,i=r.data.get(n.dataId).values,l=r.data.get(s.dataId).values,[u,p]=nA(o,a.shape,a.dtype,i,l,!0);return r.makeTensorInfo(p,a.dtype,u)}};g("i64bB");var $=g("hl418");const nR={kernelName:$.SparseSegmentSum,backendName:"cpu",kernelFunc:function(e){let{inputs:t,backend:r}=e,{data:a,indices:n,segmentIds:s}=t;if(a.shape.length<1)throw Error("Data should be at least 1 dimensional but received scalar");if(1!==n.shape.length)throw Error(`Indices should be a vector but received shape
         ${n.shape}`);if(1!==s.shape.length)throw Error(`Segment ids should be a vector but received shape
         ${s.shape}`);if(n.shape[0]!==s.shape[0])throw Error("segmentIds and indices should have same size.");let o=r.data.get(a.dataId).values,i=r.data.get(n.dataId).values,l=r.data.get(s.dataId).values,[u,p]=nA(o,a.shape,a.dtype,i,l);return r.makeTensorInfo(p,a.dtype,u)}};g("i64bB");var v=g("7MaPk"),$=g("hl418"),I=g("jjNRA");const nP={kernelName:$.SparseToDense,backendName:"cpu",kernelFunc:function(e){let t,{inputs:r,backend:a,attrs:n}=e,{sparseIndices:s,sparseValues:o,defaultValue:i}=r,{outputShape:l}=n,{sliceRank:u,numUpdates:p,sliceSize:d,strides:c,outputSize:h}=v.calculateShapes(o,s,l),f=a.bufferSync(s);switch(o.dtype){case"bool":t=ni(f,a.bufferSync(o),l,h,d,p,u,c,!!a.data.get(i.dataId).values[0],!1);break;case"float32":case"int32":t=ni(f,a.bufferSync(o),l,h,d,p,u,c,a.data.get(i.dataId).values[0],!1);break;case"string":t=ni(f,a.bufferSync(o),l,h,d,p,u,c,I.decodeString(a.data.get(i.dataId).values[0]),!1);break;default:throw Error(`Unsupported type ${o.dtype}`)}return a.makeTensorInfo(l,t.dtype,t.values)}};g("i64bB");var v=g("7MaPk"),$=g("hl418"),I=g("jjNRA");const nB={kernelName:$.SplitV,backendName:"cpu",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{x:n}=t,{numOrSizeSplits:s,axis:o}=a,i=I.parseAxisParam(o,n.shape)[0],l=v.prepareSplitSize(n,s,i),u=Array(n.shape.length).fill(0),p=n.shape.slice();return l.map(e=>{let t=[...p];t[i]=e;let a=eJ({inputs:{x:n},backend:r,attrs:{begin:u,size:t}});return u[i]+=e,a})}};g("i64bB");var $=g("hl418");const nF=R(e=>Math.sqrt(e)),nO=P($.Sqrt,e=>Math.sqrt(e)),nM={kernelName:$.Sqrt,backendName:"cpu",kernelFunc:nO};g("i64bB");var $=g("hl418");const nD={kernelName:$.Square,backendName:"cpu",kernelFunc:({inputs:e,backend:t})=>{let{x:r}=e;w(r,"square");let a=t.data.get(r.dataId).values,n=new Float32Array(a.length);for(let e=0;e<a.length;++e){let t=a[e];n[e]=t*t}return{dataId:t.write(n,r.shape,r.dtype),shape:r.shape,dtype:r.dtype}}};g("i64bB");var $=g("hl418");const n_=V((e,t)=>{let r=e-t;return r*r}),nL=eo($.SquaredDifference,n_),nV={kernelName:$.SquaredDifference,backendName:"cpu",kernelFunc:nL};g("i64bB");var $=g("hl418");const nG=R((e,t)=>{let{pattern:r,replaceGlobal:a,rewrite:n}=t;return e.replace(new RegExp(r,a?"g":""),n)}),nW=B($.StaticRegexReplace,nG),nz={kernelName:$.StaticRegexReplace,backendName:"cpu",kernelFunc:nW};g("i64bB");var $=g("hl418");const nj=P($.Step,(e,t)=>isNaN(e)?NaN:e>0?1:t.alpha),nU={kernelName:$.Step,backendName:"cpu",kernelFunc:nj};g("i64bB");var eY=g("bszZn"),$=g("hl418"),I=g("jjNRA");g("i64bB");var N=g("iG87S");function nq(e,t,r,a){let n=(0,N.buffer)(e,t.dtype);for(let e=0;e<n.size;e++){let s=n.indexToLoc(e),o=Array(s.length);for(let e=0;e<o.length;e++)o[e]=s[e]*r[e]+a[e];n.set(t.get(...o),...s)}return n}const nH={kernelName:$.StridedSlice,backendName:"cpu",kernelFunc:function(e){let t,{inputs:r,backend:a,attrs:n}=e,{x:s}=r,{begin:o,end:i,strides:l,beginMask:u,endMask:p,ellipsisMask:d,newAxisMask:c,shrinkAxisMask:h}=n;w(s,"stridedSlice");let{finalShapeSparse:f,finalShape:m,isIdentity:g,sliceDim0:x,isSimpleSlice:y,begin:b,end:v,strides:N}=eY.sliceInfo(s.shape,o,i,l,u,p,d,c,h);if(g)t=eh({inputs:{x:s},backend:a,attrs:{shape:m}});else if(x||y){I.assert(s.shape.length>=1,()=>`Input must have rank at least 1, got: ${s.shape.length}`);let e=eY.computeOutShape(b,v,N),r=eJ({inputs:{x:s},backend:a,attrs:{begin:b,size:e}});t=eh({inputs:{x:r},backend:a,attrs:{shape:m}}),a.disposeIntermediateTensorInfo(r)}else{let e=nq(f,a.bufferSync(s),N,b);t=a.makeTensorInfo(m,e.dtype,e.values)}return t}};g("i64bB");var $=g("hl418");g("i64bB");var I=g("jjNRA");class nK{constructor(e,t,r,a,n,s){this.separator=I.encodeString(e),this.nGramWidths=t,this.leftPad=I.encodeString(r),this.rightPad=I.encodeString(a),this.padWidth=n,this.preserveShort=s}getPadWidth(e){return Math.min(this.padWidth<0?e-1:this.padWidth,e-1)}getNumNGrams(e,t){return Math.max(0,e+2*this.getPadWidth(t)-t+1)}createNGrams(e,t,r,a,n,s){for(let o=0;o<n;++o){let i,l=this.getPadWidth(s),u=Math.max(0,l-o),p=Math.max(0,l-(n-(o+1))),d=s-(u+p),c=t+(u>0?0:o-l);i=0+u*this.leftPad.length;for(let t=0;t<d;++t)i+=e[c+t].length;i+=p*this.rightPad.length,i+=(u+p+d-1)*this.separator.length,r[a+o]=new Uint8Array(i);let h=r[a+o],f=0,m=e=>e.forEach(e=>h[f++]=e);for(let e=0;e<u;++e)m(this.leftPad),m(this.separator);for(let t=0;t<d-1;++t)m(e[c+t]),m(this.separator);if(d>0){m(e[c+d-1]);for(let e=0;e<p;++e)m(this.separator),m(this.rightPad)}else{for(let e=0;e<p-1;++e)m(this.rightPad),m(this.separator);m(this.rightPad)}}}compute(e,t){let r=e.length,a=t.length;if(a>0){let e=t[0];if(0!==e)throw Error(`First split value must be 0, got ${e}`);for(let n=1;n<a;++n){let a=t[n]>=e;if(!(a=a&&t[n]<=r))throw Error(`Invalid split value ${t[n]}, must be in [${e}, ${r}]`);e=t[n]}if(e!==r)throw Error(`Last split value must be data size. Expected ${r}, got ${e}`)}let n=a-1,s=I.getArrayFromDType("int32",a);if(0===r||0===a){let e=Array(r);for(let e=0;e<=n;++e)s[e]=0;return[e,s]}s[0]=0;for(let e=1;e<=n;++e){let r=t[e]-t[e-1],a=0;this.nGramWidths.forEach(e=>{a+=this.getNumNGrams(r,e)}),this.preserveShort&&r>0&&0===a&&(a=1),s[e]=s[e-1]+a}let o=Array(s[n]);for(let r=0;r<n;++r){let a=t[r],n=s[r];if(this.nGramWidths.forEach(s=>{let i=t[r+1]-t[r],l=this.getNumNGrams(i,s);this.createNGrams(e,a,o,n,l,s),n+=l}),this.preserveShort&&n===s[r]){let s=t[r+1]-t[r];if(0===s)continue;let i=s+2*this.padWidth;this.createNGrams(e,a,o,n,1,i)}}return[o,s]}}function nX(e,t,r,a,n,s,o,i){return new nK(r,a,n,s,o,i).compute(e,t)}const nZ={kernelName:$.StringNGrams,backendName:"cpu",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{separator:n,nGramWidths:s,leftPad:o,rightPad:i,padWidth:l,preserveShortSequences:u}=a,{data:p,dataSplits:d}=t,[c,h]=nX(r.data.get(p.dataId).values,r.data.get(d.dataId).values,n,s,o,i,l,u);return[r.makeTensorInfo([c.length],"string",c),r.makeTensorInfo(d.shape,"int32",h)]}};g("i64bB");var $=g("hl418");g("i64bB");var I=g("jjNRA");function nY(e,t,r){let a=e.length,n=[],s=0,o=0,i=Array(a);for(let l=0;l<a;++l){let a=n.length;!function(e,t,r,a){if(!e.length)return;if(0===t.length){for(let t=0;t<e.length;++t)a.push(e.subarray(t,t+1));return}if(1===t.length){let n=t[0],s=e.indexOf(n);for(;-1!==s;){let t=e.subarray(0,s);r&&0===t.length||a.push(t),s=(e=e.subarray(s+1)).indexOf(n)}r&&0===e.length||a.push(e);return}let n=0;for(let s=0;s<e.length+1;s++)if(s===e.length||-1!==t.indexOf(e[s])){let t=e.subarray(n,s);r&&0===t.length||a.push(t),n=s+1}}(e[l],t,r,n);let u=n.length-a;i[l]=u,s+=u,o=Math.max(o,u)}let l=I.getArrayFromDType("int32",2*s),u=Array(s),p=[a,o],d=0;for(let e=0;e<a;++e)for(let t=0;t<i[e];++t)l[2*d]=e,l[2*d+1]=t,u[d]=n[d],++d;return[l,u,p]}const nQ={kernelName:$.StringSplit,backendName:"cpu",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{skipEmpty:n}=a,{input:s,delimiter:o}=t;if("string"!==s.dtype)throw Error("Input must be of datatype string");if(1!==s.shape.length)throw Error(`Input must be a vector, got shape: ${s.shape}`);if(0!==o.shape.length)throw Error(`Delimiter must be a scalar, got shape: ${o.shape}`);let[i,l,u]=nY(r.data.get(s.dataId).values,r.data.get(o.dataId).values[0],n),p=l.length;return[r.makeTensorInfo([p,2],"int32",i),r.makeTensorInfo([p],"string",l),r.makeTensorInfo([2],"int32",new Int32Array(u))]}};g("i64bB");var $=g("hl418");g("i64bB");var I=g("jjNRA");function nJ(e,t){let r=I.getArrayFromDType("int32",e.length);for(let a=0;a<e.length;++a)r[a]=I.fingerPrint64(e[a]).modulo(t).getLowBitsUnsigned();return r}const n0={kernelName:$.StringToHashBucketFast,backendName:"cpu",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{numBuckets:n}=a,{input:s}=t;if("string"!==s.dtype)throw Error("Input must be of datatype string");if(n<=0)throw Error("Number of buckets must be at least 1");let o=nJ(r.data.get(s.dataId).values,n);return r.makeTensorInfo(s.shape,"int32",o)}};g("i64bB");var $=g("hl418");const n1=P($.Tan,e=>Math.tan(e)),n2={kernelName:$.Tan,backendName:"cpu",kernelFunc:n1};g("i64bB");var $=g("hl418");const n4=P($.Tanh,e=>Math.tanh(e)),n3={kernelName:$.Tanh,backendName:"cpu",kernelFunc:n4};g("i64bB");var v=g("7MaPk"),$=g("hl418");const n8={kernelName:$.TensorScatterUpdate,backendName:"cpu",kernelFunc:function(e){let{inputs:t,backend:r}=e,{tensor:a,indices:n,updates:s}=t,{sliceRank:o,numUpdates:i,sliceSize:l,strides:u,outputSize:p}=v.calculateShapes(s,n,a.shape),d=r.bufferSync(n),c=r.bufferSync(s),h=r.bufferSync(a),f=ni(d,c,a.shape,p,l,i,o,u,h,!1);return r.makeTensorInfo(a.shape,f.dtype,f.values)}};g("i64bB");var $=g("hl418");g("i64bB");var N=g("iG87S");function n6(e,t){let r=Array(e.rank);for(let a=0;a<r.length;a++)r[a]=e.shape[a]*t[a];let a=(0,N.buffer)(r,e.dtype);for(let t=0;t<a.values.length;++t){let r=a.indexToLoc(t),n=Array(e.rank);for(let t=0;t<n.length;t++)n[t]=r[t]%e.shape[t];let s=e.locToIndex(n);a.values[t]=e.values[s]}return a}const n5={kernelName:$.Tile,backendName:"cpu",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{x:n}=t,{reps:s}=a;w(n,"tile");let o=n6(r.bufferSync(n),s);return r.makeTensorInfo(o.shape,o.dtype,o.values)}};g("i64bB");var $=g("hl418");g("i64bB");var N=g("iG87S"),I=g("jjNRA");const n7=(e,t)=>{let r=t.value-e.value;return 0===r?e.index-t.index:r};function n9(e,t,r,a,n){let s=t[t.length-1],[o,i]=[e.length/s,s],l=I.getTypedArrayFromDType(r,o*a),u=I.getTypedArrayFromDType("int32",o*a);for(let t=0;t<o;t++){let r=t*i,s=e.subarray(r,r+i),o=Array(s.length);s.forEach((e,t)=>o[t]={value:e,index:t}),a<o.length&&(!function e(t,r,a=0,n=t.length-1){for(;n>a;){if(n-a>600){let s=n-a+1,o=r-a+1,i=Math.log(s),l=.5*Math.exp(2*i/3),u=.5*Math.sqrt(i*l*(s-l)/s)*Math.sign(o-s/2),p=Math.max(a,Math.floor(r-o*l/s+u)),d=Math.min(n,Math.floor(r+(s-o)*l/s+u));e(t,r,p,d)}let s=t[r],o=a,i=n;for(I.swap(t,a,r),n7(t[n],s)>0&&I.swap(t,a,n);o<i;){for(I.swap(t,o,i),o++,i--;0>n7(t[o],s);)o+=1;for(;n7(t[i],s)>0;)i-=1}0===n7(t[a],s)?I.swap(t,a,i):(i+=1,I.swap(t,i,n)),i<=r&&(a=i+1),r<=i&&(n=i-1)}}(o,a),o=o.slice(0,a)),n&&o.sort(n7);let p=t*a,d=l.subarray(p,p+a),c=u.subarray(p,p+a);for(let e=0;e<a;e++)d[e]=o[e].value,c[e]=o[e].index}let p=t.slice();return p[p.length-1]=a,[(0,N.buffer)(p,r,l),(0,N.buffer)(p,"int32",u)]}const se={kernelName:$.TopK,backendName:"cpu",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{x:n}=t,{k:s,sorted:o}=a;w(n,"topk");let[i,l]=n9(r.data.get(n.dataId).values,n.shape,n.dtype,s,o);return[r.makeTensorInfo(i.shape,i.dtype,i.values),r.makeTensorInfo(l.shape,l.dtype,l.values)]}};g("i64bB");var $=g("hl418"),I=g("jjNRA");const st={kernelName:$.Transform,backendName:"cpu",kernelFunc:function(e){let{inputs:t,attrs:r,backend:a}=e,{image:n,transforms:s}=t,{interpolation:o,fillMode:i,fillValue:l,outputShape:u}=r,[p,d,c,h]=n.shape,[f,m]=null!=u?u:[d,c],g=[p,f,m,h],x=I.computeStrides(n.shape),y=x[0],b=x[1],v=x[2],N=I.computeStrides(g),k=N[0],T=N[1],S=N[2],w=I.getTypedArrayFromDType(n.dtype,I.sizeFromShape(g));w.fill(l);let C=a.data.get(n.dataId).values,E=a.data.get(s.dataId).values;for(let e=0;e<p;++e){let t=1===s.shape[0]?E:E.subarray(8*e,8*e+8);for(let r=0;r<f;++r)for(let a=0;a<m;++a)for(let n=0;n<h;++n){let s,u=t[6]*a+t[7]*r+1;if(0===u)continue;let p=(t[0]*a+t[1]*r+t[2])/u,h=(t[3]*a+t[4]*r+t[5])/u,f=sr(p,c,i),m=sr(h,d,i);switch(o){case"nearest":s=sa(C,d,c,y,b,v,e,Math.round(m),Math.round(f),n,l);break;case"bilinear":s=function(e,t,r,a,n,s,o,i,l,u,p){let d=Math.floor(i),c=Math.floor(l),h=d+1,f=c+1,m=(f-l)*sa(e,t,r,a,n,s,o,d,c,u,p)+(l-c)*sa(e,t,r,a,n,s,o,d,f,u,p),g=(f-l)*sa(e,t,r,a,n,s,o,h,c,u,p)+(l-c)*sa(e,t,r,a,n,s,o,h,f,u,p);return(h-i)*m+(i-d)*g}(C,d,c,y,b,v,e,m,f,n,l);break;default:throw Error(`Error in Transform: Expect 'nearest' or 'bilinear', but got ${o}`)}w[e*k+r*T+a*S+n]=s}return a.makeTensorInfo(g,n.dtype,w)}return{dataId:a.write(w,g,n.dtype),shape:n.shape,dtype:n.dtype}}};function sr(e,t,r){switch(r){case"reflect":var a,n,s,o,i,l=e,u=t;let p=l;if(p<0)if(u<=1)p=0;else{let e=2*u;p<e&&(p=e*Math.trunc(-p/e)+p),p=p<-u?p+e:-p-1}else if(p>u-1)if(u<=1)p=0;else{let e=2*u;(p-=e*Math.trunc(p/e))>=u&&(p=e-p-1)}return I.clamp(0,p,u-1);case"wrap":let d;return a=e,n=t,(d=a)<0?n<=1?d=0:d+=n*(Math.trunc(-d/(n-1))+1):d>n-1&&(n<=1?d=0:d-=n*Math.trunc(d/(n-1))),I.clamp(0,d,n-1);case"nearest":return s=e,o=t,I.clamp(0,s,o-1);default:return i=0,e}}function sa(e,t,r,a,n,s,o,i,l,u,p){return 0<=i&&i<t&&0<=l&&l<r?e[o*a+i*n+l*s+u]:p}g("i64bB");var $=g("hl418");g("i64bB");var tp=g("9jCh7"),I=g("jjNRA");function sn(e,t,r,a){let n=I.parseAxisParam(t,r)[0],s=[1,r[0],1];for(let e=0;e<n;e++)s[0]*=r[e];s[1]=r[n];for(let e=n+1;e<r.length;e++)s[2]*=r[e];let o=new Map,i=new Int32Array(r[n]),l=new(0,tp.TensorBuffer)(s,a,e),u=[],p=1===s[0]&&1===s[2];for(let t=0;t<r[n];t++){let r;if(p)r=e[t].toString();else{let e=[];for(let r=0;r<s[0];r++)for(let a=0;a<s[2];a++)e.push(l.get(r,t,a));r=e.join(",")}let a=o.get(r);if(null!=a)i[t]=a;else{let e=o.size;o.set(r,e),i[t]=e,u.push(t)}}let d=s.slice();d[1]=o.size;let c=new(0,tp.TensorBuffer)(d,a);u.forEach((e,t)=>{for(let r=0;r<s[0];r++)for(let a=0;a<s[2];a++)c.set(l.get(r,e,a),r,t,a)});let h=r.slice();return h[n]=d[1],{outputValues:c.values,outputShape:h,indices:i}}const ss={kernelName:$.Unique,backendName:"cpu",kernelFunc:function(e){let{inputs:t,attrs:r,backend:a}=e,{axis:n}=r,{x:s}=t;w(s,"unique");let{outputValues:o,outputShape:i,indices:l}=sn(a.data.get(s.dataId).values,n,s.shape,s.dtype);return[a.makeTensorInfo(i,s.dtype,o),a.makeTensorInfo([l.length],"int32",l)]}};g("i64bB");var $=g("hl418");const so={kernelName:$.Unpack,backendName:"cpu",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{value:n}=t,{axis:s}=a;s<0&&(s+=n.shape.length);let o=n.shape.length,i=n.shape[s],l=Array(o-1),u=0;for(let e=0;e<o;e++)e!==s&&(l[u++]=n.shape[e]);let p=Array(o).fill(0),d=n.shape.slice();d[s]=1;let c=Array(i);for(let e=0;e<c.length;e++){p[s]=e;let t=eJ({inputs:{x:n},backend:r,attrs:{begin:p,size:d}});c[e]=eh({inputs:{x:t},backend:r,attrs:{shape:l}}),r.disposeIntermediateTensorInfo(t)}return c}};g("i64bB");var $=g("hl418"),I=g("jjNRA");for(const e of[ex,eb,eN,eT,ed,eS,eE,eA,e$,eR,eB,eO,eD,eV,eW,eq,eH,eK,eX,eg,eZ,e1,e3,e5,e7,es,tt,ta,J,tn,tu,tc,th,tf,tm,tg,tx,tb,tN,tk,tS,tI,tw,tC,tA,t$,tR,tP,tB,tF,tO,tM,tz,O,tj,tH,t1,t3,t6,t9,rl,rp,rd,rf,rx,ry,rb,rN,rT,rw,rA,D,r$,ti,rP,rF,rM,L,rL,rW,rj,rH,rX,rQ,r0,r4,r3,r8,r7,at,ar,aa,an,as,ao,ai,al,ad,ac,am,ab,tV,aN,aT,aI,aC,a$,aR,aF,aM,aD,aV,z,aW,aU,aH,a1,a4,er,rr,a8,U,H,ef,a6,a5,a7,a9,ne,nt,na,no,nl,nu,np,nf,Z,ng,ny,nv,e0,ay,nT,nS,nw,nE,n$,nR,nP,nB,nM,nD,nV,nz,nU,nH,nZ,nQ,n0,ro,tW,n2,n3,n8,n5,se,st,eC,ss,so,{kernelName:$.UnsortedSegmentSum,backendName:"cpu",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{x:n,segmentIds:s}=t,{numSegments:o}=a;w(n,"unsortedSegmentSum");let i=n.shape.length,l=s.shape.length,u=[],p=[],d=i-l,c=s;for(let e=0;e<d;++e){let t=t8({inputs:{input:c},backend:r,attrs:{dim:e+1}});c=t,p.push(t)}for(let e=0;e<o;++e){let t=I.createScalarValue(e,"int32"),a=r.makeTensorInfo([],"int32",t),s=tq({inputs:{a:a,b:c},backend:r}),o=en({inputs:{x:s},backend:r,attrs:{dtype:"float32"}}),i=tL({inputs:{a:o,b:n},backend:r}),l=tG({inputs:{x:i},backend:r,attrs:{axis:0,keepDims:!1}});u.push(l),p.push(a),p.push(s),p.push(o),p.push(i),p.push(l)}let h=aO({inputs:u,backend:r,attrs:{axis:0}});return p.forEach(e=>r.disposeIntermediateTensorInfo(e)),h}},aB])(0,A.registerKernel)(e);g("i64bB");var si=g("4GTZ3"),b=g("c2DT1");g("i64bB");var si=g("4GTZ3"),T=g("ibsdL");g("i64bB");var T=g("ibsdL"),I=g("jjNRA");g("i64bB");var T=g("ibsdL");const sl={},su={alpha:!1,antialias:!1,premultipliedAlpha:!1,preserveDrawingBuffer:!1,depth:!1,stencil:!1,failIfMajorPerformanceCaveat:!0};function sp(e,t){if(!(e in sl)||null!=t){let r=function(e,t){if(1!==e&&2!==e)throw Error("Cannot get WebGL rendering context, WebGL is disabled.");let r=null==t?function(e){if(!(0,T.env)().getBool("IS_SAFARI")&&"undefined"!=typeof OffscreenCanvas&&2===e)return new OffscreenCanvas(300,150);if("undefined"!=typeof document)return document.createElement("canvas");throw Error("Cannot create a canvas in this context")}(e):t;return(r.addEventListener("webglcontextlost",t=>{t.preventDefault(),delete sl[e]},!1),(0,T.env)().getBool("SOFTWARE_WEBGL_ENABLED")&&(su.failIfMajorPerformanceCaveat=!1),1===e)?r.getContext("webgl",su)||r.getContext("experimental-webgl",su):r.getContext("webgl2",su)}(e,t);if(null===r)return console.log("Could not get context for WebGL version",e),null;sl[e]=r}let r=sl[e];return null==r||r.isContextLost()?(delete sl[e],sp(e)):(r.disable(r.DEPTH_TEST),r.disable(r.STENCIL_TEST),r.disable(r.BLEND),r.disable(r.DITHER),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SAMPLE_COVERAGE),r.enable(r.SCISSOR_TEST),r.enable(r.CULL_FACE),r.cullFace(r.BACK),sl[e])}g("i64bB");var T=g("ibsdL"),I=g("jjNRA");function sd(e){let t=Math.ceil(I.sizeFromShape(e)/4);return I.sizeToSquarishShape(t)}function sc(e,t){return[Math.max(1,Math.ceil(t/2)),Math.max(1,Math.ceil(e/2))]}function sh(e,t){let r,a,n,s,o,i,l,u,p,d;return 2===(0,T.env)().getNumber("WEBGL_VERSION")?(r=e.R32F,a=e.R16F,n=e.RGBA16F,s=e.RGBA32F,o=e.RED,l=4,u=1,p=e.HALF_FLOAT,d=e.FLOAT,i=e.RGBA8):(r=e.RGBA,a=e.RGBA,n=e.RGBA,s=e.RGBA,o=e.RGBA,l=4,u=4,p=null!=t?t.HALF_FLOAT_OES:null,d=e.FLOAT,i=e.RGBA),{internalFormatFloat:r,internalFormatHalfFloat:a,internalFormatPackedHalfFloat:n,internalFormatPackedFloat:s,textureFormatFloat:o,downloadTextureFormat:i,downloadUnpackNumChannels:l,defaultNumChannels:u,textureTypeHalfFloat:p,textureTypeFloat:d}}function sf(e,t){let r=t();return(0,T.env)().getBool("DEBUG")&&function(e){let t=e.getError();if(t!==e.NO_ERROR)throw Error("WebGL Error: "+function(e,t){switch(t){case e.NO_ERROR:return"NO_ERROR";case e.INVALID_ENUM:return"INVALID_ENUM";case e.INVALID_VALUE:return"INVALID_VALUE";case e.INVALID_OPERATION:return"INVALID_OPERATION";case e.INVALID_FRAMEBUFFER_OPERATION:return"INVALID_FRAMEBUFFER_OPERATION";case e.OUT_OF_MEMORY:return"OUT_OF_MEMORY";case e.CONTEXT_LOST_WEBGL:return"CONTEXT_LOST_WEBGL";default:return`Unknown error code ${t}`}}(e,t))}(e),r}function sm(e,t){return sT(e,()=>e.getExtension(t),'Extension "'+t+'" not supported on this browser.')}(s=u||(u={}))[s.DENSE=0]="DENSE",s[s.SHARED_BATCH=1]="SHARED_BATCH",(o=p||(p={}))[o.RENDER=0]="RENDER",o[o.UPLOAD=1]="UPLOAD",o[o.PIXELS=2]="PIXELS",o[o.DOWNLOAD=3]="DOWNLOAD",(i=d||(d={}))[i.UNPACKED_FLOAT16=0]="UNPACKED_FLOAT16",i[i.UNPACKED_FLOAT32=1]="UNPACKED_FLOAT32",i[i.PACKED_4X1_UNSIGNED_BYTE=2]="PACKED_4X1_UNSIGNED_BYTE",i[i.PACKED_2X2_FLOAT32=3]="PACKED_2X2_FLOAT32",i[i.PACKED_2X2_FLOAT16=4]="PACKED_2X2_FLOAT16";const sg=/ERROR: [0-9]+:([0-9]+):/g;function sx(e,t){let r=sg.exec(t);if(null==r){console.log(`Couldn't parse line number in error: ${t}`),console.log(e);return}let a=+r[1],n=e.split("\n"),s=n.length.toString().length+2,o=n.map((e,t)=>I.rightPad((t+1).toString(),s)+e),i=0;for(let e=0;e<o.length;e++)i=Math.max(o[e].length,i);let l=o.slice(0,a-1),u=o.slice(a-1,a),p=o.slice(a);console.log(l.join("\n")),console.log(t.split("\n")[0]),console.log(`%c ${I.rightPad(u[0],i)}`,"border:1px solid red; background-color:#e3d2d2; color:#a61717"),console.log(p.join("\n"))}function sy(e,t){if(sf(e,()=>e.validateProgram(t)),!1===e.getProgramParameter(t,e.VALIDATE_STATUS))throw console.log(e.getProgramInfoLog(t)),Error("Shader program validation failed.")}function sb(e,t,r,a,n,s,o){let i=e.getAttribLocation(t,r);return -1!==i&&(sf(e,()=>e.bindBuffer(e.ARRAY_BUFFER,a)),sf(e,()=>e.vertexAttribPointer(i,n,e.FLOAT,!1,s,o)),sf(e,()=>e.enableVertexAttribArray(i)),!0)}function sv(e,t,r){sf(e,()=>e.bindFramebuffer(e.FRAMEBUFFER,r)),sf(e,()=>e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0))}function sN(e,t){sf(e,()=>e.bindFramebuffer(e.FRAMEBUFFER,t)),sf(e,()=>e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,null,0))}function sk(e){let t=e.checkFramebufferStatus(e.FRAMEBUFFER);if(t!==e.FRAMEBUFFER_COMPLETE)throw Error("Error binding framebuffer: "+function(e,t){switch(t){case e.FRAMEBUFFER_INCOMPLETE_ATTACHMENT:return"FRAMEBUFFER_INCOMPLETE_ATTACHMENT";case e.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:return"FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT";case e.FRAMEBUFFER_INCOMPLETE_DIMENSIONS:return"FRAMEBUFFER_INCOMPLETE_DIMENSIONS";case e.FRAMEBUFFER_UNSUPPORTED:return"FRAMEBUFFER_UNSUPPORTED";default:return`unknown error ${t}`}}(e,t))}function sT(e,t,r){let a=sf(e,()=>t());if(null==a)throw Error(r);return a}function sS(e,t=2){return I.sizeFromShape(e.slice(0,e.length-t))}function sI(e){if(0===e.length)throw Error("Cannot get rows and columns of an empty shape array.");return[e.length>1?e[e.length-2]:1,e[e.length-1]]}function sw(e){let t=[1,1,1];return 0!==e.length&&(1!==e.length||1!==e[0])&&(t=[sS(e),...sI(e)]),t}function sC(e,t){if(e=e.slice(-2),t=t.slice(-2),I.arraysEqual(e,t)||!e.length||!t.length||0===e[0]||0===e[1]||0===t[0]||0===t[1])return!0;if(e.length!==t.length){let r=e[e.length-1],a=t[t.length-1];if(r===a||r%2==0&&a%2==0&&(1===e[0]||1===t[0]))return!0}return e[1]===t[1]&&e[0]%2==0&&t[0]%2==0}function sE(e,t){return null!=e.getExtension(t)}function sA(e){try{let t=sp(e);if(null!=t)return!0}catch(e){console.log("Error when getting WebGL context: ",e)}return!1}function s$(e){let t=sh(e),r=e.createTexture();e.bindTexture(e.TEXTURE_2D,r),e.texImage2D(e.TEXTURE_2D,0,t.internalFormatFloat,1,1,0,t.textureFormatFloat,t.textureTypeFloat,null);let a=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,a),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,r,0);let n=e.checkFramebufferStatus(e.FRAMEBUFFER)===e.FRAMEBUFFER_COMPLETE;return e.bindTexture(e.TEXTURE_2D,null),e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteTexture(r),e.deleteFramebuffer(a),n}function sR(e,t){Array.isArray(e)||(e=[e]),e.forEach(e=>{null!=e&&I.assert("complex64"!==e.dtype,()=>`${t} does not support complex64 tensors in the WebGL backend.`)})}const sP=(0,T.env)();sP.registerFlag("HAS_WEBGL",()=>sP.getNumber("WEBGL_VERSION")>0),sP.registerFlag("WEBGL_VERSION",()=>sA(2)?2:+!!sA(1)),sP.registerFlag("WEBGL_CHECK_NUMERICAL_PROBLEMS",()=>!1),sP.registerFlag("WEBGL_BUFFER_SUPPORTED",()=>2===sP.get("WEBGL_VERSION")),sP.registerFlag("WEBGL_CPU_FORWARD",()=>!0),sP.registerFlag("WEBGL_FORCE_F16_TEXTURES",()=>!1),sP.registerFlag("WEBGL_PACK",()=>sP.getBool("HAS_WEBGL")),sP.registerFlag("WEBGL_PACK_NORMALIZATION",()=>sP.getBool("WEBGL_PACK")),sP.registerFlag("WEBGL_PACK_CLIP",()=>sP.getBool("WEBGL_PACK")),sP.registerFlag("WEBGL_PACK_DEPTHWISECONV",()=>sP.getBool("WEBGL_PACK")),sP.registerFlag("WEBGL_PACK_BINARY_OPERATIONS",()=>sP.getBool("WEBGL_PACK")),sP.registerFlag("WEBGL_PACK_UNARY_OPERATIONS",()=>sP.getBool("WEBGL_PACK")),sP.registerFlag("WEBGL_PACK_ARRAY_OPERATIONS",()=>sP.getBool("WEBGL_PACK")),sP.registerFlag("WEBGL_PACK_IMAGE_OPERATIONS",()=>sP.getBool("WEBGL_PACK")),sP.registerFlag("WEBGL_PACK_REDUCE",()=>sP.getBool("WEBGL_PACK")),sP.registerFlag("WEBGL_LAZILY_UNPACK",()=>sP.getBool("WEBGL_PACK")),sP.registerFlag("WEBGL_CONV_IM2COL",()=>sP.getBool("WEBGL_PACK")),sP.registerFlag("WEBGL_PACK_CONV2DTRANSPOSE",()=>sP.getBool("WEBGL_PACK")),sP.registerFlag("WEBGL_MAX_TEXTURE_SIZE",()=>(function(t){if(null==e){let r=sp(t);e=r.getParameter(r.MAX_TEXTURE_SIZE)}return e})(sP.getNumber("WEBGL_VERSION"))),sP.registerFlag("WEBGL_MAX_TEXTURES_IN_SHADER",()=>(function(e){if(null==t){let r=sp(e);t=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS)}return Math.min(16,t)})(sP.getNumber("WEBGL_VERSION"))),sP.registerFlag("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION",()=>{let e,t=sP.getNumber("WEBGL_VERSION");if(0===t)return 0;if(0===t)return 0;let r=sp(t);return sE(r,"EXT_disjoint_timer_query_webgl2")&&2===t?2:+!!sE(r,"EXT_disjoint_timer_query")}),sP.registerFlag("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE",()=>sP.getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")>0&&!si.isMobile()),sP.registerFlag("WEBGL_RENDER_FLOAT32_CAPABLE",()=>(function(e){if(0===e)return!1;let t=sp(e);if(1===e){if(!sE(t,"OES_texture_float"))return!1}else if(!sE(t,"EXT_color_buffer_float"))return!1;return s$(t)})(sP.getNumber("WEBGL_VERSION"))),sP.registerFlag("WEBGL_RENDER_FLOAT32_ENABLED",()=>!sP.getBool("WEBGL_FORCE_F16_TEXTURES")&&sP.getBool("WEBGL_RENDER_FLOAT32_CAPABLE")),sP.registerFlag("WEBGL_DOWNLOAD_FLOAT_ENABLED",()=>(function(e){if(0===e)return!1;let t=sp(e);if(1===e){if(!sE(t,"OES_texture_float")||!sE(t,"WEBGL_color_buffer_float"))return!1}else{if(sE(t,"EXT_color_buffer_float"))return s$(t);let e="EXT_color_buffer_half_float";if(sE(t,e)){let n=t.getExtension(e);var r=t,a=n;let s=sh(r,a),o=r.createTexture();r.bindTexture(r.TEXTURE_2D,o),r.texImage2D(r.TEXTURE_2D,0,s.internalFormatHalfFloat,1,1,0,s.textureFormatFloat,s.textureTypeHalfFloat,null);let i=r.createFramebuffer();r.bindFramebuffer(r.FRAMEBUFFER,i),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,o,0);let l=r.checkFramebufferStatus(r.FRAMEBUFFER)===r.FRAMEBUFFER_COMPLETE;return r.bindTexture(r.TEXTURE_2D,null),r.bindFramebuffer(r.FRAMEBUFFER,null),r.deleteTexture(o),r.deleteFramebuffer(i),l}return!1}return s$(t)})(sP.getNumber("WEBGL_VERSION"))),sP.registerFlag("WEBGL_FENCE_API_ENABLED",()=>{var e;return 2===(e=sP.getNumber("WEBGL_VERSION"))&&null!=sp(e).fenceSync}),sP.registerFlag("WEBGL_SIZE_UPLOAD_UNIFORM",()=>4*!!sP.getBool("WEBGL_RENDER_FLOAT32_ENABLED")),sP.registerFlag("WEBGL_DELETE_TEXTURE_THRESHOLD",()=>-1,e=>{if("number"!=typeof e)throw Error(`WEBGL_DELETE_TEXTURE_THRESHOLD must be a number but got ${e}.`);if(e<0&&-1!==e)throw Error(`WEBGL_DELETE_TEXTURE_THRESHOLD must be -1 (indicating never delete) or at least 0, but got ${e}.`)}),sP.registerFlag("WEBGL_FLUSH_THRESHOLD",()=>si.isMobile()?1:-1,e=>{if("number"!=typeof e)throw Error(`WEBGL_FLUSH_THRESHOLD must be a number but got ${e}.`);if(e<0&&-1!==e)throw Error(`WEBGL_FLUSH_THRESHOLD must be -1 (indicating never manual flush) or at least 0, but got ${e}.`)}),sP.registerFlag("CPU_HANDOFF_SIZE_THRESHOLD",()=>128),sP.registerFlag("WEBGL_USE_SHAPES_UNIFORMS",()=>!1),sP.registerFlag("TOPK_LAST_DIM_CPU_HANDOFF_SIZE_THRESHOLD",()=>1e5),sP.registerFlag("TOPK_K_CPU_HANDOFF_THRESHOLD",()=>128),sP.registerFlag("WEBGL_EXP_CONV",()=>!1),sP.registerFlag("SOFTWARE_WEBGL_ENABLED",()=>sP.getBool("IS_TEST")),sP.registerFlag("WEBGL_MAX_SIZE_FOR_NARROW_TEXTURE",()=>1/0),sP.registerFlag("WEBGL_AUTO_SQUARIFY_NARROW_TEXTURE_SHAPE",()=>!1),sP.registerFlag("WEBGL2_ISNAN_CUSTOM",()=>!1),sP.registerFlag("ENGINE_COMPILE_ONLY",()=>!1),g("i64bB");var v=g("7MaPk"),N=g("iG87S"),k=g("fJqML"),b=g("c2DT1"),T=g("ibsdL"),S=g("lzjc8"),sB=g("9LtVT"),sF=g("3xp7o"),I=g("jjNRA");g("i64bB");var T=g("ibsdL");function sO(){let e,t,r,a,n,s,o,i,l,u;return 2===(0,T.env)().getNumber("WEBGL_VERSION")?(e="#version 300 es",t="in",r="out",a="in",n="texture",s="outputColor",o="out vec4 outputColor;",i=(0,T.env)().getBool("WEBGL2_ISNAN_CUSTOM")?`
      bool isnan_custom(float val) {
        uint floatToUint = floatBitsToUint(val);
        return (floatToUint & 0x7fffffffu) > 0x7f800000u;
      }

      bvec4 isnan_custom(vec4 val) {
        return bvec4(isnan_custom(val.x),
          isnan_custom(val.y), isnan_custom(val.z), isnan_custom(val.w));
      }

      #define isnan(value) isnan_custom(value)
    `:"",l="",u=`
      #define round(value) newRound(value)
      int newRound(float value) {
        return int(floor(value + 0.5));
      }

      ivec4 newRound(vec4 value) {
        return ivec4(floor(value + vec4(0.5)));
      }
    `):(e="",t="attribute",r="varying",a="varying",n="texture2D",s="gl_FragColor",o="",i=`
      #define isnan(value) isnan_custom(value)
      bool isnan_custom(float val) {
        return (val > 0. || val < 1. || val == 0.) ? false : true;
      }
      bvec4 isnan_custom(vec4 val) {
        return bvec4(isnan(val.x), isnan(val.y), isnan(val.z), isnan(val.w));
      }
    `,l=`
      uniform float INFINITY;

      bool isinf(float val) {
        return abs(val) == INFINITY;
      }
      bvec4 isinf(vec4 val) {
        return equal(abs(val), vec4(INFINITY));
      }
    `,u=`
      int round(float value) {
        return int(floor(value + 0.5));
      }

      ivec4 round(vec4 value) {
        return ivec4(floor(value + vec4(0.5)));
      }
    `),{version:e,attribute:t,varyingVs:r,varyingFs:a,texture2D:n,output:s,defineOutput:o,defineSpecialNaN:i,defineSpecialInf:l,defineRound:u}}g("i64bB");var v=g("7MaPk"),T=g("ibsdL"),I=g("jjNRA");g("i64bB");var v=g("7MaPk"),I=g("jjNRA");g("i64bB");var I=g("jjNRA");function sM(e,t,r="index"){let a=I.computeStrides(t);return a.map((t,n)=>{let s=`int ${e[n]} = ${r} / ${t}`,o=n===a.length-1?`int ${e[n+1]} = ${r} - ${e[n]} * ${t}`:`index -= ${e[n]} * ${t}`;return`${s}; ${o};`}).join("")}function sD(e,t,r="index"){let a=I.computeStrides(t);return a.map((t,n)=>{let s=`int ${e[n]} = ${r} / outShapeStrides[${n}]`,o=n===a.length-1?`int ${e[n+1]} = ${r} - ${e[n]} * outShapeStrides[${n}]`:`index -= ${e[n]} * outShapeStrides[${n}]`;return`${s}; ${o};`}).join("")}function s_(e){let t=I.computeStrides(e).map(e=>e.toString());return`
  int getFlatIndex(ivec3 coords) {
    return coords.x * ${t[0]} + coords.y * ${t[1]} + coords.z;
  }
`}function sL(){return`
  int getFlatIndex(ivec3 coords) {
    return coords.x * outShapeStrides[0] + coords.y * outShapeStrides[1] + coords.z;
  }
`}const sV=`
  const float FLOAT_MAX = 1.70141184e38;
  const float FLOAT_MIN = 1.17549435e-38;

  lowp vec4 encode_float(highp float v) {
    if (isnan(v)) {
      return vec4(255, 255, 255, 255);
    }

    highp float av = abs(v);

    if(av < FLOAT_MIN) {
      return vec4(0.0, 0.0, 0.0, 0.0);
    } else if(v > FLOAT_MAX) {
      return vec4(0.0, 0.0, 128.0, 127.0) / 255.0;
    } else if(v < -FLOAT_MAX) {
      return vec4(0.0, 0.0,  128.0, 255.0) / 255.0;
    }

    highp vec4 c = vec4(0,0,0,0);

    highp float e = floor(log2(av));
    highp float m = exp2(fract(log2(av))) - 1.0;

    c[2] = floor(128.0 * m);
    m -= c[2] / 128.0;
    c[1] = floor(32768.0 * m);
    m -= c[1] / 32768.0;
    c[0] = floor(8388608.0 * m);

    highp float ebias = e + 127.0;
    c[3] = floor(ebias / 2.0);
    ebias -= c[3] * 2.0;
    c[2] += floor(ebias) * 128.0;

    c[3] += 128.0 * step(0.0, -v);

    return c / 255.0;
  }
`,{getBroadcastDims:sG}=v,sW=`
vec2 uvFromFlat(int texNumR, int texNumC, int index) {
  int texR = index / texNumC;
  int texC = index - texR * texNumC;
  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
}
vec2 packedUVfrom1D(int texNumR, int texNumC, int index) {
  int texelIndex = index / 2;
  int texR = texelIndex / texNumC;
  int texC = texelIndex - texR * texNumC;
  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
}
`,sz=`
vec2 packedUVfrom2D(int texelsInLogicalRow, int texNumR,
  int texNumC, int row, int col) {
  int texelIndex = (row / 2) * texelsInLogicalRow + (col / 2);
  int texR = texelIndex / texNumC;
  int texC = texelIndex - texR * texNumC;
  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
}
`,sj=`
vec2 packedUVfrom3D(int texNumR, int texNumC,
    int texelsInBatch, int texelsInLogicalRow, int b,
    int row, int col) {
  int index = b * texelsInBatch + (row / 2) * texelsInLogicalRow + (col / 2);
  int texR = index / texNumC;
  int texC = index - texR * texNumC;
  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
}
`,sU=`
  float getChannel(vec4 frag, vec2 innerDims) {
    vec2 modCoord = mod(innerDims, 2.);
    return modCoord.x == 0. ?
      (modCoord.y == 0. ? frag.r : frag.g) :
      (modCoord.y == 0. ? frag.b : frag.a);
  }
  float getChannel(vec4 frag, int dim) {
    float modCoord = mod(float(dim), 2.);
    return modCoord == 0. ? frag.r : frag.g;
  }
`;function sq(){return`
    int getOutputCoords() {
      return 0;
    }
  `}function sH(e){return`offset${e}`}function sK(e){let t=e.name,r=I.sizeFromShape(e.shapeInfo.logicalShape);return r<2?`return ${t};`:`
    for (int i = 0; i < ${r}; i++) {
      if (i == index) {
        return ${t}[i];
      }
    }
  `}function sX(e){if(e<=1)return"int";if(2===e)return"ivec2";if(3===e)return"ivec3";if(4===e)return"ivec4";if(5===e)return"ivec5";else if(6===e)return"ivec6";else throw Error(`GPU for rank ${e} is not yet supported`)}function sZ(e,t,r){let{newShape:a,keptDims:n}=I.squeezeShape(t),s=t.length,o=e&&3===s&&1===t[0],i=o?t.slice(1):a,l=!e&&s>1&&!I.arraysEqual(t,r)&&a.length<s||o,u=l?i:t;return{useSqueezeShape:l,uniformShape:u,keptDims:n}}function sY(e,t){let r=JSON.parse(JSON.stringify(e));return r.shapeInfo.logicalShape=t,r}function sQ(e,t){return t.map(t=>e[t]).join(", ")}function sJ(e,t,r){let a,n,s,o=[],i=[],l=null,u=null;for(let a of(u=e.getUniformLocation(r,"NAN",!1),1===(0,T.env)().getNumber("WEBGL_VERSION")&&(l=e.getUniformLocation(r,"INFINITY",!1)),t.variableNames)){let n={name:a,uniform:e.getUniformLocation(r,a,!1),offset:e.getUniformLocation(r,`offset${a}`,!1)};t.enableShapeUniforms&&(n.shape=e.getUniformLocation(r,`${a}Shape`,!1),n.texShape=e.getUniformLocation(r,`${a}TexShape`,!1)),o.push(n)}if(t.enableShapeUniforms&&(a=e.getUniformLocation(r,"outShape",!1),s=e.getUniformLocation(r,"outShapeStrides",!1),n=e.getUniformLocation(r,"outTexShape",!1)),t.customUniforms)for(let a of t.customUniforms)i.push(e.getUniformLocation(r,a.name,!1));return{variablesLocations:o,customUniformLocations:i,infLoc:l,nanLoc:u,outShapeLocation:a,outShapeStridesLocation:s,outTexShapeLocation:n}}function s0(e,t){if(e.length!==t.length)throw Error(`Binary was compiled with ${e.length} inputs, but was executed with ${t.length} inputs`);e.forEach((e,r)=>{let a=e.logicalShape,n=t[r],s=n.shape;if(!I.arraysEqual(a,s))throw Error(`Binary was compiled with different shapes than the current args. Shapes ${a} and ${s} must match`);if(e.isUniform&&n.isUniform)return;let o=e.texShape,i=n.isUniform?null:n.texData.texShape;if(!I.arraysEqual(o,i))throw Error(`Binary was compiled with different texture shapes than the current args. Shape ${o} and ${i} must match`)})}function s1(e){return(0,T.env)().getBool("WEBGL_USE_SHAPES_UNIFORMS")&&e<=4}class s2{constructor(e){this.variableNames=["A"],this.packedInputs=!1,this.packedOutput=!0,this.outPackingScheme=u.DENSE,this.customUniforms=[{name:"texShape",type:"ivec2"}];let t=sO();this.outputShape=e,this.enableShapeUniforms=s1(this.outputShape.length),this.userCode=`
      ivec3 outCoordsFromFlatIndex(int index) {
        ${this.enableShapeUniforms?sD(["r","c","d"],e):sM(["r","c","d"],e)}
        return ivec3(r, c, d);
      }

      void main() {
        ivec2 resTexRC = ivec2(resultUV.yx * vec2(texShape[0], texShape[1]));
        int index = 4 * (resTexRC.x * texShape[1] + resTexRC.y);

        vec4 result = vec4(0.);

        for (int i=0; i<4; i++) {
          int flatIndex = index + i;
          ivec3 rc = outCoordsFromFlatIndex(flatIndex);
          result[i] = getA(rc.x, rc.y, rc.z);
        }

        ${t.output} = result;
      }
    `}}class s4{constructor(e){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outPackingScheme=u.DENSE,this.customUniforms=[{name:"texShape",type:"ivec2"}];let t=sO();this.outputShape=e,this.enableShapeUniforms=s1(this.outputShape.length),this.userCode=`
      ivec3 outCoordsFromFlatIndex(int index) {
        ${this.enableShapeUniforms?sD(["r","c","d"],e):sM(["r","c","d"],e)}
        return ivec3(r, c, d);
      }

      void main() {
        ivec2 resTexRC = ivec2(resultUV.yx * vec2(texShape[0], texShape[1]));
        int index = 4 * (resTexRC.x * texShape[1] + resTexRC.y);

        vec4 result = vec4(0.);

        for (int i=0; i<4; i++) {
          int flatIndex = index + i;
          ivec3 rc = outCoordsFromFlatIndex(flatIndex);
          result[i] = getChannel(getA(rc.x, rc.y, rc.z), vec2(rc.y, rc.z));
        }

        ${t.output} = result;
      }
    `}}class s3{constructor(e){this.variableNames=["A"],this.outTexUsage=p.DOWNLOAD;let t=sO();this.outputShape=e,this.userCode=`
      ${sV}

      void main() {
        float x = getAAtOutCoords();
        ${t.output} = encode_float(x);
      }
    `}}class s8{constructor(e){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!1,this.outTexUsage=p.DOWNLOAD;let t=sO();this.outputShape=e,this.userCode=`
      ${sV}

      void main() {
        ivec3 coords = getOutputCoords();
        float x = getChannel(getAAtOutCoords(), vec2(coords.y, coords.z));
        ${t.output} = encode_float(x);
      }
    `}}const s6={R:0,G:1,B:2,A:3};class s5{constructor(e,t=!1,r="RGBA"){this.variableNames=["A"],this.customUniforms=[{name:"texShape",type:"ivec2"}];let a=sO();this.outputShape=e,this.enableShapeUniforms=s1(this.outputShape.length);let n="result";t&&(n="floor(result * 255. + 0.5)");let s="";for(let e=0;e<r.length;e++){let t=r[e];s+=`
          if(offset == ${e}) {
            result = values[${s6[t]}];
          }`}this.userCode=`
      ${this.enableShapeUniforms?sL():s_(e)}

      void main() {
        ivec3 coords = getOutputCoords();
        int flatIndex = getFlatIndex(coords);
        float result = 0.;
        int offset = imod(flatIndex, ${r.length});

        flatIndex = idiv(flatIndex, ${r.length}, 1.);

        int r = flatIndex / texShape[1];
        if (r < texShape[0]) {
          int c = imod(flatIndex, texShape[1]);
          vec2 uv = (vec2(c, r) + halfCR) / vec2(texShape[1], texShape[0]);
          vec4 values = ${a.texture2D}(A, uv);
          ${s}
        }
        ${a.output} = vec4(${n}, 0., 0., 0.);
      }
    `}}class s7{constructor(e,t=!1){this.variableNames=["A"],this.packedInputs=!1,this.packedOutput=!0,this.customUniforms=[{name:"texShape",type:"ivec2"}];let r=sO();this.outputShape=e,this.enableShapeUniforms=s1(this.outputShape.length);let a="",n="result";t&&(n="floor(result * 255. + 0.5)");for(let t=0;t<=1;t++)for(let n=0;n<=1;n++){let s=2*t+n;a+=`
          localCoords = coords;
          if(localCoords[2] + ${n} < ${this.enableShapeUniforms?"outShape[2]":`${e[2]}`}) {
          localCoords[2] += ${n};
          if (localCoords[1] + ${t} < ${this.enableShapeUniforms?"outShape[1]":`${e[1]}`}) {
            localCoords[1] += ${t};

            flatIndex = getFlatIndex(localCoords);
            offset = imod(flatIndex, 4);

            flatIndex = idiv(flatIndex, 4, 1.);

            int r = flatIndex / texShape[1];
            int c = imod(flatIndex, texShape[1]);
            vec2 uv = (vec2(c, r) + halfCR) / vec2(texShape[1], texShape[0]);
            values = ${r.texture2D}(A, uv);

            if (offset == 0) {
              result[${s}] = values[0];
            } else if (offset == 1) {
              result[${s}] = values[1];
            } else if (offset == 2) {
              result[${s}] = values[2];
            } else {
              result[${s}] = values[3];
            }
          }
        }
        `}this.userCode=`
        ${this.enableShapeUniforms?sL():s_(e)}

        void main() {
          ivec3 coords = getOutputCoords();

          vec4 result = vec4(0.);
          int flatIndex, r, c, offset;
          ivec3 localCoords;
          vec2 uv;
          vec4 values;

          ${a}

          ${r.output} = ${n};
        }
    `}}g("i64bB");var T=g("ibsdL"),I=g("jjNRA");g("i64bB");var T=g("ibsdL");function s9(e,t,r,a,n,s){let o=(0,T.env)().getNumber("WEBGL_MAX_TEXTURE_SIZE");if(t<=0||r<=0)throw Error(`Requested texture size [${t}x${r}] is invalid.`);if(t>o||r>o)throw Error(`Requested texture size [${t}x${r}] greater than WebGL maximum on this browser / GPU [${o}x${o}].`);let i=sT(e,()=>e.createTexture(),"Unable to create WebGLTexture."),l=e.TEXTURE_2D;return sf(e,()=>e.bindTexture(l,i)),sf(e,()=>e.texParameteri(l,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE)),sf(e,()=>e.texParameteri(l,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)),sf(e,()=>e.texParameteri(l,e.TEXTURE_MIN_FILTER,e.NEAREST)),sf(e,()=>e.texParameteri(l,e.TEXTURE_MAG_FILTER,e.NEAREST)),1===(0,T.env)().getNumber("WEBGL_VERSION")?sf(e,()=>e.texImage2D(l,0,a,t,r,0,n,s,null)):sf(e,()=>e.texStorage2D(l,1,a,t,r)),sf(e,()=>e.bindTexture(e.TEXTURE_2D,null)),{texture:i,texShape:[r,t]}}function oe(e){return e.internalFormatFloat}function ot(e){return e.internalFormatHalfFloat}function or(e){return e.downloadTextureFormat}function oa(e){return e.internalFormatPackedFloat}function on(e){return e.internalFormatPackedHalfFloat}class os{constructor(e){var t,r;this.outputTexture=null,this.program=null,this.disposed=!1,this.itemsToPoll=[];let a=(0,T.env)().getNumber("WEBGL_VERSION");if(null!=e?(this.gl=e,t=e,sl[a]=t):this.gl=sp(a),e=this.gl,2===(0,T.env)().getNumber("WEBGL_VERSION")){let t=e;this.createVertexArray=()=>sf(t,()=>t.createVertexArray()),this.bindVertexArray=e=>sf(t,()=>t.bindVertexArray(e)),this.deleteVertexArray=e=>sf(t,()=>t.deleteVertexArray(e)),this.getVertexArray=()=>sf(t,()=>t.getParameter(t.VERTEX_ARRAY_BINDING))}else if(null!=e){let t=e.getExtension("OES_vertex_array_object");if(null==t)throw Error("All WebGL1 implementations are expected to offer OES_vertex_array_object.");this.createVertexArray=()=>sf(e,()=>t.createVertexArrayOES()),this.bindVertexArray=r=>sf(e,()=>t.bindVertexArrayOES(r)),this.deleteVertexArray=r=>sf(e,()=>t.deleteVertexArrayOES(r)),this.getVertexArray=()=>sf(e,()=>e.getParameter(t.VERTEX_ARRAY_BINDING_OES))}let n="WEBGL_color_buffer_float",s="EXT_color_buffer_half_float";if(this.parallelCompilationExtension=this.gl.getExtension("KHR_parallel_shader_compile"),1===(0,T.env)().getNumber("WEBGL_VERSION")){let e="OES_texture_half_float";if(this.textureFloatExtension=sm(this.gl,"OES_texture_float"),sE(this.gl,e))this.textureHalfFloatExtension=sm(this.gl,e);else if((0,T.env)().get("WEBGL_FORCE_F16_TEXTURES"))throw Error("GL context does not support half float textures, yet the environment flag WEBGL_FORCE_F16_TEXTURES is set to true.");if(this.colorBufferFloatExtension=this.gl.getExtension(n),sE(this.gl,s))this.colorBufferHalfFloatExtension=sm(this.gl,s);else if((0,T.env)().get("WEBGL_FORCE_F16_TEXTURES"))throw Error("GL context does not support color renderable half floats, yet the environment flag WEBGL_FORCE_F16_TEXTURES is set to true.")}else if(n="EXT_color_buffer_float",sE(this.gl,n))this.colorBufferFloatExtension=this.gl.getExtension(n);else if(sE(this.gl,s))this.colorBufferHalfFloatExtension=this.gl.getExtension(s);else throw Error("GL context does not support color renderable floats");this.vertexBuffer=function(e){let t=new Float32Array([-1,1,0,0,1,-1,-1,0,0,0,1,1,0,1,1,1,-1,0,1,0]),r=sT(e,()=>e.createBuffer(),"Unable to create WebGLBuffer");return sf(e,()=>e.bindBuffer(e.ARRAY_BUFFER,r)),sf(e,()=>e.bufferData(e.ARRAY_BUFFER,t,e.STATIC_DRAW)),r}(this.gl),this.indexBuffer=function(e){let t=new Uint16Array([0,1,2,2,1,3]),r=sT(e,()=>e.createBuffer(),"Unable to create WebGLBuffer");return sf(e,()=>e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,r)),sf(e,()=>e.bufferData(e.ELEMENT_ARRAY_BUFFER,t,e.STATIC_DRAW)),r}(this.gl),this.framebuffer=sT(r=this.gl,()=>r.createFramebuffer(),"Unable to create WebGLFramebuffer."),this.textureConfig=sh(this.gl,this.textureHalfFloatExtension)}get debug(){return(0,T.env)().getBool("DEBUG")}dispose(){if(this.disposed)return;null!=this.program&&console.warn("Disposing a GPGPUContext that still has a bound WebGLProgram. This is probably a resource leak, delete the program with GPGPUContext.deleteProgram before disposing."),null!=this.outputTexture&&console.warn("Disposing a GPGPUContext that still has a bound output matrix texture.  This is probably a resource leak, delete the output matrix texture with GPGPUContext.deleteMatrixTexture before disposing.");let e=this.gl;sf(e,()=>e.finish()),sf(e,()=>e.bindFramebuffer(e.FRAMEBUFFER,null)),sf(e,()=>e.deleteFramebuffer(this.framebuffer)),sf(e,()=>e.bindBuffer(e.ARRAY_BUFFER,null)),sf(e,()=>e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,null)),sf(e,()=>e.deleteBuffer(this.indexBuffer)),this.disposed=!0}createFloat32MatrixTexture(e,t){return this.throwIfDisposed(),function(e,t,r,a){let[n,s]=[r,t];return s9(e,n,s,oe(a),a.textureFormatFloat,e.FLOAT)}(this.gl,e,t,this.textureConfig)}createFloat16MatrixTexture(e,t){return this.throwIfDisposed(),function(e,t,r,a){let[n,s]=[r,t];return s9(e,n,s,ot(a),a.textureFormatFloat,a.textureTypeHalfFloat)}(this.gl,e,t,this.textureConfig)}createUnsignedBytesMatrixTexture(e,t){return this.throwIfDisposed(),function(e,t,r,a){let[n,s]=[r,t];return s9(e,n,s,or(a),e.RGBA,e.UNSIGNED_BYTE)}(this.gl,e,t,this.textureConfig)}uploadPixelDataToTexture(e,t){var r;this.throwIfDisposed(),r=this.gl,sf(r,()=>r.bindTexture(r.TEXTURE_2D,e)),t.data instanceof Uint8Array?2===(0,T.env)().getNumber("WEBGL_VERSION")?sf(r,()=>r.texSubImage2D(r.TEXTURE_2D,0,0,0,t.width,t.height,r.RGBA,r.UNSIGNED_BYTE,t.data)):sf(r,()=>r.texImage2D(r.TEXTURE_2D,0,r.RGBA,t.width,t.height,0,r.RGBA,r.UNSIGNED_BYTE,t.data)):2===(0,T.env)().getNumber("WEBGL_VERSION")?sf(r,()=>r.texSubImage2D(r.TEXTURE_2D,0,0,0,r.RGBA,r.UNSIGNED_BYTE,t)):sf(r,()=>r.texImage2D(r.TEXTURE_2D,0,r.RGBA,r.RGBA,r.UNSIGNED_BYTE,t)),sf(r,()=>r.bindTexture(r.TEXTURE_2D,null))}uploadDenseMatrixToTexture(e,t,r,a){var n,s;let o,i,l;this.throwIfDisposed(),n=this.gl,s=this.textureConfig,sf(n,()=>n.bindTexture(n.TEXTURE_2D,e)),a instanceof Uint8Array?(o=new Uint8Array(t*r*4),i=n.UNSIGNED_BYTE,l=n.RGBA):(o=new Float32Array(t*r*4),i=n.FLOAT,l=s.internalFormatPackedFloat),o.set(a),2===(0,T.env)().getNumber("WEBGL_VERSION")?sf(n,()=>n.texSubImage2D(n.TEXTURE_2D,0,0,0,t,r,n.RGBA,i,o)):sf(n,()=>n.texImage2D(n.TEXTURE_2D,0,l,t,r,0,n.RGBA,i,o)),sf(n,()=>n.bindTexture(n.TEXTURE_2D,null))}createFloat16PackedMatrixTexture(e,t){return this.throwIfDisposed(),function(e,t,r,a){let[n,s]=sc(t,r);return s9(e,n,s,on(a),e.RGBA,a.textureTypeHalfFloat)}(this.gl,e,t,this.textureConfig)}createPackedMatrixTexture(e,t){return this.throwIfDisposed(),function(e,t,r,a){let[n,s]=sc(t,r);return s9(e,n,s,oa(a),e.RGBA,e.FLOAT)}(this.gl,e,t,this.textureConfig)}deleteMatrixTexture(e){this.throwIfDisposed(),this.outputTexture===e&&(sN(this.gl,this.framebuffer),this.outputTexture=null),sf(this.gl,()=>this.gl.deleteTexture(e))}downloadByteEncodedFloatMatrixFromOutputTexture(e,t,r){return this.downloadMatrixDriver(e,()=>(function(e,t,r,a){let[n,s]=[r,t],o=new Uint8Array(t*r*4);return sf(e,()=>e.readPixels(0,0,n,s,a.downloadTextureFormat,e.UNSIGNED_BYTE,o)),new Float32Array(o.buffer)})(this.gl,t,r,this.textureConfig))}downloadPackedMatrixFromBuffer(e,t,r,a,n,s){return function(e,t,r,a,n,s,o,i){let l=new Float32Array(function(e,t){let[r,a]=sc(e,t);return r*a*4}(s,o));return e.bindBuffer(e.PIXEL_PACK_BUFFER,t),e.getBufferSubData(e.PIXEL_PACK_BUFFER,0,l),e.bindBuffer(e.PIXEL_PACK_BUFFER,null),l}(this.gl,e,0,0,0,n,s,this.textureConfig)}downloadFloat32MatrixFromBuffer(e,t){var r=this.gl;let a=new Float32Array(t);return r.bindBuffer(r.PIXEL_PACK_BUFFER,e),r.getBufferSubData(r.PIXEL_PACK_BUFFER,0,a),r.bindBuffer(r.PIXEL_PACK_BUFFER,null),a}createBufferFromTexture(e,t,r){this.bindTextureToFrameBuffer(e);let a=function(e,t,r,a){let n=e.createBuffer();sf(e,()=>e.bindBuffer(e.PIXEL_PACK_BUFFER,n));let s=16*t*r;return sf(e,()=>e.bufferData(e.PIXEL_PACK_BUFFER,s,e.STREAM_READ)),sf(e,()=>e.readPixels(0,0,r,t,e.RGBA,e.FLOAT,0)),sf(e,()=>e.bindBuffer(e.PIXEL_PACK_BUFFER,null)),n}(this.gl,t,r,this.textureConfig);return this.unbindTextureToFrameBuffer(),a}createAndWaitForFence(){let e=this.createFence(this.gl);return this.pollFence(e)}createFence(e){let t,r;if((0,T.env)().getBool("WEBGL_FENCE_API_ENABLED")){let a=e.fenceSync(e.SYNC_GPU_COMMANDS_COMPLETE,0);e.flush(),r=()=>{let t=e.clientWaitSync(a,0,0);return t===e.ALREADY_SIGNALED||t===e.CONDITION_SATISFIED},t=a}else(0,T.env)().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")>0?(t=this.beginQuery(),this.endQuery(),r=()=>this.isQueryAvailable(t,(0,T.env)().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION"))):r=()=>!0;return{query:t,isFencePassed:r}}downloadMatrixFromPackedTexture(e,t,r){return this.downloadMatrixDriver(e,()=>(function(e,t,r){let a=new Float32Array(t*r*4);return sf(e,()=>e.readPixels(0,0,r,t,e.RGBA,e.FLOAT,a)),a})(this.gl,t,r))}createProgram(e){this.throwIfDisposed();let t=this.gl;null==this.vertexShader&&(this.vertexShader=function(e){let t=sO(),r=`${t.version}
    precision highp float;
    ${t.attribute} vec3 clipSpacePos;
    ${t.attribute} vec2 uv;
    ${t.varyingVs} vec2 resultUV;

    void main() {
      gl_Position = vec4(clipSpacePos, 1);
      resultUV = uv;
    }`,a=sT(e,()=>e.createShader(e.VERTEX_SHADER),"Unable to create vertex WebGLShader.");if(sf(e,()=>e.shaderSource(a,r)),sf(e,()=>e.compileShader(a)),!1===e.getShaderParameter(a,e.COMPILE_STATUS))throw console.log(e.getShaderInfoLog(a)),Error("Failed to compile vertex shader.");return a}(t));let r=sT(t,()=>t.createProgram(),"Unable to create WebGLProgram.");if(sf(t,()=>t.attachShader(r,this.vertexShader)),sf(t,()=>t.attachShader(r,e)),sf(t,()=>t.linkProgram(r)),!(0,T.env)().get("ENGINE_COMPILE_ONLY")&&!1===t.getProgramParameter(r,t.LINK_STATUS))throw console.log(t.getProgramInfoLog(r)),Error("Failed to link vertex and fragment shaders.");let a=Object.assign(r,{vao:this.createVertexArray()});return this.debug&&sy(t,a),a}buildVao(e){var t;this.setProgram(e),this.bindVertexArray(e.vao);let r=this.gl;sf(r,()=>r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,this.indexBuffer)),t=this.vertexBuffer,sf(r,()=>r.bindBuffer(r.ARRAY_BUFFER,t)),sb(r,e,"clipSpacePos",t,3,20,0)&&sb(r,e,"uv",t,2,20,12)}deleteProgram(e){this.throwIfDisposed(),e===this.program&&(this.program=null),null!=e&&(sf(this.gl,()=>this.gl.deleteProgram(e)),this.deleteVertexArray(e.vao))}setProgram(e){this.throwIfDisposed(),this.program=e,null!=this.program&&this.debug&&sy(this.gl,this.program),sf(this.gl,()=>this.gl.useProgram(e))}getUniformLocation(e,t,r=!0){var a,n,s;return(this.throwIfDisposed(),r)?(a=this.gl,sT(a,()=>a.getUniformLocation(e,n),'uniform "'+(n=t)+'" not present in program.')):(s=this.gl,s.getUniformLocation(e,t))}getAttributeLocation(e,t){return this.throwIfDisposed(),sf(this.gl,()=>this.gl.getAttribLocation(e,t))}getUniformLocationNoThrow(e,t){return this.throwIfDisposed(),this.gl.getUniformLocation(e,t)}setInputMatrixTexture(e,t,r){var a;this.throwIfDisposed(),this.throwIfNoProgram(),a=this.gl,sf(a,()=>{(function(e,t){let r=e.MAX_COMBINED_TEXTURE_IMAGE_UNITS-1,a=t+e.TEXTURE0;if(a<e.TEXTURE0||a>r){let e=`[gl.TEXTURE0, gl.TEXTURE${r}]`;throw Error(`textureUnit must be in ${e}.`)}})(a,r),sf(a,()=>a.activeTexture(a.TEXTURE0+r)),sf(a,()=>a.bindTexture(a.TEXTURE_2D,e))}),sf(a,()=>a.uniform1i(t,r))}setOutputMatrixTexture(e,t,r){this.setOutputMatrixTextureDriver(e,r,t)}setOutputPackedMatrixTexture(e,t,r){this.throwIfDisposed();let[a,n]=sc(t,r);this.setOutputMatrixTextureDriver(e,a,n)}setOutputMatrixWriteRegion(e,t,r,a){this.setOutputMatrixWriteRegionDriver(r,e,a,t)}setOutputPackedMatrixWriteRegion(e,t,r,a){throw Error("setOutputPackedMatrixWriteRegion not implemented.")}debugValidate(){null!=this.program&&sy(this.gl,this.program),sk(this.gl)}executeProgram(){this.throwIfDisposed(),this.throwIfNoProgram();let e=this.gl;this.debug&&(console.assert(this.getVertexArray()===this.program.vao,"VAO changed between setProgram and executeProgram!"),this.debugValidate()),sf(e,()=>e.drawElements(e.TRIANGLES,6,e.UNSIGNED_SHORT,0))}blockUntilAllProgramsCompleted(){this.throwIfDisposed(),sf(this.gl,()=>this.gl.finish())}getQueryTimerExtension(){return null==this.disjointQueryTimerExtension&&(this.disjointQueryTimerExtension=sm(this.gl,2===(0,T.env)().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")?"EXT_disjoint_timer_query_webgl2":"EXT_disjoint_timer_query")),this.disjointQueryTimerExtension}getQueryTimerExtensionWebGL2(){return this.getQueryTimerExtension()}getQueryTimerExtensionWebGL1(){return this.getQueryTimerExtension()}beginQuery(){if(2===(0,T.env)().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")){let e=this.gl,t=this.getQueryTimerExtensionWebGL2(),r=e.createQuery();return e.beginQuery(t.TIME_ELAPSED_EXT,r),r}let e=this.getQueryTimerExtensionWebGL1(),t=e.createQueryEXT();return e.beginQueryEXT(e.TIME_ELAPSED_EXT,t),t}endQuery(){if(2===(0,T.env)().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")){let e=this.gl,t=this.getQueryTimerExtensionWebGL2();e.endQuery(t.TIME_ELAPSED_EXT);return}let e=this.getQueryTimerExtensionWebGL1();e.endQueryEXT(e.TIME_ELAPSED_EXT)}async waitForQueryAndGetTime(e){return await I.repeatedTry(()=>this.disposed||this.isQueryAvailable(e,(0,T.env)().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION"))),this.getQueryTime(e,(0,T.env)().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION"))}getQueryTime(e,t){if(0===t)return null;if(2===t){let t=this.gl;return t.getQueryParameter(e,t.QUERY_RESULT)/1e6}{let t=this.getQueryTimerExtensionWebGL1();return t.getQueryObjectEXT(e,t.QUERY_RESULT_EXT)/1e6}}isQueryAvailable(e,t){if(0===t)return!0;if(2===t){let t=this.gl,r=this.getQueryTimerExtensionWebGL2(),a=t.getQueryParameter(e,t.QUERY_RESULT_AVAILABLE);return null==this.disjoint&&(this.disjoint=this.gl.getParameter(r.GPU_DISJOINT_EXT)),a&&!this.disjoint}{let t=this.getQueryTimerExtensionWebGL1(),r=t.getQueryObjectEXT(e,t.QUERY_RESULT_AVAILABLE_EXT);return null==this.disjoint&&(this.disjoint=this.gl.getParameter(t.GPU_DISJOINT_EXT)),r&&!this.disjoint}}pollFence(e){return new Promise(t=>{this.addItemToPoll(()=>e.isFencePassed(),()=>t())})}pollItems(){let e=function(e){let t=0;for(;t<e.length&&e[t]();++t);return t-1}(this.itemsToPoll.map(e=>e.isDoneFn));for(let t=0;t<=e;++t){let{resolveFn:e}=this.itemsToPoll[t];e()}this.itemsToPoll=this.itemsToPoll.slice(e+1)}addItemToPoll(e,t){let r;this.itemsToPoll.push({isDoneFn:e,resolveFn:t}),this.itemsToPoll.length>1||("setTimeoutCustom"in(0,T.env)().platform&&(r=(0,T.env)().platform.setTimeoutCustom.bind((0,T.env)().platform)),I.repeatedTry(()=>(this.pollItems(),0===this.itemsToPoll.length),()=>0,null,r))}bindTextureToFrameBuffer(e){this.throwIfDisposed(),sv(this.gl,e,this.framebuffer),this.debug&&sk(this.gl)}unbindTextureToFrameBuffer(){null!=this.outputTexture?(sv(this.gl,this.outputTexture,this.framebuffer),this.debug&&sk(this.gl)):sN(this.gl,this.framebuffer)}downloadMatrixDriver(e,t){this.bindTextureToFrameBuffer(e);let r=t();return this.unbindTextureToFrameBuffer(),r}setOutputMatrixTextureDriver(e,t,r){this.throwIfDisposed();let a=this.gl;sv(a,e,this.framebuffer),this.debug&&sk(a),this.outputTexture=e,sf(a,()=>a.viewport(0,0,t,r)),sf(a,()=>a.scissor(0,0,t,r))}setOutputMatrixWriteRegionDriver(e,t,r,a){this.throwIfDisposed(),sf(this.gl,()=>this.gl.scissor(e,t,r,a))}throwIfDisposed(){if(this.disposed)throw Error("Attempted to use disposed GPGPUContext.")}throwIfNoProgram(){if(null==this.program)throw Error("No GPU program is currently set.")}}var oo={};a(oo,"simpleAbsImpl",()=>ey),a(oo,"addImpl",()=>el),a(oo,"bincountImpl",()=>e2),a(oo,"bincountReduceImpl",()=>e4),a(oo,"bitwiseAndImpl",()=>e8),a(oo,"castImpl",()=>ea),a(oo,"ceilImpl",()=>e9),a(oo,"concatImpl",()=>ts),a(oo,"equalImpl",()=>tU),a(oo,"expImpl",()=>t2),a(oo,"expm1Impl",()=>t5),a(oo,"floorImpl",()=>rc),a(oo,"floorDivImpl",()=>rm),a(oo,"gatherNdImpl",()=>rv),a(oo,"gatherV2Impl",()=>rk),a(oo,"greaterImpl",()=>rS),a(oo,"greaterEqualImpl",()=>rC),a(oo,"lessImpl",()=>rD),a(oo,"lessEqualImpl",()=>rV),a(oo,"linSpaceImpl",()=>rz),a(oo,"logImpl",()=>rU),a(oo,"maxImpl",()=>r6),a(oo,"maximumImpl",()=>r9),a(oo,"minimumImpl",()=>au),a(oo,"multiplyImpl",()=>tD),a(oo,"negImpl",()=>av),a(oo,"notEqualImpl",()=>aE),a(oo,"prodImpl",()=>aG),a(oo,"raggedGatherImpl",()=>aj),a(oo,"raggedRangeImpl",()=>aq),a(oo,"raggedTensorToTensorImpl",()=>a0),a(oo,"rangeImpl",()=>a2),a(oo,"rsqrtImpl",()=>nn),a(oo,"scatterImpl",()=>ni),a(oo,"sigmoidImpl",()=>K),a(oo,"sliceImpl",()=>eQ),a(oo,"sparseFillEmptyRowsImpl",()=>nI),a(oo,"sparseReshapeImpl",()=>nC),a(oo,"sparseSegmentReductionImpl",()=>nA),a(oo,"sqrtImpl",()=>nF),a(oo,"squaredDifferenceImpl",()=>n_),a(oo,"staticRegexReplaceImpl",()=>nG),a(oo,"stridedSliceImpl",()=>nq),a(oo,"stringNGramsImpl",()=>nX),a(oo,"stringSplitImpl",()=>nY),a(oo,"stringToHashBucketFastImpl",()=>nJ),a(oo,"subImpl",()=>ra),a(oo,"tileImpl",()=>n6),a(oo,"topKImpl",()=>n9),a(oo,"transposeImpl",()=>eI),a(oo,"uniqueImpl",()=>sn);const{addImpl:oi,bincountImpl:ol,bincountReduceImpl:ou,bitwiseAndImpl:op,castImpl:od,ceilImpl:oc,concatImpl:oh,equalImpl:of,expImpl:om,expm1Impl:og,floorImpl:ox,gatherNdImpl:oy,gatherV2Impl:ob,greaterImpl:ov,greaterEqualImpl:oN,lessImpl:ok,lessEqualImpl:oT,linSpaceImpl:oS,logImpl:oI,maxImpl:ow,maximumImpl:oC,minimumImpl:oE,multiplyImpl:oA,negImpl:o$,notEqualImpl:oR,prodImpl:oP,raggedGatherImpl:oB,raggedRangeImpl:oF,raggedTensorToTensorImpl:oO,rangeImpl:oM,rsqrtImpl:oD,scatterImpl:o_,sigmoidImpl:oL,simpleAbsImpl:oV,sliceImpl:oG,sparseFillEmptyRowsImpl:oW,sparseReshapeImpl:oz,sparseSegmentReductionImpl:oj,sqrtImpl:oU,staticRegexReplaceImpl:oq,stridedSliceImpl:oH,stringNGramsImpl:oK,stringSplitImpl:oX,stringToHashBucketFastImpl:oZ,subImpl:oY,tileImpl:oQ,topKImpl:oJ,transposeImpl:o0,uniqueImpl:o1}=oo;function o2(e,t){return["x","y","z","w","u","v"].slice(0,t).map(t=>`${e}.${t}`)}function o4(e,t){return 1===t?[e]:o2(e,t)}class o3{constructor(e){if(this.variableNames=["A"],this.packedInputs=!1,this.packedOutput=!0,this.outputShape=e,this.rank=e.length,this.enableShapeUniforms=s1(this.outputShape.length),0===this.rank)this.userCode=`
        void main() {
          setOutput(vec4(getA(), 0., 0., 0.));
        }
      `;else{let e=o4("rc",this.rank),t=sX(this.rank),r=this.getOutOfBoundsCondition(e),a=this.getSetup(e),n=this.getOutput(e);this.userCode=`
        void main() {
          ${t} rc = getOutputCoords();

          if(${r}) {
            setOutput(vec4(0));
          } else {
            ${a}

            setOutput(vec4(${n}));
          }
        }
      `}}getSourceCoordsArr(e){let t=[];for(let r=0;r<=1;r++)for(let a=0;a<=1;a++){let n=`${0===r?"r":"rp1"}, ${0===a?"c":"cp1"}`;for(let t=2;t<this.rank;t++)n=`${e[e.length-1-t]},`+n;t.push(n)}return t}getOutOfBoundsCondition(e){if(1===this.rank)return`rc > ${this.enableShapeUniforms?"outShape":this.outputShape[0]}`;let t="";for(let r=this.rank-2;r<this.rank;r++)t+=`${e[r]} >= ${this.enableShapeUniforms?`outShape[${r}]`:this.outputShape[r]}`,r<this.rank-1&&(t+="||");return t}getSetup(e){if(1===this.rank)return"";let t=e.slice(-2),r=this.enableShapeUniforms?`outShape[${this.rank} - 1]`:this.outputShape[this.rank-1],a=this.enableShapeUniforms?`outShape[${this.rank} - 2]`:this.outputShape[this.rank-2];return`
      int r = ${t[0]};
      int c = ${t[1]};
      int rp1 = r + 1;
      int cp1 = c + 1;

      bool cEdge = cp1 >= ${r};
      bool rEdge = rp1 >= ${a};
    `}getOutput(e){let t=this.getSourceCoordsArr(e);if(1===this.rank){let e=this.enableShapeUniforms?"outShape":this.outputShape[0];return`getA(rc), (rc + 1 >= ${e} ? 0. : getA(rc + 1)), 0, 0`}return`getA(${t[0]}),
            cEdge ? 0. : getA(${t[1]}),
            rEdge ? 0. : getA(${t[2]}),
            rEdge || cEdge ? 0. : getA(${t[3]})`}}class o8{constructor(e,t){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:"inputShape",type:"ivec3"}],this.outputShape=e,this.enableShapeUniforms=s1(this.outputShape.length);let r="";for(let e=0;e<4;e++){let t="thisRC = rc;";e%2==1&&(t+="thisRC.z += 1;"),e>1&&(t+="thisRC.y += 1;"),r+=`
        ${t}
        ${e>0?"if(thisRC.y < rows && thisRC.z < cols){":""}
          int flatIndex = getFlatIndex(thisRC);

          ivec3 inputRC = inputCoordsFromReshapedOutCoords(flatIndex);
          vec2 inputRCInnerDims = vec2(float(inputRC.y),float(inputRC.z));

          result[${e}] =
            getChannel(getA(inputRC.x, inputRC.y, inputRC.z), inputRCInnerDims);
        ${e>0?"}":""}
      `}this.userCode=`
      ${function(e,t){let r=t?function(e,t,r="index"){let a=function(e,t){let r=e.length,a=e.map(e=>`${t}[${e}]`),n=Array(r-1);n[r-2]=a[r-1];for(let e=r-3;e>=0;--e)n[e]=`(${n[e+1]} * ${a[e+1]})`;return n}(e.map((e,t)=>t),t);return a.map((t,n)=>{let s=`int ${e[n]} = ${r} / ${a[n]}`,o=n===a.length-1?`int ${e[n+1]} = ${r} - ${e[n]} * ${a[n]}`:`index -= ${e[n]} * ${a[n]}`;return`${s}; ${o};`}).join("")}(["r","c","d"],"inputShape"):sM(["r","c","d"],e);return`
    ivec3 inputCoordsFromReshapedOutCoords(int index) {
      ${r}
      return ivec3(r, c, d);
    }
  `}(t,this.enableShapeUniforms)}
      ${this.enableShapeUniforms?sL():s_(e)}

      void main() {
        ivec3 rc = getOutputCoords();

        vec4 result = vec4(0.);

        ivec3 thisRC;
        int rows = ${this.enableShapeUniforms?"outShape[1]":e[1]};
        int cols = ${this.enableShapeUniforms?"outShape[2]":e[2]};

        ${r}

        setOutput(result);
      }
    `}}g("i64bB");var T=g("ibsdL");class o6{constructor(e){this.gpgpu=e,this.numUsedTextures=0,this.numFreeTextures=0,this._numBytesAllocated=0,this._numBytesFree=0,this.freeTextures={},this.usedTextures={},this.logEnabled=!1}acquireTexture(e,t,r){let a,n=o7(t,r),s=o9(e,n,r);s in this.freeTextures||(this.freeTextures[s]=[]),s in this.usedTextures||(this.usedTextures[s]=[]);let o=o5(e,n,this.gpgpu.gl,this.gpgpu.textureConfig,r);if(this.freeTextures[s].length>0){this.numFreeTextures--,this.numUsedTextures++,this._numBytesFree-=o,this.log();let e=this.freeTextures[s].pop();return this.usedTextures[s].push(e),e}return n===d.PACKED_2X2_FLOAT32?a=this.gpgpu.createPackedMatrixTexture(e[0],e[1]):n===d.PACKED_2X2_FLOAT16?a=this.gpgpu.createFloat16PackedMatrixTexture(e[0],e[1]):n===d.UNPACKED_FLOAT32?a=this.gpgpu.createFloat32MatrixTexture(e[0],e[1]):n===d.UNPACKED_FLOAT16?a=this.gpgpu.createFloat16MatrixTexture(e[0],e[1]):n===d.PACKED_4X1_UNSIGNED_BYTE&&(a=this.gpgpu.createUnsignedBytesMatrixTexture(e[0],e[1])),this.usedTextures[s].push(a),this.numUsedTextures++,this._numBytesAllocated+=o,this.log(),a}releaseTexture(e,t,r,a){if(null==this.freeTextures)return;let n=o7(r,a),s=o9(t,n,a);s in this.freeTextures||(this.freeTextures[s]=[]);let o=o5(t,n,this.gpgpu.gl,this.gpgpu.textureConfig,a),i=(0,T.env)().getNumber("WEBGL_DELETE_TEXTURE_THRESHOLD");-1!==i&&this._numBytesAllocated>i?(this.gpgpu.deleteMatrixTexture(e.texture),this._numBytesAllocated-=o):(this.freeTextures[s].push(e),this.numFreeTextures++,this._numBytesFree+=o),this.numUsedTextures--;let l=this.usedTextures[s],u=l&&l.indexOf(e);if(null==u||u<0)throw Error("Cannot release a texture that was never provided by this texture manager");l[u]=l[l.length-1],l.pop(),this.log()}log(){if(!this.logEnabled)return;let e=this.numFreeTextures+this.numUsedTextures;console.log("Free/Used",`${this.numFreeTextures} / ${this.numUsedTextures}`,`(${e})`);let t=this._numBytesFree/this._numBytesAllocated;console.log(`Bytes allocated: ${this._numBytesAllocated}`),console.log(`Bytes unused: ${this._numBytesFree} (${Math.round(100*t)}%)`)}get numBytesAllocated(){return this._numBytesAllocated}get numBytesFree(){return this._numBytesFree}getNumUsedTextures(){return this.numUsedTextures}getNumFreeTextures(){return this.numFreeTextures}dispose(){if(null!=this.freeTextures){for(let e in this.freeTextures)this.freeTextures[e].forEach(e=>{this.gpgpu.deleteMatrixTexture(e.texture)});for(let e in this.usedTextures)this.usedTextures[e].forEach(e=>{this.gpgpu.deleteMatrixTexture(e.texture)});this.freeTextures=null,this.usedTextures=null,this.numUsedTextures=0,this.numFreeTextures=0,this._numBytesAllocated=0,this._numBytesFree=0}}}function o5(e,t,r,a,n){let s,o=function(e,t){switch(e){case d.PACKED_2X2_FLOAT32:return oa(t);case d.PACKED_2X2_FLOAT16:return on(t);case d.UNPACKED_FLOAT32:return oe(t);case d.UNPACKED_FLOAT16:return ot(t);case d.PACKED_4X1_UNSIGNED_BYTE:return or(t);default:throw Error(`Unknown physical texture type ${e}`)}}(t,a);if(n){let[t,r]=sc(e[0],e[1]);s=t*r}else{var i;let[t,r]=(i=e[0],[e[1],i]);s=t*r}return s*function(e,t){if(t===e.R32F)return 4;if(t===e.R16F)return 2;if(t===e.RGBA32F)return 16;if(t===e.RGBA)return 16;if(t===e.RGBA16F)return 8;else if(t===e.RGBA8)return 4;throw Error(`Unknown internal format ${t}`)}(r,o)}function o7(e,t){if(e===p.UPLOAD)return d.PACKED_2X2_FLOAT32;if(e===p.RENDER||null==e)return(0,T.env)().getBool("WEBGL_RENDER_FLOAT32_ENABLED")?t?d.PACKED_2X2_FLOAT32:d.UNPACKED_FLOAT32:t?d.PACKED_2X2_FLOAT16:d.UNPACKED_FLOAT16;if(e===p.DOWNLOAD||e===p.PIXELS)return d.PACKED_4X1_UNSIGNED_BYTE;throw Error(`Unknown logical texture type ${e}`)}function o9(e,t,r){return`${e[0]}_${e[1]}_${t}_${r}`}class ie{constructor(e,t){this.variableNames=["A"],this.outputShape=e,this.enableShapeUniforms=s1(this.outputShape.length),this.userCode=`
      float unaryOperation(float x) {
        ${t}
      }

      void main() {
        float x = getAAtOutCoords();
        float y = unaryOperation(x);

        setOutput(y);
      }
    `}}const it="if (isnan(x)) return x;",ir="return abs(x);",ia=it+`
  return (x < 0.0) ? 0.0 : x;
`,is=it+`
  return (x < 0.0) ? 0.0 : min(6.0, x);
`,io="return x;",ii=`
  vec4 result;

  result.r = (x.r >= 0.0) ? x.r : (exp(x.r) - 1.0);
  result.g = (x.g >= 0.0) ? x.g : (exp(x.g) - 1.0);
  result.b = (x.b >= 0.0) ? x.b : (exp(x.b) - 1.0);
  result.a = (x.a >= 0.0) ? x.a : (exp(x.a) - 1.0);

  return result;
`,il=`
  vec4 result = x * vec4(greaterThanEqual(x, vec4(0.0)));
  bvec4 isNaN = isnan(x);

  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`,iu=`
  vec4 result = min(x, vec4(6.)) * vec4(greaterThanEqual(x, vec4(0.0)));
  bvec4 isNaN = isnan(x);

  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`;class ip{constructor(e,t){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=e,this.enableShapeUniforms=s1(this.outputShape.length),this.userCode=`
      vec4 unaryOperation(vec4 x) {
        ${t}
      }

      void main() {
        vec4 x = getAAtOutCoords();
        vec4 y = unaryOperation(x);

        setOutput(y);
      }
    `}}class id{constructor(e){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!1,this.outputShape=e,this.enableShapeUniforms=s1(this.outputShape.length);let t=e.length,r=o4("rc",t),a=sX(t),n=function(e,t){if(1===e)return"rc";let r="";for(let a=0;a<e;a++)r+=t[a],a<e-1&&(r+=",");return r}(t,r),s=r.slice(-2),o=t<=1?"rc":`vec2(${s.join(",")})`;this.userCode=`
      void main() {
        ${a} rc = getOutputCoords();
        vec4 packedInput = getA(${n});

        setOutput(getChannel(packedInput, ${o}));
      }
    `}}const ic=S.whereImpl,ih={},im=(0,T.env)().getNumber("CPU_HANDOFF_SIZE_THRESHOLD");class ig extends k.KernelBackend{nextDataId(){return ig.nextDataId++}constructor(e){let t;if(super(),this.pendingRead=new WeakMap,this.pendingDisposal=new WeakSet,this.dataRefCount=new WeakMap,this.numBytesInGPU=0,this.uploadWaitMs=0,this.downloadWaitMs=0,this.lastGlFlushTime=0,this.warnedAboutMemory=!1,this.pendingDeletes=0,this.disposed=!1,!(0,T.env)().getBool("HAS_WEBGL"))throw Error("WebGL is not supported on this device");if(null!=e)t=e instanceof os?e:new os(sp((0,T.env)().getNumber("WEBGL_VERSION"),e)),this.binaryCache={},this.gpgpuCreatedLocally=!1;else{var r;t=new os(sp((0,T.env)().getNumber("WEBGL_VERSION"))),this.binaryCache=((r=(0,T.env)().getNumber("WEBGL_VERSION"))in ih||(ih[r]={}),ih[r]),this.gpgpuCreatedLocally=!0}this.gpgpu=t,this.canvas=this.gpgpu.gl.canvas,this.textureManager=new o6(this.gpgpu),this.numMBBeforeWarning=null==(0,T.env)().global.screen?1024:(0,T.env)().global.screen.height*(0,T.env)().global.screen.width*window.devicePixelRatio*600/1024/1024,this.texData=new(0,k.DataStorage)(this,(0,b.engine)())}numDataIds(){return this.texData.numDataIds()-this.pendingDeletes}writeTexture(e,t,r,a,n,s){let o=this.makeTensorInfo(t,r),i=this.texData.get(o.dataId);i.isPacked=!1,i.texture={texture:e,texShape:[a,n]},i.texShape=[a,n];let l=new s5(sw(t),!1,s),u=this.runWebGLProgram(l,[o],r,[[a,n]]);return u.shape=t,i.texture=null,this.disposeIntermediateTensorInfo(o),u.dataId}write(e,t,r){if(((0,T.env)().getBool("WEBGL_CHECK_NUMERICAL_PROBLEMS")||(0,T.env)().getBool("DEBUG"))&&this.checkNumericalProblems(e),"complex64"===r&&null!=e)throw Error("Cannot write to a complex64 dtype. Please use tf.complex(real, imag).");let a={id:this.nextDataId()};return this.texData.set(a,{shape:t,dtype:r,values:e,usage:p.UPLOAD,refCount:1}),a}refCount(e){return this.texData.has(e)?this.texData.get(e).refCount:0}incRef(e){let t=this.texData.get(e);t.refCount++}decRef(e){if(this.texData.has(e)){let t=this.texData.get(e);t.refCount--}}move(e,t,r,a,n){if((0,T.env)().getBool("DEBUG")&&this.checkNumericalProblems(t),"complex64"===a)throw Error("Cannot write to a complex64 dtype. Please use tf.complex(real, imag).");this.texData.set(e,{shape:r,dtype:a,values:t,usage:p.UPLOAD,refCount:n})}disposeIntermediateTensorInfo(e){this.disposeData(e.dataId)}readSync(e){let t,r,{values:a,dtype:n,complexTensorInfos:s,slice:o,shape:i,isPacked:l}=this.texData.get(e);if(null!=o){let t;t=l?new ip(i,io):new ie(i,io);let r=this.runWebGLProgram(t,[{dataId:e,shape:i,dtype:n}],n),a=this.readSync(r.dataId);return this.disposeIntermediateTensorInfo(r),a}if(null!=a)return this.convertAndCacheOnCPU(e);if("string"===n)return a;let u=null!=this.activeTimers;if(u&&(t=I.now()),"complex64"===n){let e=this.readSync(s.real.dataId),t=this.readSync(s.imag.dataId);r=v.mergeRealAndImagArrays(e,t)}else r=this.getValuesFromTexture(e);return u&&(this.downloadWaitMs+=I.now()-t),this.convertAndCacheOnCPU(e,r)}async read(e){let t,r;if(this.pendingRead.has(e)){let t=this.pendingRead.get(e);return new Promise(e=>t.push(e))}let{values:a,shape:n,slice:s,dtype:o,complexTensorInfos:i,isPacked:l}=this.texData.get(e);if(null!=s){let t;t=l?new ip(n,io):new ie(n,io);let r=this.runWebGLProgram(t,[{dataId:e,shape:n,dtype:o}],o),a=this.read(r.dataId);return this.disposeIntermediateTensorInfo(r),a}if(null!=a)return this.convertAndCacheOnCPU(e);if((0,T.env)().getBool("DEBUG")&&!(0,T.env)().getBool("WEBGL_DOWNLOAD_FLOAT_ENABLED")&&2===(0,T.env)().getNumber("WEBGL_VERSION"))throw Error("tensor.data() with WEBGL_DOWNLOAD_FLOAT_ENABLED=false and WEBGL_VERSION=2 not yet supported.");let u=null;if("complex64"!==o&&(0,T.env)().get("WEBGL_BUFFER_SUPPORTED")){t=this.decode(e);let r=this.texData.get(t.dataId);u=this.gpgpu.createBufferFromTexture(r.texture.texture,...sd(n))}if(this.pendingRead.set(e,[]),"complex64"!==o&&await this.gpgpu.createAndWaitForFence(),"complex64"===o){let e=await Promise.all([this.read(i.real.dataId),this.read(i.imag.dataId)]),t=e[0],a=e[1];r=v.mergeRealAndImagArrays(t,a)}else if(null==u)r=this.getValuesFromTexture(e);else{let e=I.sizeFromShape(n);r=this.gpgpu.downloadFloat32MatrixFromBuffer(u,e)}if(null!=t&&this.disposeIntermediateTensorInfo(t),null!=u){let e=this.gpgpu.gl;sf(e,()=>e.deleteBuffer(u))}let p=this.convertAndCacheOnCPU(e,r),d=this.pendingRead.get(e);return this.pendingRead.delete(e),d.forEach(e=>e(p)),this.pendingDisposal.has(e)&&(this.pendingDisposal.delete(e),this.disposeData(e)&&(0,b.engine)().removeDataId(e,this),this.pendingDeletes--),p}readToGPU(e,t={}){let{values:r,shape:a,slice:n,dtype:s,isPacked:o,texture:i}=this.texData.get(e);if("complex64"===s)throw Error("Does not support reading texture for complex64 dtype.");if(null!=n){let r;r=o?new ip(a,io):new ie(a,io);let n=this.runWebGLProgram(r,[{dataId:e,shape:a,dtype:s}],s),i=this.readToGPU(n,t);return this.disposeIntermediateTensorInfo(n),i}if(null==i)if(null!=r)throw Error("Data is not on GPU but on CPU.");else throw Error("There is no data on GPU or CPU.");let l=this.decode(e,t.customTexShape);return Object.assign({tensorRef:(0,b.engine)().makeTensorFromTensorInfo(l)},this.texData.get(l.dataId).texture)}bufferSync(e){let t=this.readSync(e.dataId);if("string"===e.dtype)try{let r=t.map(e=>I.decodeString(e));return(0,N.buffer)(e.shape,e.dtype,r)}catch(e){throw Error("Failed to decode encoded string bytes into utf-8")}return(0,N.buffer)(e.shape,e.dtype,t)}checkNumericalProblems(e){if(null!=e)for(let t=0;t<e.length;t++){let r=e[t];if(!((0,T.env)().getBool("WEBGL_RENDER_FLOAT32_ENABLED")||0===r||596e-10<Math.abs(r)&&65504>Math.abs(r))&&1){if((0,T.env)().getBool("WEBGL_RENDER_FLOAT32_CAPABLE"))throw Error(`The value ${r} cannot be represented with your current settings. Consider enabling float32 rendering: 'tf.env().set('WEBGL_RENDER_FLOAT32_ENABLED', true);'`);throw Error(`The value ${r} cannot be represented on this device.`)}}}getValuesFromTexture(e){let{shape:t,dtype:r,isPacked:a}=this.texData.get(e),n=I.sizeFromShape(t);if((0,T.env)().getBool("WEBGL_DOWNLOAD_FLOAT_ENABLED")){let r=this.decode(e),a=this.texData.get(r.dataId),s=this.gpgpu.downloadMatrixFromPackedTexture(a.texture.texture,...sd(t)).subarray(0,n);return this.disposeIntermediateTensorInfo(r),s}let s=(0,T.env)().getBool("WEBGL_PACK")&&!0===a,o=s?sw(t):t,i=s?new s8(o):new s3(o),l=this.runWebGLProgram(i,[{shape:o,dtype:r,dataId:e}],"float32"),u=this.texData.get(l.dataId),p=this.gpgpu.downloadByteEncodedFloatMatrixFromOutputTexture(u.texture.texture,u.texShape[0],u.texShape[1]).subarray(0,n);return this.disposeIntermediateTensorInfo(l),p}timerAvailable(){return(0,T.env)().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE")>0}time(e){let t=this.activeTimers,r=[],a=!1;null==this.programTimersStack?(this.programTimersStack=r,a=!0):this.activeTimers.push(r),this.activeTimers=r,e();let n=I.flatten(this.activeTimers.map(e=>e.query)).filter(e=>null!=e),s=I.flatten(this.activeTimers.map(e=>e.name)).filter(e=>null!=e);this.activeTimers=t,a&&(this.programTimersStack=null);let o={uploadWaitMs:this.uploadWaitMs,downloadWaitMs:this.downloadWaitMs,kernelMs:null,wallMs:null};return(async()=>{if((0,T.env)().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE")>0){let e=await Promise.all(n);o.kernelMs=I.sum(e),o.getExtraProfileInfo=()=>e.map((e,t)=>({name:s[t],ms:e})).map(e=>`${e.name}: ${e.ms}`).join(", ")}else o.kernelMs={error:"WebGL query timers are not supported in this environment."};return this.uploadWaitMs=0,this.downloadWaitMs=0,o})()}memory(){return{unreliable:!1,numBytesInGPU:this.numBytesInGPU,numBytesInGPUAllocated:this.textureManager.numBytesAllocated,numBytesInGPUFree:this.textureManager.numBytesFree}}startTimer(){return(0,T.env)().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE")>0?this.gpgpu.beginQuery():{startMs:I.now(),endMs:null}}endTimer(e){return(0,T.env)().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE")>0?this.gpgpu.endQuery():e.endMs=I.now(),e}async getQueryTime(e){return(0,T.env)().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE")>0?this.gpgpu.waitForQueryAndGetTime(e):e.endMs-e.startMs}disposeData(e,t=!1){if(this.pendingDisposal.has(e))return!1;if(!this.texData.has(e))return!0;if(t?this.texData.get(e).refCount=0:this.texData.get(e).refCount--,!t&&this.texData.get(e).refCount>0)return!1;if(this.pendingRead.has(e))return this.pendingDisposal.add(e),this.pendingDeletes++,!1;this.releaseGPUData(e);let{complexTensorInfos:r}=this.texData.get(e);return null!=r&&(this.disposeData(r.real.dataId,t),this.disposeData(r.imag.dataId,t)),this.texData.delete(e),!0}releaseGPUData(e){let{texture:t,dtype:r,texShape:a,usage:n,isPacked:s,slice:o}=this.texData.get(e),i=o&&o.origDataId||e,l=this.dataRefCount.get(i);l>1?this.dataRefCount.set(i,l-1):(this.dataRefCount.delete(i),null!=t&&(this.numBytesInGPU-=this.computeBytes(a,r),this.textureManager.releaseTexture(t,a,n,s)));let u=this.texData.get(e);u.texture=null,u.texShape=null,u.isPacked=!1,u.slice=null}getTexture(e){return this.uploadToGPU(e),this.texData.get(e).texture.texture}getDataInfo(e){return this.texData.get(e)}shouldExecuteOnCPU(e,t=im){return(0,T.env)().getBool("WEBGL_CPU_FORWARD")&&e.every(e=>null==this.texData.get(e.dataId).texture&&I.sizeFromShape(e.shape)<t)}getGPGPUContext(){return this.gpgpu}where(e){v.warn("tf.where() in webgl locks the UI thread. Call tf.whereAsync() instead");let t=e.dataSync();return ic(e.shape,t)}packedUnaryOp(e,t,r){let a=new ip(e.shape,t),n=this.compileAndRun(a,[e],r);return(0,b.engine)().makeTensorFromTensorInfo(n)}abs(e){if(this.shouldExecuteOnCPU([e])&&"complex64"!==e.dtype){let t=oV(this.texData.get(e.dataId).values);return this.makeOutput(e.shape,e.dtype,t)}if((0,T.env)().getBool("WEBGL_PACK_UNARY_OPERATIONS"))return this.packedUnaryOp(e,ir,e.dtype);let t=new ie(e.shape,ir),r=this.compileAndRun(t,[e]);return(0,b.engine)().makeTensorFromTensorInfo(r)}makeTensorInfo(e,t,r){let a;if("string"===t&&null!=r&&r.length>0&&I.isString(r[0])){let n=r.map(e=>I.encodeString(e));a=this.write(n,e,t)}else a=this.write(r,e,t);return this.texData.get(a).usage=null,{dataId:a,shape:e,dtype:t}}makeOutput(e,t,r){return(0,b.engine)().makeTensorFromTensorInfo(this.makeTensorInfo(e,t,r),this)}unpackTensor(e){let t=new id(e.shape);return this.runWebGLProgram(t,[e],e.dtype)}packTensor(e){let t=new o3(e.shape);return this.runWebGLProgram(t,[e],e.dtype,null,!0)}packedReshape(e,t){let r=[sS(e.shape),...sI(e.shape)],a={dtype:e.dtype,shape:r,dataId:e.dataId},n=new o8([sS(t),...sI(t)],r),s=this.runWebGLProgram(n,[a],e.dtype,[r],!0);return{dataId:s.dataId,shape:t,dtype:s.dtype}}decode(e,t){let r,{isPacked:a,shape:n,dtype:s}=this.texData.get(e);if(null!=t){let e=I.sizeFromShape(n),r=t[0]*t[1]*4;I.assert(e<=r,()=>"customTexShape is too small. Row * Column * 4 should be equal or larger than the size of the tensor data.")}let o=sw(n);r=a?new s4(o):new s2(o);let i=[null!=t?t:sd(o)],l=this.runWebGLProgram(r,[{shape:o,dtype:s,dataId:e}],s,i,!0,t);return{dtype:s,shape:n,dataId:l.dataId}}runWebGLProgram(e,t,r,a,n=!1,s){let o,i=this.makeTensorInfo(e.outputShape,r),l=this.texData.get(i.dataId);if(e.packedOutput&&(l.isPacked=!0),e.outPackingScheme===u.DENSE&&(l.texShape=(null!=s?s:sd(e.outputShape)).map(e=>2*e)),null!=e.outTexUsage&&(l.usage=e.outTexUsage),0===I.sizeFromShape(i.shape))return l.values=I.getTypedArrayFromDType(i.dtype,0),i;let p=[],d=t.map(t=>{if("complex64"===t.dtype)throw Error("GPGPUProgram does not support complex64 input. For complex64 dtypes, please separate the program into real and imaginary parts.");let r=this.texData.get(t.dataId);if(null==r.texture){if(!e.packedInputs&&I.sizeFromShape(t.shape)<=(0,T.env)().getNumber("WEBGL_SIZE_UPLOAD_UNIFORM"))return{shape:t.shape,texData:null,isUniform:!0,uniformValues:r.values};e.packedInputs&&(r.isPacked=!0,r.shape=t.shape)}if(this.uploadToGPU(t.dataId),!!r.isPacked!=!!e.packedInputs)t=r.isPacked?this.unpackTensor(t):this.packTensor(t),p.push(t),r=this.texData.get(t.dataId);else if(r.isPacked&&!sC(r.shape,t.shape)){let e=t,a=t.shape;t.shape=r.shape,t=this.packedReshape(t,a),p.push(t),r=this.texData.get(t.dataId),e.shape=a}return{shape:t.shape,texData:r,isUniform:!1}});this.uploadToGPU(i.dataId);let c={shape:i.shape,texData:l,isUniform:!1},h=function(e,t,r){let a="";t.concat(r).forEach(t=>{let n=null!=t.texData&&null!=t.texData.slice&&t.texData.slice.flatOffset>0;if(e.enableShapeUniforms&&!t.isUniform){let s=t.texData.texShape,{useSqueezeShape:o,uniformShape:i,keptDims:l}=sZ(e.packedInputs,t.shape,s),u="",p="",d="";if(1===i.length&&e.packedInputs){let e=[Math.ceil(s[0]/2),Math.ceil(s[1]/2)];u=`${e[0]>1}_${e[1]>1}`}else if(2!==i.length||e.packedInputs){if(i.length>2&&!e.packedInputs){let e=I.computeStrides(i);d=`${e[0]===s[1]}_${e[e.length-1]===s[1]}`}}else p=`${i[0]>1}_${i[1]>1}`;let c=t.shape.length,h=2===i.length&&I.arraysEqual(t.shape,s),f=1===I.sizeFromShape(t.shape),m=v.getBroadcastDims(t.shape,r.shape),g=!e.packedInputs&&c===r.shape.length&&I.arraysEqual(s,r.texData.texShape),x=e.packedInputs||i.length>2?"":`${s[0]>1}_${s[1]>1}`;a+=`${c}_${g}_${o?l:""}_${i.length}_${f}_${m}_${h}_${u}_${p}_${d}_${x}_${n}`}else{let e=t.isUniform?"uniform":t.texData.texShape;a+=`${t.shape}_${e}_${n}`}});let n=e.userCode,s=e.constructor.name;return s+("_"+a+"_"+n+`${(0,T.env)().getNumber("WEBGL_VERSION")}`)}(e,d,c),f=this.getAndSaveBinary(h,()=>(function(e,t,r,a){let n=r.map((e,r)=>{let a={logicalShape:e.shape,texShape:e.isUniform?null:e.texData.texShape,isUniform:e.isUniform,isPacked:!e.isUniform&&e.texData.isPacked,flatOffset:null};return null!=e.texData&&null!=e.texData.slice&&e.texData.slice.flatOffset>0&&(a.flatOffset=e.texData.slice.flatOffset),{name:t.variableNames[r],shapeInfo:a}}),s=n.map(e=>e.shapeInfo),o={logicalShape:a.shape,texShape:a.texData.texShape,isUniform:!1,isPacked:a.texData.isPacked,flatOffset:null},i=function(e,t,r){var a,n,s,o;let i,l,u=[];if(e.forEach(e=>{let t=I.sizeFromShape(e.shapeInfo.logicalShape);if(e.shapeInfo.isUniform?u.push(`uniform float ${e.name}${t>1?`[${t}]`:""};`):(u.push(`uniform sampler2D ${e.name};`),u.push(`uniform int offset${e.name};`)),r.enableShapeUniforms){let{uniformShape:t}=sZ(r.packedInputs,e.shapeInfo.logicalShape,e.shapeInfo.texShape);switch(t.length){case 1:u.push(`uniform int ${e.name}Shape;`);break;case 2:u.push(`uniform ivec2 ${e.name}Shape;`);break;case 3:u.push(`uniform ivec3 ${e.name}Shape;`);break;case 4:u.push(`uniform ivec4 ${e.name}Shape;`)}u.push(`uniform ivec2 ${e.name}TexShape;`)}}),r.enableShapeUniforms){switch(t.logicalShape.length){case 1:u.push("uniform int outShape;");break;case 2:u.push("uniform ivec2 outShape;"),u.push("uniform int outShapeStrides;");break;case 3:u.push("uniform ivec3 outShape;"),u.push("uniform ivec2 outShapeStrides;");break;case 4:u.push("uniform ivec4 outShape;"),u.push("uniform ivec3 outShapeStrides;")}u.push("uniform ivec2 outTexShape;")}r.customUniforms&&r.customUniforms.forEach(e=>{u.push(`uniform ${e.type} ${e.name}${e.arrayIndex?`[${e.arrayIndex}]`:""};`)});let p=u.join("\n"),d=e.map(e=>(function(e,t,r=!1,a){let n="";r?n+=function e(t,r){switch(t.shapeInfo.logicalShape.length){case 0:var a=t;let n=a.name,s="get"+n.charAt(0).toUpperCase()+n.slice(1),o=sO();return`
    vec4 ${s}() {
      return ${o.texture2D}(${n}, halfCR);
    }
  `;case 1:return function(e,t){let r=e.name,a="get"+r.charAt(0).toUpperCase()+r.slice(1),n=e.shapeInfo.texShape,s=sO();if(t)return`
    vec4 ${a}(int index) {
      ivec2 packedTexShape = ivec2(ceil(float(${r}TexShape[0]) / 2.0), ceil(float(${r}TexShape[1]) / 2.0));
      vec2 uv = packedUVfrom1D(
        packedTexShape[0], packedTexShape[1], index);
      return ${s.texture2D}(${r}, uv);
    }
  `;let o=[Math.ceil(n[0]/2),Math.ceil(n[1]/2)];return`
    vec4 ${a}(int index) {
      vec2 uv = packedUVfrom1D(
        ${o[0]}, ${o[1]}, index);
      return ${s.texture2D}(${r}, uv);
    }
  `}(t,r);case 2:return function(e,t){let r=e.shapeInfo.logicalShape,a=e.name,n="get"+a.charAt(0).toUpperCase()+a.slice(1),s=e.shapeInfo.texShape,o=s[0],i=s[1],l=sO();if(null!=s&&I.arraysEqual(r,s))return t?`
      vec4 ${n}(int row, int col) {
        vec2 uv = (vec2(col, row) + halfCR) / vec2(${a}TexShape[1], ${a}TexShape[0]);

        return ${l.texture2D}(${a}, uv);
      }
    `:`
      vec4 ${n}(int row, int col) {
        vec2 uv = (vec2(col, row) + halfCR) / vec2(${i}.0, ${o}.0);

        return ${l.texture2D}(${a}, uv);
      }
    `;if(t)return`
    vec4 ${n}(int row, int col) {
      ivec2 packedTexShape = ivec2(ceil(float(${a}TexShape[0]) / 2.0), ceil(float(${a}TexShape[1]) / 2.0));
      int valuesPerRow = int(ceil(float(${a}Shape[1]) / 2.0));
      vec2 uv = packedUVfrom2D(valuesPerRow, packedTexShape[0], packedTexShape[1], row, col);
      return ${l.texture2D}(${a}, uv);
    }
  `;let u=[Math.ceil(s[0]/2),Math.ceil(s[1]/2)],p=Math.ceil(r[1]/2);return`
    vec4 ${n}(int row, int col) {
      vec2 uv = packedUVfrom2D(${p}, ${u[0]}, ${u[1]}, row, col);
      return ${l.texture2D}(${a}, uv);
    }
  `}(t,r);case 3:return function(t,r){let a=t.shapeInfo.logicalShape,n=t.name,s="get"+n.charAt(0).toUpperCase()+n.slice(1),o=t.shapeInfo.texShape,i=[Math.ceil(o[0]/2),Math.ceil(o[1]/2)];if(1===a[0]){let n=sY(t,a.slice(1));return`
        ${e(n,r)}
        vec4 ${s}(int b, int row, int col) {
          return ${s}(${sQ(["b","row","col"],[1,2])});
        }
      `}let l=sO();if(r)return`
    vec4 ${s}(int b, int row, int col) {
      ivec2 packedTexShape = ivec2(ceil(float(${n}TexShape[0]) / 2.0), ceil(float(${n}TexShape[1]) / 2.0));
      int valuesPerRow = int(ceil(float(${n}Shape[2]) / 2.0));
      int texelsInBatch = valuesPerRow * int(ceil(float(${n}Shape[1]) / 2.0));
      vec2 uv = packedUVfrom3D(
        packedTexShape[0], packedTexShape[1], texelsInBatch, valuesPerRow, b, row, col);
      return ${l.texture2D}(${n}, uv);
    }
  `;let u=i[0],p=i[1],d=Math.ceil(a[2]/2),c=d*Math.ceil(a[1]/2);return`
    vec4 ${s}(int b, int row, int col) {
      vec2 uv = packedUVfrom3D(
        ${u}, ${p}, ${c}, ${d}, b, row, col);
      return ${l.texture2D}(${n}, uv);
    }
  `}(t,r);default:return function(e,t){let r=e.name,a="get"+r.charAt(0).toUpperCase()+r.slice(1),n=sO();if(t)return`
    vec4 ${a}(int b2, int b, int row, int col) {
      int valuesPerRow = int(ceil(float(${r}Shape[3]) / 2.0));
      int texelsInBatch = valuesPerRow * int(ceil(float(${r}Shape[2]) / 2.0));
      int index = b * texelsInBatch + (row / 2) * valuesPerRow + (col / 2);
      texelsInBatch *= ${r}Shape[1];
      index = b2 * texelsInBatch + index;
      ivec2 packedTexShape = ivec2(ceil(float(${r}TexShape[0]) / 2.0), ceil(float(${r}TexShape[1]) / 2.0));
      int texR = index / packedTexShape[1];
      int texC = index - texR * packedTexShape[1];
      vec2 uv = (vec2(texC, texR) + halfCR) / vec2(packedTexShape[1], packedTexShape[0]); return ${n.texture2D}(${r}, uv);
    }
  `;let s=e.shapeInfo.logicalShape,o=s.length,i=e.shapeInfo.texShape,l=[Math.ceil(i[0]/2),Math.ceil(i[1]/2)],u=l[0],p=l[1],d=Math.ceil(s[o-1]/2),c=d*Math.ceil(s[o-2]/2),h="int b, int row, int col",f=`b * ${c} + (row / 2) * ${d} + (col / 2)`;for(let e=2;e<o-1;e++)h=`int b${e}, `+h,c*=s[o-e-1],f=`b${e} * ${c} + `+f;return`
    vec4 ${a}(${h}) {
      int index = ${f};
      int texR = index / ${p};
      int texC = index - texR * ${p};
      vec2 uv = (vec2(texC, texR) + halfCR) / vec2(${p}, ${u});
      return ${n.texture2D}(${r}, uv);
    }
  `}(t,r)}}(e,a):n+=function e(t,r=!1){let a=t.shapeInfo.logicalShape;switch(a.length){case 0:return function(e,t){let r=e.name,a="get"+r.charAt(0).toUpperCase()+r.slice(1);if(e.shapeInfo.isUniform)return`float ${a}() {return ${r};}`;let[n,s]=e.shapeInfo.texShape;if(1===n&&1===s)return`
      float ${a}() {
        return sampleTexture(${r}, halfCR);
      }
    `;let o=sH(r);if(t)return`
    float ${a}() {
      vec2 uv = uvFromFlat(${r}TexShape[0], ${r}TexShape[1], ${o});
      return sampleTexture(${r}, uv);
    }
  `;let[i,l]=e.shapeInfo.texShape;return`
    float ${a}() {
      vec2 uv = uvFromFlat(${i}, ${l}, ${o});
      return sampleTexture(${r}, uv);
    }
  `}(t,r);case 1:return function(e,t){let r=e.name,a="get"+r.charAt(0).toUpperCase()+r.slice(1);if(e.shapeInfo.isUniform)return`
      float ${a}(int index) {
        ${sK(e)}
      }
    `;let n=e.shapeInfo.texShape,s=n[0],o=n[1];if(1===o&&1===s)return`
      float ${a}(int index) {
        return sampleTexture(${r}, halfCR);
      }
    `;let i=sH(r);return 1===o?t?`
      float ${a}(int index) {
        vec2 uv = vec2(0.5, (float(index + ${i}) + 0.5) / float(${r}TexShape[0]));
        return sampleTexture(${r}, uv);
      }
    `:`
      float ${a}(int index) {
        vec2 uv = vec2(0.5, (float(index + ${i}) + 0.5) / ${s}.0);
        return sampleTexture(${r}, uv);
      }
    `:1===s?t?`
      float ${a}(int index) {
        vec2 uv = vec2((float(index + ${i}) + 0.5) / float(${r}TexShape[1]), 0.5);
        return sampleTexture(${r}, uv);
      }
    `:`
      float ${a}(int index) {
        vec2 uv = vec2((float(index + ${i}) + 0.5) / ${o}.0, 0.5);
        return sampleTexture(${r}, uv);
      }
    `:t?`
    float ${a}(int index) {
      vec2 uv = uvFromFlat(${r}TexShape[0], ${r}TexShape[1], index + ${i});
      return sampleTexture(${r}, uv);
    }
  `:`
    float ${a}(int index) {
      vec2 uv = uvFromFlat(${s}, ${o}, index + ${i});
      return sampleTexture(${r}, uv);
    }
  `}(t,r);case 2:return function(t,r){let a=t.shapeInfo.logicalShape,n=t.name,s="get"+n.charAt(0).toUpperCase()+n.slice(1),o=t.shapeInfo.texShape;if(null!=o&&I.arraysEqual(a,o)){if(r)return`
      float ${s}(int row, int col) {
        vec2 uv = (vec2(col, row) + halfCR) / vec2(${n}TexShape[1], ${n}TexShape[0]);
        return sampleTexture(${n}, uv);
      }
    `;let e=o[0],t=o[1];return`
    float ${s}(int row, int col) {
      vec2 uv = (vec2(col, row) + halfCR) / vec2(${t}.0, ${e}.0);
      return sampleTexture(${n}, uv);
    }
  `}let{newShape:i,keptDims:l}=I.squeezeShape(a);if(i.length<a.length){let a=sY(t,i);return`
      ${e(a,r)}
      float ${s}(int row, int col) {
        return ${s}(${sQ(["row","col"],l)});
      }
    `}if(t.shapeInfo.isUniform)return`
      float ${s}(int row, int col) {
        int index = round(dot(vec2(row, col), vec2(${a[1]}, 1)));
        ${sK(t)}
      }
    `;let u=o[0],p=o[1],d=sH(n);return 1===p?r?`
      float ${s}(int row, int col) {
        float index = dot(vec3(row, col, ${d}), vec3(${n}Shape[1], 1, 1));
        vec2 uv = vec2(0.5, (index + 0.5) / float(${n}TexShape[0]));
        return sampleTexture(${n}, uv);
      }
    `:`
    float ${s}(int row, int col) {
      float index = dot(vec3(row, col, ${d}), vec3(${a[1]}, 1, 1));
      vec2 uv = vec2(0.5, (index + 0.5) / ${u}.0);
      return sampleTexture(${n}, uv);
    }
  `:1===u?r?`
      float ${s}(int row, int col) {
        float index = dot(vec3(row, col, ${d}), vec3(${n}Shape[1], 1, 1));
        vec2 uv = vec2((index + 0.5) / float(${n}TexShape[1]), 0.5);
        return sampleTexture(${n}, uv);
      }
    `:`
    float ${s}(int row, int col) {
      float index = dot(vec3(row, col, ${d}), vec3(${a[1]}, 1, 1));
      vec2 uv = vec2((index + 0.5) / ${p}.0, 0.5);
      return sampleTexture(${n}, uv);
    }
  `:r?`
      float ${s}(int row, int col) {
        // Explicitly use integer operations as dot() only works on floats.
        int index = row * ${n}Shape[1] + col + ${d};
        vec2 uv = uvFromFlat(${n}TexShape[0], ${n}TexShape[1], index);
        return sampleTexture(${n}, uv);
      }
    `:`
  float ${s}(int row, int col) {
    // Explicitly use integer operations as dot() only works on floats.
    int index = row * ${a[1]} + col + ${d};
    vec2 uv = uvFromFlat(${u}, ${p}, index);
    return sampleTexture(${n}, uv);
  }
`}(t,r);case 3:return function(t,r){let a=t.shapeInfo.logicalShape,n=t.name,s="get"+n.charAt(0).toUpperCase()+n.slice(1),o=a[1]*a[2],i=a[2],{newShape:l,keptDims:u}=I.squeezeShape(a);if(l.length<a.length){let a=sY(t,l);return`
        ${e(a,r)}
        float ${s}(int row, int col, int depth) {
          return ${s}(${sQ(["row","col","depth"],u)});
        }
      `}if(t.shapeInfo.isUniform)return`
      float ${s}(int row, int col, int depth) {
        int index = round(dot(vec3(row, col, depth),
                          vec3(${o}, ${i}, 1)));
        ${sK(t)}
      }
    `;let p=t.shapeInfo.texShape,d=p[0],c=p[1],h=t.shapeInfo.flatOffset;if(c===o&&null==h)return r?`
      float ${s}(int row, int col, int depth) {
        int stride1 = ${n}Shape[2];
        float texR = float(row);
        float texC = dot(vec2(col, depth), vec2(stride1, 1));
        vec2 uv = (vec2(texC, texR) + halfCR) /
                   vec2(${n}TexShape[1], ${n}TexShape[0]);
        return sampleTexture(${n}, uv);
      }
    `:`
        float ${s}(int row, int col, int depth) {
          float texR = float(row);
          float texC = dot(vec2(col, depth), vec2(${i}, 1));
          vec2 uv = (vec2(texC, texR) + halfCR) /
                     vec2(${c}.0, ${d}.0);
          return sampleTexture(${n}, uv);
        }
      `;if(c===i&&null==h)return r?`
      float ${s}(int row, int col, int depth) {
        float texR = dot(vec2(row, col), vec2(${n}Shape[1], 1));
        float texC = float(depth);
        vec2 uv = (vec2(texC, texR) + halfCR) / vec2(${n}TexShape[1], ${n}TexShape[0]);
        return sampleTexture(${n}, uv);
      }
    `:`
    float ${s}(int row, int col, int depth) {
      float texR = dot(vec2(row, col), vec2(${a[1]}, 1));
      float texC = float(depth);
      vec2 uv = (vec2(texC, texR) + halfCR) / vec2(${c}.0, ${d}.0);
      return sampleTexture(${n}, uv);
    }
  `;let f=sH(n);return r?`
    float ${s}(int row, int col, int depth) {
      // Explicitly use integer operations as dot() only works on floats.
      int stride0 = ${n}Shape[1] * ${n}Shape[2];
      int stride1 = ${n}Shape[2];
      int index = row * stride0 + col * stride1 + depth + ${f};
      vec2 uv = uvFromFlat(${n}TexShape[0], ${n}TexShape[1], index);
      return sampleTexture(${n}, uv);
    }
    `:`
      float ${s}(int row, int col, int depth) {
        // Explicitly use integer operations as dot() only works on floats.
        int index = row * ${o} + col * ${i} + depth + ${f};
        vec2 uv = uvFromFlat(${d}, ${c}, index);
        return sampleTexture(${n}, uv);
      }
  `}(t,r);case 4:return function(t,r){let a=t.shapeInfo.logicalShape,n=t.name,s="get"+n.charAt(0).toUpperCase()+n.slice(1),o=a[3],i=a[2]*o,l=a[1]*i,{newShape:u,keptDims:p}=I.squeezeShape(a);if(u.length<a.length){let a=sY(t,u);return`
      ${e(a,r)}
      float ${s}(int row, int col, int depth, int depth2) {
        return ${s}(${sQ(["row","col","depth","depth2"],p)});
      }
    `}if(t.shapeInfo.isUniform)return`
      float ${s}(int row, int col, int depth, int depth2) {
        int index = round(dot(vec4(row, col, depth, depth2),
                          vec4(${l}, ${i}, ${o}, 1)));
        ${sK(t)}
      }
    `;let d=t.shapeInfo.flatOffset,c=t.shapeInfo.texShape,h=c[0],f=c[1],m=`int stride2 = ${n}Shape[3];`,g=`int stride1 = ${n}Shape[2] * stride2;`,x=`int stride0 = ${n}Shape[1] * stride1;`;if(f===l&&null==d)return r?`
      float ${s}(int row, int col, int depth, int depth2) {
        ${m}
        ${g}
        float texR = float(row);
        float texC =
            dot(vec3(col, depth, depth2),
                vec3(stride1, stride2, 1));
        vec2 uv = (vec2(texC, texR) + halfCR) /
                   vec2(${n}TexShape[1], ${n}TexShape[0]);
        return sampleTexture(${n}, uv);
      }
    `:`
      float ${s}(int row, int col, int depth, int depth2) {
        float texR = float(row);
        float texC =
            dot(vec3(col, depth, depth2),
                vec3(${i}, ${o}, 1));
        vec2 uv = (vec2(texC, texR) + halfCR) /
                   vec2(${f}.0, ${h}.0);
        return sampleTexture(${n}, uv);
      }
    `;if(f===o&&null==d)return r?`
      float ${s}(int row, int col, int depth, int depth2) {
        float texR = dot(vec3(row, col, depth),
                         vec3(${n}Shape[1] * ${n}Shape[2], ${n}Shape[2], 1));
        float texC = float(depth2);
        vec2 uv = (vec2(texC, texR) + halfCR) /
                  vec2(${n}TexShape[1], ${n}TexShape[0]);
        return sampleTexture(${n}, uv);
      }
    `:`
      float ${s}(int row, int col, int depth, int depth2) {
        float texR = dot(vec3(row, col, depth),
                         vec3(${a[1]*a[2]}, ${a[2]}, 1));
        float texC = float(depth2);
        vec2 uv = (vec2(texC, texR) + halfCR) /
                  vec2(${f}.0, ${h}.0);
        return sampleTexture(${n}, uv);
      }
    `;let y=sH(n);return r?`
    float ${s}(int row, int col, int depth, int depth2) {
      // Explicitly use integer operations as dot() only works on floats.
      ${m}
      ${g}
      ${x}
      int index = row * stride0 + col * stride1 +
          depth * stride2 + depth2;
      vec2 uv = uvFromFlat(${n}TexShape[0], ${n}TexShape[1], index + ${y});
      return sampleTexture(${n}, uv);
    }
  `:`
    float ${s}(int row, int col, int depth, int depth2) {
      // Explicitly use integer operations as dot() only works on floats.
      int index = row * ${l} + col * ${i} +
          depth * ${o} + depth2;
      vec2 uv = uvFromFlat(${h}, ${f}, index + ${y});
      return sampleTexture(${n}, uv);
    }
  `}(t,r);case 5:return function(t){let r=t.shapeInfo.logicalShape,a=t.name,n="get"+a.charAt(0).toUpperCase()+a.slice(1),s=r[4],o=r[3]*s,i=r[2]*o,l=r[1]*i,{newShape:u,keptDims:p}=I.squeezeShape(r);if(u.length<r.length){let r=sY(t,u);return`
      ${e(r)}
      float ${n}(int row, int col, int depth, int depth2, int depth3) {
        return ${n}(${sQ(["row","col","depth","depth2","depth3"],p)});
      }
    `}if(t.shapeInfo.isUniform)return`
      float ${n}(int row, int col, int depth, int depth2, int depth3) {
        float index = dot(
          vec4(row, col, depth, depth2),
          vec4(${l}, ${i}, ${o}, ${s})) +
          depth3;
        ${sK(t)}
      }
    `;let d=t.shapeInfo.flatOffset,c=t.shapeInfo.texShape,h=c[0],f=c[1];if(f===l&&null==d)return`
      float ${n}(int row, int col, int depth, int depth2, int depth3) {
        int texR = row;
        float texC = dot(vec4(col, depth, depth2, depth3),
                         vec4(${i}, ${o}, ${s}, 1));
        vec2 uv = (vec2(texC, texR) + halfCR) /
                   vec2(${f}.0, ${h}.0);
        return sampleTexture(${a}, uv);
      }
    `;if(f===s&&null==d)return`
      float ${n}(int row, int col, int depth, int depth2, int depth3) {
        float texR = dot(
          vec4(row, col, depth, depth2),
          vec4(${r[1]*r[2]*r[3]},
               ${r[2]*r[3]}, ${r[3]}, 1));
        int texC = depth3;
        vec2 uv = (vec2(texC, texR) + halfCR) /
                  vec2(${f}.0, ${h}.0);
        return sampleTexture(${a}, uv);
      }
    `;let m=sH(a);return`
    float ${n}(int row, int col, int depth, int depth2, int depth3) {
      // Explicitly use integer operations as dot() only works on floats.
      int index = row * ${l} + col * ${i} + depth * ${o} +
          depth2 * ${s} + depth3 + ${m};
      vec2 uv = uvFromFlat(${h}, ${f}, index);
      return sampleTexture(${a}, uv);
    }
  `}(t);case 6:return function(t){let r=t.shapeInfo.logicalShape,a=t.name,n="get"+a.charAt(0).toUpperCase()+a.slice(1),{newShape:s,keptDims:o}=I.squeezeShape(r);if(s.length<r.length){let r=sY(t,s);return`
      ${e(r)}
      float ${n}(int row, int col, int depth,
                    int depth2, int depth3, int depth4) {
        return ${n}(${sQ(["row","col","depth","depth2","depth3","depth4"],o)});
      }
    `}let i=r[5],l=r[4]*i,u=r[3]*l,p=r[2]*u,d=r[1]*p;if(t.shapeInfo.isUniform)return`
      float ${n}(int row, int col, int depth,
                  int depth2, int depth3, int depth4) {
        int index = round(dot(
          vec4(row, col, depth, depth2),
          vec4(${d}, ${p}, ${u}, ${l})) +
          dot(
            vec2(depth3, depth4),
            vec2(${i}, 1)));
        ${sK(t)}
      }
    `;let c=t.shapeInfo.flatOffset,h=t.shapeInfo.texShape,f=h[0],m=h[1];if(m===d&&null==c)return`
      float ${n}(int row, int col, int depth,
                    int depth2, int depth3, int depth4) {
        int texR = row;
        float texC = dot(vec4(col, depth, depth2, depth3),
          vec4(${p}, ${u}, ${l}, ${i})) +
               float(depth4);
        vec2 uv = (vec2(texC, texR) + halfCR) /
                   vec2(${m}.0, ${f}.0);
        return sampleTexture(${a}, uv);
      }
    `;if(m===i&&null==c)return`
      float ${n}(int row, int col, int depth,
                    int depth2, int depth3, int depth4) {
        float texR = dot(vec4(row, col, depth, depth2),
          vec4(${r[1]*r[2]*r[3]*r[4]},
               ${r[2]*r[3]*r[4]},
               ${r[3]*r[4]},
               ${r[4]})) + float(depth3);
        int texC = depth4;
        vec2 uv = (vec2(texC, texR) + halfCR) /
                  vec2(${m}.0, ${f}.0);
        return sampleTexture(${a}, uv);
      }
    `;let g=sH(a);return`
    float ${n}(int row, int col, int depth,
                  int depth2, int depth3, int depth4) {
      // Explicitly use integer operations as dot() only works on floats.
      int index = row * ${d} + col * ${p} + depth * ${u} +
          depth2 * ${l} + depth3 * ${i} + depth4 + ${g};
      vec2 uv = uvFromFlat(${f}, ${m}, index);
      return sampleTexture(${a}, uv);
    }
  `}(t);default:throw Error(`${a.length}-D input sampling is not yet supported`)}}(e,a);let s=e.shapeInfo.logicalShape,o=t.logicalShape;return s.length<=o.length&&(r?n+=function(e,t){let r,a=e.name,n=a.charAt(0).toUpperCase()+a.slice(1),s=e.shapeInfo.logicalShape.length,o=t.logicalShape.length,i=sG(e.shapeInfo.logicalShape,t.logicalShape),l=sX(o),u=o-s,p=["x","y","z","w","u","v"];r=0===s?"":o<2&&i.length>=1?"coords = 0;":i.map(e=>`coords.${p[e+u]} = 0;`).join("\n");let d="";d=o<2&&s>0?"coords":e.shapeInfo.logicalShape.map((e,t)=>`coords.${p[t+u]}`).join(", ");let c="return outputValue;",h=1===I.sizeFromShape(e.shapeInfo.logicalShape),f=1===I.sizeFromShape(t.logicalShape);if(1!==s||h||f){if(h&&!f)c=1===o?`
        return vec4(outputValue.x, outputValue.x, 0., 0.);
      `:`
        return vec4(outputValue.x);
      `;else if(i.length){let e=s-2,t=s-1;i.indexOf(e)>-1&&i.indexOf(t)>-1?c="return vec4(outputValue.x);":i.indexOf(e)>-1?c="return vec4(outputValue.x, outputValue.y, outputValue.x, outputValue.y);":i.indexOf(t)>-1&&(c="return vec4(outputValue.xx, outputValue.zz);")}}else c=`
      return vec4(outputValue.xy, outputValue.xy);
    `;return`
    vec4 ${"get"+n+"AtOutCoords"}() {
      ${l} coords = getOutputCoords();
      ${r}
      vec4 outputValue = get${n}(${d});
      ${c}
    }
  `}(e,t):n+=function(e,t){let r,a=e.name,n=a.charAt(0).toUpperCase()+a.slice(1),s="get"+n+"AtOutCoords",o=t.texShape,i=e.shapeInfo.texShape,l=e.shapeInfo.logicalShape.length,u=t.logicalShape.length;if(!e.shapeInfo.isUniform&&l===u&&null==e.shapeInfo.flatOffset&&I.arraysEqual(i,o))return`
      float ${s}() {
        return sampleTexture(${a}, resultUV);
      }
    `;let p=sX(u),d=sG(e.shapeInfo.logicalShape,t.logicalShape),c=u-l,h=["x","y","z","w","u","v"];r=0===l?"":u<2&&d.length>=1?"coords = 0;":d.map(e=>`coords.${h[e+c]} = 0;`).join("\n");let f="";return f=u<2&&l>0?"coords":e.shapeInfo.logicalShape.map((e,t)=>`coords.${h[t+c]}`).join(", "),`
    float ${s}() {
      ${p} coords = getOutputCoords();
      ${r}
      return get${n}(${f});
    }
  `}(e,t)),n})(e,t,r.packedInputs,r.enableShapeUniforms)).join("\n"),c=t.texShape,h=sO(),f=(a=h,`
    float sampleTexture(sampler2D textureSampler, vec2 uv) {
      return ${a.texture2D}(textureSampler, uv).r;
    }
  `),m=(n=h,`${n.version}
    precision highp float;
    precision highp int;
    precision highp sampler2D;
    ${n.varyingFs} vec2 resultUV;
    ${n.defineOutput}
    const vec2 halfCR = vec2(0.5, 0.5);

    struct ivec5
    {
      int x;
      int y;
      int z;
      int w;
      int u;
    };

    struct ivec6
    {
      int x;
      int y;
      int z;
      int w;
      int u;
      int v;
    };

    uniform float NAN;
    ${n.defineSpecialNaN}
    ${n.defineSpecialInf}
    ${n.defineRound}

    int imod(int x, int y) {
      return x - y * (x / y);
    }

    int idiv(int a, int b, float sign) {
      int res = a / b;
      int mod = imod(a, b);
      if (sign < 0. && mod != 0) {
        res -= 1;
      }
      return res;
    }

    //Based on the work of Dave Hoskins
    //https://www.shadertoy.com/view/4djSRW
    #define HASHSCALE1 443.8975
    float random(float seed){
      vec2 p = resultUV * seed;
      vec3 p3  = fract(vec3(p.xyx) * HASHSCALE1);
      p3 += dot(p3, p3.yzx + 19.19);
      return fract((p3.x + p3.y) * p3.z);
    }

    ${sW}
    ${sz}
    ${sj}
  `);return t.isPacked?(i=function(e,t,r){switch(e.length){case 0:return sq();case 1:var a=0,n=t,s=r;let o=[Math.ceil(n[0]/2),Math.ceil(n[1]/2)];return 1===o[0]?s?`
      int getOutputCoords() {
        return 2 * int(resultUV.x * ceil(float(outTexShape[1]) / 2.0));
      }
    `:`
      int getOutputCoords() {
        return 2 * int(resultUV.x * ${o[1]}.0);
      }
    `:1===o[1]?s?`
      int getOutputCoords() {
        return 2 * int(resultUV.y * ceil(float(outTexShape[0]) / 2.0));
      }
    `:`
      int getOutputCoords() {
        return 2 * int(resultUV.y * ${o[0]}.0);
      }
    `:s?`
    int getOutputCoords() {
      ivec2 packedTexShape = ivec2(ceil(float(outTexShape[0]) / 2.0), ceil(float(outTexShape[1]) / 2.0));
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(packedTexShape[0], packedTexShape[1]));
      return 2 * (resTexRC.x * packedTexShape[1] + resTexRC.y);
    }
  `:`
    int getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(${o[0]}, ${o[1]}));
      return 2 * (resTexRC.x * ${o[1]} + resTexRC.y);
    }
  `;case 2:var i=e,l=t,u=r;let p=[Math.ceil(l[0]/2),Math.ceil(l[1]/2)];if(I.arraysEqual(i,l))return u?`
      ivec2 getOutputCoords() {
        ivec2 packedTexShape = ivec2(ceil(float(outTexShape[0]) / 2.0), ceil(float(outTexShape[1]) / 2.0));
        return 2 * ivec2(resultUV.yx * vec2(packedTexShape[0], packedTexShape[1]));
      }
    `:`
      ivec2 getOutputCoords() {
        return 2 * ivec2(resultUV.yx * vec2(${p[0]}, ${p[1]}));
      }
    `;let d=Math.ceil(i[1]/2);return u?`
    ivec2 getOutputCoords() {
      ivec2 packedTexShape = ivec2(ceil(float(outTexShape[0]) / 2.0), ceil(float(outTexShape[1]) / 2.0));
      int texelsInLogicalRow = int(ceil(float(outShape[1]) / 2.0));
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(packedTexShape[0], packedTexShape[1]));

      int index = resTexRC.x * packedTexShape[1] + resTexRC.y;
      int r = 2 * (index / texelsInLogicalRow);
      int c = imod(index, texelsInLogicalRow) * 2;

      return ivec2(r, c);
    }
  `:`
    ivec2 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(${p[0]}, ${p[1]}));

      int index = resTexRC.x * ${p[1]} + resTexRC.y;
      int r = 2 * (index / ${d});
      int c = imod(index, ${d}) * 2;

      return ivec2(r, c);
    }
  `;case 3:var c=e,h=t,f=r;if(f)return`
    ivec3 getOutputCoords() {
      ivec2 packedTexShape = ivec2(ceil(float(outTexShape[0]) / 2.0), ceil(float(outTexShape[1]) / 2.0));
      int texelsInLogicalRow = int(ceil(float(outShape[2]) / 2.0));
      int texelsInBatch = texelsInLogicalRow * int(ceil(float(outShape[1]) / 2.0));
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(packedTexShape[0], packedTexShape[1]));
      int index = resTexRC.x * packedTexShape[1] + resTexRC.y;

      int b = index / texelsInBatch;
      index -= b * texelsInBatch;

      int r = 2 * (index / texelsInLogicalRow);
      int c = imod(index, texelsInLogicalRow) * 2;

      return ivec3(b, r, c);
    }
  `;let m=[Math.ceil(h[0]/2),Math.ceil(h[1]/2)],g=Math.ceil(c[2]/2),x=g*Math.ceil(c[1]/2);return`
    ivec3 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(${m[0]}, ${m[1]}));
      int index = resTexRC.x * ${m[1]} + resTexRC.y;

      int b = index / ${x};
      index -= b * ${x};

      int r = 2 * (index / ${g});
      int c = imod(index, ${g}) * 2;

      return ivec3(b, r, c);
    }
  `;default:return function(e,t,r){if(r)return`
    ivec4 getOutputCoords() {
      ivec2 packedTexShape = ivec2(ceil(float(outTexShape[0]) / 2.0), ceil(float(outTexShape[1]) / 2.0));
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(packedTexShape[0], packedTexShape[1]));
      int index = resTexRC.x * packedTexShape[1] + resTexRC.y;

      int texelsInLogicalRow = int(ceil(float(outShape[3]) / 2.0));
      int texelsInBatch = texelsInLogicalRow * int(ceil(float(outShape[2]) / 2.0));
      int texelsInBatchN = texelsInBatch * outShape[1];

      int b2 = index / texelsInBatchN;
      index -= b2 * texelsInBatchN;

      int b = index / texelsInBatch;
      index -= b * texelsInBatch;

      int r = 2 * (index / texelsInLogicalRow);
      int c = imod(index, texelsInLogicalRow) * 2;

      return ivec4(b2, b, r, c);
    }
  `;let a=[Math.ceil(t[0]/2),Math.ceil(t[1]/2)],n=Math.ceil(e[e.length-1]/2),s=n*Math.ceil(e[e.length-2]/2),o=s,i="",l="b, r, c";for(let t=2;t<e.length-1;t++)o*=e[e.length-t-1],i=`
      int b${t} = index / ${o};
      index -= b${t} * ${o};
    `+i,l=`b${t}, `+l;return`
    ivec${e.length} getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(${a[0]}, ${a[1]}));
      int index = resTexRC.x * ${a[1]} + resTexRC.y;

      ${i}

      int b = index / ${s};
      index -= b * ${s};

      int r = 2 * (index / ${n});
      int c = imod(index, ${n}) * 2;

      return ivec${e.length}(${l});
    }
  `}(e,t,r)}}(t.logicalShape,c,r.enableShapeUniforms),s=h,l=`
    void setOutput(vec4 val) {
      ${s.output} = val;
    }
  `):(i=function(e,t,r){switch(e.length){case 0:return sq();case 1:return a=0,n=t,s=r,1===n[0]?s?`
      int getOutputCoords() {
        return int(resultUV.x * float(outTexShape[1]));
      }
    `:`
      int getOutputCoords() {
        return int(resultUV.x * ${n[1]}.0);
      }
    `:1===n[1]?s?`
      int getOutputCoords() {
        return int(resultUV.y * float(outTexShape[0]));
      }
    `:`
      int getOutputCoords() {
        return int(resultUV.y * ${n[0]}.0);
      }
    `:s?`
    int getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(outTexShape[0], outTexShape[1]));
      return resTexRC.x * outTexShape[1] + resTexRC.y;
    }
  `:`
    int getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(${n[0]}, ${n[1]}));
      return resTexRC.x * ${n[1]} + resTexRC.y;
    }
  `;case 2:return o=e,i=t,l=r,I.arraysEqual(o,i)?l?`
      ivec2 getOutputCoords() {
        return ivec2(resultUV.yx * vec2(outTexShape[0], outTexShape[1]));
      }
    `:`
      ivec2 getOutputCoords() {
        return ivec2(resultUV.yx * vec2(${i[0]}, ${i[1]}));
      }
    `:1===o[1]?l?`
      ivec2 getOutputCoords() {
        ivec2 resTexRC = ivec2(resultUV.yx *
                               vec2(outTexShape[0], outTexShape[1]));
        int index = resTexRC.x * outTexShape[1] + resTexRC.y;
        return ivec2(index, 0);
      }
    `:`
      ivec2 getOutputCoords() {
        ivec2 resTexRC = ivec2(resultUV.yx *
                               vec2(${i[0]}, ${i[1]}));
        int index = resTexRC.x * ${i[1]} + resTexRC.y;
        return ivec2(index, 0);
      }
    `:1===o[0]?l?`
      ivec2 getOutputCoords() {
        ivec2 resTexRC = ivec2(resultUV.yx *
                               vec2(outTexShape[0], outTexShape[1]));
        int index = resTexRC.x * outTexShape[1] + resTexRC.y;
        return ivec2(0, index);
      }
    `:`
      ivec2 getOutputCoords() {
        ivec2 resTexRC = ivec2(resultUV.yx *
                               vec2(${i[0]}, ${i[1]}));
        int index = resTexRC.x * ${i[1]} + resTexRC.y;
        return ivec2(0, index);
      }
    `:l?`
    ivec2 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(outTexShape[0], outTexShape[1]));
      int index = resTexRC.x * outTexShape[1] + resTexRC.y;
      int r = index / outShape[1];
      int c = index - r * outShape[1];
      return ivec2(r, c);
    }
  `:`
    ivec2 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(${i[0]}, ${i[1]}));
      int index = resTexRC.x * ${i[1]} + resTexRC.y;
      int r = index / ${o[1]};
      int c = index - r * ${o[1]};
      return ivec2(r, c);
    }
  `;case 3:var a,n,s,o,i,l,u=e,p=t,d=r;if(d){let e=sD(["r","c","d"],u);return`
  ivec3 getOutputCoords() {
    ivec2 resTexRC = ivec2(resultUV.yx *
                           vec2(outTexShape[0], outTexShape[1]));
    int index = resTexRC.x * outTexShape[1] + resTexRC.y;
    ${e}
    return ivec3(r, c, d);
  }
`}let c=sM(["r","c","d"],u);return`
    ivec3 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(${p[0]}, ${p[1]}));
      int index = resTexRC.x * ${p[1]} + resTexRC.y;
      ${c}
      return ivec3(r, c, d);
    }
  `;case 4:var h=e,f=t,m=r;if(m){let e=sD(["r","c","d","d2"],h);return`
    ivec4 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
        vec2(outTexShape[0], outTexShape[1]));
      int index = resTexRC.x * outTexShape[1] + resTexRC.y;
      ${e}
      return ivec4(r, c, d, d2);
    }
  `}let g=sM(["r","c","d","d2"],h);return`
    ivec4 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
        vec2(${f[0]}, ${f[1]}));
      int index = resTexRC.x * ${f[1]} + resTexRC.y;
      ${g}
      return ivec4(r, c, d, d2);
    }
  `;case 5:var x=e,y=t;let b=sM(["r","c","d","d2","d3"],x);return`
    ivec5 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx * vec2(${y[0]},
                             ${y[1]}));

      int index = resTexRC.x * ${y[1]} + resTexRC.y;

      ${b}

      ivec5 outShape = ivec5(r, c, d, d2, d3);
      return outShape;
    }
  `;case 6:var v=e,N=t;let k=sM(["r","c","d","d2","d3","d4"],v);return`
    ivec6 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
        vec2(${N[0]}, ${N[1]}));
      int index = resTexRC.x * ${N[1]} + resTexRC.y;

      ${k}

      ivec6 result = ivec6(r, c, d, d2, d3, d4);
      return result;
    }
  `;default:throw Error(`${e.length}-D output sampling is not yet supported`)}}(t.logicalShape,c,r.enableShapeUniforms),o=h,l=`
    void setOutput(float val) {
      ${o.output} = vec4(val, 0, 0, 0);
    }
  `),r.packedInputs&&(m+=sU),[m,f,l,p,i,d,r.userCode].join("\n")}(n,o,t),l=function(e,t){let r=sT(e,()=>e.createShader(e.FRAGMENT_SHADER),"Unable to create fragment WebGLShader.");if(sf(e,()=>e.shaderSource(r,t)),sf(e,()=>e.compileShader(r)),(0,T.env)().get("ENGINE_COMPILE_ONLY"))return r;if(!1===e.getShaderParameter(r,e.COMPILE_STATUS))throw sx(t,e.getShaderInfoLog(r)),Error("Failed to compile fragment shader.");return r}(e.gl,i),u=e.createProgram(l);return(0,T.env)().get("ENGINE_COMPILE_ONLY")?{program:t,fragmentShader:l,source:i,webGLProgram:u,inShapeInfos:s,outShapeInfo:o,variablesLocations:null,customUniformLocations:null,infLoc:null,nanLoc:null,outShapeLocation:null,outShapeStridesLocation:null,outTexShapeLocation:null}:(e.buildVao(u),Object.assign({program:t,fragmentShader:l,source:i,webGLProgram:u,inShapeInfos:s,outShapeInfo:o},sJ(e,t,u)))})(this.gpgpu,e,d,c)),m=null!=this.activeTimers;m&&(o=this.startTimer()),(0,T.env)().get("ENGINE_COMPILE_ONLY")||function(e,t,r,a,n){t.program.enableShapeUniforms||(s0(t.inShapeInfos,r),s0([t.outShapeInfo],[a]));let s=a.texData.texture,o=a.texData.texShape;a.texData.isPacked?e.setOutputPackedMatrixTexture(s.texture,o[0],o[1]):e.setOutputMatrixTexture(s.texture,o[0],o[1]),e.setProgram(t.webGLProgram),e.bindVertexArray(t.webGLProgram.vao),1===(0,T.env)().getNumber("WEBGL_VERSION")&&null!==t.infLoc&&e.gl.uniform1f(t.infLoc,1/0),null!==t.nanLoc&&e.gl.uniform1f(t.nanLoc,NaN);for(let a=0;a<r.length;++a){let n=r[a],{uniform:s,offset:o,shape:i,texShape:l}=t.variablesLocations[a];if(i){let{uniformShape:r}=sZ(t.program.packedInputs,n.shape,n.texData.texShape);switch(r.length){case 1:e.gl.uniform1iv(i,new Int32Array(r));break;case 2:e.gl.uniform2iv(i,new Int32Array(r));break;case 3:e.gl.uniform3iv(i,new Int32Array(r));break;case 4:e.gl.uniform4iv(i,new Int32Array(r))}}if(l&&e.gl.uniform2i(l,n.texData.texShape[0],n.texData.texShape[1]),null!=s){if(n.isUniform){if(2>I.sizeFromShape(n.shape))e.gl.uniform1f(s,n.uniformValues[0]);else{let t=n.uniformValues;t instanceof Float32Array||(t=new Float32Array(t)),e.gl.uniform1fv(s,t)}continue}null!=n.texData.slice&&null!=o&&e.gl.uniform1i(o,n.texData.slice.flatOffset),e.setInputMatrixTexture(n.texData.texture.texture,s,a)}}let i=t.outShapeLocation;if(i)switch(a.shape.length){case 1:e.gl.uniform1iv(i,new Int32Array(a.shape));break;case 2:e.gl.uniform2iv(i,new Int32Array(a.shape));break;case 3:e.gl.uniform3iv(i,new Int32Array(a.shape));break;case 4:e.gl.uniform4iv(i,new Int32Array(a.shape))}if(t.outShapeStridesLocation){let r=I.computeStrides(a.shape);switch(a.shape.length){case 2:e.gl.uniform1iv(t.outShapeStridesLocation,new Int32Array(r));break;case 3:e.gl.uniform2iv(t.outShapeStridesLocation,new Int32Array(r));break;case 4:e.gl.uniform3iv(t.outShapeStridesLocation,new Int32Array(r))}}if(t.outTexShapeLocation&&e.gl.uniform2i(t.outTexShapeLocation,a.texData.texShape[0],a.texData.texShape[1]),t.program.customUniforms&&n)for(let r=0;r<t.program.customUniforms.length;++r){let a=t.program.customUniforms[r],s=t.customUniformLocations[r],o=n[r];if("float"===a.type)e.gl.uniform1fv(s,o);else if("vec2"===a.type)e.gl.uniform2fv(s,o);else if("vec3"===a.type)e.gl.uniform3fv(s,o);else if("vec4"===a.type)e.gl.uniform4fv(s,o);else if("int"===a.type)e.gl.uniform1iv(s,o);else if("ivec2"===a.type)e.gl.uniform2iv(s,o);else if("ivec3"===a.type)e.gl.uniform3iv(s,o);else if("ivec4"===a.type)e.gl.uniform4iv(s,o);else throw Error(`uniform type ${a.type} is not supported yet.`)}e.executeProgram()}(this.gpgpu,f,d,c,a),p.forEach(e=>this.disposeIntermediateTensorInfo(e)),m&&(o=this.endTimer(o),this.activeTimers.push({name:e.constructor.name,query:this.getQueryTime(o)}));let g=(0,T.env)().getNumber("WEBGL_FLUSH_THRESHOLD");if(g>0){let e=I.now();e-this.lastGlFlushTime>g&&(this.gpgpu.gl.flush(),this.lastGlFlushTime=e)}if(!(0,T.env)().getBool("WEBGL_LAZILY_UNPACK")&&l.isPacked&&!1===n){let e=this.unpackTensor(i);return this.disposeIntermediateTensorInfo(i),e}return i}compileAndRun(e,t,r,a,n=!1){return r=r||t[0].dtype,this.runWebGLProgram(e,t,r,a,n)}getAndSaveBinary(e,t){return e in this.binaryCache||(this.binaryCache[e]=t()),this.binaryCache[e]}getTextureManager(){return this.textureManager}dispose(){this.disposed||((0,T.env)().getBool("IS_TEST")||Object.keys(this.binaryCache).forEach(e=>{this.gpgpu.deleteProgram(this.binaryCache[e].webGLProgram),delete this.binaryCache[e]}),this.textureManager.dispose(),null!=this.canvas&&"undefined"!=typeof HTMLCanvasElement&&this.canvas instanceof HTMLCanvasElement?this.canvas.remove():this.canvas=null,this.gpgpuCreatedLocally&&(this.gpgpu.program=null,this.gpgpu.dispose()),this.disposed=!0)}floatPrecision(){return null==this.floatPrecisionValue&&(this.floatPrecisionValue=(0,b.tidy)(()=>{if(!(0,T.env)().get("WEBGL_RENDER_FLOAT32_ENABLED")){let e=(0,T.env)().getBool("DEBUG");(0,T.env)().set("DEBUG",!1);let t=this.abs((0,sF.scalar)(1e-8)).dataSync()[0];if((0,T.env)().set("DEBUG",e),t>0)return 32}return 16})),this.floatPrecisionValue}epsilon(){return 32===this.floatPrecision()?1e-7:1e-4}uploadToGPU(e){let t,r=this.texData.get(e),{shape:a,dtype:n,values:s,texture:o,usage:i,isPacked:l}=r;if(null!=o)return;let u=null!=this.activeTimers;u&&(t=I.now());let d=r.texShape;if(null==d&&(r.texShape=d=function(e,t=!1){let r=(0,T.env)().getNumber("WEBGL_MAX_TEXTURE_SIZE"),a=(0,T.env)().getNumber("WEBGL_MAX_SIZE_FOR_NARROW_TEXTURE");a===1/0&&(0,T.env)().getBool("WEBGL_AUTO_SQUARIFY_NARROW_TEXTURE_SHAPE")&&(a=r/2),t&&(r*=2,a*=2,1===(e=e.map((t,r)=>r>=e.length-2?I.nearestLargerEven(e[r]):e[r])).length&&(e=[2,e[0]])),2!==e.length&&(e=I.squeezeShape(e).newShape);let n=I.sizeFromShape(e),s=null;e.length<=1&&n<=r?s=[1,n]:2===e.length&&e[0]<=r&&e[1]<=r?s=e:3===e.length&&e[0]*e[1]<=r&&e[2]<=r?s=[e[0]*e[1],e[2]]:3===e.length&&e[0]<=r&&e[1]*e[2]<=r?s=[e[0],e[1]*e[2]]:4===e.length&&e[0]*e[1]*e[2]<=r&&e[3]<=r?s=[e[0]*e[1]*e[2],e[3]]:4===e.length&&e[0]<=r&&e[1]*e[2]*e[3]<=r&&(s=[e[0],e[1]*e[2]*e[3]]);let o=null!=s&&Math.max(...s)>a&&Math.min(...s)<=(t?2:1)&&Math.min(...s)>0;if(null==s||o)if(t){let t=sS(e),r=2,a=2;e.length&&([r,a]=sI(e)),n=r/2*t*(a/2),s=I.sizeToSquarishShape(n).map(e=>2*e)}else s=I.sizeToSquarishShape(n);return s}(a,l)),null!=s){let e,o=sw(a),i=d[1],c=d[0],h=s instanceof Uint8Array||s instanceof Uint8ClampedArray;(l||!h)&&([i,c]=sc(d[0],d[1])),e=l?new s7(o,h):new s5(o,h);let f=h?[c,i]:d,m=this.makeTensorInfo(f,n),g=this.texData.get(m.dataId);h?g.usage=p.PIXELS:g.usage=p.UPLOAD,g.texShape=f,this.gpgpu.uploadDenseMatrixToTexture(this.getTexture(m.dataId),i,c,s);let x=[[c,i]],y=this.runWebGLProgram(e,[m],n,x,!0),b=this.texData.get(y.dataId);r.texShape=b.texShape,r.isPacked=b.isPacked,r.usage=b.usage,(0,T.env)().get("ENGINE_COMPILE_ONLY")?this.disposeData(y.dataId):(r.texture=b.texture,r.values=null,this.texData.delete(y.dataId)),this.disposeIntermediateTensorInfo(m),u&&(this.uploadWaitMs+=I.now()-t)}else r.texture=this.acquireTexture(d,i,n,l)}convertAndCacheOnCPU(e,t){let r=this.texData.get(e),{dtype:a}=r;return null!=t&&(r.values=function(e,t){if("float32"===t||"complex64"===t)return e;if("int32"===t||"bool"===t){let r="int32"===t?new Int32Array(e.length):new Uint8Array(e.length);for(let t=0;t<r.length;++t)r[t]=Math.round(e[t]);return r}throw Error(`Unknown dtype ${t}`)}(t,a)),r.values}acquireTexture(e,t,r,a){if(this.numBytesInGPU+=this.computeBytes(e,r),!this.warnedAboutMemory&&this.numBytesInGPU>1048576*this.numMBBeforeWarning){let e=(this.numBytesInGPU/1024/1024).toFixed(2);this.warnedAboutMemory=!0,console.warn(`High memory usage in GPU: ${e} MB, most likely due to a memory leak`)}return this.textureManager.acquireTexture(e,t,a)}computeBytes(e,t){return e[0]*e[1]*I.bytesPerElement(t)}checkCompileCompletion(){for(let[,e]of Object.entries(this.binaryCache))this.checkCompletion_(e)}async checkCompileCompletionAsync(){let e=[];if(this.gpgpu.parallelCompilationExtension){for(let[,t]of Object.entries(this.binaryCache))e.push(this.checkCompletionAsync_(t));return Promise.all(e)}for(let[,t]of Object.entries(this.binaryCache)){let r=new Promise(e=>{try{this.checkCompletion_(t),e(!0)}catch(e){throw e}});e.push(r)}return Promise.all(e)}async checkCompletionAsync_(e){return this.gpgpu.gl.getProgramParameter(e.webGLProgram,this.gpgpu.parallelCompilationExtension.COMPLETION_STATUS_KHR)?this.checkCompletion_(e):(await (0,sB.nextFrame)(),this.checkCompletionAsync_(e))}checkCompletion_(e){if(!1===this.gpgpu.gl.getProgramParameter(e.webGLProgram,this.gpgpu.gl.LINK_STATUS)){if(console.log(this.gpgpu.gl.getProgramInfoLog(e.webGLProgram)),!1===this.gpgpu.gl.getShaderParameter(e.fragmentShader,this.gpgpu.gl.COMPILE_STATUS))throw sx(e.source,this.gpgpu.gl.getShaderInfoLog(e.fragmentShader)),Error("Failed to compile fragment shader.");throw Error("Failed to link vertex and fragment shaders.")}return!0}getUniformLocations(){for(let e of Object.values(this.binaryCache)){this.gpgpu.buildVao(e.webGLProgram);let{variablesLocations:t,customUniformLocations:r,infLoc:a,nanLoc:n,outShapeLocation:s,outShapeStridesLocation:o,outTexShapeLocation:i}=sJ(this.gpgpu,e.program,e.webGLProgram);e.variablesLocations=t,e.customUniformLocations=r,e.infLoc=a,e.nanLoc=n,e.outShapeLocation=s,e.outShapeStridesLocation=o,e.outTexShapeLocation=i}}createTensorFromGPUData(e,t,r){e.channels=e.channels||"RGBA";let{texture:a,height:n,width:s,channels:o}=e,i=(0,b.engine)().backend;if(!i.gpgpu.gl.isTexture(a))throw Error("The texture is invalid. Also, please make sure the texture and the TFJS WebGL backend are using the same canvas. If you want to use your own custom canvas, you have to create and use the custom TFJS WebGL backend created from the canvas through 'new tf.MathBackendWebGL(customCanvas)'.");let l=i.writeTexture(a,t,r,n,s,o);return(0,b.engine)().makeTensorFromDataId(l,t,r,i)}}ig.nextDataId=0,g("i64bB");var T=g("ibsdL");si.isBrowser()&&(0,b.registerBackend)("webgl",()=>new ig,2),g("i64bB");var A=g("eky5o");g("i64bB");var $=g("hl418");g("i64bB");var ec=g("8BaGO"),tT=g("2MDja"),I=g("jjNRA");g("i64bB");var v=g("7MaPk"),T=g("ibsdL"),tT=g("2MDja");g("i64bB");var v=g("7MaPk");const ix=`
  if (isnan(a)) return a;
  if (isnan(b)) return b;
`;class iy{constructor(e,t,r){this.variableNames=["A","B"],this.outputShape=v.assertAndGetBroadcastShape(t,r),this.enableShapeUniforms=s1(this.outputShape.length),this.userCode=`
      float binaryOperation(float a, float b) {
        ${e}
      }

      void main() {
        float a = getAAtOutCoords();
        float b = getBAtOutCoords();
        setOutput(binaryOperation(a, b));
      }
    `}}g("i64bB");var v=g("7MaPk"),I=g("jjNRA");const ib=`
  result.r = isNaN.r ? NAN : result.r;
  result.g = isNaN.g ? NAN : result.g;
  result.b = isNaN.b ? NAN : result.b;
  result.a = isNaN.a ? NAN : result.a;
`;class iv{constructor(e,t,r,a=!1){this.variableNames=["A","B"],this.supportsBroadcasting=!0,this.packedInputs=!0,this.packedOutput=!0,this.outputShape=v.assertAndGetBroadcastShape(t,r);let n=this.outputShape.length;this.enableShapeUniforms=s1(n);let s="";if(a)if(0===n||1===I.sizeFromShape(this.outputShape))s=`
          result.y = 0.;
          result.z = 0.;
          result.w = 0.;
        `;else{let e=sX(n);if(s=`
          ${e} coords = getOutputCoords();
        `,1===n)this.enableShapeUniforms?s+=`
            result.y = (coords + 1) >= outShape ? 0. : result.y;
            result.z = 0.;
            result.w = 0.;
          `:s+=`
            result.y = (coords + 1) >= ${this.outputShape[0]} ? 0. : result.y;
            result.z = 0.;
            result.w = 0.;
          `;else{let e=o4("coords",n);this.enableShapeUniforms?s+=`
            bool nextRowOutOfBounds =
              (${e[n-2]} + 1) >= outShape[${n} - 2];
            bool nextColOutOfBounds =
              (${e[n-1]} + 1) >= outShape[${n} - 1];
            result.y = nextColOutOfBounds ? 0. : result.y;
            result.z = nextRowOutOfBounds ? 0. : result.z;
            result.w = nextColOutOfBounds || nextRowOutOfBounds ? 0. : result.w;
          `:s+=`
            bool nextRowOutOfBounds =
              (${e[n-2]} + 1) >= ${this.outputShape[n-2]};
            bool nextColOutOfBounds =
              (${e[n-1]} + 1) >= ${this.outputShape[n-1]};
            result.y = nextColOutOfBounds ? 0. : result.y;
            result.z = nextRowOutOfBounds ? 0. : result.z;
            result.w = nextColOutOfBounds || nextRowOutOfBounds ? 0. : result.w;
          `}}this.userCode=`
      vec4 binaryOperation(vec4 a, vec4 b) {
        ${e}
      }

      void main() {
        vec4 a = getAAtOutCoords();
        vec4 b = getBAtOutCoords();

        vec4 result = binaryOperation(a, b);
        ${s}

        setOutput(result);
      }
    `}}g("i64bB");var $=g("hl418");g("i64bB");var $=g("hl418");function iN(e){let{inputs:t,backend:r}=e,{x:a}=t;return r.incRef(a.dataId),{dataId:a.dataId,shape:a.shape,dtype:a.dtype}}const ik={kernelName:$.Identity,backendName:"webgl",kernelFunc:iN};function iT(e){let{inputs:t,backend:r}=e,{real:a,imag:n}=t,s=r.makeTensorInfo(a.shape,"complex64"),o=r.texData.get(s.dataId);return o.complexTensorInfos={real:iN({inputs:{x:a},backend:r}),imag:iN({inputs:{x:n},backend:r})},s}const iS={kernelName:$.Complex,backendName:"webgl",kernelFunc:iT};g("i64bB");var T=g("ibsdL"),$=g("hl418"),I=g("jjNRA");const iI="return (a < 0.) ? b * a : a;",iw=`
  vec4 aLessThanZero = vec4(lessThan(a, vec4(0.)));
  return (aLessThanZero * (b * a)) + ((vec4(1.0) - aLessThanZero) * a);
`,iC={kernelName:$.LeakyRelu,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{x:n}=t,{alpha:s}=a,o=r.makeTensorInfo([],"float32",I.createScalarValue(s,"float32")),i=(0,T.env)().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new iv(iw,n.shape,o.shape):new iy(iI,n.shape,o.shape),l=r.runWebGLProgram(i,[n,o],"float32");return r.disposeIntermediateTensorInfo(o),l}};g("i64bB");var T=g("ibsdL"),$=g("hl418");const iE="return (a < 0.) ? b * a : a;",iA=`
  vec4 aLessThanZero = vec4(lessThan(a, vec4(0.)));
  return (aLessThanZero * (b * a)) + ((vec4(1.0) - aLessThanZero) * a);
`,i$={kernelName:$.Prelu,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r}=e,{x:a,alpha:n}=t,s=(0,T.env)().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new iv(iA,a.shape,n.shape):new iy(iE,a.shape,n.shape);return r.runWebGLProgram(s,[a,n],"float32")}},iR="if (isnan(x)) return x;";function iP({opSnippet:e,packedOpSnippet:t,cpuKernelImpl:r,dtype:a}){return({inputs:n,backend:s})=>{let o,{x:i}=n,l=a||i.dtype;if(s.shouldExecuteOnCPU([i])&&null!=r){let e=r(s.texData.get(i.dataId).values,l);return s.makeTensorInfo(i.shape,l,e)}return o=(0,T.env)().getBool("WEBGL_PACK_UNARY_OPERATIONS")&&null!=t?new ip(i.shape,t):new ie(i.shape,e),s.runWebGLProgram(o,[i],l)}}function iB({opSnippet:e,packedOpSnippet:t,checkOutOfBounds:r=!1,supportsComplex:a=!1,cpuKernelImpl:n,dtype:s}){return({inputs:o,backend:i})=>{let l,{a:u,b:p}=o;if(a&&"complex64"===u.dtype){let t=i.texData.get(u.dataId),r=i.texData.get(p.dataId),[a,n]=[[t.complexTensorInfos.real,r.complexTensorInfos.real],[t.complexTensorInfos.imag,r.complexTensorInfos.imag]].map(t=>{let[r,a]=t,n={dataId:r.dataId,dtype:r.dtype,shape:u.shape},s={dataId:a.dataId,dtype:a.dtype,shape:p.shape},o=new iy(e,u.shape,p.shape);return i.runWebGLProgram(o,[n,s],(0,tT.upcastType)(r.dtype,a.dtype))}),s=iT({inputs:{real:a,imag:n},backend:i});return i.disposeIntermediateTensorInfo(a),i.disposeIntermediateTensorInfo(n),s}let d=s||(0,tT.upcastType)(u.dtype,p.dtype);if(("string"===u.dtype||"string"===p.dtype||i.shouldExecuteOnCPU([u,p]))&&null!=n){let e=i.texData.get(u.dataId).values,t=i.texData.get(p.dataId).values,r="string"===u.dtype?v.fromUint8ToStringArray(e):e,a="string"===u.dtype?v.fromUint8ToStringArray(t):t,[s,o]=n(u.shape,p.shape,r,a,d),l=i.makeTensorInfo(o,d);return i.texData.get(l.dataId).values=s,l}return l=(0,T.env)().getBool("WEBGL_PACK_BINARY_OPERATIONS")&&null!=t?new iv(t,u.shape,p.shape,r):new iy(e,u.shape,p.shape),i.runWebGLProgram(l,[u,p],d)}}function iF(e,t=!1){if("linear"===e)return"return x;";if("relu"===e)return t?il:ia;if("elu"===e)return t?ii:"return (x >= 0.0) ? x : (exp(x) - 1.0);";if("relu6"===e)return t?iu:is;if("prelu"===e)return t?iA:iE;else if("leakyrelu"===e)return t?iw:iI;else if("sigmoid"===e)return"return 1.0 / (1.0 + exp(-1.0 * x));";throw Error(`Activation ${e} has not been implemented for the WebGL backend.`)}class iO{constructor(e,t,r,a=!1,n=!1,s=!1,o=null,i=!1,l=!1){this.variableNames=["matrixA","matrixB"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=r,this.enableShapeUniforms=s1(this.outputShape.length);let u=Math.ceil((a?e[1]:e[2])/2),p=a?["a.xxyy","a.zzww"]:["a.xxzz","a.yyww"],d=n?["b.xzxz","b.ywyw"]:["b.xyxy","b.zwzw"],c="",h="";o&&(c=i?`vec4 activation(vec4 a) {
          vec4 b = getPreluActivationWeightsAtOutCoords();
          ${o}
        }`:l?`vec4 activation(vec4 a) {
          vec4 b = getLeakyreluAlphaAtOutCoords();
          ${o}
        }`:`vec4 activation(vec4 x) {
          ${o}
        }`,h="result = activation(result);"),s&&this.variableNames.push("bias"),i&&this.variableNames.push("preluActivationWeights"),l&&this.variableNames.push("leakyreluAlpha");let f="rc.x",m="rc.x";e[0]<t[0]?f=`imod(rc.x, ${e[0]})`:t[0]<e[0]&&(m=`imod(rc.x, ${t[0]})`),this.userCode=`
      ${c}
      // Don't use uniform for sharedDimensionPacked for performance.
      const float sharedDimension = ${u}.0;

      vec4 dot2x2ARowBCol(ivec3 rc) {
        vec4 result = vec4(0);
        int batchA = ${f};
        int batchB = ${m};
        for (int i = 0; i < ${u}; i++) {
          vec4 a = getMatrixA(batchA, ${a?"i * 2, rc.y":"rc.y, i * 2"});
          vec4 b = getMatrixB(batchB, ${n?"rc.z, i * 2":"i * 2, rc.z"});

          // These swizzled products need to be separately added.
          // See: https://github.com/tensorflow/tfjs/issues/1735
          result += (${p[0]} * ${d[0]});
          result += (${p[1]} * ${d[1]});
        }
        return result;
      }

      void main() {
        ivec3 rc = getOutputCoords();
        vec4 result = dot2x2ARowBCol(rc);

        ${s?"result += getBiasAtOutCoords();":""}

        ${h}

        setOutput(result);
      }
    `}}g("i64bB");var v=g("7MaPk"),T=g("ibsdL"),$=g("hl418");g("i64bB");var v=g("7MaPk");const iM={REAL:"return areal * breal - aimag * bimag;",IMAG:"return areal * bimag + aimag * breal;"};class iD{constructor(e,t,r){this.variableNames=["AReal","AImag","BReal","BImag"],this.outputShape=v.assertAndGetBroadcastShape(t,r),this.userCode=`
      float binaryOpComplex(
          float areal, float aimag, float breal, float bimag) {
        ${e}
      }

      void main() {
        float areal = getARealAtOutCoords();
        float aimag = getAImagAtOutCoords();
        float breal = getBRealAtOutCoords();
        float bimag = getBImagAtOutCoords();
        setOutput(binaryOpComplex(areal, aimag, breal, bimag));
      }
    `}}const i_="return a * b;";function iL(e){let t,{inputs:r,backend:a}=e,{a:n,b:s}=r,o=v.upcastType(n.dtype,s.dtype);if("complex64"===n.dtype){let e=a.texData.get(n.dataId),t=a.texData.get(s.dataId),r=new iD(iM.REAL,n.shape,s.shape),o=new iD(iM.IMAG,n.shape,s.shape),i=[{dataId:e.complexTensorInfos.real.dataId,dtype:e.complexTensorInfos.real.dtype,shape:n.shape},{dataId:e.complexTensorInfos.imag.dataId,dtype:e.complexTensorInfos.imag.dtype,shape:n.shape},{dataId:t.complexTensorInfos.real.dataId,dtype:t.complexTensorInfos.real.dtype,shape:s.shape},{dataId:t.complexTensorInfos.imag.dataId,dtype:t.complexTensorInfos.imag.dtype,shape:s.shape}],l=a.runWebGLProgram(r,i,"float32"),u=a.runWebGLProgram(o,i,"float32"),p=iT({inputs:{real:l,imag:u},backend:a});return a.disposeIntermediateTensorInfo(l),a.disposeIntermediateTensorInfo(u),p}if(a.shouldExecuteOnCPU([n,s])){let e=a.texData.get(n.dataId),t=a.texData.get(s.dataId),[r,i]=oA(n.shape,s.shape,e.values,t.values,o),l=a.makeTensorInfo(i,o);return a.texData.get(l.dataId).values=r,l}return t=(0,T.env)().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new iv(i_,n.shape,s.shape):new iy(i_,n.shape,s.shape),a.runWebGLProgram(t,[n,s],o)}const iV={kernelName:$.Multiply,backendName:"webgl",kernelFunc:iL};g("i64bB");var $=g("hl418"),I=g("jjNRA");function iG(e){let{inputs:t,backend:r,attrs:a}=e,{x:n}=t,{shape:s}=a,o=I.sizeFromShape(n.shape),i=I.inferFromImplicitShape(s,o),l=I.sizeFromShape(i);I.assert(o===l,()=>`The new shape (${i}) has ${l} elements and the old shape (${n.shape}) has ${o} elements. The new shape and old shape must have the same number of elements.`);let u=r.texData.get(n.dataId);return!u.isPacked||sC(n.shape,i)||null!==u.texture&&sC(u.shape,i)?(r.incRef(n.dataId),{dataId:n.dataId,shape:i,dtype:n.dtype}):function(e,t,r){let a=[sS(e.shape),...sI(e.shape)],n={dtype:e.dtype,shape:a,dataId:e.dataId},s=new o8([sS(t),...sI(t)],a),o=r.runWebGLProgram(s,[n],e.dtype,[a],!0);return{dataId:o.dataId,shape:t,dtype:o.dtype}}(n,i,r)}const iW={kernelName:$.Reshape,backendName:"webgl",kernelFunc:iG};g("i64bB");var $=g("hl418");g("i64bB");var v=g("7MaPk"),tT=g("2MDja"),I=g("jjNRA");g("i64bB");var v=g("7MaPk");g("i64bB");var I=g("jjNRA");class iz{constructor(e,t){this.variableNames=["x"];let{windowSize:r,batchSize:a,inSize:n,outSize:s}=e;this.outputShape=[a,s];let o=4*Math.floor(r/4),i=r%4,l="sumValue += dot(values, ones);";if(null!=t){let e=1/t;l=`sumValue += dot(values * ${I.isInt(e)?e.toPrecision(2):e}, ones);`}let u="";n%r>0&&(u=`
        if (inIdx < 0 || inIdx >= ${n}) {
          return 0.0;
        }
      `),this.userCode=`
      const vec4 ones = vec4(1.0, 1.0, 1.0, 1.0);

      float getValue(int batch, int inIdx) {
        ${u}
        return getX(batch, inIdx);
      }

      void main() {
        ivec2 coords = getOutputCoords();
        int batch = coords[0];
        int outIdx = coords[1];
        int inOffset = outIdx * ${r};

        float sumValue = 0.0;

        for (int i = 0; i < ${o}; i += 4) {
          int inIdx = inOffset + i;
          vec4 values = vec4(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            getValue(batch, inIdx + 2),
            getValue(batch, inIdx + 3)
          );

          ${l}
        }

        int inIdx = inOffset + ${o};
        if (${1===i}) {
          vec4 values = vec4(getValue(batch, inIdx), 0.0, 0.0, 0.0);

          ${l}
        } else if (${2===i}) {
          vec4 values = vec4(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1), 0.0, 0.0);

          ${l}
        } else if (${3===i}) {
          vec4 values = vec4(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            getValue(batch, inIdx + 2), 0.0);

          ${l}
        }
        setOutput(sumValue);
      }
    `}}class ij{constructor(e,t){this.variableNames=["x"];let{windowSize:r,batchSize:a,inSize:n,outSize:s}=e;this.outputShape=[a,s];let o="0.0",i="";"prod"===t?o="1.0":"min"===t?(o="1.0 / 1e-20",i="min"):"max"===t&&(o="-1.0 / 1e-20",i="max");let l=`${t}(${t}(${t}(minMaxValue[0], minMaxValue[1]), minMaxValue[2]), minMaxValue[3])`;"sum"===t?l="sumValue":"prod"===t?l="prodValue":"all"===t?l="allValue":"any"===t&&(l="anyValue");let u=4*Math.floor(r/4),p=r%4,d=`
      if (${"sum"===t}) {
        sumValue += dot(values, ones);
      } else if (${"prod"===t}) {
        vec2 tmp = vec2(values[0], values[1]) * vec2(values[2], values[3]);
        prodValue *= tmp[0] * tmp[1];
      } else {
        minMaxValue = ${i}(values, minMaxValue);
        if (${"min"===t} || ${"max"===t}) {
          minMaxValue = ${i}(values, minMaxValue);
          bvec4 isNaN = isnan(values);
          if (isNaN.r || isNaN.g || isNaN.b || isNaN.a) {
            minMaxValue = vec4(NAN);
          }
        }
      }
    `,c="vec4";"all"===t?(o="1.0",d=`
        bool reducedAllValue = all(values);
        float floatedReducedAllValue = float(reducedAllValue);
        allValue = float(allValue >= 1.0 && floatedReducedAllValue >= 1.0);
      `,c="bvec4"):"any"===t&&(o="0.0",d=`
        bool reducedAnyValue = any(values);
        float floatedReducedAnyValue = float(reducedAnyValue);
        anyValue = float(anyValue >= 1.0 || floatedReducedAnyValue >= 1.0);
      `,c="bvec4");let h="";n%r>0&&(h=`
        if (inIdx < 0 || inIdx >= ${n}) {
          return initializationValue;
        }
      `),this.userCode=`
      const float initializationValue = ${o};
      const vec4 ones = vec4(1.0, 1.0, 1.0, 1.0);

      float getValue(int batch, int inIdx) {
        ${h}
        return getX(batch, inIdx);
      }

      void main() {
        ivec2 coords = getOutputCoords();
        int batch = coords[0];
        int outIdx = coords[1];
        int inOffset = outIdx * ${r};

        vec4 minMaxValue = vec4(${o});
        float prodValue = 1.0;
        float sumValue = 0.0;
        float allValue = 1.0;
        float anyValue = 0.0;

        for (int i = 0; i < ${u}; i += 4) {
          int inIdx = inOffset + i;
          ${c} values = ${c}(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            getValue(batch, inIdx + 2),
            getValue(batch, inIdx + 3)
          );

          ${d}
        }

        int inIdx = inOffset + ${u};
        if (${1===p}) {
          ${c} values = ${c}(
            getValue(batch, inIdx),
            initializationValue,
            initializationValue,
            initializationValue
          );

          ${d}
        } else if (${2===p}) {
          ${c} values = ${c}(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            initializationValue,
            initializationValue
          );

          ${d}
        } else if (${3===p}) {
          ${c} values = ${c}(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            getValue(batch, inIdx + 2),
            initializationValue
          );

          ${d}
        }
        setOutput(${l});
      }
    `}}function iU(e,t,r,a){let n=function(e){let t=[];for(;0===t.length||1!==t[t.length-1].outSize;){let r=t.length?t[t.length-1].outSize:e[1],a=v.computeOptimalWindowSize(r);t.push({inSize:r,windowSize:a,outSize:Math.ceil(r/a)})}return t}(e.shape),s=e;for(let o=0;o<n.length;o++){let i,l,{inSize:u,windowSize:p,outSize:d}=n[o];i="mean"===r?0===o?new iz({windowSize:p,inSize:u,batchSize:e.shape[0],outSize:d},u):new iz({windowSize:p,inSize:u,batchSize:e.shape[0],outSize:d}):new ij({windowSize:p,inSize:u,batchSize:e.shape[0],outSize:d},r),l=s,s=a.runWebGLProgram(i,[s],t),l.dataId!==e.dataId&&a.disposeIntermediateTensorInfo(l)}return s}g("i64bB");var T=g("ibsdL");class iq{constructor(e,t){this.variableNames=["A"];let r=Array(e.length);for(let a=0;a<r.length;a++)r[a]=e[t[a]];this.outputShape=r,this.rank=r.length;let a=sX(this.rank),n=function(e){let t=e.length;if(t>6)throw Error(`Transpose for rank ${t} is not yet supported`);let r=["resRC.x","resRC.y","resRC.z","resRC.w","resRC.u","resRC.v"],a=Array(t);for(let t=0;t<e.length;t++)a[e[t]]=r[t];return a.join()}(t);this.userCode=`
    void main() {
      ${a} resRC = getOutputCoords();
      setOutput(getA(${n}));
    }
    `}}class iH{constructor(e,t){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0;let r=Array(e.length);for(let a=0;a<r.length;a++)r[a]=e[t[a]];if(this.outputShape=r,this.rank=r.length,this.rank>6)throw Error(`Packed transpose for rank ${this.rank} is not yet supported.`);let a=sX(this.rank),n=o2("rc",this.rank),s=Array(this.rank);for(let e=0;e<t.length;e++)s[t[e]]=n[e];let o=`vec2(${s.slice(-2).join()})`,i=`++${n[this.rank-1]} < ${r[this.rank-1]}`,l=`getChannel(getA(${s.join()}), ${o})`;this.userCode=`
    void main() {
      ${a} rc = getOutputCoords();
      vec4 result = vec4(0.);
      result[0] = ${l};
      if(${i}) {
        result[1] = ${l};
      }
      --${n[this.rank-1]};
      if(++${n[this.rank-2]} < ${r[this.rank-2]}) {
        result[2] = ${l};
        if(${i}) {
          result[3] = ${l};
        }
      }
      setOutput(result);
    }
    `}}function iK(e,t,r){let a=(0,T.env)().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new iH(e.shape,t):new iq(e.shape,t);return r.runWebGLProgram(a,[e],e.dtype)}function iX(e){let{inputs:t,backend:r,attrs:a}=e,{x:n}=t,{axis:s,keepDims:o}=a;return function(e,t,r,a){let n=e.shape.length,s=I.parseAxisParam(t,e.shape),o=s,i=v.getAxesPermutation(o,n),l=null!=i,u=e;l&&(u=iK(e,i,a),o=v.getInnerMostAxes(o.length,n)),v.assertAxesAreInnerMostDims("sum",o,n);let[p,d]=v.computeOutAndReduceShapes(u.shape,o),c=p;r&&(c=v.expandShapeToKeepDim(p,s));let h=I.sizeFromShape(d),f=iG({inputs:{x:u},attrs:{shape:[I.sizeFromShape(e.shape)/h,h]},backend:a}),m=iU(f,(0,tT.sumOutType)(e.dtype),"sum",a),g=iG({inputs:{x:m},attrs:{shape:c},backend:a});return a.disposeIntermediateTensorInfo(f),a.disposeIntermediateTensorInfo(m),l&&a.disposeIntermediateTensorInfo(u),g}(n,s,o,r)}const iZ={kernelName:$.Sum,backendName:"webgl",kernelFunc:iX};g("i64bB");var $=g("hl418");function iY(e){let t,{inputs:r,backend:a,attrs:n}=e,{x:s}=r,{perm:o}=n,i=Array(s.shape.length);for(let e=0;e<i.length;e++)i[e]=s.shape[o[e]];if(a.shouldExecuteOnCPU([s])){let e=o0(a.texData.get(s.dataId).values,s.shape,s.dtype,o,i);t=a.makeTensorInfo(i,s.dtype),a.texData.get(t.dataId).values=e}else t=iK(s,o,a);return t}const iQ={kernelName:$.Transpose,backendName:"webgl",kernelFunc:iY};function iJ({a:e,b:t,transposeA:r,transposeB:a,backend:n,bias:s=null,preluActivationWeights:o=null,leakyreluAlpha:i=0,activation:l=null}){let u,p=e.shape.length,d=t.shape.length,c=r?e.shape[p-2]:e.shape[p-1],h=a?t.shape[d-1]:t.shape[d-2],f=r?e.shape[p-1]:e.shape[p-2],m=a?t.shape[d-2]:t.shape[d-1],g=e.shape.slice(0,-2),x=t.shape.slice(0,-2),y=I.sizeFromShape(g),b=I.sizeFromShape(x),v=ec.assertAndGetBroadcastShape(e.shape.slice(0,-2),t.shape.slice(0,-2)).concat([f,m]);I.assert(c===h,()=>`Error in matMul: inner shapes (${c}) and (${h}) of Tensors with shapes ${e.shape} and ${t.shape} and transposeA=${r} and transposeB=${a} must match.`);let N=r?[y,c,f]:[y,f,c],k=a?[b,m,h]:[b,h,m],T=iG({inputs:{x:e},backend:n,attrs:{shape:N}}),S=iG({inputs:{x:t},backend:n,attrs:{shape:k}}),w=[T,S],C=Math.max(y,b),E=r?T.shape[1]:T.shape[2],A=null!=s,$=null!=o,R="leakyrelu"===l,P=null!=l?iF(l,!0):null,B=A||$||R||null!=P;if((1===f||1===m)&&E>1e3&&!1===B){let e=T,t=S;r&&(e=iY({inputs:{x:T},backend:n,attrs:{perm:[0,2,1]}}),w.push(e)),a&&(t=iY({inputs:{x:S},backend:n,attrs:{perm:[0,2,1]}}),w.push(t));let s=1!==m,o=1===m,i=e;s&&(i=iG({inputs:{x:e},backend:n,attrs:{shape:[C,E,1]}}),w.push(i));let l=t;o&&(l=iG({inputs:{x:t},backend:n,attrs:{shape:[C,1,E]}}),w.push(l));let p=iL({inputs:{a:i,b:l},backend:n});u=iX({inputs:{x:p},backend:n,attrs:{axis:1===m?2:1,keepDims:!0}}),w.push(p)}else{let l=(0,tT.upcastType)(e.dtype,t.dtype),p=new iO(N,k,[C,f,m],r,a,A,P,$,R),d=[T,S];if(null!=s&&d.push(s),$&&d.push(o),R){let e=n.makeTensorInfo([],"float32",I.createScalarValue(i,"float32"));d.push(e),w.push(e)}u=n.runWebGLProgram(p,d,l)}let F=iG({inputs:{x:u},backend:n,attrs:{shape:v}});for(let e of(w.push(u),w))n.disposeIntermediateTensorInfo(e);return F}const i0={kernelName:$._FusedMatMul,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{a:n,b:s,bias:o,preluActivationWeights:i}=t,{transposeA:l,transposeB:u,activation:p,leakyreluAlpha:d}=a;return iJ({a:n,b:s,transposeA:l,transposeB:u,backend:r,bias:o,preluActivationWeights:i,leakyreluAlpha:d,activation:p})}};g("i64bB");var $=g("hl418"),T=g("ibsdL");const i1="return abs(x);",i2={kernelName:$.Abs,backendName:"webgl",kernelFunc:function(e){let t,{inputs:r,backend:a}=e,{x:n}=r;if(a.shouldExecuteOnCPU([n])&&"complex64"!==n.dtype){let e=oV(a.texData.get(n.dataId).values);return a.makeTensorInfo(n.shape,n.dtype,e)}return t=(0,T.env)().getBool("WEBGL_PACK_UNARY_OPERATIONS")?new ip(n.shape,i1):new ie(n.shape,i1),a.runWebGLProgram(t,[n],n.dtype)}};g("i64bB");var $=g("hl418");const i4=iP({opSnippet:it+`
  if (abs(x) > 1.) {
    return NAN;
  }
  return acos(x);
`}),i3={kernelName:$.Acos,backendName:"webgl",kernelFunc:i4};g("i64bB");var $=g("hl418");const i8=iP({opSnippet:it+`
  if (x < 1.0) return NAN;
return log(x + sqrt(x * x - 1.0));`}),i6={kernelName:$.Acosh,backendName:"webgl",kernelFunc:i8};g("i64bB");var $=g("hl418");const i5="return a + b;",i7=iB({opSnippet:i5,packedOpSnippet:i5,supportsComplex:!0,cpuKernelImpl:oi}),i9={kernelName:$.Add,backendName:"webgl",kernelFunc:i7};g("i64bB");var $=g("hl418"),T=g("ibsdL"),tT=g("2MDja");class le{constructor(e,t){this.outputShape=[],this.outputShape=e,this.variableNames=t.map((e,t)=>`T${t}`);let r=[];this.variableNames.forEach(e=>{r.push(`float v${e} = get${e}AtOutCoords();`)});let a=this.variableNames.map(e=>`v${e}`).join(" + ");this.userCode=`
      void main() {
        ${r.join("\n        ")}

        float result = ${a};
        setOutput(result);
      }
    `}}class lt{constructor(e,t){this.outputShape=[],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=e,this.variableNames=t.map((e,t)=>`T${t}`);let r=[];this.variableNames.forEach(e=>{r.push(`vec4 v${e} = get${e}AtOutCoords();`)});let a=this.variableNames.map(e=>`v${e}`).join(" + ");this.userCode=`
      void main() {
        ${r.join("\n        ")}

        vec4 result = ${a};
        setOutput(result);
      }
    `}}const lr={kernelName:$.AddN,backendName:"webgl",kernelFunc:function e(t){let{inputs:r,backend:a}=t;if(1===r.length)return iN({inputs:{x:r[0]},backend:a});if(r.length>(0,T.env)().getNumber("WEBGL_MAX_TEXTURES_IN_SHADER")){let t=Math.floor(r.length/2),n=e({inputs:r.slice(0,t),backend:a}),s=e({inputs:r.slice(t),backend:a});return e({inputs:[n,s],backend:a})}let n=r.map(e=>e.dtype).reduce((e,t)=>(0,tT.upcastType)(e,t)),s=r.map(e=>e.shape),o=(0,T.env)().getBool("WEBGL_PACK")?new lt(r[0].shape,s):new le(r[0].shape,s);return a.runWebGLProgram(o,r,n)}};g("i64bB");var $=g("hl418"),v=g("7MaPk"),I=g("jjNRA");const la={kernelName:$.All,backendName:"webgl",kernelFunc:function(e){let t,{inputs:r,backend:a,attrs:n}=e,{x:s}=r,{axis:o,keepDims:i}=n,l=s.shape.length,u=I.parseAxisParam(o,s.shape),p=u,d=v.getAxesPermutation(p,l),c=s;null!=d&&(c=iY({inputs:{x:s},backend:a,attrs:{perm:d}}),p=v.getInnerMostAxes(p.length,l)),v.assertAxesAreInnerMostDims("all",p,l);let[h,f]=v.computeOutAndReduceShapes(c.shape,p),m=iG({inputs:{x:c},backend:a,attrs:{shape:[-1,I.sizeFromShape(f)]}}),g=iU(m,m.dtype,"all",a);return t=i?iG({inputs:{x:g},backend:a,attrs:{shape:v.expandShapeToKeepDim(h,u)}}):iG({inputs:{x:g},backend:a,attrs:{shape:h}}),a.disposeIntermediateTensorInfo(m),a.disposeIntermediateTensorInfo(g),null!=d&&a.disposeIntermediateTensorInfo(c),t}};g("i64bB");var $=g("hl418"),v=g("7MaPk"),I=g("jjNRA");const ln={kernelName:$.Any,backendName:"webgl",kernelFunc:function(e){let t,{inputs:r,backend:a,attrs:n}=e,{x:s}=r,{axis:o,keepDims:i}=n,l=s.shape.length,u=I.parseAxisParam(o,s.shape),p=u,d=v.getAxesPermutation(p,l),c=s;null!=d&&(c=iY({inputs:{x:s},backend:a,attrs:{perm:d}}),p=v.getInnerMostAxes(p.length,l)),v.assertAxesAreInnerMostDims("any",p,l);let[h,f]=v.computeOutAndReduceShapes(c.shape,p),m=iG({inputs:{x:c},backend:a,attrs:{shape:[-1,I.sizeFromShape(f)]}}),g=iU(m,m.dtype,"any",a);return t=i?iG({inputs:{x:g},backend:a,attrs:{shape:v.expandShapeToKeepDim(h,u)}}):iG({inputs:{x:g},backend:a,attrs:{shape:h}}),a.disposeIntermediateTensorInfo(m),a.disposeIntermediateTensorInfo(g),null!=d&&a.disposeIntermediateTensorInfo(c),t}};g("i64bB");var $=g("hl418"),v=g("7MaPk"),I=g("jjNRA");g("i64bB");var v=g("7MaPk"),T=g("ibsdL"),I=g("jjNRA");class ls{constructor(e,t,r){this.variableNames=["A"];let{windowSize:a,batchSize:n,outSize:s}=e;r||this.variableNames.push("bestIndicesA"),this.outputShape=[n,s],this.userCode=`
      void main() {
        ivec2 coords = getOutputCoords();
        int batch = coords[0];
        int outIdx = coords[1];
        int inOffset = outIdx * ${a};

        int bestIndex = inOffset;
        float bestValue = getA(batch, bestIndex);

        for (int i = 0; i < ${a}; i++) {
          int inIdx = ${r?"inOffset + i;":"round(getBestIndicesA(batch, inOffset + i));"};
          float candidate = getA(batch, inIdx);
          if (candidate ${"max"===t?">":"<"} bestValue) {
            bestValue = candidate;
            bestIndex = inIdx;
          }
        }
        setOutput(float(bestIndex));
      }
    `}}g("i64bB");var I=g("jjNRA");class lo{constructor(e,t,r,a){let n,s;this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,I.assert(e.length>2,()=>`Packed arg${r.charAt(0).toUpperCase()+r.slice(1)} supports only inputs with rank above 2.`);let o=Math.ceil(e[e.length-1]/t);this.outputShape=e.slice(0,-1),o>1&&this.outputShape.push(o),a||this.variableNames.push("bestIndicesA");let i=this.outputShape,l=i.length,u=sX(l),p=o4("coords",l);if(1===o){let e=sX(s=l+1);n=`
        ${e} sourceLocR = ${e}(${p.join()}, 0);
        ++${p[l-1]};
        ${e} sourceLocG = ${e}(${p.join()}, 0);
        ++${p[l-2]};
        ${e} sourceLocA = ${e}(${p.join()}, 0);
        --${p[l-1]};
        ${e} sourceLocB = ${e}(${p.join()}, 0);
        --${p[l-2]};`}else s=l,n=`
        ${u} sourceLocR = coords;
        ++${p[l-1]};
        ${u} sourceLocG = coords;
        ++${p[l-2]};
        ${u} sourceLocA = coords;
        --${p[l-1]};
        ${u} sourceLocB = coords;
        --${p[l-2]};`;let d=["x","y","z","w","u","v"].slice(0,s),c="."+d[s-1],h=d.map(e=>"int "+e),f=o4("sourceLocR",s-1).concat("inIdx.r"),m=o4("sourceLocG",s-1).concat("inIdx.g"),g=o4("sourceLocB",s-1).concat("inIdx.b"),x=o4("sourceLocA",s-1).concat("inIdx.a"),y="max"===r?"greaterThan":"lessThan",b=a?"":`
          inIdx = round(vec4(getBestIndicesAChannel(${f.join()}),
                             getBestIndicesAChannel(${m.join()}),
                             getBestIndicesAChannel(${g.join()}),
                             getBestIndicesAChannel(${x.join()})));`,v=`vec4(
            getAChannel(${f.join()}),
            hasNextCol ? getAChannel(${m.join()}) : 0.,
            hasNextRow ? getAChannel(${g.join()}) : 0.,
            hasNextRow && hasNextCol ? getAChannel(${x.join()}) : 0.)`,N=a?"":`
      float getBestIndicesAChannel(${h.join()}) {
        return getChannel(getBestIndicesA(${d.join()}),
                                          vec2(${d.slice(-2).join()}));
      }`;this.userCode=`
      float getAChannel(${h.join()}) {
        return getChannel(getA(${d.join()}),
                               vec2(${d.slice(-2).join()}));
      }
      ${N}
      void main() {
        ${u} coords = getOutputCoords();
        bool hasNextCol = ${p[l-1]} < ${i[l-1]-1};
        bool hasNextRow = ${p[l-2]} < ${i[l-2]-1};
        ${n}
        ivec4 srcIdx = ivec4(sourceLocR${c}, sourceLocG${c},
          sourceLocB${c}, sourceLocA${c}) * ${t};
        ivec4 inIdx = srcIdx;
        vec4 bestIndex = vec4(inIdx);
        vec4 bestValue = ${v};

        for (int i = 0; i < ${t}; i++) {
          inIdx = srcIdx;
          ${b}
          vec4 candidate = ${v};
          bvec4 nan = isnan(candidate);
          bvec4 replace = bvec4(
            vec4(${y}(candidate, bestValue)) * (vec4(1.0) - vec4(nan)));

          bestValue = vec4(replace.x  ? candidate.x : bestValue.x,
                           replace.y  ? candidate.y : bestValue.y,
                           replace.z  ? candidate.z : bestValue.z,
                           replace.w  ? candidate.w : bestValue.w);
          bestIndex = mix(bestIndex, vec4(inIdx), vec4(replace));
          srcIdx++;
        }
        setOutput(bestIndex);
      }
    `}}function li(e,t,r,a){let n=[r];if(v.assertAxesAreInnerMostDims("arg"+a.charAt(0).toUpperCase()+a.slice(1),n,t.shape.length),!(0,T.env)().getBool("WEBGL_PACK_REDUCE")||t.shape.length<=2){let r=[],s=e.texData.get(t.dataId),o=null!==s&&s.isPacked,i=t;o&&r.push(i=e.unpackTensor(t));let[l,u]=v.computeOutAndReduceShapes(i.shape,n),p=iG({inputs:{x:i},backend:e,attrs:{shape:[-1,I.sizeFromShape(u)]}});r.push(p);let d=function e(t,r,a,n=null){let s=r.shape[0],o=r.shape[1];null!=n&&(s=n.shape[0],o=n.shape[1]);let i=v.computeOptimalWindowSize(o),l=new ls({windowSize:i,inSize:o,batchSize:s,outSize:Math.ceil(o/i)},a,null==n),u=[r];null!=n&&u.push(n);let p=t.runWebGLProgram(l,u,"int32");if(1===p.shape[1])return p;let d=e(t,r,a,p);return t.disposeIntermediateTensorInfo(p),d}(e,p,a);r.push(d);let c=iG({inputs:{x:d},backend:e,attrs:{shape:l}});return r.forEach(t=>e.disposeIntermediateTensorInfo(t)),c}return function e(t,r,a,n=null){let s=null!=n?n.shape:r.shape,o=s[s.length-1],i=new lo(s,v.computeOptimalWindowSize(o),a,null==n),l=null==n?[r]:[r,n],u=t.runWebGLProgram(i,l,"int32");if(u.shape.length===r.shape.length){let n=e(t,r,a,u);return t.disposeIntermediateTensorInfo(u),n}return u}(e,t,a)}const ll={kernelName:$.ArgMax,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{x:n}=t,{axis:s}=a,o=I.parseAxisParam(s,n.shape),i=v.getAxesPermutation(o,n.shape.length),l=n,u=[];null!=i&&(u.push(l=iY({inputs:{x:n},backend:r,attrs:{perm:i}})),o=v.getInnerMostAxes(o.length,l.shape.length)),v.assertAxesAreInnerMostDims("argMax",[o[0]],l.shape.length);let p=li(r,l,o[0],"max");return u.forEach(e=>r.disposeIntermediateTensorInfo(e)),p}};g("i64bB");var $=g("hl418"),v=g("7MaPk"),I=g("jjNRA");const lu={kernelName:$.ArgMin,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{x:n}=t,{axis:s}=a,o=I.parseAxisParam(s,n.shape),i=v.getAxesPermutation(o,n.shape.length),l=n,u=[];null!=i&&(u.push(l=iY({inputs:{x:n},backend:r,attrs:{perm:i}})),o=v.getInnerMostAxes(o.length,l.shape.length)),v.assertAxesAreInnerMostDims("argMin",[o[0]],l.shape.length);let p=li(r,l,o[0],"min");return u.forEach(e=>r.disposeIntermediateTensorInfo(e)),p}};g("i64bB");var $=g("hl418");const lp=iP({opSnippet:it+`
  if (abs(x) > 1.) {
    return NAN;
  }
  return asin(x);
`}),ld={kernelName:$.Asin,backendName:"webgl",kernelFunc:lp};g("i64bB");var $=g("hl418");const lc=iP({opSnippet:it+"return log(x + sqrt(x * x + 1.0));"}),lh={kernelName:$.Asinh,backendName:"webgl",kernelFunc:lc};g("i64bB");var $=g("hl418");const lf=iP({opSnippet:it+`
  return atan(x);
`}),lm={kernelName:$.Atan,backendName:"webgl",kernelFunc:lf};g("i64bB");var $=g("hl418");const lg=iB({opSnippet:ix+`
  return atan(a, b);
`,packedOpSnippet:`
  vec4 result = atan(a, b);
  bvec4 isNaNA = isnan(a);
  bvec4 isNaNB = isnan(b);
  bvec4 isNaN = bvec4(isNaNA.x || isNaNB.x, isNaNA.y || isNaNB.y, isNaNA.z || isNaNB.z, isNaNA.w || isNaNB.w);
  `+ib+`
  return result;
`}),lx={kernelName:$.Atan2,backendName:"webgl",kernelFunc:lg};g("i64bB");var $=g("hl418");const ly=iP({opSnippet:it+`
  if ((x < -1.0) || (x > 1.0)) return NAN;
return (log(1.0 + x) - log(1.0 - x)) / 2.0;`}),lb={kernelName:$.Atanh,backendName:"webgl",kernelFunc:ly};g("i64bB");var $=g("hl418"),v=g("7MaPk"),I=g("jjNRA");class lv{constructor(e,t,r,a=!1,n=!1){if(this.variableNames=["x"],"avg"===t&&r)throw Error("Cannot compute positions for average pool.");let s=e.filterWidth,o=e.strideHeight,i=e.strideWidth,l=e.dilationHeight,u=e.dilationWidth,p=e.effectiveFilterHeight,d=e.effectiveFilterWidth,c=e.padInfo.top,h=e.padInfo.left;this.outputShape=e.outShape;let f="avg"===t,m=`((batch  * ${e.inHeight} + xR) * ${e.inWidth} + xC) * ${e.inChannels} + d`,g=`(xR * ${e.inWidth} + xC) * ${e.inChannels} + d`,x="0.0";if(f||(x="-1.0 / 1e-20"),r){this.userCode=`
        const ivec2 strides = ivec2(${o}, ${i});
        const ivec2 pads = ivec2(${c}, ${h});

        void main() {
          ivec4 coords = getOutputCoords();
          int batch = coords[0];
          int d = coords[3];

          ivec2 xRCCorner = coords.yz * strides - pads;
          int xRCorner = xRCCorner.x;
          int xCCorner = xRCCorner.y;

          // max/min x(?, ?, d) to get y(yR, yC, d).
          // ? = to be determined
          float minMaxValue = 0.0;
          float minMaxValueFound = 0.0;
          int minMaxPosition = 0;
          float avgValue = 0.0;

          for (int wR = 0; wR < ${p};
              wR += ${l}) {
            int xR = xRCorner + wR;

            if (xR < 0 || xR >= ${e.inHeight}) {
              continue;
            }

            for (int wC = 0; wC < ${d};
                wC += ${u}) {
              int xC = xCCorner + wC;

              if (xC < 0 || xC >= ${e.inWidth}) {
                continue;
              }

              float value = getX(batch, xR, xC, d);

              // If a min / max value has already been found, use it. If not,
              // use the current value.
              float currMinMaxValue = mix(
                  value, minMaxValue, minMaxValueFound);
              if (value >= currMinMaxValue) {
                minMaxValue = value;
                minMaxValueFound = 1.0;
                minMaxPosition = ${a?n?m:g:`wR * ${d} + wC`};
              }
            }
          }
          setOutput(float(minMaxPosition));
        }
      `;return}let y=`${t}(${t}(${t}(minMaxValue[0], minMaxValue[1]), minMaxValue[2]), minMaxValue[3])`;"avg"===t&&(y="avgValue / max(count, 1.0)");let b=4*Math.floor(s/4),v=s%4,N=`
      if (${f}) {
        avgValue += dot(values, ones);
      } else {
        minMaxValue = max(values, minMaxValue);
      }
    `;this.userCode=`
      const ivec2 strides = ivec2(${o}, ${i});
      const ivec2 pads = ivec2(${c}, ${h});
      const float initializationValue = ${x};
      const vec4 ones = vec4(1.0, 1.0, 1.0, 1.0);

      float count = 0.0;

      float getValue(int batch, int xR, int xC, int d) {
        if (xC < 0 || xC >= ${e.inWidth}) {
          return initializationValue;
        }
        count += 1.0;
        return getX(batch, xR, xC, d);
      }

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords[0];
        int d = coords[3];

        ivec2 xRCCorner = coords.yz * strides - pads;
        int xRCorner = xRCCorner.x;
        int xCCorner = xRCCorner.y;

        // max/min x(?, ?, d) to get y(yR, yC, d).
        // ? = to be determined
        vec4 minMaxValue = vec4(${x});
        float avgValue = 0.0;
        count = 0.0;

        for (int wR = 0; wR < ${p};
            wR += ${l}) {
          int xR = xRCorner + wR;

          if (xR < 0 || xR >= ${e.inHeight}) {
            continue;
          }

          for (int wC = 0; wC < ${b}; wC += 4) {
            int xC = xCCorner + wC * ${u};

            vec4 values = vec4(
              getValue(batch, xR, xC, d),
              getValue(batch, xR, xC + ${u}, d),
              getValue(batch, xR, xC + 2 * ${u}, d),
              getValue(batch, xR, xC + 3 * ${u}, d)
            );

            ${N}
          }

          int xC = xCCorner + ${b};
          if (${1===v}) {
            vec4 values = vec4(
              getValue(batch, xR, xC, d),
              initializationValue,
              initializationValue,
              initializationValue
            );

            ${N}
          } else if (${2===v}) {
            vec4 values = vec4(
              getValue(batch, xR, xC, d),
              getValue(batch, xR, xC + ${u}, d),
              initializationValue,
              initializationValue
            );

            ${N}
          } else if (${3===v}) {
            vec4 values = vec4(
              getValue(batch, xR, xC, d),
              getValue(batch, xR, xC + ${u}, d),
              getValue(batch, xR, xC + 2 * ${u}, d),
              initializationValue
            );

            ${N}
          }
        }
        setOutput(${y});
      }
    `}}class lN{constructor(e,t,r,a=!1,n=!1){if(this.variableNames=["x"],"avg"===t&&r)throw Error("Cannot compute positions for average pool.");let s=e.filterWidth,o=e.strideDepth,i=e.strideHeight,l=e.strideWidth,u=e.dilationDepth,p=e.dilationHeight,d=e.dilationWidth,c=e.effectiveFilterDepth,h=e.effectiveFilterHeight,f=e.effectiveFilterWidth,m=e.padInfo.front,g=e.padInfo.top,x=e.padInfo.left;this.outputShape=e.outShape;let y="avg"===t,b="0.0";if(y||(b="-1.0 / 1e-20"),r){this.userCode=`
        const ivec3 strides =
            ivec3(${o}, ${i}, ${l});
        const ivec3 pads = ivec3(${m}, ${g}, ${x});

        void main() {
          ivec5 coords = getOutputCoords();
          int batch = coords.x;
          int ch = coords.u;

          ivec3 xCorner = ivec3(coords.y, coords.z, coords.w) * strides - pads;
          int xDCorner = xCorner.x;
          int xRCorner = xCorner.y;
          int xCCorner = xCorner.z;

          // max/min x(?, ?, ?, ch) to get y(yD, yR, yC, ch).
          // ? = to be determined
          float minMaxValue = 0.0;
          float minMaxValueFound = 0.0;
          int minMaxPosition = 0;

          for (int wD = 0; wD < ${c};
              wD += ${u}) {
            int xD = xDCorner + wD;

            if (xD < 0 || xD >= ${e.inDepth}) {
              continue;
            }

            for (int wR = 0; wR < ${h};
                wR += ${p}) {
              int xR = xRCorner + wR;

              if (xR < 0 || xR >= ${e.inHeight}) {
                continue;
              }

              for (int wC = 0; wC < ${f};
                  wC += ${d}) {
                int xC = xCCorner + wC;

                if (xC < 0 || xC >= ${e.inWidth}) {
                  continue;
                }

                float value = getX(batch, xD, xR, xC, ch);

                // If a min / max value has already been found, use it. If not,
                // use the current value.
                float currMinMaxValue = mix(
                    value, minMaxValue, minMaxValueFound);
                if (value >= currMinMaxValue) {
                  minMaxValue = value;
                  minMaxValueFound = 1.0;
                  minMaxPosition = ${a?n?`(((batch * ${e.inDepth} + xD) * ${e.inHeight} + xR) * ${e.inWidth} + xC) * ${e.inChannels} + ch`:`((xD * ${e.inHeight} + xR) * ${e.inWidth} + xC) * ${e.inChannels} + ch`:`wD * ${h} * ${f} +
                      wR * ${f} + wC`};
                }
              }
            }
          }
          setOutput(float(minMaxPosition));
        }
      `;return}let v=`${t}(${t}(${t}(minMaxValue[0], minMaxValue[1]), minMaxValue[2]), minMaxValue[3])`;"avg"===t&&(v="avgValue / max(count, 1.0)");let N=4*Math.floor(s/4),k=s%4,T=`
      if (${y}) {
        avgValue += dot(values, ones);
      } else {
        minMaxValue = max(values, minMaxValue);
      }
    `;this.userCode=`
      const ivec3 strides =
        ivec3(${o}, ${i}, ${l});
      const ivec3 pads = ivec3(${m}, ${g}, ${x});
      const float initializationValue = ${b};
      const vec4 ones = vec4(1.0, 1.0, 1.0, 1.0);

      float count = 0.0;

      float getValue(int batch, int xD, int xR, int xC, int ch) {
        if (xC < 0 || xC >= ${e.inWidth}) {
          return initializationValue;
        }
        count += 1.0;
        return getX(batch, xD, xR, xC, ch);
      }

      void main() {
        ivec5 coords = getOutputCoords();
        int batch = coords.x;
        int ch = coords.u;

        ivec3 xCorner = ivec3(coords.y, coords.z, coords.w) * strides - pads;
        int xDCorner = xCorner.x;
        int xRCorner = xCorner.y;
        int xCCorner = xCorner.z;

        // max/min x(?, ?, ?, d) to get y(yD, yR, yC, ch).
        // ? = to be determined
        vec4 minMaxValue = vec4(${b});
        float avgValue = 0.0;
        count = 0.0;

        for (int wD = 0; wD < ${c};
            wD += ${u}) {
          int xD = xDCorner + wD;

          if (xD < 0 || xD >= ${e.inDepth}) {
            continue;
          }

          for (int wR = 0; wR < ${h};
            wR += ${p}) {
            int xR = xRCorner + wR;

            if (xR < 0 || xR >= ${e.inHeight}) {
              continue;
            }

            for (int wC = 0; wC < ${N}; wC += 4) {
              int xC = xCCorner + wC * ${d};

              vec4 values = vec4(
                getValue(batch, xD, xR, xC, ch),
                getValue(batch, xD, xR, xC + ${d}, ch),
                getValue(batch, xD, xR, xC + 2 * ${d}, ch),
                getValue(batch, xD, xR, xC + 3 * ${d}, ch)
              );

              ${T}
            }

            int xC = xCCorner + ${N};
            if (${1===k}) {
              vec4 values = vec4(
                getValue(batch, xD, xR, xC, ch),
                initializationValue,
                initializationValue,
                initializationValue
              );

              ${T}
            } else if (${2===k}) {
              vec4 values = vec4(
                getValue(batch, xD, xR, xC, ch),
                getValue(batch, xD, xR, xC + ${d}, ch),
                initializationValue,
                initializationValue
              );

              ${T}
            } else if (${3===k}) {
              vec4 values = vec4(
                getValue(batch, xD, xR, xC, ch),
                getValue(batch, xD, xR, xC + ${d}, ch),
                getValue(batch, xD, xR, xC + 2 * ${d}, ch),
                initializationValue
              );

              ${T}
            }
          }
        }
        setOutput(${v});
      }
    `}}const lk={kernelName:$.AvgPool,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{x:n}=t;sR(n,"avgPool");let{filterSize:s,strides:o,pad:i,dimRoundingMode:l}=a;I.assert(v.eitherStridesOrDilationsAreOne(o,1),()=>`Error in avgPool: Either strides or dilations must be 1. Got strides ${o} and dilations '1'`);let u=v.computePool2DInfo(n.shape,s,o,1,i,l);if(1===u.filterWidth&&1===u.filterHeight&&I.arraysEqual(u.inShape,u.outShape))return iN({inputs:{x:n},backend:r});let p=new lv(u,"avg",!1);return r.runWebGLProgram(p,[n],"float32")}};g("i64bB");var $=g("hl418"),v=g("7MaPk");const lT={kernelName:$.AvgPool3D,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{x:n}=t,{filterSize:s,strides:o,pad:i,dimRoundingMode:l,dataFormat:u}=a,p=new lN(v.computePool3DInfo(n.shape,s,o,[1,1,1],i,l,u),"avg",!1);return r.runWebGLProgram(p,[n],"float32")}};g("i64bB");var $=g("hl418"),v=g("7MaPk");class lS{constructor(e){this.variableNames=["dy"],this.outputShape=e.inShape;let t=e.filterHeight,r=e.filterWidth,a=e.strideHeight,n=e.strideWidth,s=e.dilationHeight,o=e.dilationWidth,i=e.effectiveFilterHeight,l=e.effectiveFilterWidth,u=i-1-e.padInfo.top,p=l-1-e.padInfo.left;this.userCode=`
      const ivec2 pads = ivec2(${u}, ${p});
      const float avgMultiplier = float(${1/(t*r)});

      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];

        ivec2 dyRCCorner = coords.yz - pads;
        int dyRCorner = dyRCCorner.x;
        int dyCCorner = dyRCCorner.y;

        // Convolve dy(?, ?, d) with pos mask(:, :, d) to get dx(xR, xC, d).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;
        for (int wR = 0; wR < ${i};
            wR += ${s}) {
          float dyR = float(dyRCorner + wR) / ${a}.0;

          if (dyR < 0.0 || dyR >= ${e.outHeight}.0 || fract(dyR) > 0.0) {
            continue;
          }
          int idyR = int(dyR);

          for (int wC = 0; wC < ${l};
            wC+= ${o}) {
            float dyC = float(dyCCorner + wC) / ${n}.0;

            if (dyC < 0.0 || dyC >= ${e.outWidth}.0 ||
                fract(dyC) > 0.0) {
              continue;
            }
            int idyC = int(dyC);

            float dyValue = getDy(b, idyR, idyC, d);

            dotProd += dyValue * avgMultiplier;
          }
        }
        setOutput(dotProd);
      }
    `}}class lI{constructor(e){this.variableNames=["dy"],this.outputShape=e.inShape;let t=e.filterDepth,r=e.filterHeight,a=e.filterWidth,n=e.strideDepth,s=e.strideHeight,o=e.strideWidth,i=e.dilationDepth,l=e.dilationHeight,u=e.dilationWidth,p=e.effectiveFilterDepth,d=e.effectiveFilterHeight,c=e.effectiveFilterWidth,h=p-1-e.padInfo.front,f=d-1-e.padInfo.top,m=c-1-e.padInfo.left;this.userCode=`
      const ivec3 pads = ivec3(${h}, ${f}, ${m});
      const float avgMultiplier = float(${1/(t*r*a)});

      void main() {
        ivec5 coords = getOutputCoords();
        int batch = coords.x;
        int ch = coords.u;

        ivec3 dyCorner = ivec3(coords.y, coords.z, coords.w) - pads;
        int dyDCorner = dyCorner.x;
        int dyRCorner = dyCorner.y;
        int dyCCorner = dyCorner.z;

        // Convolve dy(?, ?, ?, d) with pos mask(:, :, :, ch) to get
        // dx(xD, xR, xC, ch).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;

        for (int wD = 0; wD < ${p};
            wD += ${i}) {
          float dyD = float(dyDCorner + wD) / ${n}.0;

          if (dyD < 0.0 || dyD >= ${e.outDepth}.0 || fract(dyD) > 0.0) {
            continue;
          }
          int idyD = int(dyD);

          for (int wR = 0; wR < ${d};
              wR += ${l}) {
            float dyR = float(dyRCorner + wR) / ${s}.0;

            if (dyR < 0.0 || dyR >= ${e.outHeight}.0 ||
                fract(dyR) > 0.0) {
              continue;
            }
            int idyR = int(dyR);

            for (int wC = 0; wC < ${c};
                wC += ${u}) {
              float dyC = float(dyCCorner + wC) / ${o}.0;

              if (dyC < 0.0 || dyC >= ${e.outWidth}.0 ||
                  fract(dyC) > 0.0) {
                continue;
              }
              int idyC = int(dyC);

              float dyValue = getDy(batch, idyD, idyR, idyC, ch);

              dotProd += dyValue * avgMultiplier;
            }
          }
        }
        setOutput(dotProd);
      }
    `}}const lw={kernelName:$.AvgPool3DGrad,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{dy:n,input:s}=t,{filterSize:o,strides:i,pad:l,dimRoundingMode:u}=a,p=new lI(v.computePool3DInfo(s.shape,o,i,[1,1,1],l,u));return r.runWebGLProgram(p,[n],s.dtype)}};g("i64bB");var $=g("hl418"),v=g("7MaPk");const lC={kernelName:$.AvgPoolGrad,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{dy:n,input:s}=t;sR([n,s],"avgPoolGrad");let{filterSize:o,strides:i,pad:l}=a,u=new lS(v.computePool2DInfo(s.shape,o,i,1,l));return r.runWebGLProgram(u,[n],s.dtype)}};g("i64bB");var $=g("hl418");const lE={kernelName:$.BatchMatMul,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{a:n,b:s}=t,{transposeA:o,transposeB:i}=a;return iJ({a:n,b:s,transposeA:o,transposeB:i,backend:r})}};g("i64bB");var T=g("ibsdL"),$=g("hl418"),I=g("jjNRA");g("i64bB");var v=g("7MaPk");class lA{constructor(e,t,r,a,n,s){this.outputShape=[],this.variableNames=["x","mean","variance"],v.assertAndGetBroadcastShape(e,t),v.assertAndGetBroadcastShape(e,r);let o="0.0";null!=a&&(v.assertAndGetBroadcastShape(e,a),this.variableNames.push("offset"),o="getOffsetAtOutCoords()");let i="1.0";null!=n&&(v.assertAndGetBroadcastShape(e,n),this.variableNames.push("scale"),i="getScaleAtOutCoords()"),this.outputShape=e,this.userCode=`
      void main() {
        float x = getXAtOutCoords();
        float mean = getMeanAtOutCoords();
        float variance = getVarianceAtOutCoords();
        float offset = ${o};
        float scale = ${i};
        float inv = scale * inversesqrt(variance + float(${s}));
        setOutput(dot(vec3(x, -mean, offset), vec3(inv, inv, 1)));
      }
    `}}g("i64bB");var v=g("7MaPk");class l${constructor(e,t,r,a,n,s){this.packedInputs=!0,this.packedOutput=!0,this.variableNames=["x","mean","variance"],v.assertAndGetBroadcastShape(e,t),v.assertAndGetBroadcastShape(e,r);let o="vec4(0.0)";null!=a&&(v.assertAndGetBroadcastShape(e,a),this.variableNames.push("offset"),o="getOffsetAtOutCoords()");let i="vec4(1.0)";null!=n&&(v.assertAndGetBroadcastShape(e,n),this.variableNames.push("scale"),i="getScaleAtOutCoords()"),this.outputShape=e,this.userCode=`
      void main() {
        vec4 offset = ${o};
        vec4 scale = ${i};

        vec4 x = getXAtOutCoords();
        vec4 mean = getMeanAtOutCoords();
        vec4 variance = getVarianceAtOutCoords();

        vec4 inv = scale * inversesqrt(variance + vec4(${s}));

        setOutput((x - mean) * inv + offset);
      }
    `}}const lR={kernelName:$.FusedBatchNorm,backendName:"webgl",kernelFunc:({inputs:e,backend:t,attrs:r})=>{let{x:a,mean:n,variance:s,offset:o,scale:i}=e;I.assert(n.shape.length===s.shape.length,()=>"Batch normalization gradient requires mean and variance to have equal ranks."),I.assert(null==o||n.shape.length===o.shape.length,()=>"Batch normalization gradient requires mean and offset to have equal ranks."),I.assert(null==i||n.shape.length===i.shape.length,()=>"Batch normalization gradient requires mean and scale to have equal ranks.");let{varianceEpsilon:l}=r;null==l&&(l=.001);let u=[a,n,s],p=null;null!=o&&(p=o.shape,u.push(o));let d=null;null!=i&&(d=i.shape,u.push(i));let c=(0,T.env)().getBool("WEBGL_PACK_NORMALIZATION")?new l$(a.shape,n.shape,s.shape,p,d,l):new lA(a.shape,n.shape,s.shape,p,d,l);return t.runWebGLProgram(c,u,u[0].dtype)}};g("i64bB");var v=g("7MaPk"),$=g("hl418"),I=g("jjNRA");g("i64bB");var T=g("ibsdL"),$=g("hl418"),eY=g("bszZn"),I=g("jjNRA");class lP{constructor(e){let t;this.variableNames=["source"],this.outputShape=e,this.rank=e.length;let r=sX(this.rank);this.customUniforms=[{name:"start",arrayIndex:this.rank,type:"int"}];let a=function(e){if(1===e)return"sourceLoc";if(e<=6)return lB.slice(0,e).map(e=>"sourceLoc."+e).join(",");throw Error(`Slicing for rank ${e} is not yet supported`)}(this.rank),n=e.map((e,t)=>`sourceLoc.${lB[t]} = start[${t}] + coords.${lB[t]};`);t=`
        ${r} sourceLoc;
        ${r} coords = getOutputCoords();
        ${n.join("\n")}
      `,this.userCode=`
      void main() {
        ${t}
        setOutput(getSource(${a}));
      }
    `}}const lB=["x","y","z","w","u","v"];class lF{constructor(e){this.variableNames=["source"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=e,this.rank=e.length,this.customUniforms=[{name:"start",arrayIndex:this.rank,type:"int"}];let t=sX(this.rank),r=o4("coords",this.rank),a=o4("sourceLoc",this.rank),n=1===this.rank?"sourceLoc":`vec2(${a.slice(-2).join()})`,s=`getChannel(getSource(${a.join()}), ${n})`,o=`
      result.x = ${s};
      if (++${r[this.rank-1]} < ${e[this.rank-1]}) {
        ++${a[this.rank-1]};
        result.y = ${s};
        --${a[this.rank-1]};
      }
    `,i=1===this.rank?"":`
      --${r[this.rank-1]};
      if (++${r[this.rank-2]} < ${e[this.rank-2]}) {
        ++${a[this.rank-2]};
        result.z = ${s};
        if (++${r[this.rank-1]} < ${e[this.rank-1]}) {
          ++${a[this.rank-1]};
          result.w = ${s};
        }
      }
    `,l=this.rank<=4?`sourceLoc = coords +
            ${t}(${e.map((e,t)=>`start[${t}]`).join()});`:e.map((e,t)=>`${a[t]} = ${r[t]} + start[${t}];`).join("\n");this.userCode=`
      void main() {
        ${t} coords = getOutputCoords();
        ${t} sourceLoc;
        ${l}
        vec4 result = vec4(0.);
        ${o}
        ${i}
        setOutput(result);
      }
    `}}function lO(e){let{inputs:t,backend:r,attrs:a}=e,{x:n}=t,{begin:s,size:o}=a,[i,l]=eY.parseSliceParams(n,s,o);if(eY.assertParamsValid(n,i,l),0===I.sizeFromShape(l))return r.makeTensorInfo(l,n.dtype,[]);if(r.shouldExecuteOnCPU([n])||"string"===n.dtype){let e=oG(r.texData.get(n.dataId).values,i,l,n.shape,n.dtype);return r.makeTensorInfo(l,n.dtype,e)}let{isPacked:u}=r.texData.get(n.dataId),p=eY.isSliceContinous(n.shape,i,l);if(u||!p){let e=(0,T.env)().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new lF(l):new lP(l),t=[i];return r.runWebGLProgram(e,[n],n.dtype,t)}return r.uploadToGPU(n.dataId),function(e,t,r,a){let n=a.texData.get(e.dataId),s=a.makeTensorInfo(r,e.dtype),o=a.texData.get(s.dataId);Object.assign(o,n),o.refCount=1,o.shape=r,o.dtype=e.dtype;let i=eY.computeFlatOffset(t,I.computeStrides(e.shape));n.slice&&(i+=n.slice.flatOffset),o.slice={flatOffset:i,origDataId:n.slice&&n.slice.origDataId||e.dataId};let l=a.dataRefCount.get(o.slice.origDataId)||1;return a.dataRefCount.set(o.slice.origDataId,l+1),s}(n,i,l,r)}const lM={kernelName:$.Slice,backendName:"webgl",kernelFunc:lO},lD={kernelName:$.BatchToSpaceND,backendName:"webgl",kernelFunc:e=>{let{inputs:t,backend:r,attrs:a}=e,{x:n}=t,{blockShape:s,crops:o}=a;I.assert(n.shape.length<=4,()=>"batchToSpaceND for rank > 4 with a WebGL backend not implemented yet");let i=s.reduce((e,t)=>e*t),l=v.getReshaped(n.shape,s,i),u=v.getPermuted(l.length,s.length),p=v.getReshapedPermuted(n.shape,s,i),d=v.getSliceBeginCoords(o,s.length),c=v.getSliceSize(p,o,s.length),h=[],f=iG({inputs:{x:n},backend:r,attrs:{shape:l}}),m=iY({inputs:{x:f},backend:r,attrs:{perm:u}}),g=iG({inputs:{x:m},backend:r,attrs:{shape:p}}),x=lO({inputs:{x:g},backend:r,attrs:{begin:d,size:c}});return h.push(f),h.push(m),h.push(g),h.forEach(e=>r.disposeIntermediateTensorInfo(e)),x}};g("i64bB");var $=g("hl418");const l_={kernelName:$.Bincount,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{x:n,weights:s}=t,{size:o}=a,i=ol(r.readSync(n.dataId),r.readSync(s.dataId),s.dtype,s.shape,o);return r.makeTensorInfo([o],s.dtype,i)}};g("i64bB");var $=g("hl418"),T=g("ibsdL");const lL=`
  int r = int(a.r) & int(b.r);
  int g = int(a.g) & int(b.g);
  int rb = int(a.b) & int(b.b);
  int ra = int(a.a) & int(b.a);
  return vec4(r, g, rb, ra);
`,lV=`
  return float(int(a.r) & int(b.r));
`,lG={kernelName:$.BitwiseAnd,backendName:"webgl",kernelFunc:function(e){let t,{inputs:r,backend:a}=e,{a:n,b:s}=r,o=(0,T.env)().getBool("WEBGL_PACK_BINARY_OPERATIONS"),i=(0,T.env)().getNumber("WEBGL_VERSION");if(a.shouldExecuteOnCPU([n,s])||1===i){let e=a.texData.get(n.dataId).values,t=a.texData.get(s.dataId).values,[r,o]=op(n.shape,s.shape,e,t,n.dtype),i=a.makeTensorInfo(o,n.dtype);return a.texData.get(i.dataId).values=r,i}return t=o?new iv(lL,n.shape,s.shape,!1):new iy(lV,n.shape,s.shape),a.runWebGLProgram(t,[n,s],n.dtype)}};g("i64bB");var v=g("7MaPk"),$=g("hl418");const lW={kernelName:$.BroadcastArgs,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r}=e,{s0:a,s1:n}=t,s=r.readSync(a.dataId),o=r.readSync(n.dataId),i=v.assertAndGetBroadcastShape(Array.from(s),Array.from(o));return r.makeTensorInfo([i.length],"int32",Int32Array.from(i))}};g("i64bB");var $=g("hl418"),I=g("jjNRA"),lz=g("hxi4c");g("i64bB");var $=g("hl418");const lj=iB({opSnippet:"return float(a != b);",cpuKernelImpl:oR,dtype:"bool"}),lU={kernelName:$.NotEqual,backendName:"webgl",kernelFunc:lj};g("i64bB");var $=g("hl418");function lq(e){let{inputs:t,backend:r}=e,{input:a}=t;return iN({inputs:{x:r.texData.get(a.dataId).complexTensorInfos.real},backend:r})}const lH={kernelName:$.Real,backendName:"webgl",kernelFunc:lq},lK={kernelName:$.Cast,backendName:"webgl",kernelFunc:function e(t){let{inputs:r,backend:a,attrs:n}=t,{x:s}=r,{dtype:o}=n;if("complex64"===o){if("complex64"===s.dtype)return iN({inputs:{x:s},backend:a});let t=lz.zeros(s.shape),r=e({inputs:{x:s},backend:a,attrs:{dtype:"float32"}}),n=iT({inputs:{real:r,imag:t},backend:a});return t.dispose(),a.disposeIntermediateTensorInfo(r),n}if("complex64"===s.dtype){let t=lq({inputs:{input:s},backend:a}),r=e({inputs:{x:t},backend:a,attrs:{dtype:o}});return a.disposeIntermediateTensorInfo(t),r}if(!I.hasEncodingLoss(s.dtype,o)){let e=iN({inputs:{x:s},backend:a});return{dataId:e.dataId,shape:e.shape,dtype:o}}if(a.shouldExecuteOnCPU([s])){let[e,t,r]=od(a.texData.get(s.dataId).values,s.shape,s.dtype,o);return a.makeTensorInfo(e,t,r)}if("int32"===o){let e=new ie(s.shape,"return float(int(x));"),t=a.runWebGLProgram(e,[s],"int32");return{dataId:t.dataId,shape:t.shape,dtype:t.dtype}}if("bool"===o){let e=a.makeTensorInfo([],"bool",I.getTypedArrayFromDType("bool",1)),t=lj({inputs:{a:s,b:e},backend:a});return a.disposeIntermediateTensorInfo(e),t}throw Error(`Error in Cast: failed to cast ${s.dtype} to ${o}`)}};g("i64bB");var $=g("hl418");const lX="return ceil(x);",lZ=iP({opSnippet:lX,packedOpSnippet:lX,cpuKernelImpl:oc}),lY={kernelName:$.Ceil,backendName:"webgl",kernelFunc:lZ};g("i64bB");var $=g("hl418"),T=g("ibsdL");class lQ{constructor(e){this.variableNames=["A"],this.customUniforms=[{name:"minVal",type:"float"},{name:"maxVal",type:"float"}],this.outputShape=e,this.userCode=`

      void main() {
        float value = getAAtOutCoords();
        if (isnan(value)) {
          setOutput(value);
          return;
        }

        setOutput(clamp(value, minVal, maxVal));
      }
    `}}class lJ{constructor(e){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:"minVal",type:"float"},{name:"maxVal",type:"float"}],this.outputShape=e,this.userCode=`
      void main() {
        vec4 value = getAAtOutCoords();

        if (any(isnan(value))) {
          setOutput(value);
          return;
        }

        setOutput(clamp(value, vec4(minVal), vec4(maxVal)));
      }
    `}}const l0={kernelName:$.ClipByValue,backendName:"webgl",kernelFunc:function(e){let t,{inputs:r,backend:a,attrs:n}=e,{x:s}=r,{clipValueMin:o,clipValueMax:i}=n;return t=(0,T.env)().getBool("WEBGL_PACK_CLIP")?new lJ(s.shape):new lQ(s.shape),a.runWebGLProgram(t,[s],s.dtype,[[o],[i]])}};g("i64bB");var $=g("hl418");class l1{constructor(e){this.variableNames=["real","imag"],this.outputShape=e,this.userCode=`
      void main() {
        float re = abs(getRealAtOutCoords());
        float im = abs(getImagAtOutCoords());
        float mx = max(re, im);

        // sadly the length function in glsl is not underflow-safe
        // (at least not on Intel GPUs). So the safe solution is
        // to ensure underflow-safety in all cases.
        setOutput(
          mx == 0.0 ? 0.0 : mx * length(vec2(1, min(re, im)/mx))
        );
      }
    `}}function l2(e,t){return{dataId:t.dataId,dtype:t.dtype,shape:e.shape}}const l4={kernelName:$.ComplexAbs,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r}=e,{x:a}=t,n=r.texData.get(a.dataId),s=new l1(a.shape),o=[l2(a,n.complexTensorInfos.real),l2(a,n.complexTensorInfos.imag)];return r.runWebGLProgram(s,o,o[0].dtype)}};g("i64bB");var v=g("7MaPk"),$=g("hl418"),I=g("jjNRA");g("i64bB");var v=g("7MaPk"),T=g("ibsdL"),I=g("jjNRA");g("i64bB");var v=g("7MaPk");class l3{constructor(e){this.outputShape=[],this.outputShape=v.computeOutShape(e,1),this.variableNames=e.map((e,t)=>`T${t}`);let t=Array(e.length-1);t[0]=e[0][1];for(let r=1;r<t.length;r++)t[r]=t[r-1]+e[r][1];let r=[`if (yC < ${t[0]}) setOutput(getT0(yR, yC));`];for(let e=1;e<t.length;e++){let a=t[e-1];r.push(`else if (yC < ${t[e]}) setOutput(getT${e}(yR, yC-${a}));`)}let a=t.length,n=t[t.length-1];r.push(`else setOutput(getT${a}(yR, yC-${n}));`),this.userCode=`
      void main() {
        ivec2 coords = getOutputCoords();
        int yR = coords.x;
        int yC = coords.y;

        ${r.join("\n        ")}
      }
    `}}g("i64bB");var v=g("7MaPk");class l8{constructor(e,t){this.packedInputs=!0,this.packedOutput=!0,this.outputShape=[],this.outputShape=v.computeOutShape(e,t);let r=this.outputShape,a=r.length,n=sX(a),s=o4("coords",a),o=["x","y","z","w","u","v"].slice(0,a);this.variableNames=e.map((e,t)=>`T${t}`);let i=Array(e.length-1);i[0]=e[0][t];for(let r=1;r<i.length;r++)i[r]=i[r-1]+e[r][t];let l=o[t],u=o.slice(-2),p=o.join(),d=`if (${l} < ${i[0]}) {
        return getChannel(
            getT0(${p}), vec2(${u.join()}));
        }`;for(let e=1;e<i.length;e++){let t=i[e-1];d+=`
        if (${l} < ${i[e]}  && ${l} >= ${i[e-1]}) {
          return getChannel(
            getT${e}(${l6(o,l,t)}),
            vec2(${l6(u,l,t)}));
        }`}let c=i.length,h=i[i.length-1];d+=`
        return getChannel(
          getT${c}(${l6(o,l,h)}),
          vec2(${l6(u,l,h)}));`,this.userCode=`
      float getValue(${o.map(e=>"int "+e)}) {
        ${d}
      }

      void main() {
        ${n} coords = getOutputCoords();
        vec4 result = vec4(getValue(${s}), 0., 0., 0.);

        ${s[a-1]} = ${s[a-1]} + 1;
        if (${s[a-1]} < ${r[a-1]}) {
          result.g = getValue(${s});
        }

        ${s[a-2]} = ${s[a-2]} + 1;
        if (${s[a-2]} < ${r[a-2]}) {
          result.a = getValue(${s});
        }

        ${s[a-1]} = ${s[a-1]} - 1;
        if (${s[a-2]} < ${r[a-2]} &&
            ${s[a-1]} < ${r[a-1]}) {
          result.b = getValue(${s});
        }
        setOutput(result);
      }
    `}}function l6(e,t,r){let a=e.indexOf(t);return e.map((e,t)=>t===a?`${e} - ${r}`:e).join()}g("i64bB");var $=g("hl418");function l5(e){let{inputs:t,backend:r}=e,{input:a}=t;return iN({inputs:{x:r.texData.get(a.dataId).complexTensorInfos.imag},backend:r})}const l7={kernelName:$.Imag,backendName:"webgl",kernelFunc:l5};function l9(e){let{inputs:t,backend:r,attrs:a}=e,{axis:n}=a,s=I.parseAxisParam(n,t[0].shape)[0],o=t.map(e=>e.shape);v.assertParamsConsistent(o,s);let i=v.computeOutShape(t.map(e=>e.shape),s);if(0===I.sizeFromShape(i))return r.makeTensorInfo(i,t[0].dtype,[]);let l=t.filter(e=>I.sizeFromShape(e.shape)>0);return 1===l.length?iN({inputs:{x:l[0]},backend:r}):function e(t,r,a){let n=t[0].dtype;if("complex64"===n){let n=t.map(e=>lq({inputs:{input:e},backend:a})),s=t.map(e=>l5({inputs:{input:e},backend:a})),o=e(n,r,a),i=e(s,r,a),l=iT({inputs:{real:o,imag:i},backend:a});return n.forEach(e=>a.disposeIntermediateTensorInfo(e)),s.forEach(e=>a.disposeIntermediateTensorInfo(e)),a.disposeIntermediateTensorInfo(o),a.disposeIntermediateTensorInfo(i),l}let s=a.shouldExecuteOnCPU(t);if("string"===n&&(s=!0),s){let e=t.map(e=>{let t=I.sizeFromShape(e.shape.slice(r));return iG({inputs:{x:e},backend:a,attrs:{shape:[-1,t]}})}),s=e.map(e=>({vals:a.readSync(e.dataId),shape:e.shape})),o=oh(s,v.computeOutShape(e.map(e=>e.shape),1),n,1===e[0].shape[0]),i=v.computeOutShape(t.map(e=>e.shape),r),l=a.makeTensorInfo(i,n,o);return e.forEach(e=>a.disposeIntermediateTensorInfo(e)),l}let o=t.filter(e=>I.sizeFromShape(e.shape)>0),i=(0,T.env)().getBool("WEBGL_PACK_ARRAY_OPERATIONS")&&o[0].shape.length>1;if(1===o.length){let e=i?new ie(t[0].shape,io):new ip(t[0].shape,io);return a.runWebGLProgram(e,t,n)}let l=(0,T.env)().getNumber("WEBGL_MAX_TEXTURES_IN_SHADER");if(o.length>l){let t=[];for(let n=0;n<o.length;n+=l){let s=o.slice(n,n+l);t.push(e(s,r,a))}let n=e(t,r,a);for(let e of t)a.disposeIntermediateTensorInfo(e);return n}if(i){let e=new l8(o.map(e=>e.shape),r);return a.runWebGLProgram(e,o,n)}let{tensors2D:u,outShape:p}=function(e,t,r){let a=v.computeOutShape(e.map(e=>e.shape),t);return{tensors2D:e.map(e=>iG({inputs:{x:e},attrs:{shape:[-1,I.sizeFromShape(e.shape.slice(t))]},backend:r})),outShape:a}}(o,r,a),d=new l3(u.map(e=>e.shape)),c=a.runWebGLProgram(d,u,n);u.forEach(e=>a.disposeIntermediateTensorInfo(e));let h=iG({inputs:{x:c},attrs:{shape:p},backend:a});return a.disposeIntermediateTensorInfo(c),h}(l,s,r)}const ue={kernelName:$.Concat,backendName:"webgl",kernelFunc:l9};g("i64bB");var v=g("7MaPk"),$=g("hl418"),T=g("ibsdL");class ut{constructor(e,t=!1,r=null,a=!1,n=!1){this.variableNames=["x","W"],this.outputShape=e.outShape;let s=e.padInfo.top,o=e.padInfo.left,i=e.strideHeight,l=e.strideWidth,u=e.dilationHeight,p=e.dilationWidth,d=e.filterHeight,c=e.filterWidth,h=4*Math.floor(e.inChannels/4),f=e.inChannels%4,m="channelsLast"===e.dataFormat,g="",x="";r&&(g=a?`float activation(float a) {
          float b = getPreluActivationWeightsAtOutCoords();
          ${r}
        }`:n?`float activation(float a) {
          float b = getLeakyreluAlphaAtOutCoords();
          ${r}
        }`:`
          float activation(float x) {
            ${r}
          }
        `,x="result = activation(result);"),t&&this.variableNames.push("bias"),a&&this.variableNames.push("preluActivationWeights"),n&&this.variableNames.push("leakyreluAlpha"),this.userCode=`
      ${g}

      const ivec2 strides = ivec2(${i}, ${l});
      const ivec2 pads = ivec2(${s}, ${o});

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords[0];
        int d2 = coords[${m?3:1}];

        ivec2 xRCCorner =
            ivec2(coords[${m?1:2}], coords[${m?2:3}]) * strides - pads;
        int xRCorner = xRCCorner.x;
        int xCCorner = xRCCorner.y;

        // Convolve x(?, ?, d1) with w(:, :, d1, d2) to get y(yR, yC, d2).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;
        for (int wR = 0; wR < ${d}; wR++) {
          int xR = xRCorner + wR * ${u};

          if (xR < 0 || xR >= ${e.inHeight}) {
            continue;
          }

          for (int wC = 0; wC < ${c}; wC++) {
            int xC = xCCorner + wC * ${p};

            if (xC < 0 || xC >= ${e.inWidth}) {
              continue;
            }

            for (int d1 = 0; d1 < ${h}; d1 += 4) {
              vec4 wValues = vec4(
                getW(wR, wC, d1, d2),
                getW(wR, wC, d1 + 1, d2),
                getW(wR, wC, d1 + 2, d2),
                getW(wR, wC, d1 + 3, d2)
              );

              if (${m}) {
                vec4 xValues = vec4(
                  getX(batch, xR, xC, d1),
                  getX(batch, xR, xC, d1 + 1),
                  getX(batch, xR, xC, d1 + 2),
                  getX(batch, xR, xC, d1 + 3)
                );
                dotProd += dot(xValues, wValues);
              } else {
                vec4 xValues = vec4(
                  getX(batch, d1, xR, xC),
                  getX(batch, d1 + 1, xR, xC),
                  getX(batch, d1 + 2, xR, xC),
                  getX(batch, d1 + 3, xR, xC)
                );
                dotProd += dot(xValues, wValues);
              }
            }

            if (${1===f}) {

              if (${m}) {
                dotProd +=
                    getX(batch, xR, xC, ${h}) *
                    getW(wR, wC, ${h}, d2);
              } else {
                dotProd +=
                    getX(batch, ${h}, xR, xC) *
                    getW(wR, wC, ${h}, d2);
              }

            } else if (${2===f}) {
              vec2 wValues = vec2(
                getW(wR, wC, ${h}, d2),
                getW(wR, wC, ${h} + 1, d2)
              );

              if (${m}) {
                vec2 xValues = vec2(
                  getX(batch, xR, xC, ${h}),
                  getX(batch, xR, xC, ${h} + 1)
                );
                dotProd += dot(xValues, wValues);
              } else {
                vec2 xValues = vec2(
                  getX(batch, ${h}, xR, xC),
                  getX(batch, ${h} + 1, xR, xC)
                );
                dotProd += dot(xValues, wValues);
              }

            } else if (${3===f}) {
              vec3 wValues = vec3(
                getW(wR, wC, ${h}, d2),
                getW(wR, wC, ${h} + 1, d2),
                getW(wR, wC, ${h} + 2, d2)
              );

              if (${m}) {
                vec3 xValues = vec3(
                  getX(batch, xR, xC, ${h}),
                  getX(batch, xR, xC, ${h} + 1),
                  getX(batch, xR, xC, ${h} + 2)
                );
                dotProd += dot(xValues, wValues);
              } else {
                vec3 xValues = vec3(
                  getX(batch, ${h}, xR, xC),
                  getX(batch, ${h} + 1, xR, xC),
                  getX(batch, ${h} + 2, xR, xC)
                );
                dotProd += dot(xValues, wValues);
              }

            }
          }
        }

        float result = dotProd;
        ${t?"result += getBiasAtOutCoords();":""}
        ${x}
        setOutput(result);
      }
    `}}class ur{constructor(e){this.variableNames=["x","W"],this.outputShape=e.outShape;let t=e.padInfo.front,r=e.padInfo.top,a=e.padInfo.left,n=e.strideDepth,s=e.strideHeight,o=e.strideWidth,i=e.dilationDepth,l=e.dilationHeight,u=e.dilationWidth,p=e.filterDepth,d=e.filterHeight,c=e.filterWidth,h=4*Math.floor(e.inChannels/4),f=e.inChannels%4;this.userCode=`
      const ivec3 strides = ivec3(${n}, ${s}, ${o});
      const ivec3 pads = ivec3(${t}, ${r}, ${a});

      void main() {
        ivec5 coords = getOutputCoords();
        int batch = coords.x;
        int d2 = coords.u;

        ivec3 xFRCCorner = ivec3(coords.y, coords.z, coords.w) * strides - pads;
        int xFCorner = xFRCCorner.x;
        int xRCorner = xFRCCorner.y;
        int xCCorner = xFRCCorner.z;

        // Convolve x(?, ?, ?, d1) with w(:, :, :, d1, d2) to get
        // y(yF, yR, yC, d2). ? = to be determined. : = across all
        // values in that axis.
        float dotProd = 0.0;
        for (int wF = 0; wF < ${p}; wF++) {
          int xF = xFCorner + wF * ${i};

          if (xF < 0 || xF >= ${e.inDepth}) {
            continue;
          }

          for (int wR = 0; wR < ${d}; wR++) {
            int xR = xRCorner + wR * ${l};

            if (xR < 0 || xR >= ${e.inHeight}) {
              continue;
            }

            for (int wC = 0; wC < ${c}; wC++) {
              int xC = xCCorner + wC * ${u};

              if (xC < 0 || xC >= ${e.inWidth}) {
                continue;
              }

              for (int d1 = 0; d1 < ${h}; d1 += 4) {
                vec4 xValues = vec4(
                  getX(batch, xF, xR, xC, d1),
                  getX(batch, xF, xR, xC, d1 + 1),
                  getX(batch, xF, xR, xC, d1 + 2),
                  getX(batch, xF, xR, xC, d1 + 3)
                );
                vec4 wValues = vec4(
                  getW(wF, wR, wC, d1, d2),
                  getW(wF, wR, wC, d1 + 1, d2),
                  getW(wF, wR, wC, d1 + 2, d2),
                  getW(wF, wR, wC, d1 + 3, d2)
                );

                dotProd += dot(xValues, wValues);
              }

              if (${1===f}) {
                dotProd +=
                  getX(batch, xF, xR, xC, ${h}) *
                  getW(wF, wR, wC, ${h}, d2);
              } else if (${2===f}) {
                vec2 xValues = vec2(
                  getX(batch, xF, xR, xC, ${h}),
                  getX(batch, xF, xR, xC, ${h} + 1)
                );
                vec2 wValues = vec2(
                  getW(wF, wR, wC, ${h}, d2),
                  getW(wF, wR, wC, ${h} + 1, d2)
                );
                dotProd += dot(xValues, wValues);
              } else if (${3===f}) {
                vec3 xValues = vec3(
                  getX(batch, xF, xR, xC, ${h}),
                  getX(batch, xF, xR, xC, ${h} + 1),
                  getX(batch, xF, xR, xC, ${h} + 2)
                );
                vec3 wValues = vec3(
                  getW(wF, wR, wC, ${h}, d2),
                  getW(wF, wR, wC, ${h} + 1, d2),
                  getW(wF, wR, wC, ${h} + 2, d2)
                );
                dotProd += dot(xValues, wValues);
              }
            }
          }
        }
        setOutput(dotProd);
      }
    `}}g("i64bB");var I=g("jjNRA");class ua{constructor(e,t=!1,r=null,a=!1,n=!1){this.variableNames=["x","W"],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:"pads",type:"ivec2"},{name:"strides",type:"ivec2"},{name:"dilations",type:"ivec2"},{name:"inDims",type:"ivec2"}],this.outputShape=e.outShape,this.enableShapeUniforms=s1(this.outputShape.length);let s=e.padInfo.left,o=e.strideWidth,i=e.dilationWidth,l=e.filterHeight,u=e.filterWidth,p=`
       int xR; int xC; int xCOffset;
       vec4 wTexel; vec4 previous; vec4 final;`;for(let e=0;e<u;e++)p+=`
           vec4 xTexelC${2*e};
           int xTexelC${2*e}Ready;
           vec4 xTexelC${2*e+1};
           int xTexelC${2*e+1}Ready;
           vec4 xC${e};`;p+=`
     for (int r = 0; r < ${l}; r++) {
      for (int d1 = 0; d1 < ${e.inChannels}; d1 += 2) {
       `;for(let e=0;e<u;e++)p+=`
           xTexelC${2*e} = vec4(0.0);
           xTexelC${2*e}Ready = 0;
           xTexelC${2*e+1} = vec4(0.0);
           xTexelC${2*e+1}Ready = 0;
           xC${e} = vec4(0.0);`;p+=`
         xR = xRCorner + r * dilations[0];
         if (xR >=0 && xR < inDims[0]) {
       `;for(let t=0;t<(u+1)/2;t++){let r=2*t;if(p+=`
           xC = xCCorner + ${r*i};
           `,1===o){if(r<u&&(s%2==1?(p+=`
                 xCOffset = xC + 1;
                 if (xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${r}Ready == 0) {
                   xTexelC${r} = getX(batch, xR, xCOffset, d1);

                   // Need to manually clear unused channels in case
                   // we're reading from recycled texture.
                   if (xCOffset + 1 >= inDims[1]) {
                     xTexelC${r}.zw = vec2(0.0);
                   }
                   xTexelC${r}Ready = 1;
                 }
               `,1===i&&r>0?p+=`
                 xC${r} = vec4(xTexelC${r-2}.zw, xTexelC${r}.xy);
                 `:p+=`
                   xCOffset = xC + 1 - 2;

                   if (xCOffset >= 0 && xCOffset < inDims[1]) {
                     previous = getX(batch, xR, xCOffset, d1);

                     // Need to manually clear unused channels in case
                     // we're reading from recycled texture.
                     if (xCOffset + 1 >= inDims[1]) {
                       previous.zw = vec2(0.0);
                     }

                     xC${r} = vec4(previous.zw, xTexelC${r}.xy);
                   } else {
                     xC${r} = vec4(0.0, 0.0, xTexelC${r}.xy);
                   }
                   `):p+=`
                 if (xC >= 0 && xC < inDims[1] && xTexelC${r}Ready == 0) {
                   xTexelC${r} = getX(batch, xR, xC, d1);
                   if (xC + 1 >= inDims[1]) {
                     xTexelC${r}.zw = vec2(0.0);
                   }
                   xTexelC${r}Ready = 1;
                 }

                 xC${r} = xTexelC${r};
                 `,r+1<u)){let e=s%2==0?I.nearestLargerEven(i):i;i%2==0&&s%2==1||i%2!=0&&s%2!=1?(p+=`
                   xCOffset = xC + imod(pads[1], 2) + ${e};

                   if (xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${r+1}Ready == 0) {
                     xTexelC${r+1} = getX(batch, xR, xCOffset, d1);

                     // Need to manually clear unused channels in case
                     // we're reading from recycled texture.
                     if (xCOffset + 1 >= inDims[1]) {
                       xTexelC${r+1}.zw = vec2(0.0);
                     }
                     xTexelC${r+1}Ready = 1;
                   }
                   `,i>1?p+=`
                     xCOffset -= 2;
                     if (xCOffset >= 0 && xCOffset < inDims[1]) {
                      previous = getX(batch, xR, xCOffset, d1);
                      xC${r+1} = vec4(previous.zw, xTexelC${r+1}.xy);
                     } else {
                      xC${r+1} = vec4(0.0, 0.0, xTexelC${r+1}.xy);
                     }
                     `:p+=`
                     xC${r+1} = vec4(xTexelC${r}.zw, xTexelC${r+1}.xy);
                     `):1===e?p+=`
                     xC${r+1} = xTexelC${r};
                     `:p+=`
                     xCOffset = xC + ${e};

                     if (xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${r+1}Ready == 0) {
                       xTexelC${r+1} = getX(batch, xR, xCOffset, d1);
                       if (xCOffset + 1 >= inDims[1]) {
                         xTexelC${r+1}.zw = vec2(0.0);
                       }
                       xTexelC${r+1}Ready = 1;
                     }

                     xC${r+1} = xTexelC${r+1};
                     `}}else r<u&&(s%2==1?(p+=`
                 xCOffset = xC + 1 - strides[1];
                 if(xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${r}Ready == 0) {
                   xTexelC${r} = getX(batch, xR, xCOffset, d1);
                   // Need to manually clear unused channels in case
                   // we're reading from recycled texture.
                   if (xCOffset + 1 >= inDims[1]) {
                     xTexelC${r}.zw = vec2(0.0);
                   }
                   xTexelC${r}Ready = 1;
                 }

                 if(xC + 1 >= 0 && xC + 1 < inDims[1] && xTexelC${r+1}Ready == 0) {
                   xTexelC${r+1} = getX(batch, xR, xC + 1, d1);
                   // Need to manually clear unused channels in case
                   // we're reading from recycled texture.
                   if (xC + 2 >= inDims[1]) {
                     xTexelC${r+1}.zw = vec2(0.0);
                   }
                   xTexelC${r+1}Ready = 1;
                 }

                 xC${r} = vec4(xTexelC${r}.zw, xTexelC${r+1}.zw);
               `,r+1<u&&(p+=`
                   final = vec4(0.0);
                   xCOffset = xC + 1 + strides[1];
                   if(xCOffset >= 0 && xCOffset < inDims[1]) {
                     final = getX(batch, xR, xCOffset, d1);
                   }
                   xC${r+1} = vec4(xTexelC${r+1}.xy, final.xy);
                 `)):(p+=`
                 if(xC >= 0 && xC < inDims[1] && xTexelC${r}Ready == 0) {
                   xTexelC${r} = getX(batch, xR, xC, d1);
                   if (xC + 1 >= inDims[1]) {
                     xTexelC${r}.zw = vec2(0.0);
                   }
                   xTexelC${r}Ready = 1;
                 }

                 xCOffset = xC + strides[1];
                 if(xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${r+1}Ready == 0) {
                   xTexelC${r+1} = getX(batch, xR, xCOffset, d1);
                   if (xCOffset + 1 >= inDims[1]) {
                     xTexelC${r+1}.zw = vec2(0.);
                   }
                   xTexelC${r+1}Ready = 1;
                 }

                 xC${r} = vec4(
                   xTexelC${r}.xy, xTexelC${r+1}.xy);
               `,r+1<u&&(p+=`
                   xC${r+1} = vec4(xTexelC${r}.zw, xTexelC${r+1}.zw);
                 `)));r<u&&(p+=`
             wTexel = getW(r, ${r}, d1, d2);
             dotProd += xC${r}.xxzz * vec4(wTexel.xy, wTexel.xy);
             if(d1 + 1 < ${e.inChannels}) {
               dotProd += xC${r}.yyww * vec4(wTexel.zw, wTexel.zw);
             }
           `,r+1<u&&(p+=`
               wTexel = getW(r, ${r+1}, d1, d2);
               dotProd += xC${r+1}.xxzz * vec4(wTexel.xy, wTexel.xy);
               if(d1 + 1 < ${e.inChannels}) {
                 dotProd += xC${r+1}.yyww * vec4(wTexel.zw, wTexel.zw);
               }
             `))}p+=`
     }
   
     }
   
     }
   `;let d="",c="";r&&(d=a?`vec4 activation(vec4 a) {
           vec4 b = getPreluActivationWeightsAtOutCoords();
           ${r}
         }`:n?`vec4 activation(vec4 a) {
           vec4 b = getLeakyreluAlphaAtOutCoords();
           ${r}
         }`:`vec4 activation(vec4 x) {
           ${r}
         }`,c="result = activation(result);"),t&&this.variableNames.push("bias"),a&&this.variableNames.push("preluActivationWeights"),n&&this.variableNames.push("leakyreluAlpha"),this.userCode=`
       ${d}

       void main() {
         ivec4 coords = getOutputCoords();
         int batch = coords.x;
         ivec2 xRCCorner = coords.yz * strides - pads;
         int d2 = coords.w;
         int xRCorner = xRCCorner.x;
         int xCCorner = xRCCorner.y;

         //intialize dotProd with a small epsilon seems to reduce GPU accuracy loss.
         vec4 dotProd = vec4(0.000000000000001);

         ${p}

         vec4 result = dotProd - vec4(0.000000000000001);
         ${t?"result += getBiasAtOutCoords();":""}
         ${c}
         setOutput(result);
       }
     `}}g("i64bB");var I=g("jjNRA");class un{constructor(e,t){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:"inputShape",type:"ivec4"},{name:"pad",type:"ivec2"},{name:"stride",type:"ivec2"},{name:"dilation",type:"ivec2"},{name:"inChannels",type:"int"},{name:"itemsPerBlockRow",type:"int"},{name:"outWidth",type:"int"}],this.outputShape=e,this.enableShapeUniforms=s1(this.outputShape.length);let{dataFormat:r}=t,a=sO(),n="channelsLast"===r,s=n?1:2,o=n?2:3,i=this.enableShapeUniforms?"if(blockIndex < outShape[2] && pos < outShape[1]) {":`if(blockIndex < ${e[2]} && pos < ${e[1]}) {`,l="";for(let e=0;e<=1;e++)for(let t=0;t<=1;t++)l+=`
          blockIndex = rc.z + ${t};
          pos = rc.y + ${e};

          ${i}
            offsetY = int(blockIndex / outWidth) * stride[0] - pad[0];
            d0 = offsetY + dilation[0] * (pos / itemsPerBlockRow);

            if(d0 < inputShape[${s}] && d0 >= 0) {
              // Use custom imod instead mod. On Intel GPU, mod may generate
              // unexpected value.
              // https://github.com/tensorflow/tfjs/issues/5447
              offsetX = imod(blockIndex, outWidth) * stride[1] - pad[1];
              d1 = offsetX + dilation[1] * (imod(pos, itemsPerBlockRow) /
                  inChannels);

              if(d1 < inputShape[${o}] && d1 >= 0) {

                ch = imod(pos, inChannels);

                if (${n}) {
                  innerDims = vec2(d1, ch);
                  result[${2*e+t}] = getChannel(
                    getA(rc.x, d0, int(innerDims.x),
                    int(innerDims.y)), innerDims);
                } else {
                  innerDims = vec2(d0, d1);
                  result[${2*e+t}] = getChannel(
                    getA(rc.x, ch, int(innerDims.x),
                    int(innerDims.y)), innerDims);
                }
              }
            }
          }
        `;this.userCode=`
      void main() {
        ivec3 rc = getOutputCoords();

        vec4 result = vec4(0);

        int blockIndex, pos, offsetY, d0, offsetX, d1, ch;
        vec2 innerDims;

        ${l}

        ${a.output} = result;
      }
    `}}function us(e,t){let r=e.length;return r>=3?t?[...e.slice(0,-3),e[r-3]*e[r-2],e[r-1]]:[...e.slice(0,-3),e[r-3],e[r-2]*e[r-1]]:!t&&1===r&&e[0]>1?[e[0],1]:null}function uo({x:e,filter:t,convInfo:r,backend:a,bias:n=null,preluActivationWeights:s=null,leakyreluAlpha:o=0,activation:i=null}){let l,u=e.shape,p=a.texData.get(e.dataId),d=r.inChannels,c=u[0]*u[1]*u[2],h=r.outChannels,f="channelsLast"===r.dataFormat,m=[];if(null!=s){let e=us(s.shape,f);null!=e&&(s=iG({inputs:{x:s},backend:a,attrs:{shape:e}}),m.push(s))}if(null!=n){let e=us(n.shape,f);null!=e&&(n=iG({inputs:{x:n},backend:a,attrs:{shape:e}}),m.push(n))}if(!((1===c||1===h)&&d>1e3)&&p.isPacked&&f&&null!=p.texture&&u[2]%2!=0&&I.arraysEqual(p.shape.slice(-3),u.slice(-3))){let d=u[0]*u[1]*(u[2]+1),c={dataId:e.dataId,shape:[1,d,r.inChannels],dtype:e.dtype},h=p.shape;p.shape=p.shape.slice(),p.shape[p.shape.length-2]++,I.assert(sC(p.shape,c.shape),()=>`packed reshape ${p.shape} to ${c.shape} isn't free`);let f=iG({inputs:{x:t},backend:a,attrs:{shape:[1,r.inChannels,r.outChannels]}});m.push(f);let g=iJ({a:c,b:f,backend:a,transposeA:!1,transposeB:!1,bias:n,activation:i,preluActivationWeights:s,leakyreluAlpha:o}),x=a.texData.get(g.dataId);I.assert(x.isPacked,()=>"batchMatMul result is expected to be packed"),p.shape=h,x.shape=r.outShape,(l=iN({inputs:{x:g},backend:a})).shape=r.outShape,m.push(g)}else{let u=r.outHeight*r.outWidth,p=iG({inputs:{x:e},backend:a,attrs:{shape:f?[r.batchSize,u,r.inChannels]:[r.batchSize,r.inChannels,u]}}),d=iG({inputs:{x:t},backend:a,attrs:{shape:[1,r.inChannels,r.outChannels]}}),c=iJ({a:f?p:d,b:f?d:p,transposeA:!f,transposeB:!1,backend:a,bias:n,activation:i,preluActivationWeights:s,leakyreluAlpha:o});l=iG({inputs:{x:c},backend:a,attrs:{shape:r.outShape}}),m.push(p),m.push(d),m.push(c)}for(let e of m)a.disposeIntermediateTensorInfo(e);return l}function ui({x:e,filter:t,convInfo:r,backend:a,bias:n=null,preluActivationWeights:s=null,leakyreluAlpha:o=0,activation:i=null}){let{filterWidth:l,filterHeight:u,inChannels:p,outWidth:d,outHeight:c,dataFormat:h}=r,f="channelsLast"===h,m=l*u*p,g=c*d,x=[r.batchSize,m,g],y=[];if(null!=s){let e=us(s.shape,f);null!=e&&(s=iG({inputs:{x:s},backend:a,attrs:{shape:e}}),y.push(s))}if(null!=n){let e=us(n.shape,f);null!=e&&(n=iG({inputs:{x:n},backend:a,attrs:{shape:e}}),y.push(n))}let b=iG({inputs:{x:t},backend:a,attrs:{shape:[1,m,I.sizeFromShape(t.shape)/m]}});y.push(b);let v=new un(x,r),N=[e.shape,[r.padInfo.top,r.padInfo.left],[r.strideHeight,r.strideWidth],[r.dilationHeight,r.dilationWidth],[r.inChannels],[r.filterWidth*r.inChannels],[r.outWidth]],k=a.runWebGLProgram(v,[e],"float32",N),T=iG({inputs:{x:k},backend:a,attrs:{shape:x}});y.push(k),y.push(T);let S=null!=n,w=null!=s,C="leakyrelu"===i,E=i?iF(i,!0):null,A=new iO(f?T.shape:b.shape,f?b.shape:T.shape,f?[r.batchSize,g,r.outChannels]:[r.batchSize,r.outChannels,g],!0,!1,S,E,w,C),$=f?[T,b]:[b,T];if(n&&$.push(n),w&&$.push(s),C){let e=a.makeTensorInfo([],"float32",I.createScalarValue(o,"float32"));$.push(e),y.push(e)}let R=a.runWebGLProgram(A,$,"float32"),P=iG({inputs:{x:R},backend:a,attrs:{shape:r.outShape}});for(let e of(y.push(R),y))a.disposeIntermediateTensorInfo(e);return P}const ul={kernelName:$.Conv2D,backendName:"webgl",kernelFunc:function(e){let t,{inputs:r,backend:a,attrs:n}=e,{x:s,filter:o}=r,{strides:i,pad:l,dataFormat:u,dilations:p,dimRoundingMode:d}=n,c=v.convertConv2DDataFormat(u),h=v.computeConv2DInfo(s.shape,o.shape,i,p,l,d,!1,c);if(1===h.filterHeight&&1===h.filterWidth&&1===h.dilationHeight&&1===h.dilationWidth&&1===h.strideHeight&&1===h.strideWidth&&("SAME"===h.padInfo.type||"VALID"===h.padInfo.type))t=uo({x:s,filter:o,convInfo:h,backend:a});else if(h.strideWidth<=2&&"channelsLast"===c&&(0,T.env)().getBool("WEBGL_EXP_CONV")){let e=new ua(h),r=[[h.padInfo.top,h.padInfo.left],[h.strideHeight,h.strideWidth],[h.dilationHeight,h.dilationWidth],[h.inHeight,h.inWidth]];t=a.runWebGLProgram(e,[s,o],"float32",r)}else if((0,T.env)().getBool("WEBGL_CONV_IM2COL"))t=ui({x:s,filter:o,convInfo:h,backend:a});else{let e=new ut(h);t=a.runWebGLProgram(e,[s,o],"float32")}let f=iG({inputs:{x:t},backend:a,attrs:{shape:h.outShape}});return a.disposeIntermediateTensorInfo(t),f}};g("i64bB");var v=g("7MaPk"),$=g("hl418");class uu{constructor(e){this.variableNames=["x","dy"],this.outputShape=e.filterShape;let t=e.strideHeight,r=e.strideWidth,a=e.padInfo.top,n=e.padInfo.left,s="channelsLast"===e.dataFormat;this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int wR = coords.x;
        int wC = coords.y;
        int d1 = coords.z;
        int d2 = coords.w;

        // Convolve x(?, ?, d1) with dy(:, :, d2) to get dw(wR, wC, d1, d2).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;

        for (int b = 0; b < ${e.batchSize}; b++) {
          for (int yR = 0; yR < ${e.outHeight}; yR++) {
            int xR = wR + yR * ${t} - ${a};

            if (xR < 0 || xR >= ${e.inHeight}) {
              continue;
            }

            for (int yC = 0; yC < ${e.outWidth}; yC++) {
              int xC = wC + yC * ${r} - ${n};

              if (xC < 0 || xC >= ${e.inWidth}) {
                continue;
              }

              ${s?`float dyValue = getDy(b, yR, yC, d2);
              float xValue = getX(b, xR, xC, d1);
              dotProd += (xValue * dyValue);`:`float dyValue = getDy(b, d2, yR, yC);
              float xValue = getX(b, d1, xR, xC);
              dotProd += (xValue * dyValue);`}
            }
          }
        }
        setOutput(dotProd);
      }
    `}}class up{constructor(e){this.variableNames=["dy","W"],this.outputShape=e.inShape;let t=e.filterHeight,r=e.filterWidth,a=e.strideHeight,n=e.strideWidth,s="channelsLast"===e.dataFormat,o=t-1-e.padInfo.top,i=r-1-e.padInfo.left;this.userCode=`
      const ivec2 pads = ivec2(${o}, ${i});

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords[0];
        int d1 = coords[${s?3:1}];

        ivec2 dyCorner = ivec2(coords[${s?1:2}], coords[${s?2:3}]) - pads;
        int dyRCorner = dyCorner.x;
        int dyCCorner = dyCorner.y;

        // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;
        for (int wR = 0; wR < ${t}; wR++) {
          float dyR = float(dyRCorner + wR) / ${a}.0;

          if (dyR < 0.0 || dyR >= ${e.outHeight}.0 || fract(dyR) > 0.0) {
            continue;
          }
          int idyR = int(dyR);

          int wRPerm = ${t} - 1 - wR;

          for (int wC = 0; wC < ${r}; wC++) {
            float dyC = float(dyCCorner + wC) / ${n}.0;

            if (dyC < 0.0 || dyC >= ${e.outWidth}.0 ||
                fract(dyC) > 0.0) {
              continue;
            }
            int idyC = int(dyC);

            int wCPerm = ${r} - 1 - wC;

            for (int d2 = 0; d2 < ${e.outChannels}; d2++) {

              if (${s}) {
                float xValue = getDy(batch, idyR, idyC, d2);
                float wValue = getW(wRPerm, wCPerm, d1, d2);
                dotProd += xValue * wValue;
              } else {
                float xValue = getDy(batch, d2, idyR, idyC);
                float wValue = getW(wRPerm, wCPerm, d1, d2);
                dotProd += xValue * wValue;
              }

            }
          }
        }
        setOutput(dotProd);
      }
    `}}class ud{constructor(e){this.variableNames=["x","dy"],this.outputShape=e.filterShape;let t=e.strideDepth,r=e.strideHeight,a=e.strideWidth,n=e.padInfo.front,s=e.padInfo.top,o=e.padInfo.left;this.userCode=`
      void main() {
        ivec5 coords = getOutputCoords();
        int wF = coords.x;
        int wR = coords.y;
        int wC = coords.z;
        int d1 = coords.w;
        int d2 = coords.u;

        float dotProd = 0.0;

        for (int b = 0; b < ${e.batchSize}; b++) {
          for (int yF = 0; yF < ${e.outDepth}; yF++) {
            int xF = wF + yF * ${t} - ${n};

            if (xF < 0 || xF >= ${e.inDepth}) {
              continue;
            }

            for (int yR = 0; yR < ${e.outHeight}; yR++) {
              int xR = wR + yR * ${r} - ${s};

              if (xR < 0 || xR >= ${e.inHeight}) {
                continue;
              }

              for (int yC = 0; yC < ${e.outWidth}; yC++) {
                int xC = wC + yC * ${a} - ${o};

                if (xC < 0 || xC >= ${e.inWidth}) {
                  continue;
                }

                float dyValue = getDy(b, yF, yR, yC, d2);
                float xValue = getX(b, xF, xR, xC, d1);
                dotProd += (xValue * dyValue);
              }
            }
          }
        }
        setOutput(dotProd);
      }
    `}}class uc{constructor(e){this.variableNames=["dy","W"],this.outputShape=e.inShape;let t=e.filterDepth,r=e.filterHeight,a=e.filterWidth,n=e.strideDepth,s=e.strideHeight,o=e.strideWidth,i=t-1-e.padInfo.front,l=r-1-e.padInfo.top,u=a-1-e.padInfo.left;this.userCode=`
      const ivec3 pads = ivec3(${i}, ${l}, ${u});

      void main() {
        ivec5 coords = getOutputCoords();
        int batch = coords.x;
        int d1 = coords.u;


        ivec3 dyCorner = ivec3(coords.y, coords.z, coords.w) - pads;
        int dyFCorner = dyCorner.x;
        int dyRCorner = dyCorner.y;
        int dyCCorner = dyCorner.z;

        float dotProd = 0.0;
        for (int wF = 0; wF < ${t}; wF++) {
          float dyF = float(dyFCorner + wF) / ${n}.0;

          if (dyF < 0.0 || dyF >= ${e.outDepth}.0 || fract(dyF) > 0.0) {
            continue;
          }
          int idyF = int(dyF);

          int wFPerm = ${t} - 1 - wF;

          for (int wR = 0; wR < ${r}; wR++) {
            float dyR = float(dyRCorner + wR) / ${s}.0;

            if (dyR < 0.0 || dyR >= ${e.outHeight}.0 ||
              fract(dyR) > 0.0) {
              continue;
            }
            int idyR = int(dyR);

            int wRPerm = ${r} - 1 - wR;

            for (int wC = 0; wC < ${a}; wC++) {
              float dyC = float(dyCCorner + wC) / ${o}.0;

              if (dyC < 0.0 || dyC >= ${e.outWidth}.0 ||
                  fract(dyC) > 0.0) {
                continue;
              }
              int idyC = int(dyC);

              int wCPerm = ${a} - 1 - wC;

              for (int d2 = 0; d2 < ${e.outChannels}; d2++) {
                float xValue = getDy(batch, idyF, idyR, idyC, d2);
                float wValue = getW(wFPerm, wRPerm, wCPerm, d1, d2);
                dotProd += xValue * wValue;
              }
            }
          }
        }
        setOutput(dotProd);
      }
    `}}const uh={kernelName:$.Conv2DBackpropFilter,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{x:n,dy:s}=t,{strides:o,pad:i,dataFormat:l,dimRoundingMode:u,filterShape:p}=a,d=v.convertConv2DDataFormat(l),c=new uu(v.computeConv2DInfo(n.shape,p,o,1,i,u,!1,d));return r.runWebGLProgram(c,[n,s],"float32")}};g("i64bB");var v=g("7MaPk"),$=g("hl418"),T=g("ibsdL");class uf{constructor(e){this.variableNames=["dy","W"],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:"strides",type:"vec2"}],this.outputShape=e.inShape,this.enableShapeUniforms=s1(this.outputShape.length);let t=e.filterHeight,r=e.filterWidth,a=t-1-e.padInfo.top,n=r-1-e.padInfo.left;this.userCode=`
      const ivec2 pads = ivec2(${a}, ${n});

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords[0];
        int d1 = coords[3];

        ivec2 dyCorner = ivec2(coords[1], coords[2]) - pads;
        int dyRCorner = dyCorner.x;
        int dyCCorner = dyCorner.y;

        vec4 result = vec4(0.);
        for (int wR = 0; wR < ${t}; wR++) {
          float dyR = float(dyRCorner + wR) / strides[0];
          if (dyR < 0.0 || dyR >= ${e.outHeight}.0 || fract(dyR) > 0.0) {
            continue;
          }
          int idyR = int(dyR);
          int wRPerm = ${t} - 1 - wR;

          for (int wC = 0; wC < ${r}; wC++) {
            int wCPerm = ${r} - 1 - wC;

            float dyC = float(dyCCorner + wC) / strides[1];
            bool idyCVal = (dyC >= 0.0) && (dyC < ${e.outWidth}.0)
              && (fract(dyC) == 0.0);
            int idyC = int(dyC);

            float dyC2 = float(dyCCorner + wC + 1) / strides[1];
            bool idyCVal2 = (dyC2 >= 0.0) && (dyC2 < ${e.outWidth}.0)
              && (fract(dyC2) == 0.0);
            int idyC2 = int(dyC2);

            if (idyCVal && idyCVal2) {
              for (int d2 = 0; d2 < ${e.outChannels}; d2 += 2) {
                vec4 wValue = getW(wRPerm, wCPerm, d1, d2);
                vec4 dySample = getDy(batch, idyR, idyC, d2);
                vec4 dySample2 = (idyC / 2 == idyC2 / 2) ?
                  dySample : getDy(batch, idyR, idyC2, d2);

                vec2 dyValue = mod(float(idyC), 2.) == 0. ?
                  dySample.xy : dySample.zw;
                result.xy += vec2(dot(dyValue, wValue.xy),
                  dot(dyValue, wValue.zw));

                dyValue = mod(float(idyC2), 2.) == 0. ?
                  dySample2.xy : dySample2.zw;
                result.zw += vec2(dot(dyValue, wValue.xy),
                  dot(dyValue, wValue.zw));
              }
            } else if (idyCVal) {
              for (int d2 = 0; d2 < ${e.outChannels}; d2 += 2) {
                vec4 wValue = getW(wRPerm, wCPerm, d1, d2);
                vec4 dySample = getDy(batch, idyR, idyC, d2);
                vec2 dyValue = mod(float(idyC), 2.) == 0. ?
                  dySample.xy : dySample.zw;
                result.xy += vec2(dot(dyValue, wValue.xy),
                  dot(dyValue, wValue.zw));
              }
            } else if (idyCVal2) {
              for (int d2 = 0; d2 < ${e.outChannels}; d2 += 2) {
                vec4 wValue = getW(wRPerm, wCPerm, d1, d2);
                vec4 dySample = getDy(batch, idyR, idyC2, d2);
                vec2 dyValue = mod(float(idyC2), 2.) == 0. ?
                  dySample.xy : dySample.zw;
                result.zw += vec2(dot(dyValue, wValue.xy),
                  dot(dyValue, wValue.zw));
              }
            }
          }
        }
        setOutput(result);
      }
    `}}const um={kernelName:$.Conv2DBackpropInput,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{dy:n,filter:s}=t,{inputShape:o,strides:i,pad:l,dataFormat:u,dimRoundingMode:p}=a,d=v.convertConv2DDataFormat(u),c=v.computeConv2DInfo(o,s.shape,i,1,l,p,!1,d);if((0,T.env)().getBool("WEBGL_PACK_CONV2DTRANSPOSE")&&"channelsLast"===d){let e=[[c.strideHeight,c.strideWidth]],t=new uf(c);return r.runWebGLProgram(t,[n,s],"float32",e)}{let e=new up(c);return r.runWebGLProgram(e,[n,s],"float32")}}};g("i64bB");var v=g("7MaPk"),$=g("hl418");const ug={kernelName:$.Conv3D,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{x:n,filter:s}=t,{strides:o,pad:i,dilations:l}=a,u=new ur(v.computeConv3DInfo(n.shape,s.shape,o,l,i));return r.runWebGLProgram(u,[n,s],"float32")}};g("i64bB");var v=g("7MaPk"),$=g("hl418");const ux={kernelName:$.Conv3DBackpropFilterV2,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{x:n,dy:s}=t,{strides:o,pad:i,filterShape:l}=a,u=new ud(v.computeConv3DInfo(n.shape,l,o,1,i));return r.runWebGLProgram(u,[n,s],"float32")}};g("i64bB");var v=g("7MaPk"),$=g("hl418");const uy={kernelName:$.Conv3DBackpropInputV2,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{dy:n,filter:s}=t,{pad:o,strides:i,inputShape:l}=a,u=new uc(v.computeConv3DInfo(l,s.shape,i,1,o));return r.runWebGLProgram(u,[n,s],"float32")}};g("i64bB");var $=g("hl418");const ub=iP({opSnippet:iR+`
  return cos(x);
`,packedOpSnippet:`
  vec4 result = cos(x);
  bvec4 isNaN = isnan(x);
  ${ib}
  return result;
`}),uv={kernelName:$.Cos,backendName:"webgl",kernelFunc:ub};g("i64bB");var $=g("hl418");const uN=iP({opSnippet:`
  float e2x = exp(-x);
  return (e2x + 1.0 / e2x) / 2.0;
`}),uk={kernelName:$.Cosh,backendName:"webgl",kernelFunc:uN};g("i64bB");var $=g("hl418");class uT{constructor(e,t,r,a,n){this.variableNames=["Image","Boxes","BoxInd"],this.outputShape=[];let[s,o,i,l]=e,[u]=t,[p,d]=r;this.outputShape=[u,p,d,l];let[c,h]=[`${o-1}.0`,`${i-1}.0`],[f,m,g]=p>1?[`${(o-1)/(p-1)}`,"(y2-y1) * height_ratio",`y1*${c} + float(y)*(height_scale)`]:["0.0","0.0",`0.5 * (y1+y2) * ${c}`],[x,y,b]=d>1?[`${(i-1)/(d-1)}`,"(x2-x1) * width_ratio",`x1*${h} + float(x)*(width_scale)`]:["0.0","0.0",`0.5 * (x1+x2) * ${h}`];this.userCode=`
      const float height_ratio = float(${f});
      const float width_ratio = float(${x});
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int y = coords[1];
        int x = coords[2];
        int d = coords[3];

        // get box vals
        float y1 = getBoxes(b,0);
        float x1 = getBoxes(b,1);
        float y2 = getBoxes(b,2);
        float x2 = getBoxes(b,3);

        // get image in batch index
        int bInd = round(getBoxInd(b));
        if(bInd < 0 || bInd >= ${s}) {
          return;
        }

        float height_scale = ${m};
        float width_scale = ${y};

        float in_y = ${g};
        if( in_y < 0.0 || in_y > ${c} ) {
          setOutput(float(${n}));
          return;
        }
        float in_x = ${b};
        if( in_x < 0.0 || in_x > ${h} ) {
          setOutput(float(${n}));
          return;
        }

        vec2 sourceFracIndexCR = vec2(in_x,in_y);
        if(${+("bilinear"===a)} == 1) {
          // Compute the four integer indices.
          ivec2 sourceFloorCR = ivec2(sourceFracIndexCR);
          ivec2 sourceCeilCR = ivec2(ceil(sourceFracIndexCR));

          float topLeft = getImage(b, sourceFloorCR.y, sourceFloorCR.x, d);
          float bottomLeft = getImage(b, sourceCeilCR.y, sourceFloorCR.x, d);
          float topRight = getImage(b, sourceFloorCR.y, sourceCeilCR.x, d);
          float bottomRight = getImage(b, sourceCeilCR.y, sourceCeilCR.x, d);

          vec2 fracCR = sourceFracIndexCR - vec2(sourceFloorCR);

          float top = topLeft + (topRight - topLeft) * fracCR.x;
          float bottom = bottomLeft + (bottomRight - bottomLeft) * fracCR.x;
          float newValue = top + (bottom - top) * fracCR.y;
          setOutput(newValue);
        } else {
          // Compute the coordinators of nearest neighbor point.
          ivec2 sourceNearestCR = ivec2(floor(
            sourceFracIndexCR + vec2(0.5,0.5)));
          float newValue = getImage(b, sourceNearestCR.y, sourceNearestCR.x, d);
          setOutput(newValue);
        }
      }
    `}}const uS={kernelName:$.CropAndResize,backendName:"webgl",kernelFunc:e=>{let{inputs:t,backend:r,attrs:a}=e,{image:n,boxes:s,boxInd:o}=t,{cropSize:i,method:l,extrapolationValue:u}=a,p=new uT(n.shape,s.shape,i,l,u);return r.runWebGLProgram(p,[n,s,o],"float32")}};g("i64bB");var $=g("hl418");(l=c||(c={})).Prod="*",l.Sum="+";class uI{constructor(e,t,r,a){this.op=e,this.outputShape=t,this.variableNames=["x"],this.customUniforms=[{name:"index",type:"float"}];let n=this.outputShape.length,s=this.op===c.Prod?"1.0":"0.0",o=r?s:`getX(${uw(n,"coords",this.op)})`,i=this.outputShape[this.outputShape.length-1],l="",u="";r?(l=a?`end != ${i-1}`:"end != 0",u=a?"end + 1":"end - 1"):(l=a?`end + pow2 < ${i}`:"end >= pow2",u=a?"end + pow2":"end - pow2"),this.userCode=`
      void main() {
        ${sX(n)} coords = getOutputCoords();
        int end = ${uC(n,"coords",this.op)};
        float val = ${o};
        int pow2 = int(pow(2.0, index));
        if (${l}) {
          int idx = ${u};
          ${uC(n,"coords",this.op)} = idx;
          val ${this.op}= getX(${uw(n,"coords",this.op)});
        }
        setOutput(val);
      }
    `}}function uw(e,t,r){if(1===e)return`${t}`;if(2===e)return`${t}.x, ${t}.y`;if(3===e)return`${t}.x, ${t}.y, ${t}.z`;if(4===e)return`${t}.x, ${t}.y, ${t}.z, ${t}.w`;throw Error(`Cumulative ${r} for rank ${e} is not yet supported`)}function uC(e,t,r){if(1===e)return`${t}`;if(2===e)return`${t}.y`;if(3===e)return`${t}.z`;if(4===e)return`${t}.w`;throw Error(`Cumulative ${r} for rank ${e} is not yet supported`)}g("i64bB");var v=g("7MaPk");function uE(e,t,r,a,n,s){let o=t.shape.length,i=v.getAxesPermutation([a],o),l=t;null!=i&&(l=iY({inputs:{x:t},backend:r,attrs:{perm:i}}));let u=v.getInnerMostAxes(1,o)[0];if(u!==o-1)throw Error(`WebGL cumprod shader expects an inner-most axis=${t.shape.length-1} but got axis=${a}`);let p=l.shape[u],d=iN({inputs:{x:l},backend:r});for(let t=0;t<=Math.ceil(Math.log2(p))-1;t++){let a=new uI(e,l.shape,!1,s),n=[[t]],o=d;d=r.runWebGLProgram(a,[d],d.dtype,n),r.disposeIntermediateTensorInfo(o)}if(n){let t=new uI(e,l.shape,n,s),a=d;d=r.runWebGLProgram(t,[d],d.dtype),r.disposeIntermediateTensorInfo(a)}if(null!=i){let e=iY({inputs:{x:d},backend:r,attrs:{perm:v.getUndoAxesPermutation(i)}});return r.disposeIntermediateTensorInfo(d),r.disposeIntermediateTensorInfo(l),e}return d}const uA={kernelName:$.Cumprod,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{x:n}=t,{axis:s,exclusive:o,reverse:i}=a;return uE(c.Prod,n,r,s,o,i)}};g("i64bB");var $=g("hl418");const u$={kernelName:$.Cumsum,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{x:n}=t,{axis:s,exclusive:o,reverse:i}=a;return uE(c.Sum,n,r,s,o,i)}};g("i64bB");var $=g("hl418");const uR={kernelName:$.DenseBincount,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{x:n,weights:s}=t,{size:o,binaryOutput:i}=a;if(1===n.shape.length){let e=ol(r.readSync(n.dataId),r.readSync(s.dataId),s.dtype,s.shape,o);return r.makeTensorInfo([o],s.dtype,e)}if(2===n.shape.length){let e=ou(r.bufferSync(n),r.bufferSync(s),o,i);return r.makeTensorInfo(e.shape,s.dtype,e.values)}throw Error(`Error in denseBincount: input must be at most rank 2, but got rank${n.shape.length}.`)}};g("i64bB");var $=g("hl418");class uP{constructor(e,t,r){this.variableNames=["x"],this.outputShape=[],this.outputShape=e,this.blockSize=t,this.dataFormat=r,this.userCode=`
    void main() {
      ivec4 coords = getOutputCoords();
      int b = coords[0];
      int h = ${this.getHeightCoordString()};
      int w = ${this.getWidthCoordString()};
      int d = ${this.getDepthCoordString()};

      int in_h = h / ${t};
      int offset_h = imod(h, ${t});
      int in_w = w / ${t};
      int offset_w = imod(w, ${t});
      int offset_d = (offset_h * ${t} + offset_w) *
        ${this.getOutputDepthSize()};
      int in_d = d + offset_d;

      float result = ${this.getInputSamplingString()};
      setOutput(result);
    }
  `}getHeightCoordString(){return"NHWC"===this.dataFormat?"coords[1]":"coords[2]"}getWidthCoordString(){return"NHWC"===this.dataFormat?"coords[2]":"coords[3]"}getDepthCoordString(){return"NHWC"===this.dataFormat?"coords[3]":"coords[1]"}getOutputDepthSize(){return"NHWC"===this.dataFormat?this.outputShape[3]:this.outputShape[1]}getInputSamplingString(){return"NHWC"===this.dataFormat?"getX(b, in_h, in_w, in_d)":"getX(b, in_d, in_h, in_w)"}}const uB={kernelName:$.DepthToSpace,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{x:n}=t,{blockSize:s,dataFormat:o}=a,i=n.shape[0],l="NHWC"===o?n.shape[1]:n.shape[2],u="NHWC"===o?n.shape[2]:n.shape[3],p="NHWC"===o?n.shape[3]:n.shape[1],d=l*s,c=u*s,h=p/(s*s),f=new uP("NHWC"===o?[i,d,c,h]:[i,h,d,c],s,o);return r.runWebGLProgram(f,[n],n.dtype)}};g("i64bB");var v=g("7MaPk"),$=g("hl418"),T=g("ibsdL"),I=g("jjNRA");class uF{constructor(e,t=!1,r=null,a=!1,n=!1){this.variableNames=["x","W"],this.customUniforms=[{name:"pads",type:"ivec2"},{name:"strides",type:"ivec2"},{name:"dilations",type:"ivec2"},{name:"inDims",type:"ivec2"}],this.outputShape=e.outShape,this.enableShapeUniforms=s1(this.outputShape.length);let s=e.filterHeight,o=e.filterWidth,i=e.outChannels/e.inChannels,l="",u="";r&&(l=a?`float activation(float a) {
          float b = getPreluActivationWeightsAtOutCoords();
          ${r}
        }`:n?`float activation(float a) {
          float b = getLeakyreluAlphaAtOutCoords();
          ${r}
        }`:`
          float activation(float x) {
            ${r}
          }
        `,u="result = activation(result);"),t&&this.variableNames.push("bias"),a&&this.variableNames.push("preluActivationWeights"),n&&this.variableNames.push("leakyreluAlpha"),this.userCode=`
      ${l}

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords.x;
        ivec2 xRCCorner = coords.yz * strides - pads;
        int d2 = coords.w;
        int d1 = d2 / ${i};
        int q = d2 - d1 * ${i};

        int xRCorner = xRCCorner.x;
        int xCCorner = xRCCorner.y;

        // Convolve x(?, ?, d1) with w(:, :, d1, q) to get y(yR, yC, d2).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;
        // TO DO(dsmilkov): Flatten the two for loops and vec4 the operations.
        for (int wR = 0; wR < ${s}; wR++) {
          int xR = xRCorner + wR * dilations[0];

          if (xR < 0 || xR >= inDims[0]) {
            continue;
          }

          for (int wC = 0; wC < ${o}; wC++) {
            int xC = xCCorner + wC * dilations[1];

            if (xC < 0 || xC >= inDims[1]) {
              continue;
            }

            float xVal = getX(batch, xR, xC, d1);
            float wVal = getW(wR, wC, d1, q);
            dotProd += xVal * wVal;
          }
        }

        float result = dotProd;
        ${t?"result += getBiasAtOutCoords();":""}
        ${u}
        setOutput(result);
      }
    `}}g("i64bB");var I=g("jjNRA");class uO{constructor(e,t=!1,r=null,a=!1,n=!1){this.variableNames=["x","W"],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:"pads",type:"ivec2"},{name:"strides",type:"ivec2"},{name:"dilations",type:"ivec2"},{name:"inDims",type:"ivec2"}],this.outputShape=e.outShape,this.enableShapeUniforms=s1(this.outputShape.length);let s=e.outChannels/e.inChannels,o=e.padInfo.left,i=e.strideWidth,l=e.dilationWidth,u=e.filterHeight,p=e.filterWidth,d=`
      int xR; int xC; int xCOffset;
      vec4 wTexel; vec4 previous; vec4 final;`;for(let e=0;e<p;e++)d+=`
          vec4 xTexelC${2*e};
          int xTexelC${2*e}Ready;
          vec4 xTexelC${2*e+1};
          int xTexelC${2*e+1}Ready;
          vec4 xC${e};`;d+=`
    for (int r = 0; r < ${u}; r++) {
      `;for(let e=0;e<p;e++)d+=`
          xTexelC${2*e} = vec4(0.0);
          xTexelC${2*e}Ready = 0;
          xTexelC${2*e+1} = vec4(0.0);
          xTexelC${2*e+1}Ready = 0;
          xC${e} = vec4(0.0);`;d+=`
        xR = xRCorner + r * dilations[0];
        if (xR >=0 && xR < inDims[0]) {
      `;for(let e=0;e<(p+1)/2;e++){let t=2*e;if(d+=`
          xC = xCCorner + ${t*l};
          `,1===i){if(t<p&&(o%2==1?(d+=`
                xCOffset = xC + 1;
                if (xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${t}Ready == 0) {
                  xTexelC${t} = getX(batch, xR, xCOffset, d1);

                  // Need to manually clear unused channels in case
                  // we're reading from recycled texture.
                  if (xCOffset + 1 >= inDims[1]) {
                    xTexelC${t}.zw = vec2(0.0);
                  }
                  xTexelC${t}Ready = 1;
                }
              `,1===l&&t>0?d+=`
                xC${t} = vec4(xTexelC${t-2}.zw, xTexelC${t}.xy);
                `:d+=`
                  xCOffset = xC + 1 - 2;

                  if (xCOffset >= 0 && xCOffset < inDims[1]) {
                    previous = getX(batch, xR, xCOffset, d1);

                    // Need to manually clear unused channels in case
                    // we're reading from recycled texture.
                    if (xCOffset + 1 >= inDims[1]) {
                      previous.zw = vec2(0.0);
                    }

                    xC${t} = vec4(previous.zw, xTexelC${t}.xy);
                  } else {
                    xC${t} = vec4(0.0, 0.0, xTexelC${t}.xy);
                  }
                  `):d+=`
                if (xC >= 0 && xC < inDims[1] && xTexelC${t}Ready == 0) {
                  xTexelC${t} = getX(batch, xR, xC, d1);
                  if (xC + 1 >= inDims[1]) {
                    xTexelC${t}.zw = vec2(0.0);
                  }
                  xTexelC${t}Ready = 1;
                }

                xC${t} = xTexelC${t};
                `,t+1<p)){let e=o%2==0?I.nearestLargerEven(l):l;l%2==0&&o%2==1||l%2!=0&&o%2!=1?(d+=`
                  xCOffset = xC + imod(pads[1], 2) + ${e};

                  if (xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${t+1}Ready == 0) {
                    xTexelC${t+1} = getX(batch, xR, xCOffset, d1);

                    // Need to manually clear unused channels in case
                    // we're reading from recycled texture.
                    if (xCOffset + 1 >= inDims[1]) {
                      xTexelC${t+1}.zw = vec2(0.0);
                    }
                    xTexelC${t+1}Ready = 1;
                  }
                  `,l>1?d+=`
                    xCOffset -= 2;
                    if (xCOffset >= 0 && xCOffset < inDims[1]) {
                     previous = getX(batch, xR, xCOffset, d1);
                     xC${t+1} = vec4(previous.zw, xTexelC${t+1}.xy);
                    } else {
                     xC${t+1} = vec4(0.0, 0.0, xTexelC${t+1}.xy);
                    }
                    `:d+=`
                    xC${t+1} = vec4(xTexelC${t}.zw, xTexelC${t+1}.xy);
                    `):1===e?d+=`
                    xC${t+1} = xTexelC${t};
                    `:d+=`
                    xCOffset = xC + ${e};

                    if (xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${t+1}Ready == 0) {
                      xTexelC${t+1} = getX(batch, xR, xCOffset, d1);
                      if (xCOffset + 1 >= inDims[1]) {
                        xTexelC${t+1}.zw = vec2(0.0);
                      }
                      xTexelC${t+1}Ready = 1;
                    }

                    xC${t+1} = xTexelC${t+1};
                    `}}else t<p&&(o%2==1?(d+=`
                xCOffset = xC + 1 - strides[1];
                if(xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${t}Ready == 0) {
                  xTexelC${t} = getX(batch, xR, xCOffset, d1);
                  // Need to manually clear unused channels in case
                  // we're reading from recycled texture.
                  if (xCOffset + 1 >= inDims[1]) {
                    xTexelC${t}.zw = vec2(0.0);
                  }
                  xTexelC${t}Ready = 1;
                }

                if(xC + 1 >= 0 && xC + 1 < inDims[1] && xTexelC${t+1}Ready == 0) {
                  xTexelC${t+1} = getX(batch, xR, xC + 1, d1);
                  // Need to manually clear unused channels in case
                  // we're reading from recycled texture.
                  if (xC + 2 >= inDims[1]) {
                    xTexelC${t+1}.zw = vec2(0.0);
                  }
                  xTexelC${t+1}Ready = 1;
                }

                xC${t} = vec4(xTexelC${t}.zw, xTexelC${t+1}.zw);
              `,t+1<p&&(d+=`
                  final = vec4(0.0);
                  xCOffset = xC + 1 + strides[1];
                  if(xCOffset >= 0 && xCOffset < inDims[1]) {
                    final = getX(batch, xR, xCOffset, d1);
                  }
                  xC${t+1} = vec4(xTexelC${t+1}.xy, final.xy);
                `)):(d+=`
                if(xC >= 0 && xC < inDims[1] && xTexelC${t}Ready == 0) {
                  xTexelC${t} = getX(batch, xR, xC, d1);
                  if (xC + 1 >= inDims[1]) {
                    xTexelC${t}.zw = vec2(0.0);
                  }
                  xTexelC${t}Ready = 1;
                }

                xCOffset = xC + strides[1];
                if(xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${t+1}Ready == 0) {
                  xTexelC${t+1} = getX(batch, xR, xCOffset, d1);
                  if (xCOffset + 1 >= inDims[1]) {
                    xTexelC${t+1}.zw = vec2(0.);
                  }
                  xTexelC${t+1}Ready = 1;
                }

                xC${t} = vec4(
                  xTexelC${t}.xy, xTexelC${t+1}.xy);
              `,t+1<p&&(d+=`
                  xC${t+1} = vec4(xTexelC${t}.zw, xTexelC${t+1}.zw);
                `)));t<p&&(d+=`
            wTexel = getW(r, ${t}, d1, q);
            dotProd += xC${t} * vec4(wTexel.xz, wTexel.xz);
          `,t+1<p&&(d+=`
              wTexel = getW(r, ${t+1}, d1, q);
              dotProd += xC${t+1} * vec4(wTexel.xz, wTexel.xz);
            `))}d+=`
    }
  
      }
    `;let c="",h="";r&&(c=a?`vec4 activation(vec4 a) {
          vec4 b = getPreluActivationWeightsAtOutCoords();
          ${r}
        }`:n?`vec4 activation(vec4 a) {
          vec4 b = getLeakyreluAlphaAtOutCoords();
          ${r}
        }`:`vec4 activation(vec4 x) {
          ${r}
        }`,h="result = activation(result);"),t&&this.variableNames.push("bias"),a&&this.variableNames.push("preluActivationWeights"),n&&this.variableNames.push("leakyreluAlpha"),this.userCode=`
      ${c}

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords.x;
        ivec2 xRCCorner = coords.yz * strides - pads;
        int d2 = coords.w;
        int d1 = d2 / ${s};
        int q = d2 - d1 * ${s};
        int xRCorner = xRCCorner.x;
        int xCCorner = xRCCorner.y;

        //intialize dotProd with a small epsilon seems to reduce GPU accuracy loss.
        vec4 dotProd = vec4(0.000000000000001);

        ${d}

        vec4 result = dotProd - vec4(0.000000000000001);
        ${t?"result += getBiasAtOutCoords();":""}
        ${h}
        setOutput(result);
      }
    `}}const uM={kernelName:$.DepthwiseConv2dNative,backendName:"webgl",kernelFunc:function(e){let t,{inputs:r,backend:a,attrs:n}=e,{x:s,filter:o}=r,{strides:i,pad:l,dilations:u,dimRoundingMode:p}=n,d=u;null==d&&(d=[1,1]),I.assert(v.eitherStridesOrDilationsAreOne(i,d),()=>`Error in depthwiseConv2d: Either strides or dilations must be 1. Got strides ${i} and dilations '${d}'`);let c=v.computeConv2DInfo(s.shape,o.shape,i,d,l,p,!0);t=(0,T.env)().getBool("WEBGL_PACK_DEPTHWISECONV")&&c.strideWidth<=2&&c.outChannels/c.inChannels==1?new uO(c):new uF(c);let h=[[c.padInfo.top,c.padInfo.left],[c.strideHeight,c.strideWidth],[c.dilationHeight,c.dilationWidth],[c.inHeight,c.inWidth]];return a.runWebGLProgram(t,[s,o],"float32",h)}};g("i64bB");var v=g("7MaPk"),$=g("hl418");class uD{constructor(e){this.variableNames=["x","dy"],this.outputShape=e.filterShape;let t=e.strideHeight,r=e.strideWidth,a=e.padInfo.top,n=e.padInfo.left,s=e.outChannels/e.inChannels;this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int wR = coords.x;
        int wC = coords.y;
        int d1 = coords.z;
        int dm = coords.w;
        int d2 = d1 * ${s} + dm;

        float dotProd = 0.0;

        // TO DO: Vec4 over the batch size
        for (int b = 0; b < ${e.batchSize}; b++) {
          for (int yR = 0; yR < ${e.outHeight}; yR++) {
            int xR = wR + yR * ${t} - ${a};

            if (xR < 0 || xR >= ${e.inHeight}) {
              continue;
            }

            for (int yC = 0; yC < ${e.outWidth}; yC++) {
              int xC = wC + yC * ${r} - ${n};

              if (xC < 0 || xC >= ${e.inWidth}) {
                continue;
              }

              float dyValue = getDy(b, yR, yC, d2);
              float xValue = getX(b, xR, xC, d1);
              dotProd += (xValue * dyValue);
            }
          }
        }
        setOutput(dotProd);
      }
    `}}class u_{constructor(e){this.variableNames=["dy","W"],this.outputShape=e.inShape;let t=e.filterHeight,r=e.filterWidth,a=e.strideHeight,n=e.strideWidth,s=t-1-e.padInfo.top,o=r-1-e.padInfo.left,i=e.outChannels/e.inChannels;this.userCode=`
      const ivec2 pads = ivec2(${s}, ${o});

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords[0];
        int d1 = coords[3];
        ivec2 dyCorner = coords.yz - pads;
        int dyRCorner = dyCorner.x;
        int dyCCorner = dyCorner.y;

        float dotProd = 0.0;

        for (int wR = 0; wR < ${t}; wR++) {
          float dyR = float(dyRCorner + wR) / ${a}.0;

          if (dyR < 0.0 || dyR >= ${e.outHeight}.0 || fract(dyR) > 0.0) {
            continue;
          }
          int idyR = int(dyR);

          int wRPerm = ${t} - 1 - wR;

          for (int wC = 0; wC < ${r}; wC++) {
            float dyC = float(dyCCorner + wC) / ${n}.0;

            if (dyC < 0.0 || dyC >= ${e.outWidth}.0 ||
                fract(dyC) > 0.0) {
              continue;
            }
            int idyC = int(dyC);

            int wCPerm = ${r} - 1 - wC;

            // TO DO: Vec4 over the channelMul
            for (int dm = 0; dm < ${i}; dm++) {
              int d2 = d1 * ${i} + dm;
              float xValue = getDy(batch, idyR, idyC, d2);
              float wValue = getW(wRPerm, wCPerm, d1, dm);
              dotProd += xValue * wValue;
            }
          }
        }
        setOutput(dotProd);
      }
    `}}const uL={kernelName:$.DepthwiseConv2dNativeBackpropFilter,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{x:n,dy:s}=t,{strides:o,dilations:i,pad:l,dimRoundingMode:u,filterShape:p}=a,d=new uD(v.computeConv2DInfo(n.shape,p,o,i,l,u,!0));return r.runWebGLProgram(d,[n,s],"float32")}};g("i64bB");var v=g("7MaPk"),$=g("hl418");const uV={kernelName:$.DepthwiseConv2dNativeBackpropInput,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{dy:n,filter:s}=t,{strides:o,dilations:i,pad:l,dimRoundingMode:u,inputShape:p}=a,d=new u_(v.computeConv2DInfo(p,s.shape,o,i,l,u,!0));return r.runWebGLProgram(d,[n,s],"float32")}};g("i64bB");var $=g("hl418"),I=g("jjNRA");class uG{constructor(e){this.variableNames=["X"],this.outputShape=[e,e],this.userCode=`
      void main() {
          ivec2 coords = getOutputCoords();
          float val = coords[0] == coords[1] ? getX(coords[0]) : 0.0;
          setOutput(val);
      }
    `}}const uW={kernelName:$.Diag,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r}=e,{x:a}=t,n=[...a.shape,...a.shape],s=I.sizeFromShape(a.shape),o=iG({inputs:{x:a},backend:r,attrs:{shape:[s]}}),i=new uG(s),l=r.runWebGLProgram(i,[o],o.dtype),u=iG({inputs:{x:l},backend:r,attrs:{shape:n}});return r.disposeIntermediateTensorInfo(o),r.disposeIntermediateTensorInfo(l),u}};g("i64bB");var v=g("7MaPk"),$=g("hl418");class uz{constructor(e){this.variableNames=["x","W"],this.outputShape=e.outShape;let{inHeight:t,inWidth:r,padInfo:a,strideHeight:n,strideWidth:s,filterHeight:o,filterWidth:i,dilationHeight:l,dilationWidth:u}=e,{top:p,left:d}=a;this.userCode=`
      const ivec2 strides = ivec2(${n}, ${s});
      const ivec2 pads = ivec2(${p}, ${d});
      const float neg_infinity = -3.4e38;

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords.x;
        int d1 = coords.w;
        ivec2 outTopLeftCorner =
            coords.yz * strides - pads;
        int hBeg = outTopLeftCorner.x;
        int wBeg = outTopLeftCorner.y;

        float curVal = neg_infinity;
        for (int h = 0; h < ${o}; h++) {
          int hIn = hBeg + h * ${l};

          if (hIn >= 0 && hIn < ${t}) {
            for (int w = 0; w < ${i}; w++) {
              int wIn = wBeg + w * ${u};

              if (wIn >= 0 && wIn < ${r}) {
                float xVal = getX(batch, hIn, wIn, d1);
                float wVal = getW(h, w, d1);

                float val = xVal + wVal;
                if (val > curVal) {
                  curVal = val;
                }
              }
            }
          }
        }

        float result = curVal;
        setOutput(result);
      }
    `}}const uj={kernelName:$.Dilation2D,backendName:"webgl",kernelFunc:function(e){let t,{inputs:r,backend:a,attrs:n}=e,{x:s,filter:o}=r,{strides:i,pad:l,dilations:u}=n,p=v.computeDilation2DInfo(s.shape,o.shape,i,l,"NHWC",u),d=new uz(p),c=iG({inputs:{x:t=a.runWebGLProgram(d,[s,o],"float32")},backend:a,attrs:{shape:p.outShape}});return a.disposeIntermediateTensorInfo(t),c}};g("i64bB");var v=g("7MaPk"),$=g("hl418"),I=g("jjNRA");const uU={kernelName:$.Einsum,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{equation:n}=a,{allDims:s,summedDims:o,idDims:i}=v.decodeEinsumEquation(n,t.length);v.checkEinsumDimSizes(s.length,i,t);let{path:l,steps:u}=v.getEinsumComputePath(o,i),p=u.length,d=null,c=s.length,h=[];for(let e=0;e<p;++e){for(let a of u[e]){let e,{permutationIndices:n,expandDims:s}=v.getEinsumPermutation(c,i[a]);v.isIdentityPermutation(n)?e=t[a]:(e=iY({inputs:{x:t[a]},backend:r,attrs:{perm:n}}),h.push(e));let o=e.shape.slice();for(let e=0;e<s.length;++e)o.splice(s[e],0,1);I.arraysEqual(e.shape,o)||(e=iG({inputs:{x:e},backend:r,attrs:{shape:o}}),h.push(e)),null===d?d=e:(d=iL({inputs:{a:e,b:d},backend:r}),h.push(d))}e<p-1&&(l[e]>=0&&(d=iX({inputs:{x:d},backend:r,attrs:{axis:l[e]-(s.length-c),keepDims:!1}}),h.push(d)),c--)}for(let e of h)e!==d&&r.disposeIntermediateTensorInfo(e);return d}};g("i64bB");var $=g("hl418");const uq=iP({opSnippet:"return (x >= 0.0) ? x : (exp(x) - 1.0);",packedOpSnippet:`
  vec4 result;

  result.r = (x.r >= 0.0) ? x.r : (exp(x.r) - 1.0);
  result.g = (x.g >= 0.0) ? x.g : (exp(x.g) - 1.0);
  result.b = (x.b >= 0.0) ? x.b : (exp(x.b) - 1.0);
  result.a = (x.a >= 0.0) ? x.a : (exp(x.a) - 1.0);

  return result;
`}),uH={kernelName:$.Elu,backendName:"webgl",kernelFunc:uq};g("i64bB");var $=g("hl418"),T=g("ibsdL");const uK=`
  vec4 bGTEZero = vec4(greaterThanEqual(b, vec4(0.)));
  return (bGTEZero * a) + ((vec4(1.0) - bGTEZero) * (a * (b + vec4(1.0))));
`,uX={kernelName:$.EluGrad,backendName:"webgl",kernelFunc:e=>{let{inputs:t,backend:r}=e,{dy:a,y:n}=t,s=(0,T.env)().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new iv(uK,a.shape,n.shape):new iy("return (b >= 0.0) ? a : a * (b + 1.0);",a.shape,n.shape);return r.runWebGLProgram(s,[a,n],a.dtype)}};g("i64bB");var $=g("hl418");const uZ=iB({opSnippet:"return float(a == b);",packedOpSnippet:`
  return vec4(equal(a, b));
`,dtype:"bool",cpuKernelImpl:of}),uY={kernelName:$.Equal,backendName:"webgl",kernelFunc:uZ};g("i64bB");var v=g("7MaPk"),$=g("hl418");const uQ=iP({opSnippet:`
  // Error function is calculated approximately with elementary function.
  // See "Handbook of Mathematical Functions with Formulas,
  // Graphs, and Mathematical Tables", Abramowitz and Stegun.
  float p = ${v.ERF_P};
  float a1 = ${v.ERF_A1};
  float a2 = ${v.ERF_A2};
  float a3 = ${v.ERF_A3};
  float a4 = ${v.ERF_A4};
  float a5 = ${v.ERF_A5};

  float sign = sign(x);
  x = abs(x);
  float t = 1.0 / (1.0 + p * x);
  return sign * (1.0 - (((((a5*t + a4)*t) + a3)*t + a2)*t + a1)*t*exp(-x*x));
`}),uJ={kernelName:$.Erf,backendName:"webgl",kernelFunc:uQ};g("i64bB");var $=g("hl418");const u0=iP({opSnippet:iR+`
  return exp(x);
`,packedOpSnippet:`
  vec4 result = exp(x);
  bvec4 isNaN = isnan(x);
  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`,cpuKernelImpl:om,dtype:"float32"}),u1={kernelName:$.Exp,backendName:"webgl",kernelFunc:u0};g("i64bB");var $=g("hl418"),I=g("jjNRA");function u2(e){let{inputs:t,attrs:r,backend:a}=e,{dim:n}=r,{input:s}=t,o=s.shape.length,i=s.shape.slice(),l=n;return n<0&&(I.assert(-(o+1)<=n,()=>`Axis must be in the interval [${-(o+1)}, ${o}]`),l=o+n+1),i.splice(l,0,1),iG({inputs:{x:s},backend:a,attrs:{shape:i}})}const u4={kernelName:$.ExpandDims,backendName:"webgl",kernelFunc:u2};g("i64bB");var $=g("hl418");const u3="return exp(x) - 1.0;",u8=iP({opSnippet:u3,packedOpSnippet:u3,cpuKernelImpl:og}),u6={kernelName:$.Expm1,backendName:"webgl",kernelFunc:u8};g("i64bB");var $=g("hl418");g("i64bB");var I=g("jjNRA");class u5{constructor(e,t,r){let a;this.variableNames=["real","imag"];let n=t[1];this.outputShape=t;let s=r?`2.0 * ${Math.PI}`:`-2.0 * ${Math.PI}`,o=r?`${n}.0`:"1.0";if("real"===e)a="return real * expR - imag * expI;";else if("imag"===e)a="return real * expI + imag * expR;";else throw Error(`FFT component must be either "real" or "imag", got ${e}.`);this.userCode=`
      const float exponentMultiplier = ${s};

      float unaryOpComplex(float real, float expR, float imag, float expI) {
        ${a}
      }

      float mulMatDFT(int batch, int index) {
        float indexRatio = float(index) / float(${n});
        float exponentMultiplierTimesIndexRatio =
            exponentMultiplier * indexRatio;

        float result = 0.0;

        for (int i = 0; i < ${n}; i++) {
          // x = (-2|2 * PI / N) * index * i;
          float x = exponentMultiplierTimesIndexRatio * float(i);
          float expR = cos(x);
          float expI = sin(x);
          float real = getReal(batch, i);
          float imag = getImag(batch, i);

          result +=
              unaryOpComplex(real, expR, imag, expI) / ${o};
        }

        return result;
      }

      void main() {
        ivec2 coords = getOutputCoords();
        setOutput(mulMatDFT(coords[0], coords[1]));
      }
    `}}function u7(e,t,r){let a=r.texData.get(e.dataId),n=I.sizeFromShape(e.shape),s=e.shape[e.shape.length-1],o=iG({inputs:{x:e},backend:r,attrs:{shape:[n/s,s]}}),i=o.shape,l=new u5("real",i,t),u=new u5("imag",i,t),p=[{dataId:a.complexTensorInfos.real.dataId,dtype:a.complexTensorInfos.real.dtype,shape:i},{dataId:a.complexTensorInfos.imag.dataId,dtype:a.complexTensorInfos.imag.dtype,shape:i}],d=r.runWebGLProgram(l,p,"float32"),c=r.runWebGLProgram(u,p,"float32"),h=iT({inputs:{real:d,imag:c},backend:r});r.disposeIntermediateTensorInfo(d),r.disposeIntermediateTensorInfo(c);let f=iG({inputs:{x:h},backend:r,attrs:{shape:e.shape}});return r.disposeIntermediateTensorInfo(o),r.disposeIntermediateTensorInfo(h),f}const u9={kernelName:$.FFT,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r}=e,{input:a}=t;return u7(a,!1,r)}};g("i64bB");var $=g("hl418"),I=g("jjNRA");class pe{constructor(e,t){this.outputShape=[],this.customUniforms=[{name:"value",type:"float"}],this.variableNames=["x"],this.outputShape=e,this.userCode=`
      void main() {
        // Input can be obtained from uniform value.
        setOutput(value);
      }
    `}}function pt(e){let{backend:t,attrs:r}=e,{shape:a,value:n}=r,{dtype:s}=r;if("string"===(s=s||I.inferDtype(n))){let e=I.getArrayFromDType(s,I.sizeFromShape(a));return e.fill(n),t.makeTensorInfo(a,s,e)}{let e=new pe(a,n),r=[[n]];return t.runWebGLProgram(e,[],s,r)}}const pr={kernelName:$.Fill,backendName:"webgl",kernelFunc:pt};g("i64bB");var $=g("hl418");class pa{constructor(e){this.variableNames=["Image"],this.outputShape=[];let t=e[2];this.outputShape=e,this.userCode=`
        void main() {
          ivec4 coords = getOutputCoords();
          int x = coords[2];

          int coordX = ${t} - x - 1;
          float outputValue;
          if(coordX >= 0 && coordX < ${t}) {
            outputValue = getImage(coords[0], coords[1], coordX, coords[3]);
          } else {
            outputValue = getImage(coords[0], coords[1], coords[2], coords[3]);
          }
          setOutput(outputValue);
        }
    `}}const pn={kernelName:$.FlipLeftRight,backendName:"webgl",kernelFunc:({inputs:e,backend:t})=>{let{image:r}=e,a=new pa(r.shape);return t.runWebGLProgram(a,[r],r.dtype)}};g("i64bB");var $=g("hl418");const ps="return floor(x);",po=iP({opSnippet:ps,packedOpSnippet:ps,cpuKernelImpl:ox}),pi={kernelName:$.Floor,backendName:"webgl",kernelFunc:po};g("i64bB");var $=g("hl418");const pl=iB({opSnippet:`
  float s = sign(a) * sign(b);
  int ia = round(a);
  int ib = round(b);
  if (ib != 0) {
    // Windows (D3D) wants guaranteed non-zero int division at compile-time.
    return float(idiv(ia, ib, s));
  } else {
    return NAN;
  }
`,packedOpSnippet:`
  ivec4 ia = round(a);
  ivec4 ib = round(b);
  bvec4 cond = notEqual(ib, ivec4(0));
  ivec4 result = ivec4(0);
  vec4 s = sign(a) * sign(b);

  // Windows (D3D) wants guaranteed non-zero int division at compile-time.
  if (cond[0]) {
    result[0] = idiv(ia[0], ib[0], s[0]);
  }
  if (cond[1]) {
    result[1] = idiv(ia[1], ib[1], s[1]);
  }
  if (cond[2]) {
    result[2] = idiv(ia[2], ib[2], s[2]);
  }
  if (cond[3]) {
    result[3] = idiv(ia[3], ib[3], s[3]);
  }
  return vec4(result);
`,dtype:"int32"}),pu={kernelName:$.FloorDiv,backendName:"webgl",kernelFunc:pl};g("i64bB");var T=g("ibsdL"),$=g("hl418");class pp{constructor(e){this.variableNames=["A"];let t=sO(),[r,a]=e;this.outputShape=e,this.userCode=`
      void main() {
        ivec3 coords = getOutputCoords();
        int texR = coords[0];
        int texC = coords[1];
        int depth = coords[2];
        vec2 uv = (vec2(texC, texR) + halfCR) / vec2(${a}.0, ${r}.0);

        vec4 values = ${t.texture2D}(A, uv);
        float value;
        if (depth == 0) {
          value = values.r;
        } else if (depth == 1) {
          value = values.g;
        } else if (depth == 2) {
          value = values.b;
        } else if (depth == 3) {
          value = values.a;
        }

        setOutput(floor(value * 255.0 + 0.5));
      }
    `}}class pd{constructor(e){this.variableNames=["A"],this.packedInputs=!1,this.packedOutput=!0;let t=sO(),[r,a]=e;this.outputShape=e,this.userCode=`
      void main() {
        ivec3 coords = getOutputCoords();
        int texR = coords[0];
        int texC = coords[1];
        int depth = coords[2];

        vec4 result = vec4(0.);

        for(int row=0; row<=1; row++) {
          for(int col=0; col<=1; col++) {
            texC = coords[1] + row;
            depth = coords[2] + col;

            vec2 uv = (vec2(texC, texR) + halfCR) /
                       vec2(${a}.0, ${r}.0);
            vec4 values = ${t.texture2D}(A, uv);
            float value;
            if (depth == 0) {
              value = values.r;
            } else if (depth == 1) {
              value = values.g;
            } else if (depth == 2) {
              value = values.b;
            } else if (depth == 3) {
              value = values.a;
            }

            result[row * 2 + col] = floor(value * 255.0 + 0.5);
          }
        }

        ${t.output} = result;
      }
    `}}const pc={kernelName:$.FromPixels,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:a,attrs:n}=e,{pixels:s}=t,{numChannels:o}=n,i="undefined"!=typeof HTMLVideoElement&&s instanceof HTMLVideoElement,l="undefined"!=typeof HTMLImageElement&&s instanceof HTMLImageElement,[u,d]=i?[s.videoWidth,s.videoHeight]:[s.width,s.height],c=[d,u],h=[d,u,o];if(l||i){let e=(0,T.env)().getBool("CANVAS2D_WILL_READ_FREQUENTLY_FOR_GPU");(null==r||e!==ph)&&(ph=e,r=document.createElement("canvas").getContext("2d",{willReadFrequently:ph})),r.canvas.width=u,r.canvas.height=d,r.drawImage(s,0,0,u,d),s=r.canvas}let f=a.makeTensorInfo(c,"int32");a.texData.get(f.dataId).usage=p.PIXELS,a.gpgpu.uploadPixelDataToTexture(a.getTexture(f.dataId),s);let m=(0,T.env)().getBool("WEBGL_PACK")?new pd(h):new pp(h),g=a.runWebGLProgram(m,[f],"int32");return a.disposeData(f.dataId),g}};let ph=(0,T.env)().getBool("CANVAS2D_WILL_READ_FREQUENTLY_FOR_GPU");g("i64bB");var v=g("7MaPk"),T=g("ibsdL"),$=g("hl418"),I=g("jjNRA");const pf={kernelName:$.FusedConv2D,backendName:"webgl",kernelFunc:function(e){let t,{inputs:r,backend:a,attrs:n}=e,{x:s,filter:o,bias:i,preluActivationWeights:l}=r,{strides:u,pad:p,dataFormat:d,dilations:c,dimRoundingMode:h,activation:f,leakyreluAlpha:m}=n,g=v.convertConv2DDataFormat(d),x=v.computeConv2DInfo(s.shape,o.shape,u,c,p,h,!1,g),y=[],b=null!=i,N=null!=l,k="leakyrelu"===f,S=()=>{let e=[s,o],t=(e,t)=>{if("NCHW"===t&&1===e.shape.length&&1!==e.shape[0]){let t=iG({inputs:{x:e},backend:a,attrs:{shape:[e.shape[0],1,1]}});return y.push(t),t}return e};if(b&&e.push(t(i,d)),N&&e.push(t(l,d)),k){let t=a.makeTensorInfo([],"float32",I.createScalarValue(m,"float32"));e.push(t),y.push(t)}return e};if(1===x.filterHeight&&1===x.filterWidth&&1===x.dilationHeight&&1===x.dilationWidth&&1===x.strideHeight&&1===x.strideWidth&&("SAME"===x.padInfo.type||"VALID"===x.padInfo.type))t=uo({x:s,filter:o,convInfo:x,backend:a,bias:i,activation:f,preluActivationWeights:l,leakyreluAlpha:m});else if(x.strideWidth<=2&&"channelsLast"===g&&(0,T.env)().getBool("WEBGL_EXP_CONV")){let e=new ua(x,b,f?iF(f,!0):null,N,k),r=[[x.padInfo.top,x.padInfo.left],[x.strideHeight,x.strideWidth],[x.dilationHeight,x.dilationWidth],[x.inHeight,x.inWidth]],n=S();t=a.runWebGLProgram(e,n,"float32",r)}else if((0,T.env)().getBool("WEBGL_CONV_IM2COL"))t=ui({x:s,filter:o,convInfo:x,backend:a,bias:i,activation:f,preluActivationWeights:l,leakyreluAlpha:m});else{let e=new ut(x,b,f?iF(f,!1):null,N,k),r=S();t=a.runWebGLProgram(e,r,"float32")}let w=iG({inputs:{x:t},backend:a,attrs:{shape:x.outShape}});return y.push(t),y.forEach(e=>a.disposeIntermediateTensorInfo(e)),w}};g("i64bB");var v=g("7MaPk"),T=g("ibsdL"),$=g("hl418"),I=g("jjNRA");const pm={kernelName:$.FusedDepthwiseConv2D,backendName:"webgl",kernelFunc:function(e){let t,{inputs:r,backend:a,attrs:n}=e,{x:s,filter:o,bias:i,preluActivationWeights:l}=r,{strides:u,pad:p,dilations:d,dimRoundingMode:c,activation:h,leakyreluAlpha:f}=n,m=[],g=d;null==g&&(g=[1,1]),I.assert(v.eitherStridesOrDilationsAreOne(u,g),()=>`Error in depthwiseConv2d: Either strides or dilations must be 1. Got strides ${u} and dilations '${g}'`);let x=v.computeConv2DInfo(s.shape,o.shape,u,g,p,c,!0),y=(0,T.env)().getBool("WEBGL_PACK_DEPTHWISECONV")&&x.strideWidth<=2&&x.outChannels/x.inChannels==1,b=h?iF(h,y):null,N=[s,o],k=null!=i,S=null!=l,w="leakyrelu"===h;if(k&&N.push(i),S&&N.push(l),w){let e=a.makeTensorInfo([],"float32",I.createScalarValue(f,"float32"));N.push(e),m.push(e)}t=y?new uO(x,k,b,S,w):new uF(x,k,b,S,w);let C=[[x.padInfo.top,x.padInfo.left],[x.strideHeight,x.strideWidth],[x.dilationHeight,x.dilationWidth],[x.inHeight,x.inWidth]],E=a.runWebGLProgram(t,N,"float32",C);return m.forEach(e=>a.disposeIntermediateTensorInfo(e)),E}};g("i64bB");var v=g("7MaPk"),$=g("hl418"),I=g("jjNRA");class pg{constructor(e,t,r,a){this.sliceDim=e,this.strides=t,this.paramsShape=a,this.variableNames=["x","indices"],this.outputShape=r;let n=sX(r.length),s=`
    int index;`;for(let e=0;e<this.sliceDim;e++)s+=`
          index = round(getIndices(coords[0], ${e}));
          out_of_bounds = out_of_bounds || index < 0;
          out_of_bounds = out_of_bounds || index >= ${this.paramsShape[e]};
          flattenIndex += index * ${this.strides[e]};`;this.userCode=`
         void main() {
          ${n} coords = getOutputCoords();
          int flattenIndex = 0;
          bool out_of_bounds = false;

          ${s}

          setOutput(out_of_bounds ? 0.0 : getX(flattenIndex, coords[1]));
        }
      `}}const px={kernelName:$.GatherNd,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r}=e,{params:a,indices:n}=t,s=n.shape,o=s[s.length-1],i=I.sizeFromShape(a.shape),[l,u,p,d]=v.prepareAndValidate(a,n),c=iG({inputs:{x:n},backend:r,attrs:{shape:[u,o]}}),h=iG({inputs:{x:a},backend:r,attrs:{shape:[I.sizeFromShape(a.shape)/p,p]}});if(r.shouldExecuteOnCPU([a,n])||"string"===a.dtype){let e=oy(r.readSync(n.dataId),r.bufferSync(a),a.dtype,u,o,p,d,a.shape,i);return r.makeTensorInfo(l,a.dtype,e.values)}let f=new pg(o,d,[u,p],a.shape),m=r.runWebGLProgram(f,[h,c],h.dtype),g=iG({inputs:{x:m},backend:r,attrs:{shape:l}});return r.disposeIntermediateTensorInfo(c),r.disposeIntermediateTensorInfo(h),r.disposeIntermediateTensorInfo(m),g}};g("i64bB");var v=g("7MaPk"),T=g("ibsdL"),$=g("hl418"),I=g("jjNRA");class py{constructor(e,t){this.variableNames=["A","indices"],this.outputShape=t,this.rank=t.length;let r=sX(this.rank),a=function(e,t){let r=["resRC.x","resRC.y","resRC.z","resRC.w"],a=[];for(let t=0;t<e.length;t++)2===t?a.push("index"):a.push(`${r[t]}`);return a.join()}(e,0);this.userCode=`
      void main() {
        ${r} resRC = getOutputCoords();
        int index = int(getIndices(resRC.x, resRC.z));
        float inBounds = (index >= 0) && (index < ${e[2]}) ? 1.0 : 0.0;
        setOutput(inBounds * getA(${a}));
      }
    `}}function pb(e){let{inputs:t,backend:r,attrs:a}=e,{x:n,indices:s}=t,{axis:o,batchDims:i}=a,l=I.parseAxisParam(o,n.shape)[0];if((0,T.env)().get("DEBUG")){let e=r.readSync(s.dataId),t=n.shape[l];for(let r=0;r<e.length;++r){let a=e[r];I.assert(a<=t-1&&a>=0,()=>`GatherV2: the index value ${a} is not in [0, ${t-1}]`)}}let u=v.segment_util.collectGatherOpShapeInfo(n,s,l,i),p=I.sizeFromShape(s.shape),d=[],c=iG({inputs:{x:n},backend:r,attrs:{shape:[u.batchSize,u.outerSize,u.dimSize,u.sliceSize]}}),h=iG({inputs:{x:s},backend:r,attrs:{shape:[u.batchSize,p/u.batchSize]}});d.push(c),d.push(h);let f=[u.batchSize,u.outerSize,p/u.batchSize,u.sliceSize];if(r.shouldExecuteOnCPU([n,s])||"string"===n.dtype){let e=r.bufferSync(h),t=ob(r.bufferSync(c),e,f);return d.forEach(e=>r.disposeIntermediateTensorInfo(e)),r.makeTensorInfo(u.outputShape,t.dtype,t.values)}let m=new py(c.shape,f),g=r.runWebGLProgram(m,[c,h],c.dtype);d.push(g);let x=iG({inputs:{x:g},backend:r,attrs:{shape:u.outputShape}});return d.forEach(e=>r.disposeIntermediateTensorInfo(e)),x}const pv={kernelName:$.GatherV2,backendName:"webgl",kernelFunc:pb};g("i64bB");var $=g("hl418");const pN=iB({opSnippet:"return float(a > b);",packedOpSnippet:`
  return vec4(greaterThan(a, b));
`,cpuKernelImpl:ov,dtype:"bool"}),pk={kernelName:$.Greater,backendName:"webgl",kernelFunc:pN};g("i64bB");var $=g("hl418");const pT=iB({opSnippet:"return float(a >= b);",packedOpSnippet:`
  return vec4(greaterThanEqual(a, b));
`,dtype:"bool",cpuKernelImpl:oN}),pS={kernelName:$.GreaterEqual,backendName:"webgl",kernelFunc:pT};g("i64bB");var $=g("hl418");const pI={kernelName:$.IFFT,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r}=e,{input:a}=t;return u7(a,!0,r)}};g("i64bB");var $=g("hl418");const pw=iP({opSnippet:"return float(!isnan(x) && !isinf(x));",dtype:"bool"}),pC={kernelName:$.IsFinite,backendName:"webgl",kernelFunc:pw};g("i64bB");var $=g("hl418");const pE=iP({opSnippet:"return float(isinf(x));",dtype:"bool"}),pA={kernelName:$.IsInf,backendName:"webgl",kernelFunc:pE};g("i64bB");var $=g("hl418");const p$=iP({opSnippet:"return float(isnan(x));",dtype:"bool"}),pR={kernelName:$.IsNan,backendName:"webgl",kernelFunc:p$};g("i64bB");var $=g("hl418");const pP=iB({opSnippet:"return float(a < b);",packedOpSnippet:`
  return vec4(lessThan(a, b));
`,cpuKernelImpl:ok,dtype:"bool"}),pB={kernelName:$.Less,backendName:"webgl",kernelFunc:pP};g("i64bB");var $=g("hl418");const pF=iB({opSnippet:"return float(a <= b);",packedOpSnippet:`
  return vec4(lessThanEqual(a, b));
`,cpuKernelImpl:oT,dtype:"bool"}),pO={kernelName:$.LessEqual,backendName:"webgl",kernelFunc:pF};g("i64bB");var $=g("hl418");const pM={kernelName:$.LinSpace,backendName:"webgl",kernelFunc:function(e){let{backend:t,attrs:r}=e,{start:a,stop:n,num:s}=r,o=oS(a,n,s);return t.makeTensorInfo([o.length],"float32",o)}};g("i64bB");var $=g("hl418");const pD=iP({opSnippet:iR+`
  return x < 0.0 ? 0./0. : log(x);
`,packedOpSnippet:`
  vec4 result = log(x);
  bvec4 isNaN = isnan(x);
  result.r = isNaN.r ? x.r : (x.r < 0.0 ? 0./0. : result.r);
  result.g = isNaN.g ? x.g : (x.g < 0.0 ? 0./0. : result.g);
  result.b = isNaN.b ? x.b : (x.b < 0.0 ? 0./0. : result.b);
  result.a = isNaN.a ? x.a : (x.a < 0.0 ? 0./0. : result.a);
  return result;
`,cpuKernelImpl:oI}),p_={kernelName:$.Log,backendName:"webgl",kernelFunc:pD};g("i64bB");var $=g("hl418");const pL=iP({opSnippet:iR+`
  return log(1.0 + x);
`}),pV={kernelName:$.Log1p,backendName:"webgl",kernelFunc:pL};g("i64bB");var $=g("hl418");const pG=iB({opSnippet:"return float(a >= 1.0 && b >= 1.0);",packedOpSnippet:`
  return vec4(
    vec4(greaterThanEqual(a, vec4(1.0))) *
    vec4(greaterThanEqual(b, vec4(1.0))));
`,dtype:"bool"}),pW={kernelName:$.LogicalAnd,backendName:"webgl",kernelFunc:pG};g("i64bB");var $=g("hl418");const pz=iP({opSnippet:"return float(!(x >= 1.0));"}),pj={kernelName:$.LogicalNot,backendName:"webgl",kernelFunc:pz};g("i64bB");var $=g("hl418");const pU=iB({opSnippet:"return float(a >= 1.0 || b >= 1.0);",packedOpSnippet:`
  return min(
    vec4(greaterThanEqual(a, vec4(1.0))) +
    vec4(greaterThanEqual(b, vec4(1.0))),
    vec4(1.0));
`,dtype:"bool"}),pq={kernelName:$.LogicalOr,backendName:"webgl",kernelFunc:pU};g("i64bB");var T=g("ibsdL"),$=g("hl418");class pH{constructor(e,t,r,a,n){let s;this.variableNames=["x"],this.outputShape=[];let o=e[3]-1;this.outputShape=e;let i=`float(${r}) + float(${a}) * sum`;s=.5===n?`inversesqrt(${i})`:1===n?`1.0/(${i})`:`exp(log(${i}) * float(-${n}));`,this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int r = coords[1];
        int c = coords[2];
        int d = coords[3];
        float x = getX(b, r, c, d);
        float sum = 0.0;
        for (int j = -${t}; j <= ${t}; j++) {
          int idx = d + j;
          if (idx >= 0 && idx <=  ${o}) {
            float z = getX(b, r, c, idx);
            sum += z * z;
          }
        }
        float val = x * ${s};
        setOutput(val);
      }
    `}}class pK{constructor(e,t,r,a,n){let s;this.variableNames=["x"],this.outputShape=[],this.packedInputs=!0,this.packedOutput=!0;let o=e[3]-1;this.outputShape=e;let i=`float(${r}) + float(${a}) * sum`;s=.5===n?`inversesqrt(${i})`:1===n?`1.0/(${i})`:`exp(log(${i}) * float(-${n}));`,this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords.x;
        int r = coords.y;
        int c = coords.z;
        int d = coords.w;

        bool hasNextCol = d < ${this.outputShape[3]};
        bool hasNextRow = c < ${this.outputShape[2]};

        vec4 sum = vec4(0.);
        vec4 xFragAtOutputCoords = getX(b, r, c, d);

        vec4 xAtOutputCoords = vec4(
          getChannel(xFragAtOutputCoords, vec2(c, d)),
          hasNextCol ?
            getChannel(xFragAtOutputCoords, vec2(c, d + 1)) : 0.0,
          hasNextRow ?
            getChannel(xFragAtOutputCoords , vec2(c + 1, d)) : 0.0,
          (hasNextRow && hasNextCol) ?
            getChannel(xFragAtOutputCoords, vec2(c + 1, d + 1)) : 0.0
        );

        int firstChannel = d - ${t};
        vec2 cache = vec2(0.);
        if(firstChannel >= 0){
          vec4 firstChannelFrag = getX(b, r, c, firstChannel);
          cache.x = getChannel(firstChannelFrag, vec2(c, firstChannel));
            if(hasNextRow){
              cache.y = getChannel(firstChannelFrag, vec2(c + 1, firstChannel));
            }
        }

        ivec2 depth = ivec2(d, d + 1);
        for (int j = - ${t}; j <= ${t}; j++) {
          ivec2 idx = depth + j;
          bvec2 aboveLowerBound = greaterThanEqual(idx, ivec2(0));
          bvec2 belowUpperBound = lessThanEqual(idx, ivec2(${o}));

          bool depthInRange = aboveLowerBound.x && belowUpperBound.x;
          bool depthPlusOneInRange = aboveLowerBound.y && belowUpperBound.y;

          if(depthInRange || depthPlusOneInRange){
            vec4 z = vec4(0.);
            vec4 xFragAtCurrentDepth;
            z.xz = cache.xy;
            if(depthPlusOneInRange && hasNextCol){
              xFragAtCurrentDepth = idx.y != d ?
                getX(b, r, c, idx.y) : xFragAtOutputCoords;
              z.y = getChannel(xFragAtCurrentDepth, vec2(c, idx.y));
              if(hasNextRow){
                z.w = getChannel(xFragAtCurrentDepth, vec2(c + 1, idx.y));
              }
            }
            cache.xy = z.yw;
            sum += z * z;
          }
        }
        vec4 result = xAtOutputCoords * ${s};
        setOutput(result);
      }
    `}}const pX={kernelName:$.LRN,backendName:"webgl",kernelFunc:e=>{let{inputs:t,backend:r,attrs:a}=e,{x:n}=t,{depthRadius:s,bias:o,alpha:i,beta:l}=a,u=(0,T.env)().getBool("WEBGL_PACK_NORMALIZATION")?new pK(n.shape,s,o,i,l):new pH(n.shape,s,o,i,l);return r.runWebGLProgram(u,[n],n.dtype)}};g("i64bB");var $=g("hl418");class pZ{constructor(e,t,r,a,n){this.variableNames=["inputImage","outputImage","dy"],this.outputShape=[],this.outputShape=e,this.depth=e[3],this.depthRadius=t,this.bias=r,this.alpha=a,this.beta=n,this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int r = coords[1];
        int c = coords[2];

        float result = 0.0;
        for (int d = 0; d < ${this.depth}; ++d) {
          int depthBegin = int(max(0.0, float(d - ${t})));
          int depthEnd = int(min(float(${this.depth}),
              float(d + ${t} + 1)));

          const int MIN_DEPTH_BEGIN = 0;
          const int MAX_DEPTH_END = ${this.depth};

          float norm = 0.0;
          for (int k = MIN_DEPTH_BEGIN; k < MAX_DEPTH_END; ++k) {
            if (k < depthBegin){
              continue;
            }
            else if (k >= depthBegin && k < depthEnd) {
              norm += getInputImage(b, r, c, k) * getInputImage(b, r, c, k);
            }
            else {
              break;
            }
          }

          norm = float(${a}) * norm + float(${r});

          for(int k = MIN_DEPTH_BEGIN; k < MAX_DEPTH_END; ++k){
            if (k < depthBegin){
              continue;
            }
            else if (k >= depthBegin && k < depthEnd){
              float dyi = -2.0 * float(${a})
                * float(${n})
                * getInputImage(b, r, c, k) * getOutputImage(b, r, c, d)
                / norm;
              if (k == d) {
                dyi += pow(norm, -1.0 * ${n});
              }
              if (k == coords[3]) {
                dyi *= getDy(b, r, c, d);
                result += dyi;
              }
            }
            else {
              break;
            }
          }
      }
      setOutput(result);
      }
    `}}const pY={kernelName:$.LRNGrad,backendName:"webgl",kernelFunc:e=>{let{inputs:t,backend:r,attrs:a}=e,{x:n,y:s,dy:o}=t,{depthRadius:i,bias:l,alpha:u,beta:p}=a,d=new pZ(n.shape,i,l,u,p);return r.runWebGLProgram(d,[n,s,o],n.dtype)}};g("i64bB");var v=g("7MaPk"),$=g("hl418"),I=g("jjNRA");g("i64bB");var I=g("jjNRA");function pQ(e){let t,{inputs:r,backend:a,attrs:n}=e,{x:s}=r,{reductionIndices:o,keepDims:i}=n,l=s.shape.length,u=I.parseAxisParam(o,s.shape),p=u,d=v.getAxesPermutation(p,l),c=null!=d,h=a.shouldExecuteOnCPU([s]),f=s;if(c){if(h){let e=a.texData.get(f.dataId).values,t=Array(l);for(let e=0;e<t.length;e++)t[e]=s.shape[d[e]];let r=o0(e,s.shape,s.dtype,d,t);f=a.makeTensorInfo(t,s.dtype),a.texData.get(f.dataId).values=r}else f=iK(s,d,a);p=v.getInnerMostAxes(p.length,l)}v.assertAxesAreInnerMostDims("max",p,l);let[m,g]=v.computeOutAndReduceShapes(f.shape,p),x=m;if(i&&(x=v.expandShapeToKeepDim(m,u)),h){let e=ow(a.texData.get(f.dataId).values,I.sizeFromShape(g),x,s.dtype);t=a.makeTensorInfo(x,s.dtype),a.texData.get(t.dataId).values=e}else t=function(e,t,r,a){let n=I.sizeFromShape(t),s=I.sizeFromShape(e.shape),o=iG({inputs:{x:e},attrs:{shape:[s/n,n]},backend:a}),i=iU(o,e.dtype,"max",a),l=iG({inputs:{x:i},attrs:{shape:r},backend:a});return a.disposeIntermediateTensorInfo(o),a.disposeIntermediateTensorInfo(i),l}(f,g,x,a);return c&&a.disposeIntermediateTensorInfo(f),t}const pJ={kernelName:$.Max,backendName:"webgl",kernelFunc:pQ};g("i64bB");var $=g("hl418");const p0=iB({opSnippet:ix+`
  return max(a, b);
`,packedOpSnippet:`
  vec4 result = vec4(max(a, b));
  bvec4 isNaNA = isnan(a);
  bvec4 isNaNB = isnan(b);
  bvec4 isNaN = bvec4(isNaNA.x || isNaNB.x, isNaNA.y || isNaNB.y, isNaNA.z || isNaNB.z, isNaNA.w || isNaNB.w);
  `+ib+`
  return result;
`,cpuKernelImpl:oC}),p1={kernelName:$.Maximum,backendName:"webgl",kernelFunc:p0};g("i64bB");var v=g("7MaPk"),$=g("hl418"),I=g("jjNRA");const p2={kernelName:$.MaxPool,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{x:n}=t;sR(n,"maxPool");let{filterSize:s,strides:o,pad:i,dimRoundingMode:l}=a;I.assert(v.eitherStridesOrDilationsAreOne(o,1),()=>`Error in maxPool: Either strides or dilations must be 1. Got strides ${o} and dilations '1'`);let u=v.computePool2DInfo(n.shape,s,o,1,i,l);if(1===u.filterWidth&&1===u.filterHeight&&I.arraysEqual(u.inShape,u.outShape))return iN({inputs:{x:n},backend:r});let p=new lv(u,"max",!1);return r.runWebGLProgram(p,[n],n.dtype)}};g("i64bB");var v=g("7MaPk"),$=g("hl418");const p4={kernelName:$.MaxPool3D,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{x:n}=t,{filterSize:s,strides:o,pad:i,dataFormat:l,dimRoundingMode:u}=a,p=new lN(v.computePool3DInfo(n.shape,s,o,[1,1,1],i,u,l),"max",!1);return r.runWebGLProgram(p,[n],n.dtype)}};g("i64bB");var v=g("7MaPk"),$=g("hl418");class p3{constructor(e){this.variableNames=["dy","maxPos"],this.outputShape=e.inShape;let t=e.strideHeight,r=e.strideWidth,a=e.dilationHeight,n=e.effectiveFilterHeight,s=e.effectiveFilterWidth,o=n-1-e.padInfo.top,i=s-1-e.padInfo.left;this.userCode=`
      const ivec2 pads = ivec2(${o}, ${i});

      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];

        ivec2 dyRCCorner = coords.yz - pads;
        int dyRCorner = dyRCCorner.x;
        int dyCCorner = dyRCCorner.y;

        // Convolve dy(?, ?, d) with pos mask(:, :, d) to get dx(xR, xC, d).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;
        for (int wR = 0; wR < ${n};
          wR += ${a}) {
          float dyR = float(dyRCorner + wR) / ${t}.0;

          if (dyR < 0.0 || dyR >= ${e.outHeight}.0 || fract(dyR) > 0.0) {
            continue;
          }
          int idyR = int(dyR);

          for (int wC = 0; wC < ${s}; wC++) {
            float dyC = float(dyCCorner + wC) / ${r}.0;

            if (dyC < 0.0 || dyC >= ${e.outWidth}.0 ||
                fract(dyC) > 0.0) {
              continue;
            }
            int idyC = int(dyC);

            float dyValue = getDy(b, idyR, idyC, d);
            int maxPosValue = ${n*s-1} - int(getMaxPos(b, idyR, idyC, d));

            // Get the current value, check it against the value from the
            // position matrix.
            int curPosValue = wR * ${s} + wC;
            float mask = float(maxPosValue == curPosValue ? 1.0 : 0.0);

            dotProd += dyValue * mask;
          }
        }
        setOutput(dotProd);
      }
    `}}class p8{constructor(e){this.variableNames=["dy","maxPos"],this.outputShape=e.inShape;let t=e.strideDepth,r=e.strideHeight,a=e.strideWidth,n=e.dilationDepth,s=e.dilationHeight,o=e.dilationWidth,i=e.effectiveFilterDepth,l=e.effectiveFilterHeight,u=e.effectiveFilterWidth,p=i-1-e.padInfo.front,d=l-1-e.padInfo.top,c=u-1-e.padInfo.left;this.userCode=`
      const ivec3 pads = ivec3(${p}, ${d}, ${c});

      void main() {
        ivec5 coords = getOutputCoords();
        int batch = coords.x;
        int ch = coords.u;

        ivec3 dyCorner = ivec3(coords.y, coords.z, coords.w) - pads;
        int dyDCorner = dyCorner.x;
        int dyRCorner = dyCorner.y;
        int dyCCorner = dyCorner.z;

        // Convolve dy(?, ?, ?, ch) with pos mask(:, :, :, d) to get
        // dx(xD, xR, xC, ch).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;

        for (int wD = 0; wD < ${i};
           wD += ${n}) {
          float dyD = float(dyDCorner + wD) / ${t}.0;

          if (dyD < 0.0 || dyD >= ${e.outDepth}.0 || fract(dyD) > 0.0) {
            continue;
          }
          int idyD = int(dyD);

          for (int wR = 0; wR < ${l};
              wR += ${s}) {
            float dyR = float(dyRCorner + wR) / ${r}.0;

            if (dyR < 0.0 || dyR >= ${e.outHeight}.0 ||
                fract(dyR) > 0.0) {
              continue;
            }
            int idyR = int(dyR);

            for (int wC = 0; wC < ${u};
                wC += ${o}) {
              float dyC = float(dyCCorner + wC) / ${a}.0;

              if (dyC < 0.0 || dyC >= ${e.outWidth}.0 ||
                  fract(dyC) > 0.0) {
                continue;
              }
              int idyC = int(dyC);

              float dyValue = getDy(batch, idyD, idyR, idyC, ch);
              int maxPosValue = ${i*l*u-1} -
                  int(getMaxPos(batch, idyD, idyR, idyC, ch));

              // Get the current value, check it against the value from the
              // position matrix.
              int curPosValue =
                  wD * ${l} * ${u} +
                  wR * ${u} + wC;
              float mask = float(maxPosValue == curPosValue ? 1.0 : 0.0);

              dotProd += dyValue * mask;
            }
          }
        }
        setOutput(dotProd);
      }
    `}}const p6={kernelName:$.MaxPool3DGrad,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{dy:n,input:s}=t,{filterSize:o,strides:i,pad:l,dimRoundingMode:u}=a,p=v.computePool3DInfo(s.shape,o,i,[1,1,1],l,u),d=new lN(p,"max",!0),c=r.runWebGLProgram(d,[s],s.dtype),h=new p8(p),f=r.runWebGLProgram(h,[n,c],s.dtype);return r.disposeIntermediateTensorInfo(c),f}};g("i64bB");var v=g("7MaPk"),$=g("hl418");const p5={kernelName:$.MaxPoolGrad,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{dy:n,input:s,output:o}=t;sR([s,o],"maxPoolGrad");let{filterSize:i,strides:l,pad:u,dimRoundingMode:p}=a,d=v.computePool2DInfo(s.shape,i,l,1,u,p),c=new lv(d,"max",!0),h=r.runWebGLProgram(c,[s],s.dtype),f=new p3(d),m=r.runWebGLProgram(f,[n,h],s.dtype);return r.disposeIntermediateTensorInfo(h),m}};g("i64bB");var v=g("7MaPk"),$=g("hl418"),I=g("jjNRA");const p7={kernelName:$.MaxPoolWithArgmax,backendName:"webgl",kernelFunc:({inputs:e,attrs:t,backend:r})=>{let{x:a}=e,{filterSize:n,strides:s,pad:o,includeBatchInIndex:i}=t;I.assert(4===a.shape.length,()=>`Error in maxPool: input must be rank 4 but got rank ${a.shape.length}.`);let l=[1,1];I.assert(v.eitherStridesOrDilationsAreOne(s,l),()=>`Error in maxPool: Either strides or dilations must be 1. Got strides ${s} and dilations '${l}'`);let u=v.computePool2DInfo(a.shape,n,s,l,o),[p,d]=function(e,t,r,a){let n=new lv(r,"max",!1),s=a.runWebGLProgram(n,[e],"float32");return n=new lv(r,"max",!0,!0,t),[s,a.runWebGLProgram(n,[e],"float32")]}(a,i,u,r);return[p,d]}};g("i64bB");var v=g("7MaPk"),$=g("hl418"),I=g("jjNRA");g("i64bB");var I=g("jjNRA");const p9={kernelName:$.Mean,backendName:"webgl",kernelFunc:({inputs:e,attrs:t,backend:r})=>{let{x:a}=e,{keepDims:n,axis:s}=t,o=a.shape.length,i=I.parseAxisParam(s,a.shape),l=i,u=v.getAxesPermutation(l,o),p=null!=u,d=r.shouldExecuteOnCPU([a]),c=[],h=a;if(p){if(d){let e=r.texData.get(h.dataId).values,t=Array(o);for(let e=0;e<t.length;e++)t[e]=a.shape[u[e]];let n=o0(e,a.shape,a.dtype,u,t);h=r.makeTensorInfo(t,a.dtype),r.texData.get(h.dataId).values=n}else h=iK(a,u,r);c.push(h),l=v.getInnerMostAxes(l.length,o)}v.assertAxesAreInnerMostDims("sum",l,o);let[f,m]=v.computeOutAndReduceShapes(h.shape,l),g=f;n&&(g=v.expandShapeToKeepDim(f,i));let x=function(e,t,r,a){let n=I.sizeFromShape(t),s=I.sizeFromShape(e.shape),o=iG({inputs:{x:e},attrs:{shape:[s/n,n]},backend:a}),i=iU(o,"float32","mean",a),l=iG({inputs:{x:i},attrs:{shape:r},backend:a});return a.disposeIntermediateTensorInfo(o),a.disposeIntermediateTensorInfo(i),l}(h,m,g,r);for(let e of c)r.disposeIntermediateTensorInfo(e);return x}};g("i64bB");var v=g("7MaPk"),$=g("hl418"),I=g("jjNRA");const de={kernelName:$.Min,backendName:"webgl",kernelFunc:function(e){let t,{inputs:r,backend:a,attrs:n}=e,{x:s}=r,{axis:o,keepDims:i}=n,l=s.shape.length,u=I.parseAxisParam(o,s.shape),p=u,d=v.getAxesPermutation(p,l),c=s;null!=d&&(c=iY({inputs:{x:s},backend:a,attrs:{perm:d}}),p=v.getInnerMostAxes(p.length,s.shape.length)),v.assertAxesAreInnerMostDims("min",p,l);let[h,f]=v.computeOutAndReduceShapes(c.shape,p),m=iG({inputs:{x:c},backend:a,attrs:{shape:[-1,I.sizeFromShape(f)]}}),g=iU(m,m.dtype,"min",a);return t=i?iG({inputs:{x:g},backend:a,attrs:{shape:v.expandShapeToKeepDim(h,u)}}):iG({inputs:{x:g},backend:a,attrs:{shape:h}}),a.disposeIntermediateTensorInfo(m),a.disposeIntermediateTensorInfo(g),null!=d&&a.disposeIntermediateTensorInfo(c),t}};g("i64bB");var $=g("hl418");const dt=iB({opSnippet:ix+`
  return min(a, b);
`,packedOpSnippet:`
  vec4 result = vec4(min(a, b));
  bvec4 isNaNA = isnan(a);
  bvec4 isNaNB = isnan(b);
  bvec4 isNaN = bvec4(isNaNA.x || isNaNB.x, isNaNA.y || isNaNB.y, isNaNA.z || isNaNB.z, isNaNA.w || isNaNB.w);
  `+ib+`
  return result;
`,cpuKernelImpl:oE}),dr={kernelName:$.Minimum,backendName:"webgl",kernelFunc:dt};g("i64bB");var T=g("ibsdL"),$=g("hl418");class da{constructor(e,t,r){this.variableNames=["x"],this.outputShape=t.map((t,r)=>t[0]+e[r]+t[1]);let a=e.length,n=sX(a),s=t.map(e=>e[0]).join(","),o=t.map((t,r)=>t[0]+e[r]).join(","),i=["coords[0]","coords[1]","coords[2]","coords[3]"].slice(0,a),l=+("reflect"!==r);if(1===a){this.userCode=`
        int start = ${s};
        int end = ${o};

        void main() {
          int outC = getOutputCoords();
          if (outC < start) {
            outC = start * 2 - outC - ${l};
          } else if(outC >= end) {
            outC = (end - 1) * 2 - outC + ${l};
          }
          setOutput(getX(outC - start));
        }
      `;return}this.userCode=`
      ${n} start = ${n}(${s});
      ${n} end = ${n}(${o});

      void main() {
        ${n} outC = getOutputCoords();
        for (int i = 0; i < ${a}; i++) {
          if (outC[i] < start[i]) {
            outC[i] = start[i] * 2 - outC[i] - ${l};
          } else if(outC[i] >= end[i]) {
            outC[i] = (end[i] - 1) * 2 - outC[i] + ${l};
          }
        }
        ${n} coords = outC - start;
        setOutput(getX(${i}));
      }
    `}}class dn{constructor(e,t,r){this.variableNames=["x"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=t.map((t,r)=>t[0]+e[r]+t[1]);let a=e.length,n=sX(a),s=t.map(e=>e[0]).join(","),o=t.map((t,r)=>t[0]+e[r]).join(","),i=o4("rc",a),l=o4("source",a),u=`${i[a-1]} < ${this.outputShape[a-1]}`,p=1===a?"source":`vec2(${l.slice(-2).join()})`,d=+("reflect"!==r),c="";if(1===a){let e=`
        ${n} source = rc;
        if (source < start) {
          source = start * 2 - source - ${d};
        } else if (source >= end) {
          source = (end - 1) * 2 - source + ${d};
        }
        source -= start;
      `;c=`
        ${n} rc = outputLoc;
        ${e}
        result[0] = getChannel(getX(${l.join()}), ${p});
        ${i[a-1]} += 1;
        if(${u}) {
          ${e}
          result[1] = getChannel(getX(${l.join()}), ${p});
        }
      `}else{let e=`
        ${n} source = rc;
        ${n} lt = ${n}(lessThan(source, start));
        ${n} gte = ${n}(greaterThanEqual(source, end));
        ${n} orig = 1 - (lt + gte);
        source = orig * source +
                lt * (start * 2 - source - ${d}) +
                gte * ((end - 1) * 2 - source + ${d});
        source -= start;
      `;c=`
        ${n} rc = outputLoc;
        ${e}
        result[0] = getChannel(getX(${l.join()}), ${p});
        ${i[a-1]} += 1;
        if(${u}) {
          ${e}
          result[1] = getChannel(getX(${l.join()}), ${p});
        }
        rc = outputLoc;
        ${i[a-2]} += 1;
        if(${i[a-2]} < ${this.outputShape[a-2]}) {
          ${e}
          result[2] = getChannel(getX(${l.join()}), ${p});
          ${i[a-1]} += 1;
          if(${u}) {
            ${e}
            result[3] = getChannel(getX(${l.join()}), ${p});
          }
        }
      `}this.userCode=`
      const ${n} start = ${n}(${s});
      const ${n} end = ${n}(${o});

      void main() {
        ${n} outputLoc = getOutputCoords();
        vec4 result = vec4(0.);
        ${c}
        setOutput(result);
      }
    `}}const ds={kernelName:$.MirrorPad,backendName:"webgl",kernelFunc:({inputs:e,backend:t,attrs:r})=>{let{x:a}=e,{paddings:n,mode:s}=r,o=(0,T.env)().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new dn(a.shape,n,s):new da(a.shape,n,s);return t.runWebGLProgram(o,[a],a.dtype)}};g("i64bB");var $=g("hl418");const di=iB({opSnippet:`if (b == 0.0) return NAN;
  return mod(a, b);`,packedOpSnippet:`
  vec4 result = mod(a, b);
  bvec4 isNaN = equal(b, vec4(0.0));
  `+ib+`
  return result;
`}),dl={kernelName:$.Mod,backendName:"webgl",kernelFunc:di};g("i64bB");var $=g("hl418");class du{constructor(e,t,r){this.variableNames=["probs"],this.customUniforms=[{name:"seed",type:"float"}],this.outputShape=[e,r],this.userCode=`
      void main() {
        ivec2 coords = getOutputCoords();
        int batch = coords[0];

        float r = random(seed);
        float cdf = 0.0;

        for (int i = 0; i < ${t-1}; i++) {
          cdf += getProbs(batch, i);

          if (r < cdf) {
            setOutput(float(i));
            return;
          }
        }

        // If no other event happened, last event happened.
        setOutput(float(${t-1}));
      }
    `}}g("i64bB");var v=g("7MaPk"),$=g("hl418"),I=g("jjNRA");g("i64bB");var $=g("hl418");const dp=iB({opSnippet:`
if (a == b) {
  return 1.0;
};
return a / b;`,packedOpSnippet:`
  // vec4 one = vec4(equal(a, b));
  // return one + (vec4(1.0) - one) * a / b;
  vec4 result = a / b;
  if(a.x == b.x) {
    result.x = 1.;
  }
  if(a.y == b.y) {
    result.y = 1.;
  }
  if(a.z == b.z) {
    result.z = 1.;
  }
  if(a.w == b.w) {
    result.w = 1.;
  }

  return result;
`,checkOutOfBounds:!0}),dd={kernelName:$.RealDiv,backendName:"webgl",kernelFunc:dp};g("i64bB");var $=g("hl418");const dc="return a - b;",dh=iB({opSnippet:dc,packedOpSnippet:dc,supportsComplex:!0,cpuKernelImpl:oY}),df={kernelName:$.Sub,backendName:"webgl",kernelFunc:dh};function dm(e){let{inputs:t,backend:r,attrs:a}=e,{logits:n}=t,{dim:s}=a,o=I.parseAxisParam([s],n.shape),i=pQ({inputs:{x:n},backend:r,attrs:{reductionIndices:o,keepDims:!1}}),l=v.expandShapeToKeepDim(i.shape,o),u=iG({inputs:{x:i},backend:r,attrs:{shape:l}}),p=dh({inputs:{a:n,b:u},backend:r}),d=u0({inputs:{x:p},backend:r}),c=iX({inputs:{x:d},backend:r,attrs:{axis:o,keepDims:!1}}),h=iG({inputs:{x:c},backend:r,attrs:{shape:l}}),f=dp({inputs:{a:d,b:h},backend:r});return r.disposeIntermediateTensorInfo(i),r.disposeIntermediateTensorInfo(u),r.disposeIntermediateTensorInfo(p),r.disposeIntermediateTensorInfo(d),r.disposeIntermediateTensorInfo(c),r.disposeIntermediateTensorInfo(h),f}const dg={kernelName:$.Softmax,backendName:"webgl",kernelFunc:dm},dx={kernelName:$.Multinomial,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{logits:n}=t,{numSamples:s,seed:o,normalized:i}=a,l=i?n:dm({inputs:{logits:n},backend:r,attrs:{dim:n.shape.length-1}}),u=new du(l.shape[0],l.shape[1],s),p=r.runWebGLProgram(u,[l],"int32",[[o]]);return i||r.disposeIntermediateTensorInfo(l),p}};g("i64bB");var T=g("ibsdL"),$=g("hl418");const dy=it+`
  return -x;
`,db=`
  vec4 result = -x;
  bvec4 isNaN = isnan(x);

  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`,dv={kernelName:$.Neg,backendName:"webgl",kernelFunc:function(e){let t,{inputs:r,backend:a}=e,{x:n}=r;if(a.shouldExecuteOnCPU([n])){let[e,t]=o$(a.texData.get(n.dataId).values,n.shape,n.dtype);return a.makeTensorInfo(t,n.dtype,e)}return t=(0,T.env)().getBool("WEBGL_PACK_UNARY_OPERATIONS")?new ip(n.shape,db):new ie(n.shape,dy),a.runWebGLProgram(t,[n],n.dtype)}};g("i64bB");var v=g("7MaPk"),S=g("lzjc8"),$=g("hl418");const dN=S.nonMaxSuppressionV3Impl,dk={kernelName:$.NonMaxSuppressionV3,backendName:"webgl",kernelFunc:function(e){v.warn("tf.nonMaxSuppression() in webgl locks the UI thread. Call tf.nonMaxSuppressionAsync() instead");let{inputs:t,backend:r,attrs:a}=e,{boxes:n,scores:s}=t,{maxOutputSize:o,iouThreshold:i,scoreThreshold:l}=a,{selectedIndices:u}=dN(r.readSync(n.dataId),r.readSync(s.dataId),o,i,l);return r.makeTensorInfo([u.length],"int32",new Int32Array(u))}};g("i64bB");var v=g("7MaPk"),S=g("lzjc8"),$=g("hl418");const dT=S.nonMaxSuppressionV4Impl,dS={kernelName:$.NonMaxSuppressionV4,backendName:"webgl",kernelFunc:function(e){v.warn("tf.nonMaxSuppression() in webgl locks the UI thread. Call tf.nonMaxSuppressionAsync() instead");let{inputs:t,backend:r,attrs:a}=e,{boxes:n,scores:s}=t,{maxOutputSize:o,iouThreshold:i,scoreThreshold:l,padToMaxOutputSize:u}=a,{selectedIndices:p,validOutputs:d}=dT(r.readSync(n.dataId),r.readSync(s.dataId),o,i,l,u);return[r.makeTensorInfo([p.length],"int32",new Int32Array(p)),r.makeTensorInfo([],"int32",new Int32Array([d]))]}};g("i64bB");var v=g("7MaPk"),S=g("lzjc8"),$=g("hl418");const dI=S.nonMaxSuppressionV5Impl,dw={kernelName:$.NonMaxSuppressionV5,backendName:"webgl",kernelFunc:function(e){v.warn("tf.nonMaxSuppression() in webgl locks the UI thread. Call tf.nonMaxSuppressionAsync() instead");let{inputs:t,backend:r,attrs:a}=e,{boxes:n,scores:s}=t,{maxOutputSize:o,iouThreshold:i,scoreThreshold:l,softNmsSigma:u}=a,p=r.readSync(n.dataId),{selectedIndices:d,selectedScores:c}=dI(p,r.readSync(s.dataId),o,i,l,u);return[r.makeTensorInfo([d.length],"int32",new Int32Array(d)),r.makeTensorInfo([c.length],"float32",new Float32Array(c))]}};g("i64bB");var $=g("hl418"),I=g("jjNRA");class dC{constructor(e,t,r,a){this.variableNames=["indices"],this.outputShape=[e,t],this.userCode=`
      void main() {
        ivec2 coords = getOutputCoords();
        int index = round(getIndices(coords.x));
        setOutput(mix(float(${a}), float(${r}),
                      float(index == coords.y)));
      }
    `}}const dE={kernelName:$.OneHot,backendName:"webgl",kernelFunc:e=>{let{inputs:t,backend:r,attrs:a}=e,{indices:n}=t,{dtype:s,depth:o,onValue:i,offValue:l}=a,u=I.sizeFromShape(n.shape),p=new dC(u,o,i,l),d=iG({inputs:{x:n},backend:r,attrs:{shape:[u]}}),c=r.runWebGLProgram(p,[d],s);r.disposeIntermediateTensorInfo(d);let h=iG({inputs:{x:c},backend:r,attrs:{shape:[...n.shape,o]}});return r.disposeIntermediateTensorInfo(c),h}};g("i64bB");var $=g("hl418");g("i64bB");var $=g("hl418");function dA(e){let{inputs:t,backend:r}=e,{x:a}=t;if("complex64"!==a.dtype)return pt({attrs:{shape:a.shape,dtype:a.dtype,value:"string"===a.dtype?"":0},backend:r});{let e=lq({inputs:{input:a},backend:r}),t=dA({inputs:{x:e},backend:r}),n=l5({inputs:{input:a},backend:r}),s=dA({inputs:{x:n},backend:r}),o=iT({inputs:{real:t,imag:s},backend:r});return r.disposeIntermediateTensorInfo(e),r.disposeIntermediateTensorInfo(t),r.disposeIntermediateTensorInfo(n),r.disposeIntermediateTensorInfo(s),o}}const d$={kernelName:$.ZerosLike,backendName:"webgl",kernelFunc:dA},dR={kernelName:$.OnesLike,backendName:"webgl",kernelFunc:function e(t){let{inputs:r,backend:a}=t,{x:n}=r;if("string"===n.dtype)throw Error("onesLike is not supported under string dtype");if("complex64"!==n.dtype)return pt({attrs:{shape:n.shape,dtype:n.dtype,value:1},backend:a});{let t=lq({inputs:{input:n},backend:a}),r=e({inputs:{x:t},backend:a}),s=l5({inputs:{input:n},backend:a}),o=dA({inputs:{x:s},backend:a}),i=iT({inputs:{real:r,imag:o},backend:a});return a.disposeIntermediateTensorInfo(t),a.disposeIntermediateTensorInfo(r),a.disposeIntermediateTensorInfo(s),a.disposeIntermediateTensorInfo(o),i}}};g("i64bB");var $=g("hl418"),I=g("jjNRA");const dP={kernelName:$.Pack,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{axis:n}=a;if(1===t.length)return u2({inputs:{input:t[0]},backend:r,attrs:{dim:n}});let s=t[0].shape,o=t[0].dtype;t.forEach(e=>{I.assertShapesMatch(s,e.shape,"All tensors passed to stack must have matching shapes"),I.assert(o===e.dtype,()=>"All tensors passed to stack must have matching dtypes")});let i=[],l=l9({inputs:t.map(e=>{let t=u2({inputs:{input:e},backend:r,attrs:{dim:n}});return i.push(t),t}),backend:r,attrs:{axis:n}});return i.forEach(e=>r.disposeIntermediateTensorInfo(e)),l}};g("i64bB");var T=g("ibsdL"),$=g("hl418"),I=g("jjNRA");class dB{constructor(e,t,r){this.variableNames=["x"],this.customUniforms=[{name:"value",type:"float"}],this.outputShape=t.map((t,r)=>t[0]+e[r]+t[1]);let a=e.length,n=sX(a),s=t.map(e=>e[0]).join(","),o=t.map((t,r)=>t[0]+e[r]).join(","),i=["coords[0]","coords[1]","coords[2]","coords[3]"].slice(0,a);if(1===a){this.userCode=`
        int start = ${s};
        int end = ${o};

        void main() {
          int outC = getOutputCoords();
          if (outC < start || outC >= end) {
            setOutput(value);
          } else {
            setOutput(getX(outC - start));
          }
        }
      `;return}this.userCode=`
      ${n} start = ${n}(${s});
      ${n} end = ${n}(${o});

      void main() {
        ${n} outC = getOutputCoords();
        if (any(lessThan(outC, start)) || any(greaterThanEqual(outC, end))) {
          setOutput(value);
        } else {
          ${n} coords = outC - start;
          setOutput(getX(${i}));
        }
      }
    `}}class dF{constructor(e,t,r){this.variableNames=["x"],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:"value",type:"float"}],this.outputShape=t.map((t,r)=>t[0]+e[r]+t[1]);let a=e.length,n=sX(a),s=t.map(e=>e[0]).join(","),o=t.map((t,r)=>t[0]+e[r]).join(","),i=o4("rc",a),l=o4("source",a),u=`${i[a-1]} < ${this.outputShape[a-1]}`,p=1===a?"source":`vec2(${l.slice(-2).join()})`,d=[`${n} rc = outputLoc;`,`${i[a-1]} += 1;
       if(${u}) {
      `,1===a?"":`}
       rc = outputLoc;
       ${i[a-2]} += 1;
       if(${i[a-2]} < ${this.outputShape[a-2]}) {`,1===a?"":`  ${i[a-1]} += 1;
         if(${u}) {`],c=1===a?"rc < start || rc >= end":"any(lessThan(rc, start)) || any(greaterThanEqual(rc, end))",h="";for(let e=0,t=1===a?2:4;e<t;e++)h+=`
        ${d[e]}
        if (${c}) {
          result[${e}] = float(value);
        } else {
          ${n} source = rc - start;
          result[${e}] = getChannel(getX(${l.join()}), ${p});
        }
      `;h+=1===a?"} ":"}}",this.userCode=`
      const ${n} start = ${n}(${s});
      const ${n} end = ${n}(${o});

      void main() {
        ${n} outputLoc = getOutputCoords();
        vec4 result = vec4(0.);
        ${h}
        setOutput(result);
      }
    `}}const dO=e=>{let{inputs:t,backend:r,attrs:a}=e,{x:n}=t,{paddings:s,constantValue:o}=a;if(0===I.sizeFromShape(n.shape))return pt({backend:r,attrs:{shape:s.map((e,t)=>e[0]+n.shape[t]+e[1]),value:o,dtype:n.dtype}});let i=(0,T.env)().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new dF(n.shape,s,o):new dB(n.shape,s,o),l=[[o]];return r.runWebGLProgram(i,[n],n.dtype,l)},dM={kernelName:$.PadV2,backendName:"webgl",kernelFunc:dO};g("i64bB");var $=g("hl418");const dD=iB({opSnippet:`
  if(a < 0.0 && floor(b) < b){
    return NAN;
  }
  if (b == 0.0) {
    return 1.0;
  }
  return (round(mod(b, 2.0)) != 1) ?
      pow(abs(a), b) : sign(a) * pow(abs(a), b);
`,packedOpSnippet:`
  // isModRound1 has 1 for components with round(mod(b, 2.0)) == 1, 0 otherwise.
  vec4 isModRound1 = vec4(equal(round(mod(b, 2.0)), ivec4(1)));
  vec4 multiplier = sign(a) * isModRound1 + (vec4(1.0) - isModRound1);
  vec4 result = multiplier * pow(abs(a), b);

  // Ensure that a^0 = 1, including 0^0 = 1 as this correspond to TF and JS
  bvec4 isExpZero = equal(b, vec4(0.0));
  result.r = isExpZero.r ? 1.0 : result.r;
  result.g = isExpZero.g ? 1.0 : result.g;
  result.b = isExpZero.b ? 1.0 : result.b;
  result.a = isExpZero.a ? 1.0 : result.a;

  bvec4 isNaN1 = lessThan(a, vec4(0.0));
  bvec4 isNaN2 = lessThan(floor(b), b);
  bvec4 isNaN = bvec4(isNaN1.x && isNaN2.x, isNaN1.y && isNaN2.y, isNaN1.z && isNaN2.z, isNaN1.w && isNaN2.w);
  `+ib+`
  return result;
`}),d_={kernelName:$.Pow,backendName:"webgl",kernelFunc:dD};g("i64bB");var v=g("7MaPk"),$=g("hl418"),tT=g("2MDja"),I=g("jjNRA");const dL={kernelName:$.Prod,backendName:"webgl",kernelFunc:function(e){let t,{inputs:r,backend:a,attrs:n}=e,{x:s}=r,{axis:o,keepDims:i}=n,l=s.shape.length,u=[],p=I.parseAxisParam(o,s.shape),d=p,c=v.getAxesPermutation(d,l),h=s;if(null!=c&&(h=iY({inputs:{x:s},backend:a,attrs:{perm:c}}),d=v.getInnerMostAxes(d.length,l),u.push(h)),v.assertAxesAreInnerMostDims("prod",d,l),a.shouldExecuteOnCPU([h])){let e=a.texData.get(h.dataId).values,{outVals:r,outShape:n,outDtype:s}=oP(h.shape,h.dtype,e,d);t=a.makeTensorInfo(n,s,r)}else{let[e,r]=v.computeOutAndReduceShapes(h.shape,d),n=iG({inputs:{x:h},backend:a,attrs:{shape:[-1,I.sizeFromShape(r)]}}),o=iU(n,(0,tT.sumOutType)(s.dtype),"prod",a);t=iG({inputs:{x:o},backend:a,attrs:{shape:e}}),u.push(n),u.push(o)}if(i){u.push(t);let e=v.expandShapeToKeepDim(t.shape,p);t=iG({inputs:{x:t},backend:a,attrs:{shape:e}})}return u.forEach(e=>a.disposeIntermediateTensorInfo(e)),t}};g("i64bB");var $=g("hl418");const dV={kernelName:$.RaggedGather,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{paramsNestedSplits:n,paramsDenseValues:s,indices:o}=t,{outputRaggedRank:i}=a,l=n.map(e=>r.readSync(e.dataId)),u=n.map(e=>e.shape),p=r.readSync(s.dataId),d=r.readSync(o.dataId),[c,h,f]=oB(l,u,p,s.shape,s.dtype,d,o.shape,i),m=c.map(e=>r.makeTensorInfo([e.length],"int32",e)),g=r.makeTensorInfo(f,s.dtype,h);return m.concat([g])}};g("i64bB");var $=g("hl418");const dG={kernelName:$.RaggedRange,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r}=e,{starts:a,limits:n,deltas:s}=t,o=r.readSync(a.dataId),i=r.readSync(n.dataId),l=r.readSync(s.dataId),[u,p]=oF(o,a.shape,a.dtype,i,n.shape,l,s.shape);return[r.makeTensorInfo([u.length],"int32",u),r.makeTensorInfo([p.length],a.dtype,p)]}};g("i64bB");var $=g("hl418");const dW={kernelName:$.RaggedTensorToTensor,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{shape:n,values:s,defaultValue:o,rowPartitionTensors:i}=t,{rowPartitionTypes:l}=a,u=r.readSync(n.dataId),p=r.readSync(s.dataId),d=r.readSync(o.dataId),c=i.map(e=>r.readSync(e.dataId)),h=i.map(e=>e.shape),[f,m]=oO(u,n.shape,p,s.shape,s.dtype,d,o.shape,c,h,l);return r.makeTensorInfo(f,s.dtype,m)}};g("i64bB");var $=g("hl418");const dz=e=>{let{backend:t,attrs:r}=e,{start:a,stop:n,step:s,dtype:o}=r,i=oM(a,n,s,o);return t.makeTensorInfo([i.length],o,i)},dj={kernelName:$.Range,backendName:"webgl",kernelFunc:dz};g("i64bB");var $=g("hl418");const dU=iP({opSnippet:"return 1.0 / x;"}),dq={kernelName:$.Reciprocal,backendName:"webgl",kernelFunc:dU};g("i64bB");var $=g("hl418");const dH=iP({opSnippet:it+`
  return (x < 0.0) ? 0.0 : x;
`,packedOpSnippet:`
  vec4 result = x * vec4(greaterThanEqual(x, vec4(0.0)));
  bvec4 isNaN = isnan(x);

  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`}),dK={kernelName:$.Relu,backendName:"webgl",kernelFunc:dH};g("i64bB");var $=g("hl418");const dX=iP({opSnippet:it+`
  return (x < 0.0) ? 0.0 : min(6.0, x);
`,packedOpSnippet:`
  vec4 result = min(x, vec4(6.)) * vec4(greaterThanEqual(x, vec4(0.0)));
  bvec4 isNaN = isnan(x);

  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`}),dZ={kernelName:$.Relu6,backendName:"webgl",kernelFunc:dX};g("i64bB");var T=g("ibsdL"),$=g("hl418");class dY{constructor(e,t,r,a,n){this.variableNames=["A"],this.outputShape=[];let[s,o,i,l]=e;this.outputShape=[s,t,r,l];let u=[a&&t>1?o-1:o,a&&r>1?i-1:i],p=[a&&t>1?t-1:t,a&&r>1?r-1:r];this.userCode=`
      const vec2 effectiveInputOverOutputRatioRC = vec2(
          ${u[0]/p[0]},
          ${u[1]/p[1]});
      const vec2 inputShapeRC = vec2(${o}.0, ${i}.0);

      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        ivec2 yRC = coords.yz;

        // Fractional source index.
        vec2 sourceFracIndexRC = ${n?"(vec2(yRC) + vec2(0.5)) * effectiveInputOverOutputRatioRC - vec2(0.5)":"vec2(yRC) * effectiveInputOverOutputRatioRC"};

        // Compute the four integer indices.
        ivec2 sourceFloorRC = ivec2(max(sourceFracIndexRC, vec2(0.0)));
        ivec2 sourceCeilRC = ivec2(
          min(inputShapeRC - 1.0, ceil(sourceFracIndexRC)));

        float topLeft = getA(b, sourceFloorRC.x, sourceFloorRC.y, d);
        float bottomLeft = getA(b, sourceCeilRC.x, sourceFloorRC.y, d);
        float topRight = getA(b, sourceFloorRC.x, sourceCeilRC.y, d);
        float bottomRight = getA(b, sourceCeilRC.x, sourceCeilRC.y, d);

        vec2 fracRC = sourceFracIndexRC - vec2(sourceFloorRC);

        float top = topLeft + (topRight - topLeft) * fracRC.y;
        float bottom = bottomLeft + (bottomRight - bottomLeft) * fracRC.y;
        float newValue = top + (bottom - top) * fracRC.x;

        setOutput(newValue);
      }
    `}}class dQ{constructor(e,t,r,a,n){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=[];let[s,o,i,l]=e;this.outputShape=[s,t,r,l];let u=[a&&t>1?o-1:o,a&&r>1?i-1:i],p=[a&&t>1?t-1:t,a&&r>1?r-1:r];this.userCode=`
      const vec3 effectiveInputOverOutputRatioRC = vec3(
          ${u[0]/p[0]},
          ${u[1]/p[1]},
          ${u[1]/p[1]});
      const vec3 inputShapeRC = vec3(${o}.0, ${i}.0,
                                     ${i}.0);

      float getAValue(int b, int r, int c, int d) {
        return getChannel(getA(b, r, c, d), vec2(c, d));
      }

      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        // Calculate values for next column in yRC.z.
        ivec3 yRC = coords.yzz + ivec3(0, 0, 1);

        // Fractional source index.
        vec3 sourceFracIndexRC = ${n?"(vec3(yRC) + vec3(0.5)) * effectiveInputOverOutputRatioRC - vec3(0.5)":"vec3(yRC) * effectiveInputOverOutputRatioRC"};

        // Compute the four integer indices.
        ivec3 sourceFloorRC = ivec3(max(sourceFracIndexRC, vec3(0.0)));
        ivec3 sourceCeilRC = ivec3(
          min(inputShapeRC - 1.0, ceil(sourceFracIndexRC)));

        // Should we calculate next column and row elements in 2x2 packed cell.
        bool hasNextCol = d < ${l-1};
        bool hasNextRow = coords.z < ${r-1};

        // In parallel, construct four corners for all four components in
        // packed 2x2 cell.
        vec4 topLeft = vec4(
          getAValue(b, sourceFloorRC.x, sourceFloorRC.y, d),
          hasNextCol ? getAValue(b, sourceFloorRC.x, sourceFloorRC.y, d + 1)
                     : 0.0,
          hasNextRow ? getAValue(b, sourceFloorRC.x, sourceFloorRC.z, d)
                     : 0.0,
          (hasNextRow && hasNextCol) ?
            getAValue(b, sourceFloorRC.x, sourceFloorRC.z, d + 1) : 0.0);

        vec4 bottomLeft = vec4(
          getAValue(b, sourceCeilRC.x, sourceFloorRC.y, d),
          hasNextCol ? getAValue(b, sourceCeilRC.x, sourceFloorRC.y, d + 1)
                     : 0.0,
          hasNextRow ? getAValue(b, sourceCeilRC.x, sourceFloorRC.z, d)
                     : 0.0,
          (hasNextRow && hasNextCol) ?
            getAValue(b, sourceCeilRC.x, sourceFloorRC.z, d + 1) : 0.0);

        vec4 topRight = vec4(
          getAValue(b, sourceFloorRC.x, sourceCeilRC.y, d),
          hasNextCol ? getAValue(b, sourceFloorRC.x, sourceCeilRC.y, d + 1)
                     : 0.0,
          hasNextRow ? getAValue(b, sourceFloorRC.x, sourceCeilRC.z, d)
                     : 0.0,
          (hasNextRow && hasNextCol) ?
            getAValue(b, sourceFloorRC.x, sourceCeilRC.z, d + 1) : 0.0);

        vec4 bottomRight = vec4(
          getAValue(b, sourceCeilRC.x, sourceCeilRC.y, d),
          hasNextCol ? getAValue(b, sourceCeilRC.x, sourceCeilRC.y, d + 1)
                     : 0.0,
          hasNextRow ? getAValue(b, sourceCeilRC.x, sourceCeilRC.z, d)
                     : 0.0,
          (hasNextRow && hasNextCol) ?
            getAValue(b, sourceCeilRC.x, sourceCeilRC.z, d + 1) : 0.0);

        vec3 fracRC = sourceFracIndexRC - vec3(sourceFloorRC);

        vec4 top = mix(topLeft, topRight, fracRC.yyzz);
        vec4 bottom = mix(bottomLeft, bottomRight, fracRC.yyzz);
        vec4 newValue = mix(top, bottom, fracRC.x);

        setOutput(newValue);
      }
    `}}const dJ={kernelName:$.ResizeBilinear,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{images:n}=t,{alignCorners:s,halfPixelCenters:o,size:i}=a,[l,u]=i,p=(0,T.env)().getBool("WEBGL_PACK_IMAGE_OPERATIONS")?new dQ(n.shape,l,u,s,o):new dY(n.shape,l,u,s,o);return r.runWebGLProgram(p,[n],"float32")}};g("i64bB");var $=g("hl418");class d0{constructor(e,t,r){this.variableNames=["dy"],this.outputShape=[],this.outputShape=t;let[,a,n]=t,[,s,o]=e,i=[r&&s>1?a-1:a,r&&o>1?n-1:n],l=[r&&s>1?s-1:s,r&&o>1?o-1:o],u=i[0]/l[0],p=i[1]/l[1],d=1/u,c=1/p,h=2*Math.ceil(d)+2,f=2*Math.ceil(c)+2;this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        int r = coords[1];
        int c = coords[2];

        float accumulator = 0.0;

        const float heightScale = float(${u});
        const float widthScale = float(${p});

        const float invHeightScale = float(${d});
        const float invWidthScale = float(${c});

        const int winHeight = int(${h});
        const int winWidth = int(${f});

        // Compute bounds for where in dy we will look
        float startRLerp = floor(float(r) * invHeightScale);
        int startDyR = int(startRLerp - float(winHeight / 2));

        float startCLerp = floor(float(c) * invWidthScale);
        int startDyC = int(startCLerp - float(winWidth / 2));

        // Loop over dy
        for (int dyROffset = 0; dyROffset < winHeight; dyROffset++) {
          int dyR = dyROffset + startDyR;

          // Guard against the window exceeding the bounds of dy
          if (dyR < 0 || dyR >= ${s}) {
            continue;
          }

          for (int dyCOffset = 0; dyCOffset < winWidth; dyCOffset++) {
            int dyC = dyCOffset + startDyC;

            // Guard against the window exceeding the bounds of dy
            if (dyC < 0 || dyC >= ${o}) {
              continue;
            }

            float dxR = float(dyR) * heightScale;
            int topDxRIndex = int(floor(dxR));
            int bottomDxRIndex = int(min(ceil(dxR), ${a-1}.0));
            float dxRLerp = dxR - float(topDxRIndex);
            float inverseDxRLerp = 1.0 - dxRLerp;

            float dxC = float(dyC) * widthScale;
            int leftDxCIndex = int(floor(dxC));
            int rightDxCIndex = int(min(ceil(dxC), ${n-1}.0));
            float dxCLerp = dxC - float(leftDxCIndex);
            float inverseDxCLerp = 1.0 - dxCLerp;

            if (r == topDxRIndex && c == leftDxCIndex) {
              // topLeft
              accumulator +=
                getDy(b, dyR, dyC, d) * inverseDxRLerp * inverseDxCLerp;
            }

            if (r == topDxRIndex && c == rightDxCIndex) {
              // topRight
              accumulator += getDy(b, dyR, dyC, d) * inverseDxRLerp * dxCLerp;
            }

            if (r == bottomDxRIndex && c == leftDxCIndex) {
              // bottomLeft
              accumulator += getDy(b, dyR, dyC, d) * dxRLerp * inverseDxCLerp;
            }

            if (r == bottomDxRIndex && c == rightDxCIndex) {
              // bottomRight
              accumulator += getDy(b, dyR, dyC, d) * dxRLerp * dxCLerp;
            }
          }
        }
        // End loop over dy

        setOutput(accumulator);
      }
    `}}const d1={kernelName:$.ResizeBilinearGrad,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{images:n,dy:s}=t,{alignCorners:o}=a,i=new d0(s.shape,n.shape,o);return r.runWebGLProgram(i,[s],s.dtype)}};g("i64bB");var T=g("ibsdL"),$=g("hl418");class d2{constructor(e,t,r,a,n){this.variableNames=["A"],this.outputShape=[];let[s,o,i,l]=e;this.outputShape=[s,t,r,l];let u=[a&&t>1?o-1:o,a&&r>1?i-1:i],p=[a&&t>1?t-1:t,a&&r>1?r-1:r];this.userCode=`
      const vec2 effectiveInputOverOutputRatioRC = vec2(
          ${u[0]/p[0]},
          ${u[1]/p[1]});
      const vec2 inputShapeRC = vec2(${o}.0, ${i}.0);

      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        ivec2 yRC = coords.yz;

        // Fractional source index.
        vec2 sourceFracIndexRC = ${n?"max((vec2(yRC) + vec2(0.5)) * effectiveInputOverOutputRatioRC, vec2(0.0))":"vec2(yRC) * effectiveInputOverOutputRatioRC"};

        // Compute the coordinators of nearest neighbor point.
        ivec2 sourceNearestRC = ivec2(
          min(inputShapeRC - 1.0, floor(sourceFracIndexRC + ${a?"0.5":"0.0"})));
        float newValue = getA(b, sourceNearestRC.x, sourceNearestRC.y, d);

        setOutput(newValue);
      }
    `}}class d4{constructor(e,t,r,a,n){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=[];let[s,o,i,l]=e;this.outputShape=[s,t,r,l];let u=[a&&t>1?o-1:o,a&&r>1?i-1:i],p=[a&&t>1?t-1:t,a&&r>1?r-1:r];this.userCode=`
      const vec3 effectiveInputOverOutputRatioRC = vec3(
          ${u[0]/p[0]},
          ${u[1]/p[1]},
          ${u[1]/p[1]});
      const vec3 inputShapeRC = vec3(${o}.0, ${i}.0,
                                     ${i}.0);

      float getAValue(int b, int r, int c, int d) {
        return getChannel(getA(b, r, c, d), vec2(c, d));
      }

      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        // Calculate values for next column in yRC.z.
        ivec3 yRC = coords.yzz + ivec3(0, 0, 1);

        // Fractional source index.
        vec3 sourceFracIndexRC = ${n?"max((vec3(yRC) + vec3(0.5)) * effectiveInputOverOutputRatioRC, vec3(0.0))":"vec3(yRC) * effectiveInputOverOutputRatioRC"};

        // Compute the coordinators of nearest neighbor point.
        ivec3 sourceNearestRC = ivec3(
          min(inputShapeRC - 1.0, floor(sourceFracIndexRC + ${a?"0.5":"0.0"})));

        // Should we calculate next column and row elements in 2x2 packed cell.
        bool hasNextCol = d < ${l-1};
        bool hasNextRow = coords.z < ${r-1};

        vec4 newValue = vec4(
          getAValue(b, sourceNearestRC.x, sourceNearestRC.y, d),
          hasNextCol ? getAValue(b, sourceNearestRC.x, sourceNearestRC.y, d + 1)
                     : 0.0,
          hasNextRow ? getAValue(b, sourceNearestRC.x, sourceNearestRC.z, d)
                     : 0.0,
          (hasNextRow && hasNextCol) ?
            getAValue(b, sourceNearestRC.x, sourceNearestRC.z, d + 1) : 0.0);

        setOutput(newValue);
      }
    `}}const d3={kernelName:$.ResizeNearestNeighbor,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{images:n}=t,{alignCorners:s,halfPixelCenters:o,size:i}=a,[l,u]=i,p=(0,T.env)().getBool("WEBGL_PACK_IMAGE_OPERATIONS")?new d4(n.shape,l,u,s,o):new d2(n.shape,l,u,s,o);return r.runWebGLProgram(p,[n],n.dtype)}};g("i64bB");var $=g("hl418");class d8{constructor(e,t,r){this.variableNames=["dy"],this.outputShape=[],this.outputShape=t;let[,a,n]=t,[,s,o]=e,i=[r&&s>1?a-1:a,r&&o>1?n-1:n],l=[r&&s>1?s-1:s,r&&o>1?o-1:o],u=i[0]/l[0],p=i[1]/l[1],d=1/u,c=1/p,h=2*Math.ceil(d)+2,f=2*Math.ceil(c)+2;this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        int r = coords[1];
        int c = coords[2];

        float accumulator = 0.0;

        const float heightScale = float(${u});
        const float widthScale = float(${p});

        const float invHeightScale = float(${d});
        const float invWidthScale = float(${c});

        const int winHeight = int(${h});
        const int winWidth = int(${f});

        // Compute bounds for where in dy we will look
        float startRLerp = floor(float(r) * invHeightScale);
        int startDyR = int(floor(startRLerp - float(winHeight / 2)));

        float startCLerp = floor(float(c) * invWidthScale);
        int startDyC = int(floor(startCLerp - float(winWidth / 2)));

        // Loop over dy
        for (int dyROffset = 0; dyROffset < winHeight; dyROffset++) {
          int dyR = dyROffset + startDyR;

          // Guard against the window exceeding the bounds of dy
          if (dyR < 0 || dyR >= ${s}) {
            continue;
          }

          for (int dyCOffset = 0; dyCOffset < winWidth; dyCOffset++) {
            int dyC = dyCOffset + startDyC;

            // Guard against the window exceeding the bounds of dy
            if (dyC < 0 || dyC >= ${o}) {
              continue;
            }

            float sourceFracRow =
              float(${i[0]}) *
                (float(dyR) / float(${l[0]}));

            float sourceFracCol =
                float(${i[1]}) *
                  (float(dyC) / float(${l[1]}));

            int sourceNearestRow = int(min(
                float(int(${a}) - 1),
                ${r} ? float(round(sourceFracRow)) :
                                  float(floor(sourceFracRow))));

            int sourceNearestCol = int(min(
                float(int(${n}) - 1),
                ${r} ? float(round(sourceFracCol)) :
                                  float(floor(sourceFracCol))));

            if (r == sourceNearestRow && c == sourceNearestCol) {
              accumulator += getDy(b, dyR, dyC, d);
            }
          }
        }
        // End loop over dy

        setOutput(accumulator);
      }
    `}}const d6={kernelName:$.ResizeNearestNeighborGrad,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{images:n,dy:s}=t,{alignCorners:o}=a,i=new d8(s.shape,n.shape,o);return r.runWebGLProgram(i,[s],s.dtype)}};g("i64bB");var T=g("ibsdL"),$=g("hl418"),I=g("jjNRA");class d5{constructor(e,t){this.variableNames=["x"];let r=e.length;if(r>4)throw Error(`WebGL backend: Reverse of rank-${r} tensor is not yet supported`);if(this.outputShape=e,1===r){this.userCode=`
        void main() {
          int coord = getOutputCoords();
          setOutput(getX(${e[0]} - coord - 1));
        }
      `;return}let a=r=>-1!==t.indexOf(r)&&1!==e[r]?`${e[r]} - coords[${r}] - 1`:`coords[${r}]`,n=e.map((e,t)=>a(t)).join(","),s=sX(r);this.userCode=`
      void main() {
        ${s} coords = getOutputCoords();
        setOutput(getX(${n}));
      }
    `}}class d7{constructor(e,t){var r,a,n;this.variableNames=["x"],this.packedInputs=!0,this.packedOutput=!0;let s=e.length;if(s>4)throw Error(`WebGL backend: Reverse of rank-${s} tensor is not yet supported`);this.outputShape=e;let o=o4("rc",s),i=`${o[s-1]} + 1 < ${this.outputShape[s-1]}`,l=`${o[s-2]} + 1 < ${this.outputShape[s-2]}`,u=sX(s);function p(r){let a=e.map((a,n)=>{var s,o;return s=n,o=r,-1!==t.indexOf(s)&&1!==e[s]?`${e[s]} - ${o[s]} - 1`:`${o[s]}`}),n=a.join(","),s=a.slice(-2).join(",");return`getChannel(getX(${n}), vec2(${s}))`}1===s?this.userCode=`
        void main(){
          int rc = getOutputCoords();
          vec4 result = vec4(0.);
          result.r = getChannel(getX(${e[0]} - rc - 1),
            ${e[0]} - rc - 1);
          if(${i}){
              result.g = getChannel(getX(${e[0]} - (rc  + 1) - 1),
                ${e[0]} - (rc  + 1) - 1);
          }
          setOutput(result);
        }
      `:this.userCode=`
        void main() {
          ${u} rc = getOutputCoords();
          vec4 result = vec4(0.);
          result.r = ${p(o.slice())};
          if(${i}){
            result.g = ${(r=o.slice())[s-1]="("+r[s-1]+" + 1)",p(r)};
          }
          if(${l}) {
            result.b = ${(a=o.slice())[s-2]="("+a[s-2]+" + 1)",p(a)};
            if(${i}) {
              result.a = ${(n=o.slice())[s-1]="("+n[s-1]+" + 1)",n[s-2]="("+n[s-2]+" + 1)",p(n)};
            }
          }
          setOutput(result);
        }
    `}}const d9={kernelName:$.Reverse,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{x:n}=t,{dims:s}=a,o=n.shape.length,i=I.parseAxisParam(s,n.shape);if(0===o)return iN({inputs:{x:n},backend:r});let l=(0,T.env)().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new d7(n.shape,i):new d5(n.shape,i);return r.runWebGLProgram(l,[n],n.dtype)}};g("i64bB");var v=g("7MaPk"),$=g("hl418");class ce{constructor(e,t){this.variableNames=["Image"],this.outputShape=[],this.customUniforms=[{name:"params",type:"vec4"}];let r=e[1],a=e[2];this.outputShape=e;let n="";n="number"==typeof t?`float outputValue = ${t.toFixed(2)};`:`
        vec3 fill = vec3(${t.join(",")});
        float outputValue = fill[coords[3]];`,this.userCode=`
        void main() {
          ivec4 coords = getOutputCoords();
          int x = coords[2];
          int y = coords[1];
          float coordXFloat = (float(x) - params[0]) * params[3] -
            (float(y) - params[1]) * params[2];
          float coordYFloat = (float(x) - params[0]) * params[2] +
            (float(y) - params[1]) * params[3];
          int coordX = int(round(coordXFloat + params[0]));
          int coordY = int(round(coordYFloat + params[1]));
          ${n}
          if(coordX >= 0 && coordX < ${a} && coordY >= 0 && coordY < ${r}) {
            outputValue = getImage(coords[0], coordY, coordX, coords[3]);
          }
          setOutput(outputValue);
        }
    `}}const ct={kernelName:$.RotateWithOffset,backendName:"webgl",kernelFunc:({inputs:e,attrs:t,backend:r})=>{let{image:a}=e,{radians:n,fillValue:s,center:o}=t,i=new ce(a.shape,s),[l,u]=v.getImageCenter(o,a.shape[1],a.shape[2]),p=[[l,u,Math.sin(n),Math.cos(n)]];return r.runWebGLProgram(i,[a],a.dtype,p)}};g("i64bB");var $=g("hl418");const cr=iP({opSnippet:`
  // OpenGL ES does not support round function.
  // The algorithm is based on banker's rounding.
  float base = floor(x);
  if ((x - base) < 0.5) {
    return floor(x);
  } else if ((x - base) > 0.5) {
    return ceil(x);
  } else {
    if (mod(base, 2.0) == 0.0) {
      return base;
    } else {
      return base + 1.0;
    }
  }
`}),ca={kernelName:$.Round,backendName:"webgl",kernelFunc:cr};g("i64bB");var $=g("hl418");const cn=iP({opSnippet:"return inversesqrt(x);",cpuKernelImpl:oD}),cs={kernelName:$.Rsqrt,backendName:"webgl",kernelFunc:cn};g("i64bB");var v=g("7MaPk"),T=g("ibsdL"),$=g("hl418");class co{constructor(e,t,r,a,n,s,o=!0,i=!1){this.variableNames=["updates","indices","defaultValue"],this.outputShape=s;let l=sX(n.length),u=sX(s.length),p="";1===r?p="i":2===r&&(p="i, j");let d=`getIndices(${p})`,c="";1===a?c="i":2===a&&(c="i, coords[1]");let h=`getUpdates(${c})`,f="";i&&(f="coords[0], coords[1]");let m=`getDefaultValue(${f})`;this.userCode=`
        ${l} strides = ${l}(${n});

        void main() {
          ${u} coords = getOutputCoords();
          float sum = 0.0;
          bool found = false;
          for (int i = 0; i < ${e}; i++) {
            int flattenedIndex = 0;
            for (int j = 0; j < ${t}; j++) {
              int index = round(${d});
              flattenedIndex += index * ${t>1?"strides[j]":"strides"};
            }
            if (flattenedIndex == coords[0]) {
              sum += ${h};
              found = true;
            }
          }
          setOutput(mix(${m}, sum, float(found)));
        }
      `}}class ci{constructor(e,t,r,a,n,s,o=!0,i=!1){this.variableNames=["updates","indices","defaultValue"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=s;let l=sX(n.length),u=sX(s.length),p="";1===r?p="i":2===r&&(p="i, j");let d=`getIndices(${p})`,c="";1===a?c="i":2===a&&(c="i, coords[1]");let h=`getUpdates(${c})`,f="";i&&(f="coords[0], coords[1]");let m=`getDefaultValue(${f})`;this.userCode=`
        ${l} strides = ${l}(${n});

        void main() {
          ${u} coords = getOutputCoords();
          vec4 sum = vec4(0.);
          vec4 found = vec4(0.);
          for (int i = 0; i < ${e}; i+=2) {
            ivec2 flattenedIndex = ivec2(0);
            for (int j = 0; j < ${t}; j+=2) {
              ivec4 index = round(${d});
              flattenedIndex += index.xz * ${t>1?"strides[j]":"strides"};
              if (j + 1 < ${t}) {
                flattenedIndex += index.yw * ${t>1?"strides[j + 1]":"strides"};
              }
            }
            if (flattenedIndex[0] == coords[0] || flattenedIndex[1] == coords[0] ||
                flattenedIndex[0] == coords[0] + 1 || flattenedIndex[1] == coords[0] + 1) {
              vec4 updVals = ${h};
              if (flattenedIndex[0] == coords[0]) {
                sum.xy += updVals.xy;
                found.xy = vec2(1.);
              } else if (flattenedIndex[0] == coords[0] + 1) {
                sum.zw += updVals.xy;
                found.zw = vec2(1.);
              }
              if (flattenedIndex[1] == coords[0]) {
                sum.xy += updVals.zw;
                found.xy = vec2(1.);
              } else if (flattenedIndex[1] == coords[0] + 1) {
                sum.zw += updVals.zw;
                found.zw = vec2(1.);
              }
            }
          }
          setOutput(mix(${m}, sum, found));
        }
      `}}const cl={kernelName:$.ScatterNd,backendName:"webgl",kernelFunc:function(e){let t,{inputs:r,backend:a,attrs:n}=e,{indices:s,updates:o}=r,{shape:i}=n,{sliceRank:l,numUpdates:u,sliceSize:p,strides:d,outputSize:c}=v.calculateShapes(o,s,i),h=[c/p,p];if(0===c)return a.makeTensorInfo(i,s.dtype);let f=iG({inputs:{x:s},backend:a,attrs:{shape:[u,l]}}),m=iG({inputs:{x:o},backend:a,attrs:{shape:[u,p]}}),g=a.makeTensorInfo([],"float32",new Float32Array([0]));t=(0,T.env)().getBool("WEBGL_PACK")?new ci(u,l,f.shape.length,m.shape.length,d,h):new co(u,l,f.shape.length,m.shape.length,d,h);let x=a.runWebGLProgram(t,[m,f,g],m.dtype),y=iG({inputs:{x:x},backend:a,attrs:{shape:i}});return a.disposeIntermediateTensorInfo(f),a.disposeIntermediateTensorInfo(m),a.disposeIntermediateTensorInfo(x),a.disposeIntermediateTensorInfo(g),y}};g("i64bB");var $=g("hl418");g("i64bB");var T=g("ibsdL");class cu{constructor(e,t,r,a){this.variableNames=["sortedSequence","values"],this.customUniforms=[{name:"numInputs",type:"int"}],this.outputShape=[e,r];let n=`for (int i = 0; i < ${Math.ceil(Math.log2(t+1))}; ++i) { if (left >= right) break;`,s=2===(0,T.env)().getNumber("WEBGL_VERSION")?"while (left < right) {":n;this.userCode=`
       int findBound(int batch, float value) {
         int left = 0;
         int right = numInputs;
         int mid;
         ${s}
           mid = (left + right) / 2;
           if (getSortedSequence(batch, mid) ${"left"===a?"<":"<="} value) {
             left = mid + 1;
           } else {
             right = mid;
           }
         }
         return right;
       }

       void main() {
         ivec2 coords = getOutputCoords();
         int batch = coords[0];
         int valueIndex = coords[1];

         float value = getValues(batch, valueIndex);

         setOutput(float(findBound(batch, value)));
       }
     `}}const cp={kernelName:$.SearchSorted,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{sortedSequence:n,values:s}=t,{side:o}=a,i=new cu(n.shape[0],n.shape[1],s.shape[1],o),l=[[n.shape[1]]];return r.runWebGLProgram(i,[n,s],"int32",l)}};g("i64bB");var $=g("hl418"),tT=g("2MDja");class cd{constructor(e,t,r){let a,n;if(this.variableNames=["c","a","b"],this.outputShape=t,r>4)throw Error(`Where for rank ${r} is not yet supported`);if(1===r)n="resRC",a="resRC";else{let r=["resRC.x","resRC.y","resRC.z","resRC.w"],s=[],o=[];for(let a=0;a<t.length;a++)o.push(`${r[a]}`),a<e&&s.push(`${r[a]}`);a=s.join(),n=o.join()}let s=sX(r);this.userCode=`
      void main() {
        ${s} resRC = getOutputCoords();
        float cVal = getC(${a});
        if (cVal >= 1.0) {
          setOutput(getA(${n}));
        } else {
          setOutput(getB(${n}));
        }
      }
    `}}const cc={kernelName:$.Select,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r}=e,{condition:a,t:n,e:s}=t,o=new cd(a.shape.length,n.shape,n.shape.length);return r.runWebGLProgram(o,[a,n,s],(0,tT.upcastType)(n.dtype,s.dtype))}};g("i64bB");var v=g("7MaPk"),$=g("hl418");const ch=iP({opSnippet:`
  // Stable and Attracting Fixed Point (0, 1) for Normalized Weights.
  // see: https://arxiv.org/abs/1706.02515
  float scaleAlpha = ${v.SELU_SCALEALPHA};
  float scale = ${v.SELU_SCALE};
  return (x >= 0.0) ? scale * x : scaleAlpha * (exp(x) - 1.0);
`}),cf={kernelName:$.Selu,backendName:"webgl",kernelFunc:ch};g("i64bB");var $=g("hl418");const cm=iP({opSnippet:iR+`
  return 1.0 / (1.0 + exp(-1.0 * x));
`,packedOpSnippet:`
  vec4 result = 1.0 / (1.0 + exp(-1.0 * x));
  bvec4 isNaN = isnan(x);

  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`,cpuKernelImpl:oL}),cg={kernelName:$.Sigmoid,backendName:"webgl",kernelFunc:cm};g("i64bB");var $=g("hl418");const cx=iP({opSnippet:`
  if (isnan(x)) { return 0.0; }
  return sign(x);
`}),cy={kernelName:$.Sign,backendName:"webgl",kernelFunc:cx};g("i64bB");var $=g("hl418");const cb=iP({opSnippet:iR+`
  return sin(x);
`,packedOpSnippet:`
  vec4 result = sin(x);
  bvec4 isNaN = isnan(x);
  ${ib}
  return result;
`}),cv={kernelName:$.Sin,backendName:"webgl",kernelFunc:cb};g("i64bB");var $=g("hl418");const cN=iP({opSnippet:`
  float e2x = exp(x);
  return (e2x - 1.0 / e2x) / 2.0;
`}),ck={kernelName:$.Sinh,backendName:"webgl",kernelFunc:cN};g("i64bB");var $=g("hl418");const cT=iP({opSnippet:`
  float epsilon = 1.1920928955078125e-7;
  float threshold = log(epsilon) + 2.0;

  bool too_large = x > -threshold;
  bool too_small = x < threshold;

  float result;
  float exp_x = exp(x);

  if (too_large){
    result = x;
  }
  else if (too_small){
    result = exp_x;
  }
  else{
    result = log(exp_x + 1.0);
  }
  return result;
`}),cS={kernelName:$.Softplus,backendName:"webgl",kernelFunc:cT};g("i64bB");var v=g("7MaPk"),$=g("hl418"),I=g("jjNRA");const cI={kernelName:$.SpaceToBatchND,backendName:"webgl",kernelFunc:e=>{let{inputs:t,backend:r,attrs:a}=e,{x:n}=t,{blockShape:s,paddings:o}=a;I.assert(n.shape.length<=4,()=>"spaceToBatchND for rank > 4 with a WebGL backend not implemented yet");let i=s.reduce((e,t)=>e*t),l=[[0,0]];l.push(...o);for(let e=1+s.length;e<n.shape.length;++e)l.push([0,0]);let u=[],p=dO({inputs:{x:n},backend:r,attrs:{paddings:l,constantValue:0}}),d=v.getReshaped(p.shape,s,i,!1),c=v.getPermuted(d.length,s.length,!1),h=v.getReshapedPermuted(p.shape,s,i,!1),f=iG({inputs:{x:p},backend:r,attrs:{shape:d}}),m=iY({inputs:{x:f},backend:r,attrs:{perm:c}}),g=iG({inputs:{x:m},backend:r,attrs:{shape:h}});return u.push(p),u.push(f),u.push(m),u.forEach(e=>r.disposeIntermediateTensorInfo(e)),g}};g("i64bB");var $=g("hl418");const cw={kernelName:$.SparseFillEmptyRows,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r}=e,{indices:a,values:n,denseShape:s,defaultValue:o}=t;if(1!==s.shape.length)throw Error(`Dense shape must be a vector, saw:
         ${s.shape}`);if(2!==a.shape.length)throw Error(`Indices must be a matrix, saw:
         ${a.shape}`);if(1!==n.shape.length)throw Error(`Values must be a vector, saw:
         ${n.shape}`);if(0!==o.shape.length)throw Error(`Default value must be a scalar, saw:
        ${o.shape}`);let i=r.readSync(a.dataId),l=r.readSync(n.dataId),u=r.readSync(s.dataId),p=r.readSync(o.dataId)[0],[d,c,h,f,m]=oW(i,a.shape,a.dtype,l,n.dtype,u,p);return[r.makeTensorInfo(c,a.dtype,d),r.makeTensorInfo([c[0]],n.dtype,h),r.makeTensorInfo([f.length],"bool",new Uint8Array(f.map(e=>Number(e)))),r.makeTensorInfo([m.length],a.dtype,new Int32Array(m))]}};g("i64bB");var $=g("hl418");const cC={kernelName:$.SparseReshape,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r}=e,{inputIndices:a,inputShape:n,newShape:s}=t;if(2!==a.shape.length)throw Error(`Input indices should be a matrix but received shape ${a.shape}`);if(1!==n.shape.length)throw Error(`Input shape should be a vector but received shape ${n.shape}`);if(1!==s.shape.length)throw Error(`Target shape should be a vector but received shape ${s.shape}`);let o=Array.from(r.readSync(n.dataId)),i=r.readSync(a.dataId),l=Array.from(r.readSync(s.dataId)),[u,p,d]=oz(i,a.shape,a.dtype,o,l);return[r.makeTensorInfo(p,a.dtype,u),r.makeTensorInfo([d.length],s.dtype,new Int32Array(d))]}};g("i64bB");var $=g("hl418");const cE={kernelName:$.SparseSegmentMean,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r}=e,{data:a,indices:n,segmentIds:s}=t;if(a.shape.length<1)throw Error("Data should be at least 1 dimensional but received scalar");if(1!==n.shape.length)throw Error(`Indices should be a vector but received shape
              ${n.shape}`);if(1!==s.shape.length)throw Error(`Segment ids should be a vector but received shape
              ${s.shape}`);let o=r.readSync(a.dataId),i=r.readSync(n.dataId),l=r.readSync(s.dataId),[u,p]=oj(o,a.shape,a.dtype,i,l,!0);return r.makeTensorInfo(p,a.dtype,u)}};g("i64bB");var $=g("hl418");const cA={kernelName:$.SparseSegmentSum,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r}=e,{data:a,indices:n,segmentIds:s}=t;if(a.shape.length<1)throw Error("Data should be at least 1 dimensional but received scalar");if(1!==n.shape.length)throw Error(`Indices should be a vector but received shape
             ${n.shape}`);if(1!==s.shape.length)throw Error(`Segment ids should be a vector but received shape
             ${s.shape}`);let o=r.readSync(a.dataId),i=r.readSync(n.dataId),l=r.readSync(s.dataId),[u,p]=oj(o,a.shape,a.dtype,i,l);return r.makeTensorInfo(p,a.dtype,u)}};g("i64bB");var v=g("7MaPk"),$=g("hl418"),I=g("jjNRA");const c$={kernelName:$.SparseToDense,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{sparseIndices:n,sparseValues:s,defaultValue:o}=t,{outputShape:i}=a,{sliceRank:l,numUpdates:u,sliceSize:p,strides:d,outputSize:c}=v.calculateShapes(s,n,i);if("string"===s.dtype){let e=r.bufferSync(n),t=o_(e,r.bufferSync(s),i,c,p,u,l,d,I.decodeString(r.readSync(o.dataId)[0]),!1);return r.makeTensorInfo(i,t.dtype,t.values)}let h=new co(u,l,n.shape.length,s.shape.length,d,[c,1],!1),f=r.runWebGLProgram(h,[s,n,o],s.dtype),m=iG({inputs:{x:f},backend:r,attrs:{shape:i}});return r.disposeIntermediateTensorInfo(f),m}};g("i64bB");var v=g("7MaPk"),$=g("hl418"),I=g("jjNRA");const cR={kernelName:$.SplitV,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{x:n}=t,{numOrSizeSplits:s,axis:o}=a,i=I.parseAxisParam(o,n.shape)[0],l=v.prepareSplitSize(n,s,i),u=Array(n.shape.length).fill(0),p=n.shape.slice();return l.map(e=>{let t=[...p];t[i]=e;let a=lO({inputs:{x:n},backend:r,attrs:{begin:u,size:t}});return u[i]+=e,a})}};g("i64bB");var $=g("hl418");const cP="return sqrt(x);",cB=iP({opSnippet:cP,packedOpSnippet:cP,cpuKernelImpl:oU}),cF={kernelName:$.Sqrt,backendName:"webgl",kernelFunc:cB};g("i64bB");var $=g("hl418");const cO=iP({opSnippet:"return x * x;"}),cM={kernelName:$.Square,backendName:"webgl",kernelFunc:cO};g("i64bB");var $=g("hl418");const cD="return (a - b) * (a - b);",c_=iB({opSnippet:cD,packedOpSnippet:cD}),cL={kernelName:$.SquaredDifference,backendName:"webgl",kernelFunc:c_};g("i64bB");var v=g("7MaPk"),$=g("hl418");const cV={kernelName:$.StaticRegexReplace,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{x:n}=t;if("string"!==n.dtype)throw Error("Input must be of datatype string");let s=r.readSync(n.dataId),o=oq(v.fromUint8ToStringArray(s),"string",a);return r.makeTensorInfo(n.shape,"string",o)}};g("i64bB");var $=g("hl418");const cG={kernelName:$.Step,backendName:"webgl",kernelFunc:function({inputs:e,attrs:t,backend:r}){let{x:a}=e,n=it+`
    return x > 0.0 ? 1.0 : float(${t.alpha});
  `,s=new ie(a.shape,n);return r.runWebGLProgram(s,[a],a.dtype)}};g("i64bB");var N=g("iG87S"),eY=g("bszZn"),$=g("hl418"),I=g("jjNRA");class cW{constructor(e,t,r){this.variableNames=["x"],this.outputShape=r;let a=r.length,n=sX(r.length),s=sX(r.length),o="";if(1===a)o="coords * strides + begin";else{let e=0;o=r.map((t,a)=>(e++,1===r.length?`coords * strides[${a}] + begin[${a}]`:`coords[${e-1}] * strides[${a}] + begin[${a}]`)).join(",")}this.userCode=`
      ${n} begin = ${n}(${e});
      ${n} strides = ${n}(${t});

      void main() {
        ${s} coords = getOutputCoords();
        setOutput(getX(${o}));
      }
    `}}const cz={kernelName:$.StridedSlice,backendName:"webgl",kernelFunc:function(e){let t,{inputs:r,backend:a,attrs:n}=e,{x:s}=r,{begin:o,end:i,strides:l,beginMask:u,endMask:p,ellipsisMask:d,newAxisMask:c,shrinkAxisMask:h}=n,{finalShapeSparse:f,finalShape:m,isIdentity:g,sliceDim0:x,isSimpleSlice:y,begin:b,end:v,strides:k}=eY.sliceInfo(s.shape,o,i,l,u,p,d,c,h);if(g)t=iG({inputs:{x:s},backend:a,attrs:{shape:m}});else if(x||y){I.assert(s.shape.length>=1,()=>`Input must have rank at least 1, got: ${s.shape.length}`);let e=eY.computeOutShape(b,v,k),r=lO({inputs:{x:s},backend:a,attrs:{begin:b,size:e}});t=iG({inputs:{x:r},backend:a,attrs:{shape:m}}),a.disposeIntermediateTensorInfo(r)}else if(a.shouldExecuteOnCPU([s])){let e=a.readSync(s.dataId),r=oH(f,(0,N.buffer)(s.shape,s.dtype,e),k,b);t=a.makeTensorInfo(m,s.dtype,r.values)}else{let e=new cW(b,k,f);t=a.runWebGLProgram(e,[s],s.dtype)}let T=iG({inputs:{x:t},backend:a,attrs:{shape:m}});return a.disposeIntermediateTensorInfo(t),T}};g("i64bB");var $=g("hl418");const cj={kernelName:$.StringNGrams,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{separator:n,nGramWidths:s,leftPad:o,rightPad:i,padWidth:l,preserveShortSequences:u}=a,{data:p,dataSplits:d}=t,[c,h]=oK(r.readSync(p.dataId),r.readSync(d.dataId),n,s,o,i,l,u);return[r.makeTensorInfo([c.length],"string",c),r.makeTensorInfo(d.shape,"int32",h)]}};g("i64bB");var $=g("hl418");const cU={kernelName:$.StringSplit,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{skipEmpty:n}=a,{input:s,delimiter:o}=t;if("string"!==s.dtype)throw Error("Input must be of datatype string");if(1!==s.shape.length)throw Error(`Input must be a vector, got shape: ${s.shape}`);if(0!==o.shape.length)throw Error(`Delimiter must be a scalar, got shape: ${o.shape}`);let[i,l,u]=oX(r.readSync(s.dataId),r.readSync(o.dataId)[0],n),p=l.length;return[r.makeTensorInfo([p,2],"int32",i),r.makeTensorInfo([p],"string",l),r.makeTensorInfo([2],"int32",new Int32Array(u))]}};g("i64bB");var $=g("hl418");const cq={kernelName:$.StringToHashBucketFast,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{numBuckets:n}=a,{input:s}=t;if("string"!==s.dtype)throw Error("Input must be of datatype string");if(n<=0)throw Error("Number of buckets must be at least 1");let o=oZ(r.readSync(s.dataId),n);return r.makeTensorInfo(s.shape,"int32",o)}};g("i64bB");var $=g("hl418");const cH=iP({opSnippet:"return tan(x);"}),cK={kernelName:$.Tan,backendName:"webgl",kernelFunc:cH};g("i64bB");var $=g("hl418");const cX=iP({opSnippet:`
  float e2x = exp(-2.0 * abs(x));
  return sign(x) * (1.0 - e2x) / (1.0 + e2x);
`}),cZ={kernelName:$.Tanh,backendName:"webgl",kernelFunc:cX};g("i64bB");var v=g("7MaPk"),$=g("hl418");const cY={kernelName:$.TensorScatterUpdate,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{tensor:n,indices:s,updates:o}=t,{}=a,{sliceRank:i,numUpdates:l,sliceSize:u,strides:p,outputSize:d}=v.calculateShapes(o,s,n.shape),c=[d/u,u];if(0===d)return r.makeTensorInfo(n.shape,s.dtype);let h=iG({inputs:{x:s},backend:r,attrs:{shape:[l,i]}}),f=iG({inputs:{x:o},backend:r,attrs:{shape:[l,u]}}),m=iG({inputs:{x:n},backend:r,attrs:{shape:c}}),g=new co(l,i,h.shape.length,f.shape.length,p,c,!1,!0),x=r.runWebGLProgram(g,[f,h,m],m.dtype),y=iG({inputs:{x:x},backend:r,attrs:{shape:n.shape}});return r.disposeIntermediateTensorInfo(h),r.disposeIntermediateTensorInfo(f),r.disposeIntermediateTensorInfo(m),r.disposeIntermediateTensorInfo(x),y}};g("i64bB");var N=g("iG87S"),$=g("hl418"),I=g("jjNRA");class cQ{constructor(e,t){this.variableNames=["A"];let r=Array(e.length);for(let a=0;a<r.length;a++)r[a]=e[a]*t[a];this.outputShape=r,this.rank=r.length;let a=sX(this.rank),n=function(e){let t=e.length;if(t>5)throw Error(`Tile for rank ${t} is not yet supported`);if(1===t)return`imod(resRC, ${e[0]})`;let r=["resRC.x","resRC.y","resRC.z","resRC.w","resRC.u"],a=[];for(let t=0;t<e.length;t++)a.push(`imod(${r[t]}, ${e[t]})`);return a.join()}(e);this.userCode=`
      void main() {
        ${a} resRC = getOutputCoords();
        setOutput(getA(${n}));
      }
    `}}function cJ(e){let{inputs:t,backend:r,attrs:a}=e,{x:n}=t,{reps:s}=a;if("string"===n.dtype||n.shape.length>5){let e=r.readSync(n.dataId),t="string"===n.dtype?e.map(e=>I.decodeString(e)):e,a=oQ((0,N.buffer)(n.shape,n.dtype,t),s);return r.makeTensorInfo(a.shape,a.dtype,a.values)}let o=new cQ(n.shape,s);return r.runWebGLProgram(o,[n],n.dtype)}const c0={kernelName:$.Tile,backendName:"webgl",kernelFunc:cJ};g("i64bB");var T=g("ibsdL"),$=g("hl418"),I=g("jjNRA");class c1{constructor(e){this.variableNames=["x","indices"],this.customUniforms=[{name:"n",type:"int"},{name:"firstPass",type:"int"},{name:"negativeInf",type:"float"},{name:"dir",type:"int"},{name:"inc",type:"int"}],this.outputShape=e,this.userCode=`
       void main() {
         ivec2 coords = getOutputCoords();
         int batch = coords[0];
         int elemIdx = coords[1];

         // We compare elements pair-wise within a group of size 2 * inc.
         // The comparing rule for each group alternates between ascending
         // and descending. Within each group, we compare each pair at
         // positions i and i+inc. To decide whether an element at position i
         // is x0 or x1, we mod it by 2 * inc, if the result is smaller than
         // inc, it is in the first half of the group, we denote it as x0,
         // otherwise we denote it as x1.
         // For example, as shown in the Bitonic top K paper referenced above,
         // Figure5(a) shows that element[1] is in the
         // second half of the group when group size is 2, but it is in the
         // first half of the group when group size is 4.

         bool isFirstInPair = imod(elemIdx, 2 * inc) < inc;
         int i = isFirstInPair ? elemIdx : elemIdx - inc;

         int i0 = firstPass == 1 ? i : int(getIndices(batch, i));
         int i1 = firstPass == 1 ? i + inc : int(getIndices(batch, i + inc));
         float x0 = i0 < n ? getX(batch, i0) : negativeInf;
         float x1 = i1 < n ? getX(batch, i1) : negativeInf;

         // Denotes which direction indices are in (ascending or descending).
         bool reverse = imod(elemIdx, 2 * dir) >= dir;
         bool isGreater = x0 > x1 || (x0 == x1 && i1 > i0);
         if (reverse == isGreater) { // Elements in opposite order of direction
           int iTemp = i0;
           i0 = i1;
           i1 = iTemp;
         }
         if (isFirstInPair) {
            setOutput(float(i0));
         } else {
            setOutput(float(i1));
         }
       }
     `}}class c2{constructor(e){this.variableNames=["x","indices"],this.customUniforms=[{name:"n",type:"int"},{name:"firstPass",type:"int"},{name:"k",type:"int"}],this.outputShape=e,this.userCode=`
    void main() {
         // Takes max of indices (0, k), (1, k + 1), (2, k + 2) ...
         ivec2 coords = getOutputCoords();
         int batch = coords[0];
         int elemIdx = coords[1];

         // The output size is half of the previous size.
         // If the previous sequence is | | | | _ _ _ _  | | | |  _ _ _ _ (k=4),
         // we only need to output the indices at positions |, the indices at
         // positions _ can be thrown away, see Figure5(b) After Phase 2
         // (Merge phase) in the Bitonic Top K paper referenced above.
         // For example, the paper shows we only need to output the orange bars.
         // The output sequence should look like this | | | | | | | |.
         // Because the sequence is halved, to map the output index back
         // to the previous sequence to find the corresponding value,
         // we need to double the index. When we double the index,
         // we basically interpolate a position, so 2i looks like
         // | _ | _ | _ | _ | _ | _ | _. We move the | to the first k position
         // of each 2k positions by - elemIdx % k. E.g. for output at
         // index 4,5,6,7, we want to get the corresponding element at
         // original index 8,9,10,11, for output at index 8,9,10,11,
         // we want to get the corresponding element at original index
         // 16,17,18,19, so on and so forth.

         int i = elemIdx < k ? elemIdx : (elemIdx * 2 - imod(elemIdx, k));
         int i0 = firstPass == 1 ? i : int(getIndices(batch, i));
         int i1 = firstPass == 1 ? i + k : int(getIndices(batch, i + k));

         float x0 = getX(batch, i0);
         float x1 = i1 < n ? getX(batch, i1) : x0;

         setOutput(x0 >= x1 ? float(i0) : float(i1));
       }
     `}}function c4(e,t){null!==t&&e.disposeIntermediateTensorInfo(t)}function c3(e){let t=1;for(;t<e;)t*=2;return t}const c8={kernelName:$.TopK,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{x:n}=t,{k:s,sorted:o}=a,i=(0,T.env)().getNumber("TOPK_LAST_DIM_CPU_HANDOFF_SIZE_THRESHOLD"),l=(0,T.env)().getNumber("TOPK_K_CPU_HANDOFF_THRESHOLD"),u=n.shape,p=u[u.length-1];if(r.shouldExecuteOnCPU([n])||p<i||s>l){let[e,t]=oJ(r.readSync(n.dataId),u,n.dtype,s,o);return[r.makeTensorInfo(e.shape,e.dtype,e.values),r.makeTensorInfo(t.shape,t.dtype,t.values)]}if(0===s)return u[u.length-1]=0,[r.makeTensorInfo(u,n.dtype,[]),r.makeTensorInfo(u,"int32",[])];if(1===p)return[n,pt({attrs:{shape:u,dtype:"int32",value:0},backend:r})];let d=r.texData.get(n.dataId),c=null!==d&&d.isPacked,h=c?r.unpackTensor(n):n,f=I.sizeFromShape(u)/p,m=iG({inputs:{x:h},attrs:{shape:[f,p]},backend:r});c&&c4(r,h);let g=c3(s),x=c3(p),y=null,b=()=>null===y?[m,m]:[m,y],v=(e,t,a)=>{let n=b(),s=new c1(a),o=[[p],[+(null===y)],[Number.NEGATIVE_INFINITY],[e],[t]],i=y;y=r.runWebGLProgram(s,n,"int32",o),c4(r,i)};for(let e=1;e<g;e*=2){let t=2*e;for(let r=e;r>=1;r/=2)v(t,r,[f,x])}for(let e=x;e>g;e/=2){let t=b(),a=new c2([f,e/2]),n=[[p],[+(null===y)],[g]],s=y;y=r.runWebGLProgram(a,t,"int32",n),c4(r,s);let o=g/2,i=2*o;for(let e=o;e>=1;e/=2)v(i,e,y.shape)}let N=y;y=lO({inputs:{x:y},backend:r,attrs:{begin:0,size:[f,s]}}),c4(r,N);let k=pb({inputs:{x:m,indices:y},backend:r,attrs:{axis:1,batchDims:1}});c4(r,m);let S=u.slice(0,-1);S.push(s),N=y,y=iG({inputs:{x:y},attrs:{shape:S},backend:r}),c4(r,N);let w=k;return k=iG({inputs:{x:k},attrs:{shape:S},backend:r}),c4(r,w),[k,y]}};g("i64bB");var $=g("hl418");class c6{constructor(e,t,r,a,n,s){let o;switch(this.variableNames=["Image","Transforms"],this.outputShape=s,a){case"constant":default:o=1;break;case"reflect":o=2;break;case"wrap":o=3;break;case"nearest":o=4}this.userCode=`
            float mapCoord(float outCoord, float len) {
              float inCoord = outCoord;
              if(${o} == 2) {
                if (inCoord < 0.0) {
                  if (len <= 1.0) {
                    inCoord = 0.0;
                  } else {
                    float sz2 = 2.0 * len;
                    if (inCoord < sz2) {
                      inCoord = sz2 * float(int(float(-inCoord / sz2))) +
                      inCoord;
                    }
                    inCoord = inCoord < -len ? inCoord + sz2 : -inCoord - 1.0;
                  }
                } else if (inCoord > len - 1.0) {
                  if (len <= 1.0) {
                    inCoord = 0.0;
                  } else {
                    float sz2 = 2.0 * len;
                    inCoord -= sz2 * float(int(float(inCoord / sz2)));
                    if (inCoord >= len) {
                      inCoord = sz2 - inCoord - 1.0;
                    }
                  }
                }
                return clamp(inCoord, 0.0, len - 1.0);
              } else if (${o} == 3) {
                if (inCoord < 0.0) {
                  if (len <= 1.0) {
                    inCoord = 0.0;
                  } else {
                    float sz = len - 1.0;
                    inCoord += len * (float(int(float(-inCoord / sz))) + 1.0);
                  }
                } else if (inCoord > len - 1.0) {
                  if (len <= 1.0) {
                    inCoord = 0.0;
                  } else {
                    float sz = len - 1.0;
                    inCoord -= len * float(int(float(inCoord / sz)));
                  }
                }
                return clamp(inCoord, 0.0, len - 1.0);
              } else if (${o} == 4) {
                return clamp(outCoord, 0.0, len - 1.0);
              } else {
                return outCoord;
              }
            }

            float readWithFillValue(int batch, int coordY, int coordX,
              int channel) {
              float outputValue;
              if (0 <= coordY && coordY < ${e} && 0 <= coordX && coordX < ${t}) {
                  outputValue = getImage(batch, coordY, coordX, channel);
              } else {
                outputValue = float(${n});
              }
              return outputValue;
            }

            void main() {
              ivec4 coords = getOutputCoords();
              float outputValue;
              int batch = coords[0];
              int x = coords[2];
              int y = coords[1];
              int channel = coords[3];
              float xf = float(x);
              float yf = float(y);
              float a1 = getTransforms(batch, 0);
              float a2 = getTransforms(batch, 1);
              float a3 = getTransforms(batch, 2);
              float b1 = getTransforms(batch, 3);
              float b2 = getTransforms(batch, 4);
              float b3 = getTransforms(batch, 5);
              float c1 = getTransforms(batch, 6);
              float c2 = getTransforms(batch, 7);
              float projection = c1 * xf + c2 * yf + 1.0;
              if (projection == 0.0) {
                outputValue = float(${n});
              } else {
                float inX = (a1 * xf + a2 * yf + a3) / projection;
                float inY = (b1 * xf + b2 * yf + b3) / projection;
                float mapX = mapCoord(inX, float(${t}));
                float mapY = mapCoord(inY, float(${e}));

                if (${"nearest"===r?1:2} == 1) {
                  int coordY = int(round(mapY));
                  int coordX = int(round(mapX));
                  outputValue = readWithFillValue(batch, coordY, coordX,
                    channel);
                } else {
                  float yFloor = floor(mapY);
                  float xFloor = floor(mapX);
                  float yCeil = yFloor + 1.0;
                  float xCeil = xFloor + 1.0;
                  float valueYFloor = (xCeil - mapX) *
                  readWithFillValue(batch, int(yFloor), int(xFloor), channel) +
                  (mapX - xFloor) *
                  readWithFillValue(batch, int(yFloor), int(xCeil), channel);
                  float valueYCeil = (xCeil - mapX) *
                  readWithFillValue(batch, int(yCeil), int(xFloor), channel) +
                  (mapX - xFloor) *
                  readWithFillValue(batch, int(yCeil), int(xCeil), channel);
                  outputValue = (yCeil - mapY) * valueYFloor +
                  (mapY - yFloor) * valueYCeil;
                }
              }
              setOutput(outputValue);
            }
        `}}const c5={kernelName:$.Transform,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{image:n,transforms:s}=t,{interpolation:o,fillMode:i,fillValue:l,outputShape:u}=a,[p,d,c,h]=n.shape,[f,m]=null!=u?u:[d,c],g=new c6(d,c,o,i,l,[p,f,m,h]);return r.runWebGLProgram(g,[n,s],"float32")}};g("i64bB");var $=g("hl418");const c7={kernelName:$.Unique,backendName:"webgl",kernelFunc:function(e){let{inputs:t,attrs:r,backend:a}=e,{axis:n}=r,{x:s}=t;sR(s,"unique"),console.warn("WARNING: ","UI might be locked temporarily as data is being downloaded");let{outputValues:o,outputShape:i,indices:l}=o1(a.readSync(s.dataId),n,s.shape,s.dtype);return[a.makeTensorInfo(i,s.dtype,o),a.makeTensorInfo([l.length],"int32",l)]}};g("i64bB");var $=g("hl418");const c9={kernelName:$.Unpack,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{value:n}=t,{axis:s}=a;s<0&&(s+=n.shape.length);let o=n.shape.length,i=n.shape[s],l=Array(o-1),u=0;for(let e=0;e<o;e++)e!==s&&(l[u++]=n.shape[e]);let p=[],d=Array(o).fill(0),c=n.shape.slice();c[s]=1;let h=Array(i);for(let e=0;e<h.length;e++){d[s]=e;let t=lO({inputs:{x:n},backend:r,attrs:{begin:d,size:c}}),a=iG({inputs:{x:t},backend:r,attrs:{shape:l}});h[e]=a,p.push(t)}return p.forEach(e=>r.disposeIntermediateTensorInfo(e)),h}};g("i64bB");var v=g("7MaPk"),tT=g("2MDja"),$=g("hl418"),I=g("jjNRA");class he{constructor(e,t){this.variableNames=["x","segmentIds"];let r=e.windowSize,a=e.batchSize,n=e.inSize,s=e.numSegments,o=s*Math.ceil(n/r);this.outputShape=[a,o];let i=4*Math.floor(r/4),l=r%4,u=`
        sumValue += dot(values, segFilter);
    `,p="";n%r>0&&(p=`
        if (inIdx < 0 || inIdx >= ${n}) {
          return initializationValue;
        }
      `);let d="";n%r>0&&(d=`
        if (inIdx < 0 || inIdx >= ${n}) {
          return -1.0;
        }
      `),this.userCode=`
      const float initializationValue = 0.0;

      float getValue(int batch, int inIdx) {
        ${p}
        return getX(batch, inIdx);
      }

      float getSegmentIdAtIndex(int inIdx) {
        ${d}
        return getSegmentIds(inIdx);
      }

      void main() {
        ivec2 coords = getOutputCoords();
        int batch = coords[0];
        int outIdx = coords[1];
        int inOffset = int(floor(float(outIdx) / float(
          ${s})) * float(${r}));
        int currentSeg = int(mod(float(outIdx), float(${s})));

        float sumValue = 0.0;

        for (int i = 0; i < ${i}; i += 4) {
          int inIdx = inOffset + i;
          vec4 values = vec4(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            getValue(batch, inIdx + 2),
            getValue(batch, inIdx + 3)
          );

          vec4 segFilter = vec4(
            int(getSegmentIdAtIndex(inIdx)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 1)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 2)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 3)) == currentSeg ? 1 : 0
          );

          ${u}
        }

        int inIdx = inOffset + ${i};
        if (${1===l}) {
          vec4 values = vec4(
            getValue(batch, inIdx),
            initializationValue,
            initializationValue,
            initializationValue
          );

          int inIdxSeg = int(getSegmentIdAtIndex(inIdx));

          vec4 segFilter = vec4(
            int(getSegmentIdAtIndex(inIdx)) == currentSeg ? 1 : 0,
            0,
            0,
            0
          );

          ${u}
        } else if (${2===l}) {
          vec4 values = vec4(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            initializationValue,
            initializationValue
          );

          vec4 segFilter = vec4(
            int(getSegmentIdAtIndex(inIdx)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 1)) == currentSeg ? 1 : 0,
              0,
              0
          );

          ${u}
        } else if (${3===l}) {
          vec4 values = vec4(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            getValue(batch, inIdx + 2),
            initializationValue
          );

          vec4 segFilter = vec4(
            int(getSegmentIdAtIndex(inIdx)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 1)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 2)) == currentSeg ? 1 : 0,
            0
          );

          ${u}
        }
        setOutput(sumValue);
      }
    `}}for(const e of[i0,i2,i3,i6,i9,lr,la,ln,ll,lu,ld,lh,lm,lx,lb,lk,lT,lw,lC,lE,lR,lD,l_,lG,lW,lK,lY,l0,iS,l4,ue,ul,uh,um,ug,ux,uy,uv,uk,uS,uA,u$,uR,uB,uM,uL,uV,uW,uj,uU,uH,uX,uY,uJ,u1,u4,u6,u9,pr,pn,pi,pu,pc,pf,pm,px,pv,pk,pS,ik,pI,l7,pC,pA,pR,iC,pB,pO,pM,p_,pV,pW,pj,pq,pX,pY,pJ,p1,p2,p4,p6,p5,p7,p9,de,dr,ds,dl,dx,iV,dv,dk,dS,dw,lU,dE,dR,dP,dM,d_,i$,dL,dV,dG,dW,dj,lH,dd,dq,dK,dZ,iW,dJ,d1,d3,d6,d9,ct,ca,cs,cl,cp,cc,cf,cg,cy,cv,ck,lM,dg,cS,cI,cw,cC,cE,cA,c$,cR,cF,cM,cL,cV,cG,cz,cj,cU,cq,df,iZ,cK,cZ,cY,c0,c8,c5,iQ,c7,c9,{kernelName:$.UnsortedSegmentSum,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{x:n,segmentIds:s}=t,{numSegments:o}=a,i=n.shape.length,l=[],u=0,p=v.getAxesPermutation([u],i),d=n;null!=p&&(d=iY({inputs:{x:n},backend:r,attrs:{perm:p}}),l.push(d),u=v.getInnerMostAxes(1,i)[0]);let c=v.segment_util.computeOutShape(d.shape,u,o),h=I.sizeFromShape([d.shape[u]]),f=iG({inputs:{x:d},backend:r,attrs:{shape:[-1,h]}});l.push(f);let m=(0,tT.sumOutType)(n.dtype),g=(e,t,a,n,s)=>{let o=e.shape[0],i=e.shape[1],u=v.segment_util.segOpComputeOptimalWindowSize(i,s),p=new he({windowSize:u,inSize:i,batchSize:o,numSegments:s},t),d=r.compileAndRun(p,[e,a],n);if(l.push(d),d.shape[1]===s)return d;let c=dz({backend:r,attrs:{start:0,stop:s,step:1,dtype:"float32"}}),h=cJ({inputs:{x:c},backend:r,attrs:{reps:[i/u]}});return l.push(c),l.push(h),g(d,t,h,n,s)},x=iG({inputs:{x:g(f,"unsortedSegmentSum",s,m,o)},backend:r,attrs:{shape:c}}),y=x;return null!=p&&(l.push(x),y=iY({inputs:{x:y},backend:r,attrs:{perm:v.getUndoAxesPermutation(p)}})),l.forEach(e=>r.disposeIntermediateTensorInfo(e)),y}},d$])(0,A.registerKernel)(e);(async()=>{let e=document.getElementById("webcam"),t=document.getElementById("live-view"),r=document.getElementById("demo"),a=document.getElementById("btn-enable"),n=document.getElementById("instruction-area"),s=[],o=null;async function i(t){let{target:r}=t;if(r instanceof HTMLElement)try{o=await y.load(),r.classList.add("hidden"),navigator.mediaDevices.getUserMedia({video:!0}).then(t=>{e.srcObject=t,e.onloadeddata=l}),n.classList.add("hidden")}catch(e){console.log(e)}}function l(){o&&o.detect(e).then(e=>{for(let e=0;e<s.length;e++)t.removeChild(s[e]);s.splice(0);for(let r=0;r<e.length;r++){if(e[r].score<.66)continue;let a=document.createElement("p");a.innerText=e[r].class+" - with "+Math.round(100*parseFloat(`${e[r].score}`))+"% confidence.",a.style="margin-left: "+e[r].bbox[0]+"px; margin-top: "+(e[r].bbox[1]-10)+"px; width: "+(e[r].bbox[2]-10)+"px; top: 0; left: 0;";let n=document.createElement("div");n.setAttribute("class","highlighter"),n.style="left: "+e[r].bbox[0]+"px; top: "+e[r].bbox[1]+"px; width: "+e[r].bbox[2]+"px; height: "+e[r].bbox[3]+"px;",t.appendChild(n),t.appendChild(a),s.push(n),s.push(a)}window.requestAnimationFrame(l)})}navigator.mediaDevices&&navigator.mediaDevices.getDisplayMedia?(r.classList.remove("hidden"),a.addEventListener("click",i)):console.warn("getUserMedia() is not supported by your browser")})();
//# sourceMappingURL=camera-identify.c52a8901.js.map
