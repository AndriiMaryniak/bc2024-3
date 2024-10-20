const fs = require("fs");
const { Command } = require("commander");
const program = new Command();

program
  .requiredOption("-i, --input <file>", "input file path")
  .option("-o, --output <file>", "output file path")
  .option("-d, --display", "display result in console");

program.parse(process.argv);

const options = program.opts();

if (!options.input) {
  console.error("Please, specify input file");
  process.exit(1);
}

if (!fs.existsSync(options.input)) {
  console.error("Cannot find input file");
  process.exit(1);
}

// Читання даних з файлу
const data = JSON.parse(fs.readFileSync(options.input, "utf-8"));

// Обробка даних для варіанту 4
const results = data.map(item => {
  return `${item.StockCode}-${item.ValCode}-${item.Attraction}`;
});

// Виведення результатів
if (options.display) {
  console.log(results.join("\n"));
}

// Запис результатів у файл
if (options.output) {
  fs.writeFileSync(options.output, results.join("\n"));
}
