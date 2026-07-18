"""create demands table"""

from alembic import op
import sqlalchemy as sa

revision = "create_demands_table"
down_revision = "6aaef8a28501"
branch_labels = None
depends_on = None


def upgrade():

    op.create_table(
        "demands",

        sa.Column(
            "id",
            sa.Integer(),
            primary_key=True,
        ),

        sa.Column(
            "ngo_id",
            sa.Integer(),
            sa.ForeignKey("ngo_profiles.id"),
            nullable=False,
        ),

        sa.Column(
            "item_name",
            sa.String(100),
            nullable=False,
        ),

        sa.Column(
            "quantity_required",
            sa.Integer(),
            nullable=False,
        ),

        sa.Column(
            "priority",
            sa.String(20),
            nullable=False,
        ),

        sa.Column(
            "expiry_date",
            sa.Date(),
            nullable=False,
        ),

        sa.Column(
            "status",
            sa.String(20),
            nullable=False,
            server_default="Active",
        ),
    )


def downgrade():

    op.drop_table("demands")