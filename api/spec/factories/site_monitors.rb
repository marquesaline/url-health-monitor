FactoryBot.define do
  factory :site_monitor do
    name { 'MyString' }
    url { 'htts://google.com' }
    check_interval { 5 }
    status { 1 }
    last_checked_at { '2025-02-18 19:01:30' }
    user_id { 1 }
  end
end
