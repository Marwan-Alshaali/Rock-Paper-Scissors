const selectionButtons = document.querySelectorAll('[data-selection]')
const finalColumn = document.querySelector('[data-final-column]')
const computerScoreSpan = document.querySelector('[data-computer-score]')
const yourScoreSpan = document.querySelector('[data-your-score]')
const SELECTIONS = [
	{
		name: 'rock',
		emoji: '✊',
		beats: 'scissors'
	},
	{
		name: 'paper',
		emoji: '✋',
		beats: 'rock'
	},
	{
		name: 'scissors',
		emoji: '✌',
		beats: 'paper'
	}
]

selectionButtons.forEach(selectionButton => {
	selectionButton.addEventListener('click', e => {

		//gets the data variables given, now we know the name of what was pressed
		const selectionName = selectionButton.dataset.selection

		/*matches the name of the selection with the SELECTIONS group so we know:
		.						[name] + [emoji] + [beats]								*/
		const selection = SELECTIONS.find(selection => selection.name == selectionName)

		makeSelection(selection)
	})
})

function makeSelection(selection) {
	const computerSelection = randomSelection()
	const yourWinner = isWinner(selection, computerSelection)
	const computerWinner = isWinner(computerSelection, selection)
	
	addSelectionResult(computerSelection, computerWinner)
	addSelectionResult(selection, yourWinner)

	if(yourWinner) incrementScore(yourScoreSpan)
	if(computerWinner) incrementScore(computerScoreSpan)
}

function addSelectionResult(selection, winner) {
	const div = document.createElement('div')
	div.innerText = selection.emoji
	div.classList.add('result-selection')
	if(winner) div.classList.add('winner')
	finalColumn.after(div)
}

function incrementScore(scoreSpan) {
	scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1
}

function isWinner(selection, opponentSelection) {
	return selection.beats == opponentSelection.name
}

//the computer's choice
function randomSelection() {
	const randomIndex = Math.floor(Math.random() * SELECTIONS.length)
	return SELECTIONS[randomIndex]
}