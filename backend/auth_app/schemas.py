import strawberry
from typing import Optional
from .mutations import AuthMutations
from chowkidar.decorators import login_required

from chowkidar.extension import JWTAuthExtension


@strawberry.type
class Query:
    @strawberry.field
    @login_required
    def protected_data(self, info) -> Optional[str]:
        return "This data is protected and requires authentication."


@strawberry.type
class Mutation(AuthMutations):
    pass


schema = strawberry.Schema(
    query=Query,
    mutation=Mutation,
    extensions=[JWTAuthExtension],
)
