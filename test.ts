

enum QuestionStatus {
	PUBPLISHED = 'published',
	DRAFT = 'draft',
	DELETED ='deleted'
}

async function getFlags(req:{
	topicId:number;
	status:QuestionStatus;
}):Promise<{
	question: string;
	answer:string;
	tags:string[];
	likes:number;
	status:QuestionStatus; 
}[]>{
	const res = await fetch('/faqs', {
		method:'POST',
		body: JSON.stringify(req)
	});
	const data = await res.json();
	return data;

}
//getFlags(JSON.parse(req));
{

	// function foo():string{
	// 	return A.ZERO + '';	
	// }
	// console.log(foo());
	let a;
	console.log(undefined ||( a = {d:1}));
}
