find /Users/Ja/Documents/dashboard-ets/src -name "*.js" -exec sh -c 'mv "$0" "${0%.js}.ts"' {} \;
find /Users/Ja/Documents/dashboard-ets/src -name "*.jsx" -exec sh -c 'mv "$0" "${0%.jsx}.tsx"' {} \;
