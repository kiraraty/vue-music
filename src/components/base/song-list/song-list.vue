<template>
	<ul class="song-list">
		<li class="item" v-for="(song ,index)in songs" :key="song.id" @click="selectItem(song,index)">
			<div class="content">
				<h2 class="name">{{song.name}}</h2>
				<p class="desc">{{getDesc(song)}}</p>
			</div>

		</li>
	</ul>
</template>

<script>
export default {
	name:'song-list',
	props:{
		songs:{
			type:Array,
			default(){
				return []
			}
		}
	},
	emits:['select'],
	methods:{
		getDesc(song){
			return `${song.singer}${song.album}`
		},
		selectItem(song,index){
			this.$emit('select',{song,index})
		}
	}
}
</script>

<style>

</style>