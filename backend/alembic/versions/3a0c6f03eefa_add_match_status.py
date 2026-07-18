from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

revision = "3a0c6f03eefa"
down_revision = "27f6ad389092"   # <-- replace with your latest real revision
branch_labels = None
depends_on = None


def upgrade():

    op.add_column(
        "matches",
        sa.Column(
            "status",
            sa.String(length=20),
            nullable=False,
            server_default="Pending",
        ),
    )


def downgrade():

    op.drop_column(
        "matches",
        "status",
    )