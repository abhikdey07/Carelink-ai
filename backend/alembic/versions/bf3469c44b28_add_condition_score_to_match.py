"""add_condition_score_to_match

Revision ID: bf3469c44b28
Revises: 902618370f84
Create Date: 2026-07-16 14:40:52.590890

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision = "bf3469c44b28"
down_revision = "902618370f84"
branch_labels = None
depends_on = None


def upgrade():

    op.add_column(
        "matches",
        sa.Column(
            "condition_score",
            sa.Float(),
            nullable=False,
            server_default="0",
        ),
    )


def downgrade():

    op.drop_column(
        "matches",
        "condition_score",
    )