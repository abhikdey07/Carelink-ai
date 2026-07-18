"""add match id to donor notifications

Revision ID: c637487ca25b
Revises: 12f8cb1fa6fd
Create Date: 2026-07-16 20:17:07.063232
"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "c637487ca25b"
down_revision: Union[str, Sequence[str], None] = "12f8cb1fa6fd"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:

    op.add_column(
        "donor_notifications",
        sa.Column(
            "match_id",
            sa.Integer(),
            nullable=True,
        ),
    )

    op.create_foreign_key(
        "fk_donor_notification_match",
        "donor_notifications",
        "matches",
        ["match_id"],
        ["id"],
    )


def downgrade() -> None:

    op.drop_constraint(
        "fk_donor_notification_match",
        "donor_notifications",
        type_="foreignkey",
    )

    op.drop_column(
        "donor_notifications",
        "match_id",
    )