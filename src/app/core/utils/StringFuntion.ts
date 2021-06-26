export function FormatString(str: string, ...val: string[]) : string {
	for (let index = 0; index < val.length; index++) {
			str = str.replace(`{${index}}`, val[index]);
	}
	return str;
}

export function dateToString(str : string) : string {
	if(str){
		return (str.slice(0,10).split('-').join('/')) + '';
	}
	return '';
}
