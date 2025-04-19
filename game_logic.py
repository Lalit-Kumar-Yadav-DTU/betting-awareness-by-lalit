import random

def process_bet(bet, mines, balance, play_count):
    if bet <= 0 or mines < 1 or mines > 10:
        return 0, "Invalid input."

    risk_factor = mines / 10

    # High chance of winning at start
    if play_count < 3:
        profit = int(bet * (1 + risk_factor))
        return profit, f"You won! Profit: ₹{profit}"
    else:
        chance = random.random()
        # Greed trap: chance of loss increases with play count
        if chance < 0.6 + (play_count * 0.05):
            loss = -bet
            return loss, f"You lost! Loss: ₹{bet}"
        else:
            profit = int(bet * (1 + risk_factor))
            return profit, f"You won! Profit: ₹{profit}"
