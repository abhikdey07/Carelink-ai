"""create matches and notifications tables"""

from alembic import op
import sqlalchemy as sa

revision = "create_matches_notifications"
down_revision = "create_demands_table"
branch_labels = None
depends_on = None


def upgrade():

    op.create_table(
        "matches",

        sa.Column("id", sa.Integer(), primary_key=True),

        sa.Column(
            "donation_id",
            sa.Integer(),
            sa.ForeignKey("donations.id"),
            nullable=False,
        ),

        sa.Column(
            "donation_item_id",
            sa.Integer(),
            sa.ForeignKey("donation_items.id"),
            nullable=False,
        ),

        sa.Column(
            "ngo_id",
            sa.Integer(),
            sa.ForeignKey("ngo_profiles.id"),
            nullable=False,
        ),

        sa.Column(
            "score",
            sa.Float(),
            nullable=False,
        ),

        sa.Column(
            "item_score",
            sa.Float(),
            nullable=False,
        ),

        sa.Column(
            "quantity_score",
            sa.Float(),
            nullable=False,
        ),

        sa.Column(
            "priority_score",
            sa.Float(),
            nullable=False,
        ),

        sa.Column(
            "distance_score",
            sa.Float(),
            nullable=False,
        ),

        sa.Column(
            "match_reason",
            sa.String(500),
            nullable=False,
        ),

        sa.Column(
            "created_at",
            sa.DateTime(),
            nullable=False,
        ),
    )

    op.create_table(
        "notifications",

        sa.Column("id", sa.Integer(), primary_key=True),

        sa.Column(
            "ngo_id",
            sa.Integer(),
            sa.ForeignKey("ngo_profiles.id"),
            nullable=False,
        ),

        sa.Column(
            "donation_id",
            sa.Integer(),
            sa.ForeignKey("donations.id"),
            nullable=False,
        ),

        sa.Column(
            "title",
            sa.String(150),
            nullable=False,
        ),

        sa.Column(
            "message",
            sa.String(500),
            nullable=False,
        ),

        sa.Column(
            "is_read",
            sa.Boolean(),
            nullable=False,
            server_default=sa.false(),
        ),

        sa.Column(
            "created_at",
            sa.DateTime(),
            nullable=False,
        ),
    )


def downgrade():

    op.drop_table("notifications")
    op.drop_table("matches")