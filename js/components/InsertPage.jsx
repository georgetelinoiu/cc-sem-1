import { useState } from 'react';
import { Configuration, OpenAIApi } from "openai";
import { useRouter } from 'next/router';

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

	const router = useRouter();

	const handleGeneratePoem = async () => {
		setLoading(true);
		const response = await openai.createCompletion({
			model: "text-davinci-003",
			prompt: `I want you to act as a poet. You will create a poem that evoke emotions and have the power to stir people’s soul. Write on the topic or theme of ${poemType} but make sure your words convey the feeling you are trying to express in beautiful yet meaningful ways. You can only come up with short verses that are still powerful enough to leave an imprint in readers’ minds. The poem should be from ${name1} to ${name2}. Maximum 4 verses.`,
			temperature: 0.9,
			max_tokens: 300,
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

	const handlePoemSave = async () => {
		if (poem != "" || poem != null) {
			const data = {
				sender: name1,
				receiver: name2,
				poem: poem,
				type: poemType
			};
			console.log(data);

			fetch('/api/records', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			}).then(() => {
				console.log("A records has been uploaded");
				window.location.replace('/');
			});
		}
		else {
			alert("Please generate a poem first!");
		}
	}

	function handleClick() {
		router.back();
	}

	return (
		<div className="container mx-auto mt-8">
			<button
				className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mr-4 text-lg"
				onClick={handleClick}
			>Go Back</button>
			<h1 className="flex justify-center text-3xl font-bold mb-4">Generate a Poem</h1>

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
						<option value="Love">Love</option>
						<option value="Comedy">Comedy</option>
						<option value="Tragedy">Tragedy</option>
						<option value="Drama">Drama</option>
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
						className="text-white border rounded-md px-4 py-2 text-lg"
						type="button"
						onClick={handleGeneratePoem}
						disabled={loading || !poemType || !name1 || !name2}
						title={loading || !poemType || !name1 || !name2 ? "Completeaza toate campurile inainte de a genera poezia!" : ""}
					>
						{loading ? (
							<>
								<span className="mr-2">Generating...</span>
								<span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
							</>
						) : (
							"Generate a poem"
						)}
					</button>
				</div>
				<div class="sm:text-base md:text-lg lg:text-xl">
					<div class="mx-4 sm:mx-6 md:mx-8 lg:mx-10">
						{poem && (
							<pre
								id="poem"
								class="text-white bg-transparent whitespace-pre-wrap"
							>
								{poem}
							</pre>
						)}
					</div>
				</div>
				<button
					className="text-white border border-gray-100 rounded-md px-4 py-2 text-lg mb-20"
					type="button"
					onClick={() => handlePoemSave()}
					disabled={loading || !poem}
					title={loading || !poem ? "Trebuie sa generezi o poezie inainte de a o salva!" : ""}
				>
					Save poem
				</button>
			</div>
		</div>
	);
}
