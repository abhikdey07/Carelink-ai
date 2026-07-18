"""create ngo profiles table

Revision ID: 6aaef8a28501
Revises: dd978020ccfa
"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

revision: str = "6aaef8a28501"
down_revision: Union[str, Sequence[str], None] = "dd978020ccfa"
branch_labels = None
depends_on = None


def upgrade() -> None:

    op.create_table(
        "ngo_profiles",

        sa.Column("id", sa.Integer(), primary_key=True),

        sa.Column(
            "user_id",
            sa.Integer(),
            sa.ForeignKey("users.id"),
            nullable=False,
            unique=True,
        ),

        sa.Column(
            "organization_name",
            sa.String(length=150),
            nullable=False,
        ),

        sa.Column(
            "registration_number",
            sa.String(length=100),
            nullable=False,
            unique=True,
        ),

        sa.Column(
            "description",
            sa.String(length=500),
            nullable=True,
        ),

        sa.Column(
            "latitude",
            sa.Float(),
            nullable=True,
        ),

        sa.Column(
            "longitude",
            sa.Float(),
            nullable=True,
        ),
    )


def downgrade() -> None:

    op.drop_table("ngo_profiles")