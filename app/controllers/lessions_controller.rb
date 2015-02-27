class LessionsController < ApplicationController
  def new
  end

  def create
    @category = Category.find params[:category_id]
    @lession = Lession.new user: current_user, category: @category
    @words = @category.words.sample 20
    @words.each do |word|
      @lession.results.build word: word
    end
    if @lession.save
      redirect_to category_lession_path @category, @lession
    else
      flash[:warning] = "Can not create lessions, try again later!"
      redirect_to root_path
    end
  end

  def update
    @lession = Lession.find params[:id]
    unless @lession.learned
      @lession.learned = true
      if @lession.update_attributes params_lession
        render 'show'
      end
    else
      flash[:warning] = "You had learned this lession!"
      render 'show'
    end
  end

  def show
    @lession = Lession.find params[:id]
  end

  private
  def params_lession
    params.require(:lession).permit(results_attributes: [:id, :answer_id])
  end
end
