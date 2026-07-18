"""add_minimum_condition_to_demand

Revision ID: 902618370f84
Revises: d2064b2dc708
Create Date: 2026-07-16 14:24:58.865747

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers
revision: str = "902618370f84"
down_revision: Union[str, Sequence[str], None] = "d2064b2dc708"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:

    op.add_column(
        "demands",
        sa.Column(
            "minimum_condition",
            sa.String(length=20),
            nullable=False,
            server_default="Good",
        ),
    )


def downgrade() -> None:

    op.drop_column(
        "demands",
        "minimum_condition",
    )