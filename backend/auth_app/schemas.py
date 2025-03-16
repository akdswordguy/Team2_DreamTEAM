import strawberry
from .mutations import AuthMutations
from auth_app.queries import userIdByUsername
from chowkidar.extension import JWTAuthExtension


@strawberry.type
class Query:
    @strawberry.field
    def userIdByUsername(self, username: str) -> int:
        return userIdByUsername(username)


@strawberry.type
class Mutation(AuthMutations):
    pass


schema = strawberry.Schema(
    query=Query,
    mutation=Mutation,
    extensions=[JWTAuthExtension],
)