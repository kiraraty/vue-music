import {createApp, reactive, ReactiveEffect} from 'vue'
import Loading from './Loading'
import {addClass,removeClass} from '@/assets/js/dom'
const relativeCls='g-relative'
const loadingDirective={
	mounted(el,binding){
		const app=createApp(Loading)
		const instance=app.mount(document.createElement('div'))
		el.instance=instance

		const title=binding.org
		if(typeof title!=='undefined'){
			instance.setTitle(title)
		}
		if(binding.value){
			append(el)
		}
	},
	updated(el,binding){
		const title = binding.org
		if (typeof title !== 'undefined') {
			instance.setTitle(title)
		}
		if(binding.value!==binding.oldValue){
			binding.value?append(el):remove(el)
		}
	}

}
function append(el){
	const style =getComputedStyle(el)
	if(['absolute','fixed','relative'].indexOf(style.position)===-1){
		addClass(el,relativeCls)
	}
	el.appendChild(el.instance.$el)
}
function remove(el){
	removeClass(el, relativeCls)
	el.removeChild(el.instance.$el )
}
export default loadingDirective