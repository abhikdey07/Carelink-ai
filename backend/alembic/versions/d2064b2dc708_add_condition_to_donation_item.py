"""add_condition_to_donation_item

Revision ID: d2064b2dc708
Revises: a4adb5acc1c4
Create Date: 2026-07-16 14:11:25.938878

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "d2064b2dc708"
down_revision: Union[str, Sequence[str], None] = "a4adb5acc1c4"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:

    op.add_column(
        "donation_items",
        sa.Column(
            "condition",
            sa.String(length=20),
            nullable=False,
            server_default="Good",
        ),
    )


def downgrade() -> None:

    op.drop_column(
        "donation_items",
        "condition",
    )