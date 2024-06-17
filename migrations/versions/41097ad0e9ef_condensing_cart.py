"""condensing cart

Revision ID: 41097ad0e9ef
Revises: 20179eda1dff
Create Date: 2024-06-17 12:35:42.234169

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '41097ad0e9ef'
down_revision = '20179eda1dff'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('products', schema=None) as batch_op:
        batch_op.alter_column('price',
               existing_type=sa.FLOAT(),
               type_=sa.Numeric(precision=10, scale=2),
               existing_nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('products', schema=None) as batch_op:
        batch_op.alter_column('price',
               existing_type=sa.Numeric(precision=10, scale=2),
               type_=sa.FLOAT(),
               existing_nullable=False)

    # ### end Alembic commands ###
