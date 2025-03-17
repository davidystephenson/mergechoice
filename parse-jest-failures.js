const fs = require('fs')

// Read Jest JSON output from a file
const jestOutput = JSON.parse(fs.readFileSync('./jest-results.json', 'utf8'))

// Extract and display failed tests
const failedTests = jestOutput.testResults
  .flatMap(result =>
    result.assertionResults
      .filter(assertion => assertion.status === 'failed')
      .map(assertion => ({
        name: assertion.fullName || assertion.title,
        path: result.name,
        message: assertion.failureMessages.join('\n')
      }))
  )

console.log('Failed Tests Summary:')
console.log('====================')
failedTests.forEach((test, index) => {
  console.log(`${index + 1}. ${test.name}`)
  console.log(`   File: ${test.path}`)
  console.log('')
})
