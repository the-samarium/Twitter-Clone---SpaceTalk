import pytest


@pytest.mark.newmark
def test_str():
    assert ("hello").upper() == "HELLO"


@pytest.mark.newmark
def test_b():
    pass


@pytest.mark.newmark
def test_c():
    pass
