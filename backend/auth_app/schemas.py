from auth_app.queries import Query  # ✅ use this Query type
from .mutations import AuthMutations
import strawberry
from chowkidar.extension import JWTAuthExtension


@strawberry.type
class Mutation(AuthMutations):
    pass

schema = strawberry.Schema(
    query=Query,
    mutation=Mutation,
    extensions=[JWTAuthExtension],
)
