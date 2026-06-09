"""
The Merchant of Venice - Educational Snakes and Ladders Game
Console version with Object-Oriented Programming

Run: python merchant_game.py
"""

import random
import sys
import time
from typing import Dict, List, Optional, Tuple

# Ensure UTF-8 output on Windows consoles
if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    sys.stdin.reconfigure(encoding="utf-8", errors="replace")


# ============================================
# EDUCATIONAL QUESTIONS (20+)
# ============================================
QUESTIONS: List[Dict] = [
    {
        "question": "In what year was William Shakespeare born?",
        "options": ["1564", "1600", "1588", "1616"],
        "correct": 0,
    },
    {
        "question": "Where was Shakespeare born?",
        "options": ["London", "Stratford-upon-Avon", "Oxford", "Venice"],
        "correct": 1,
    },
    {
        "question": "What is the name of the merchant in the play?",
        "options": ["Bassanio", "Antonio", "Shylock", "Lorenzo"],
        "correct": 1,
    },
    {
        "question": "Who is the Jewish moneylender in the play?",
        "options": ["Antonio", "Gratiano", "Shylock", "Launcelot"],
        "correct": 2,
    },
    {
        "question": "How much money does Antonio borrow from Shylock?",
        "options": ["1,000 ducats", "3,000 ducats", "5,000 ducats", "10,000 ducats"],
        "correct": 1,
    },
    {
        "question": "What does Shylock demand if Antonio cannot repay the loan?",
        "options": ["Antonio's ships", "A pound of flesh", "Antonio's house", "Double the money"],
        "correct": 1,
    },
    {
        "question": "Who does Bassanio want to marry?",
        "options": ["Jessica", "Portia", "Nerissa", "Ophelia"],
        "correct": 1,
    },
    {
        "question": "Which casket does Bassanio choose to win Portia?",
        "options": ["Gold", "Silver", "Lead", "Bronze"],
        "correct": 2,
    },
    {
        "question": "Who is Shylock's daughter?",
        "options": ["Portia", "Nerissa", "Jessica", "Juliet"],
        "correct": 2,
    },
    {
        "question": "Who does Jessica elope with?",
        "options": ["Bassanio", "Lorenzo", "Gratiano", "Antonio"],
        "correct": 1,
    },
    {
        "question": "In what city is most of the play set?",
        "options": ["London", "Rome", "Venice", "Verona"],
        "correct": 2,
    },
    {
        "question": "What disguise does Portia use in the trial scene?",
        "options": ["A nurse", "A lawyer named Balthazar", "A merchant", "A priest"],
        "correct": 1,
    },
    {
        "question": "Complete the quote: 'The quality of mercy is not _____'",
        "options": ["given", "strained", "found", "lost"],
        "correct": 1,
    },
    {
        "question": "What profession is Antonio?",
        "options": ["Lawyer", "Merchant", "Soldier", "Poet"],
        "correct": 1,
    },
    {
        "question": "Where does Portia live?",
        "options": ["Venice", "Belmont", "Padua", "Florence"],
        "correct": 1,
    },
    {
        "question": "Why does Shylock hate Antonio?",
        "options": [
            "Antonio stole his money",
            "Antonio lends money without interest",
            "Antonio is a rival merchant",
            "Antonio insulted Portia",
        ],
        "correct": 1,
    },
    {
        "question": "What happens to Shylock at the end of the trial?",
        "options": [
            "He is executed",
            "He must convert to Christianity",
            "He wins the case",
            "He leaves Venice",
        ],
        "correct": 1,
    },
    {
        "question": "Approximately when was The Merchant of Venice written?",
        "options": ["1596–1598", "1603–1605", "1580–1582", "1610–1612"],
        "correct": 0,
    },
    {
        "question": "Which theme is NOT central to the play?",
        "options": ["Mercy", "Justice", "Space exploration", "Revenge"],
        "correct": 2,
    },
    {
        "question": "What does Portia say Shylock may take from Antonio?",
        "options": ["Blood and flesh", "Flesh only, no blood", "One pound of gold", "Nothing"],
        "correct": 1,
    },
    {
        "question": "How many plays did Shakespeare write approximately?",
        "options": ["12", "39", "100", "5"],
        "correct": 1,
    },
    {
        "question": "What is the famous speech Shylock gives about humanity?",
        "options": [
            "To be or not to be",
            "Hath not a Jew eyes?",
            "All the world's a stage",
            "Is this a dagger?",
        ],
        "correct": 1,
    },
    {
        "question": "Who is Antonio's closest friend in the play?",
        "options": ["Shylock", "Bassanio", "Portia", "Jessica"],
        "correct": 1,
    },
    {
        "question": "What test must Portia's suitors pass?",
        "options": ["A sword fight", "Choosing the correct casket", "A riddle", "A race"],
        "correct": 1,
    },
    {
        "question": "What genre is The Merchant of Venice classified as?",
        "options": [
            "Tragedy only",
            "Comedy (with dramatic elements)",
            "History play",
            "Romance only",
        ],
        "correct": 1,
    },
]


