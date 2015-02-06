class CreateWords < ActiveRecord::Migration
  def change
    create_table :words do |t|
      t.text :content
      t.text :meaning
      t.references :category, index: true

      t.timestamps null: false
    end
    add_index :words, [:category_id]
  end
end
