const mutations={
	setPlayState(state,playing){
		state.playing=playing
	},
	setSequenceList(state,list){
		state.sequenceList = list
	},
	setPlaylist(state,list){
		state.playlist=list
	},
	setPlayMode(state,mode){
		state.playMode=mode
	},
	serCurrentIndex(state,index){
		state.currentIndex=index
	},
	setFullScreen(state,fullScreen){
		state.fullScreen=fullScreen
	},
	setFavoriteList(state,list){
		state.favoriteList=list
	}
}
export default mutations