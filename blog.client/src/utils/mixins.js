var moment = require('moment');
export default {
	data() {
		return {
			routeObj: "", //路由信息
		};
	},
	watch: {
		$route(to, from) {
			//获取当前路由信息
			this.routeObj = this.$route;
		},
	},
	created() {
		this.routeObj = this.$route;
	},
	methods: {
		//时间格式化
		dateFormat(date) {
			let m2 = moment(); //当下时间
			let m1 = moment(date);
			let du = moment.duration(m2 - m1, 'ms'); //做差
			let years = du.get('years');
			let days = du.get('days');
			let hours = du.get('hours');
			let mins = du.get('minutes');
			let ss = du.get('seconds');
			//  输出结果为   01天08时09分40秒
			if(years > 0) {
				date = moment(date).format("YYYY-MM-DD hh:mm:ss");
				return date
			} else if(days > 0) {
				return days + '天之前';
			} else if(hours > 0) {
				return hours + '小时之前'
			} else {
				return mins + '分钟之前'
			}

		},
		//时间格式化
		dateFormatDays(date) {
			let m2 = moment(); //当下时间
			let m1 = moment(date);
			let du = moment.duration(m2 - m1, 'ms'); //做差
			let days = du.get('days');
			return days;
		},
	}
}