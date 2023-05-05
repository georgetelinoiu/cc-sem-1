import { useState } from 'react';
import { Configuration, OpenAIApi } from "openai";


export default function InsertPage() {
	const [name1, setName1] = useState('');
	const [name2, setName2] = useState('');
	const [poemType, setPoemType] = useState('');
	const [loading, setLoading] = useState(false);
	const [poem, setPoem] = useState("");
	const [poemSaved, setPoemSaved] = useState("");
	const configuration = new Configuration({
		apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
	});
	const openai = new OpenAIApi(configuration);

	const handleName1Change = (event) => {
		setName1(event.target.value);
	};

	const handleName2Change = (event) => {
		setName2(event.target.value);
	};

	const handlePoemTypeChange = (event) => {
		setPoemType(event.target.value);
	};

	const handleGeneratePoem = async () => {
		setLoading(true);
		const response = await openai.createCompletion({
			model: "text-davinci-003",
			prompt: `I want you to act as a poet. You will create poems that evoke emotions and have the power to stir people’s soul. Write on the topic or theme of ${poemType} but make sure your words convey the feeling you are trying to express in beautiful yet meaningful ways. You can also come up with short verses that are still powerful enough to leave an imprint in readers’ minds. The poem should be from ${name1} to ${name2}. Maximum 2 verses per poem, nothing more`,
			temperature: 0.9,
			max_tokens: 150,
			top_p: 1,
			frequency_penalty: 0.0,
			presence_penalty: 0.6,
			stop: [" Human:", " AI:"],
		});

		console.log(response);
		setPoem(response.data.choices[0].text);

		setLoading(false);
		setPoemSaved(true);
	};

	const handlePoemSave = async (poem) => {
		console.log(poem);
		const url = '/api/records'; 
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({"poem" : poem})
		};
		const result = await fetch(url, options);
		console.log(result);
	}

	return (
		<div className="container mx-auto mt-8">
			<h1 className="text-3xl font-bold mb-4">Generate a Poem</h1>

			<div className="text-black flex flex-col items-center justify-center space-y-4">
				<div className="flex flex-col">
					<label htmlFor="name1" className="text-white font-medium mb-1">
						First name:
					</label>
					<input
						id="name1"
						type="text"
						value={name1}
						onChange={handleName1Change}
						className="border border-gray-300 rounded-md px-3 py-2 w-72"
					/>
				</div>

				<div className="flex flex-col">
					<label htmlFor="poemType" className="text-white font-medium mb-1">
						Poem type:
					</label>
					<select
						id="poemType"
						value={poemType}
						onChange={handlePoemTypeChange}
						className="border border-gray-300 rounded-md px-3 py-2 w-72"
					>
						<option value="">Select poem type</option>
						<option value="dragoste">Dragoste</option>
						<option value="comedie">Comedie</option>
						<option value="tragedie">Tragedie</option>
						<option value="drama">Drama</option>
					</select>
				</div>

				<div className="flex flex-col">
					<label htmlFor="name2" className="text-white font-medium mb-1">
						Second name:
					</label>
					<input
						id="name2"
						type="text"
						value={name2}
						onChange={handleName2Change}
						className="border border-gray-300 rounded-md px-3 py-2 w-72"
					/>
				</div>

				<div>
					<button
						className="text-white border rounded-md"
						type="button"
						onClick={handleGeneratePoem}
						disabled={loading || !poemType || !name1 || !name2}
					>
						{loading ? "Generating..." : "Generate a poem"}
					</button>
				</div>
				<div>
					{poem && <pre className='text-white'>{poem}</pre>}
				</div>
				<button
						className="text-white border border-gray-100 rounded-md"
						type="button"
						onClick={handlePoemSave(poem)}
					>
						Save poem
					</button>
			</div>
		</div>
	);
}
