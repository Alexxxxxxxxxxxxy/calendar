<template>
	<view class="bar">
		<view class="progress" :style="{'width':`${props.width}`}">
			<view class="one">&emsp;</view>
		</view>
	</view>
</template>

<script setup>
const props = defineProps({
	width:{
		type:String,
		required:true,
	}
})
</script>

<style scoped lang="scss">
.bar{
	margin: 0.5rem 0;
	width: 100%;
	background-color: #e0e0e0;
	border-radius: 0.5rem;
	.one{
		width: 1px;
		height: 100%;
	}
	.progress{
		height: 100%;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		background-color: cornflowerblue;
		border-radius:0.5rem; 
		padding-right: 0.1rem;
		background: linear-gradient(
		  45deg,
		  #007bff 0%,
		  #007bff 10%,
		  #ffffff 10%,
		  #ffffff 20%,
		  #007bff 20%,
		  #007bff 30%,
		  #ffffff 30%,
		  #ffffff 40%,
		  #007bff 40%,
		  #007bff 50%,
		  #ffffff 50%,
		  #ffffff 60%,
		  #007bff 60%,
		  #007bff 70%,
		  #ffffff 70%,
		  #ffffff 80%,
		  #007bff 80%,
		  #007bff 90%,
		  #ffffff 90%,
		);
	}
}
</style>