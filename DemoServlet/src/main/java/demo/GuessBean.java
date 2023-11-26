package demo;


public class GuessBean {

    private int guesses;
    private final int secretNumber;

    public GuessBean() {

        this.guesses = 0;
        this.secretNumber = (int) (Math.random() * 100) + 1;
    }

    public void setGuesses(int guesses) {
        this.guesses = guesses;
    }

    public int getGuesses() {
        return this.guesses;
    }

    public String handleGuess(int guess) {
        if (guess == this.secretNumber)
            return "Correct guess!";
        else if (guess < this.secretNumber && guess <= 100 && guess >= 0)
            return "Guess higher!";
        else if (guess > this.secretNumber && guess <= 100 && guess >= 0)
            return "Guess lower!";
        else
            return "you need to guess between 1 and 100";

    }
}