# ============================================
# DICE SYSTEM
# ============================================
class Dice:
    """Represents a virtual six-sided dice."""

    def __init__(self, sides: int = 6):
        self.sides = sides

    def roll(self) -> int:
        """Roll the dice and return a random value between 1 and sides."""
        return random.randint(1, self.sides)

    def animated_roll(self) -> int:
        """Simulate an animated dice roll in the console."""
        print("\n  Rolling dice", end="", flush=True)
        for _ in range(3):
            time.sleep(0.3)
            print(".", end="", flush=True)
        result = self.roll()
        print(f" 🎲 {result}!")
        return result


# ============================================
# QUESTION SYSTEM
# ============================================
class QuestionSystem:
    """Manages educational questions about Shakespeare and the play."""

    def __init__(self, questions: List[Dict]):
        self.questions = questions
        self.used_indices: List[int] = []

    def get_random_question(self) -> Tuple[Dict, int]:
        """Return a random question that hasn't been used recently."""
        if len(self.used_indices) >= len(self.questions):
            self.used_indices = []

        available = [i for i in range(len(self.questions)) if i not in self.used_indices]
        index = random.choice(available)
        self.used_indices.append(index)
        return self.questions[index], index

    def ask_question(self) -> bool:
        """
        Present a multiple-choice question to the player.
        Returns True if answered correctly, False otherwise.
        """
        question_data, _ = self.get_random_question()

        print("\n" + "=" * 50)
        print("  ❓ EDUCATIONAL QUESTION")
        print("=" * 50)
        print(f"\n  {question_data['question']}\n")

        for i, option in enumerate(question_data["options"]):
            print(f"    {i + 1}. {option}")

        while True:
            try:
                answer = input("\n  Enter your answer (1-4): ").strip()
                choice = int(answer) - 1
                if 0 <= choice <= 3:
                    break
                print("  Please enter a number between 1 and 4.")
            except ValueError:
                print("  Invalid input. Please enter a number.")

        correct = question_data["correct"]
        if choice == correct:
            print("\n  ✓ Correct! Excellent knowledge!")
            return True
        else:
            correct_answer = question_data["options"][correct]
            print(f"\n  ✗ Wrong! The correct answer was: {correct_answer}")
            return False


