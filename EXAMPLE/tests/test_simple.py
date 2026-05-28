"""
Pytest is a Python testing framework that makes it easy to write and run tests.
Core idea: You write functions that check whether your code behaves correctly,
and pytest runs them all and reports what passed or failed.
"""

import pytest


def addition(x: float, y: float):
    return x + y


def div(x: float, y: float):
    try:
        return x / y
    except ZeroDivisionError as e:
        return e


@pytest.mark.newmark
def test_Add():
    assert addition(3, 4) == 7
    assert addition(4, 4) == 8


@pytest.mark.skip
def test_div():
    assert div(10, 2) == 5.0
    assert div(9, 3) == 3.0


@pytest.mark.xfail
@pytest.mark.newmark
def test_div_by_zero():
    result = div(10, 0)
    assert isinstance(result, ZeroDivisionError)


def is_even(n):
    return n % 2 == 0


@pytest.mark.parametrize(
    "number, expected",
    [
        (2, True),
        (3, False),
        (0, True),
        (-4, True),
        (7, False),
    ],
)
def test_is_even(number, expected):
    assert is_even(number) == expected
