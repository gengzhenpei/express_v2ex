<template>
	<div id="Main" class="">
		<div class="sep20"></div>
		<div class="box">
			<div class="header">
				<a href="/">V2EX</a> <span class="chevron">&nbsp;›&nbsp;</span> 登出</div>
			<div class="inner">
				你已经完全登出，没有任何个人信息留在这台电脑上。
				<div class="sep20"></div>
				<input type="button" class="super normal button" onclick="location.href = '/signin';" value="重新登录">
			</div>
		</div>
		<div class="sep20"></div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
			};
		},
		created() {
			this.clearUserInfo()
		},
		mounted() {
			document.title = "时刻点官网";

			this.nav = [];
			var index = {
				path: "/index",
				name: "index",
				title: "修改邮箱",
			};
			this.nav.push(index);
		},
		methods: {
			clearUserInfo() {
				localStorage.removeItem('token');
				localStorage.removeItem('user_info');
			},
		},

	};
</script>

<style scoped>
	td {
		padding: 5px;
	}
</style>