# ============================================
# PLAYER CLASS
# ============================================
class Player:
    """Represents the player in the game with position and score tracking."""

    def __init__(self, name: str = "Scholar"):
        self.name = name
        self.position = 1
        self.score = 0
        self.correct_answers = 0
        self.wrong_answers = 0

    def move_forward(self, steps: int, board_size: int = 100) -> None:
        """Move the player forward by the given number of steps."""
        self.position = min(self.position + steps, board_size)

    def move_backward(self, steps: int) -> None:
        """Move the player backward by the given number of steps."""
        self.position = max(self.position - steps, 1)

    def add_score(self, points: int) -> None:
        """Add points to the player's score."""
        self.score += points

    def has_won(self, board_size: int = 100) -> bool:
        """Check if the player has reached the winning square."""
        return self.position >= board_size

    def display_stats(self) -> None:
        """Display current player statistics."""
        print(f"\n  📊 Stats — Position: {self.position} | Score: {self.score} | "
              f"Correct: {self.correct_answers} | Wrong: {self.wrong_answers}")


# ============================================
# BOARD CLASS
# ============================================
class Board:
    """
    Represents the 10x10 Snakes and Ladders game board (100 squares).
    Manages snakes, ladders, bonus/penalty squares, and question squares.
    """

    BOARD_SIZE = 100

    # Ladders: climb up from key to value
    LADDERS: Dict[int, int] = {
        4: 25,
        13: 46,
        33: 49,
        42: 63,
        50: 69,
        62: 81,
        74: 92,
    }

    # Snakes: slide down from key to value
    SNAKES: Dict[int, int] = {
        27: 5,
        40: 3,
        43: 18,
        54: 31,
        66: 45,
        76: 58,
        89: 53,
        99: 41,
    }

    # Bonus squares: extra forward movement
    BONUS_SQUARES: Dict[int, int] = {
        7: 3,
        19: 4,
        38: 5,
        56: 3,
        71: 4,
        85: 3,
    }

    # Penalty squares: backward movement
    PENALTY_SQUARES: Dict[int, int] = {
        12: 3,
        28: 4,
        47: 3,
        59: 5,
        73: 4,
        94: 3,
    }

    # Question squares trigger educational quiz
    QUESTION_SQUARES: List[int] = [
        6, 11, 16, 22, 29, 35, 44, 51, 57, 64, 68, 77, 82, 87, 93, 97,
    ]

    def __init__(self):
        self.question_system = QuestionSystem(QUESTIONS)
        self.dice = Dice()

    def get_square_type(self, position: int) -> Optional[str]:
        """Return the type of special square, or None if regular."""
        if position in self.SNAKES:
            return "snake"
        if position in self.LADDERS:
            return "ladder"
        if position in self.BONUS_SQUARES:
            return "bonus"
        if position in self.PENALTY_SQUARES:
            return "penalty"
        if position in self.QUESTION_SQUARES:
            return "question"
        return None

    def process_square(self, player: Player) -> bool:
        """
        Process special square effects for the player's current position.
        Returns True if the player should continue processing (moved again).
        """
        pos = player.position

        # Ladder
        if pos in self.LADDERS:
            dest = self.LADDERS[pos]
            print(f"\n  🪜 Ladder! Climb from {pos} to {dest}!")
            player.position = dest
            player.add_score(10)
            return True

        # Snake
        if pos in self.SNAKES:
            dest = self.SNAKES[pos]
            print(f"\n  🐍 Snake! Slide down from {pos} to {dest}!")
            player.position = dest
            return True

        # Bonus
        if pos in self.BONUS_SQUARES:
            bonus = self.BONUS_SQUARES[pos]
            print(f"\n  ⭐ Bonus square! Move forward {bonus} extra spaces!")
            player.move_forward(bonus, self.BOARD_SIZE)
            player.add_score(5)
            return True

        # Penalty
        if pos in self.PENALTY_SQUARES:
            penalty = self.PENALTY_SQUARES[pos]
            print(f"\n  ⚠️  Penalty square! Move back {penalty} spaces!")
            player.move_backward(penalty)
            return True

        # Question
        if pos in self.QUESTION_SQUARES:
            print(f"\n  ❓ Question square! Answer correctly to stay, or move back!")
            if self.question_system.ask_question():
                player.correct_answers += 1
                player.add_score(15)
            else:
                player.wrong_answers += 1
                penalty = random.randint(2, 5)
                print(f"\n  Moving back {penalty} spaces...")
                player.move_backward(penalty)
            return False

        return False

    def display_mini_board(self, player: Player) -> None:
        """Display a simplified visual of the board with player position."""
        print("\n  ┌" + "─" * 48 + "┐")
        print(f"  │  🎭 Snakes & Ladders — Shakespeare Edition     │")
        print(f"  │  Player: {player.name:<10} Position: {player.position:>3}/100      │")
        print("  └" + "─" * 48 + "┘")

        # Progress bar
        progress = int((player.position / self.BOARD_SIZE) * 40)
        bar = "█" * progress + "░" * (40 - progress)
        print(f"\n  [{bar}] {player.position}%")


