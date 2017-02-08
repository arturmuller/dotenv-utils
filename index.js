const boolean = (s) => s
  ? s.toLowerCase().trim() === "true"
  : false

const string = (s) => s
  ? s.trim()
  : ""

const number = (s) => Number(s) || 0

const array = (s) => s
  ? s.split(",")
      .map((s) => s.trim())
      .filter(Boolean)
  : []

const object = (s) => s
  ? s.split(",").reduce((acc, v) => {
      const [key, value] = v.trim()
        .split(":")
        .map((s) => s.trim())

      if (key) {
        acc[key] = value
      }

      return acc
    }, {})
  : {}

const conform = (env, schema) => {
  return Object.keys(schema).reduce((acc, key) => {
    const val = schema[key]

    const type = Array.isArray(val)
      ? "array"
      : typeof val

    if (type !== "function") {
      if (env[key]) acc[key] = eval(`${type}(env[key])`)
      else acc[key] = schema[key]
    } else {
      acc[key] = val(env[key])
    }

    return acc
  }, {})
}

module.exports = {boolean, string, number, array, object, conform}
