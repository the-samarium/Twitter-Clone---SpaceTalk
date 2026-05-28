import pytest


@pytest.mark.api
def test_create_post(client):
    response = client.post("/", json={"body": "Hello world"})
    assert response.status_code == 201


@pytest.mark.api
async def test_get_posts(async_client):
    response = await async_client.get("/posts")
    assert response.status_code == 200


@pytest.mark.api
def test_create_comment(client):
    res = client.post(
        "/comment", json={"body": "This is comment on a post", "post_id": 1}
    )
    assert res.status_code == 201
