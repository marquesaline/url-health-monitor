class RenameSucessToSuccessInChecks < ActiveRecord::Migration[7.1]
  def change
    rename_column :checks, :sucess, :success
  end
end
