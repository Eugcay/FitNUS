const test = () => {fetch("https://wger.de/api/v2/exercise/").then(res => res.json()).then(data => console.log(data))}

test()