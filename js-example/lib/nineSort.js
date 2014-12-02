var arr = [5,2,3,4,10,6];


function maopao(arr){
	var len =arr.length,i=0,j,d=null;

	for(;i<len;i++){
		for(j=0;j<len;j++){
			if(arr[j]>arr[i]){
				d = arr[j];
				arr[j] = arr[i];
				arr[i] = d;
			}
		}
	};

	return arr;

};
function maopao2(arr){
	var len =arr.length,i=0,j,d=null;
	for(;i<len;i++){
		for(j=len-1;j>=i;j--){
			if(arr[j]>arr[j-1]){
				d = arr[j-1];
				arr[j-1] = arr[j];
				arr[j] = d;
			}
		}
	};

	return arr;

};

//console.log(maopao(arr));;
//console.log(maopao2(arr));;

var kuaisu = function (arr){
	if(arr.length<=1) return arr;
	var len = arr.length,i=0;
	var item = arr[Math.floor(len/2)],left=[],right=[];

	for(;i<len;i++){
		if(arr[i]>item){
			left.push(arr[i]);
		}else if(arr[i]<item){
			right.push(arr[i]);
		};
	};

	return kuaisu(left).concat(item,kuaisu(right))
		
};
//console.log(kuaisu(arr));

var charu = function (arr){
	var len = arr.length,i=1,j=0,item=null;

	for(;i<len;i++){
		item = arr[i];
		j = i - 1;
		while(j>=0 && item<arr[j]){
			arr[j+1] = arr[j];
			j--;
		};

		arr[j+1] = item;
	};

	return arr;

};
console.log(charu(arr));