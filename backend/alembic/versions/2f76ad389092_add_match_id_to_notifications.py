from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision = "27f6ad389092"
down_revision = "bf3469c44b28"
branch_labels = None
depends_on = None


def upgrade():

    op.add_column(
        "notifications",
        sa.Column(
            "match_id",
            sa.Integer(),
            nullable=True,
        ),
    )

    op.create_foreign_key(
        "fk_notification_match",
        "notifications",
        "matches",
        ["match_id"],
        ["id"],
    )


def downgrade():

    op.drop_constraint(
        "fk_notification_match",
        "notifications",
        type_="foreignkey",
    )

    op.drop_column(
        "notifications",
        "match_id",
    )