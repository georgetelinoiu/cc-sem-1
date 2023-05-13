Poem Generator, Telinoiu Nicolae Georgian, 1121<br />
Link video:https://youtu.be/EdFHyigy1fM<br />
Link publicare: https://github.com/georgetelinoiu/cc-sem-1<br />
Link deploy: https://poem-generator-eight.vercel.app/ <br />
Documentația proiectului - Poem generator<br />

**Introducere**<br />
Această documentație prezintă detaliile proiectului. Acesta este un proiect de aplicație web care permite utilizatorilor să genereze poezii prin intermediul unui API furnizat de OpenAI. Proiectul a fost dezvoltat utilizând tehnologii cloud. Aplicația permite utilizatorilor să creeze poezii personalizate, să le salveze și să le vizualizeze într-o listă.

**Descriere problemă**<br />
Dorim sa facem mai simpla dedicarea unei poezii din suflet catre o persoana pretuita de noi.

**Descriere API**<br />
API-ul utilizat pentru backend este unul simplu, ce ofera capabilitati de get/post/delete intr-o baza de date NOSQL.

**Flux de date**<br />
Utilizatorul trebuie sa introduca in aplicatie doua nume (de la cine vine poemul si catre cine este adresat) si sa aleaga tipul de poezie.<br />
In urma alegerii, un API Call catre OpenAI este facut, cu un promt special conceput pentru a obtine o poezie.<br />
Prompt-ul arata asa: `I want you to act as a poet. You will create a poem that evoke emotions and have the power to stir people’s soul. Write on the topic or theme of ${poemType} but make sure your words convey the feeling you are trying to express in beautiful yet meaningful ways. You can only come up with short verses that are still powerful enough to leave an imprint in readers’ minds. The poem should be from ${name1} to ${name2}. Maximum 4 verses.`, unde poemType este tipul de poezie, name1 este primul nume scris de utilizator iar name2 este al doilea nume scris de utilizator.<br />
Doar in urma completarii tuturor campurilor, utilizatorul poate apasa butonul de "Generate".<br />
In urma generarii, se deblocheaza butonul de "Save", care salveaza in baza de date poezia (prin intermediul unui alt API Call de POST) generata si o afiseaza in pagina principala, in coada listei.<br />
Din pagina principala se poate sterge orice poezie folosind butonul "Delete".

**Exemple de Request/Response, metode HTTP si autorizare servicii**<br />
API Call-ul catre OpenAI, folosind biblioteca lor:<br />
const response = await openai.createCompletion({
			model: "text-davinci-003",
			prompt: `I want you to act as a poet. You will create a poem that evoke emotions and have the power to stir people’s soul. Write on the topic or theme of ${poemType} but make sure your words convey the feeling you are trying to express in beautiful yet meaningful ways. You can only come up with short verses that are still powerful enough to leave an imprint in readers’ minds. The poem should be from ${name1} to ${name2}. Maximum 4 verses.`,
			temperature: 0.9,
			max_tokens: 150,
			top_p: 1,
			frequency_penalty: 0.0,
			presence_penalty: 0.6,
			stop: [" Human:", " AI:"],
		});<br />
In urma obtinerii datelor, acestea se afiseaza in pagina.<br />
Pentru utilizarea acestui API, este configurata **cheia de access** prin intermediul unui obiect de configurare, la inceputul functiei paginii principale:<br />
const configuration = new Configuration({
		apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
	});
	const openai = new OpenAIApi(configuration);<br />
NEXT_PUBLIC_OPENAI_API_KEY este stocata in fisierul .env, ce nu este incarcat pe github din motive de securitate.

**Exemplu de request POST catre backend (Metoda HTTP de tipul POST):**<br />
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

**Descriere tehnologii cloud folosite**<br />
Pentru dezvoltarea proiectului Generarea de Poezii, au fost utilizate următoarele tehnologii cloud:<br />
Next.js: un framework de React care permite dezvoltatorilor să creeze aplicații web și mobile.<br />
MongoDB: o bază de date NoSQL care oferă o scalabilitate orizontală și verticală.<br />
OpenAI API: un API care furnizează unelte de inteligență artificială pentru dezvoltatori.<br />
Vercel: o platformă de cloud care oferă funcționalități de deploy și hosting pentru aplicații web.

**Detalii despre aplicație:**<br />
Aplicația este de tip SaaS (Software as a Service), oferind utilizatorilor posibilitatea de a genera poezii personalizate, prin introducerea unor informații de baza. Utilizatorii trebuie să introducă informații cum ar fi persoana către care este adresată poezia, tipul de poezie si numele propriu. Apoi, aplicația generează poezia și o afișează utilizatorului, care poate alege să o salveze în baza de date. Arhitectura aplicatiei este bazata pe Cloud Computing, astfel toate datele si functionalitatile prezentate sunt stocate si accesate pe internet.

Pagina principală a aplicației conține o listă cu toate poeziile generate de utilizatori, care pot fi vizualizate și șterse. Aceasta oferă o modalitate simplă și eficientă de a gestiona poeziile generate de utilizatorii aplicației.

![image](https://user-images.githubusercontent.com/81044083/236695204-c66ba181-5f1f-4b0b-8b62-000ce96d3f9a.png)
![image](https://user-images.githubusercontent.com/81044083/236695211-b6ccfd90-1cdf-4df5-9bb3-e2249cb1553d.png)
![image](https://user-images.githubusercontent.com/81044083/236695241-31dfb3d6-8681-46d3-a6de-de24e441c80a.png)
![image](https://user-images.githubusercontent.com/81044083/236695265-8d04dc7a-fa59-4c14-91c3-042ab8201caf.png)
(Mobile friendly)
