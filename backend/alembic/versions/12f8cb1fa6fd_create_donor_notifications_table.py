from alembic import op
import sqlalchemy as sa


revision = "12f8cb1fa6fd"
down_revision = "1c5d87a21c18"
branch_labels = None
depends_on = None


def upgrade():

    op.create_table(

        "donor_notifications",

        sa.Column(
            "id",
            sa.Integer(),
            primary_key=True,
        ),

        sa.Column(
            "donor_id",
            sa.Integer(),
            sa.ForeignKey("users.id"),
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
            server_default=sa.text("false"),
        ),

        sa.Column(
            "created_at",
            sa.DateTime(),
            nullable=False,
            server_default=sa.func.now(),
        ),
    )


def downgrade():

    op.drop_table(
        "donor_notifications",
    )