import pytest


@pytest.fixture
def input_value():
    input = 5
    return input


def test_file_example1(input_value):
    assert input_value * 5 == 25


def test_file_example1_a(input_value):
    input_value = 6
    assert input_value * 5 == 30
