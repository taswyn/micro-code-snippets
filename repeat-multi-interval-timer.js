// basic demo for a group of timers that get run in order, using setTimeout

// kind of a mess, needs cleaning up
document.querySelector('html').innerHTML = "";

function html(string) {
    return string;
};

var goIntervalSeconds = 0;

const inputElementLiteral = html`<input type="text" value="45" />`;

document.querySelector('body').insertAdjacentHTML('afterbegin', inputElementLiteral);

const setBackground = (color) => {
    document.querySelector('body').style = 'background-color:' + color;
}

var runReady = () => {
    setBackground('green');
}

var runGo = (inputElement) => {
    console.log(inputElement);
    goIntervalSeconds = inputElement.value;
    setBackground('purple');
}

var runSetup = () => {
    setBackground('orange');
}

var runStop = () => {
    setBackground('red');
}

var continueChain = 0;

var runChain = async () => {
    const inputElement = document.querySelector('input');

    const delay = (callback, msTimeout) => {
        return new Promise(resolve => {
                console.log(callback);
                callback(inputElement);
                return resolve(true);
            })
            .then(() => new Promise(resolve => setTimeout(resolve, msTimeout)));
    }

    const readyIntervalSeconds = 5;
    const setupIntervalSeconds = 20;
    const stopIntervalSeconds = 5;

    while (continueChain < 2) {
        await delay(runSetup, setupIntervalSeconds * 1000);
        await delay(runReady, readyIntervalSeconds * 1000);
        await delay(runGo, goIntervalSeconds * 1000);
        await delay(runStop, stopIntervalSeconds * 1000);
        continueChain++;
    }
}

runChain();