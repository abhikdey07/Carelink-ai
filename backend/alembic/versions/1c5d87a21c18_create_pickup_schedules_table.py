from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "1c5d87a21c18"
down_revision = "3a0c6f03eefa"
branch_labels = None
depends_on = None


def upgrade():

    op.create_table(
        "pickup_schedules",

        sa.Column(
            "id",
            sa.Integer(),
            primary_key=True,
        ),

        sa.Column(
            "match_id",
            sa.Integer(),
            sa.ForeignKey("matches.id"),
            nullable=False,
            unique=True,
        ),

        sa.Column(
            "pickup_date",
            sa.Date(),
            nullable=False,
        ),

        sa.Column(
            "pickup_time",
            sa.Time(),
            nullable=False,
        ),

        sa.Column(
            "volunteer_name",
            sa.String(100),
            nullable=False,
        ),

        sa.Column(
            "volunteer_phone",
            sa.String(20),
            nullable=False,
        ),

        sa.Column(
            "status",
            sa.String(30),
            nullable=False,
            server_default="Scheduled",
        ),
    )


def downgrade():

    op.drop_table(
        "pickup_schedules",
    )