# ============================================
# GAME CLASS
# ============================================
class Game:
    """Main game controller that orchestrates the Snakes and Ladders experience."""

    def __init__(self):
        self.board = Board()
        self.player: Optional[Player] = None

    def display_title(self) -> None:
        """Display the game title and welcome message."""
        print("\n" + "=" * 55)
        print("   THE MERCHANT OF VENICE")
        print("   Educational Snakes & Ladders")
        print("   William Shakespeare Edition")
        print("=" * 55)
        print("\n  Welcome, scholar! Journey through 100 squares")
        print("  of Venice while testing your knowledge of")
        print("  Shakespeare's famous play.")
        print("\n  Rules:")
        print("  • Roll the dice and move forward")
        print("  • 🪜 Ladders climb you up | 🐍 Snakes slide you down")
        print("  • ❓ Answer questions correctly to stay on your square")
        print("  • ⭐ Bonus squares move you forward")
        print("  • ⚠️  Penalty squares move you backward")
        print("  • Reach square 100 to win!")
        print("=" * 55)

    def setup_player(self) -> None:
        """Get player name and initialize the player."""
        name = input("\n  Enter your name (or press Enter for 'Scholar'): ").strip()
        if not name:
            name = "Scholar"
        self.player = Player(name)
        print(f"\n  Welcome, {name}! Your journey begins at square 1.")

    def play_turn(self) -> bool:
        """
        Execute one turn of the game.
        Returns False if the game should end.
        """
        input("\n  Press Enter to roll the dice...")
        roll = self.board.dice.animated_roll()

        print(f"\n  Moving from square {self.player.position}...", end="", flush=True)
        time.sleep(0.5)
        self.player.move_forward(roll, Board.BOARD_SIZE)
        print(f" Now on square {self.player.position}!")

        if self.player.has_won(Board.BOARD_SIZE):
            return False

        # Process special squares (may chain multiple times)
        while self.board.process_square(self.player):
            if self.player.has_won(Board.BOARD_SIZE):
                return False
            time.sleep(0.5)

        self.board.display_mini_board(self.player)
        return True

    def end_game(self) -> None:
        """Display end-game results and final score."""
        self.player.add_score(50)  # Win bonus

        print("\n" + "=" * 55)
        print("   🎉 CONGRATULATIONS! YOU WIN! 🎉")
        print("=" * 55)
        print(f"\n  {self.player.name}, you have reached square 100!")
        print(f"  You have mastered the path through Venice!")
        print("\n  ── Final Results ──")
        print(f"  Final Score:       {self.player.score}")
        print(f"  Correct Answers:   {self.player.correct_answers}")
        print(f"  Wrong Answers:     {self.player.wrong_answers}")
        print("\n  'All that glisters is not gold.' — The Merchant of Venice")
        print("=" * 55 + "\n")

    def run(self) -> None:
        """Main game loop."""
        self.display_title()
        self.setup_player()

        while self.play_turn():
            pass

        self.end_game()


# ============================================
# ENTRY POINT
# ============================================
if __name__ == "__main__":
    game = Game()
    game.run()
