Feature: Error classification 1

  # Scenario: [1.1] Scenario Error
  #   Given Step passes
  #   And Step fails with "Error" and message "scenario error"

  # Scenario Outline: [1.2.<INDEX>] Scenario outline <ERROR>
  #   Given Step passes
  #   Given Step fails with "<ERROR>" and message "<ERROR_MESSAGE>"

  #   Examples:
  #     | INDEX | ERROR          | ERROR_MESSAGE           |
  #     | 1     | AssertionError | AssertionErrorMessage11 |
  #     | 2     | AssertionError | AssertionErrorMessage12 |
  #     | 3     | Error          | ErrorMessage            |
  #     | 4     | TimeoutError   | TimeoutErrorMessage11   |
  #     | 5     | TimeoutError   | TimeoutErrorMessage12   |

  # Scenario:[1.3] Scenario passes
  #   Given Step passes

  # Scenario Outline: [1.4.<INDEX>] Scenario outline passes
  #   Given Step passes
  #   Examples:
  #     | INDEX |
  #     | 1     |
  #     | 2     |

  Scenario: [1.5] Scenario TestCafe Error
    Given User navigates to simple calculator page