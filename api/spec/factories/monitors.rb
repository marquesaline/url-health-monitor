FactoryBot.define do
  factory :monitor do
    name { "MyString" }
    url { "MyString" }
    check_interval { 1 }
    status { 1 }
    last_checked_at { "2025-02-18 16:45:58" }
    user_id { 1 }
  end
end
