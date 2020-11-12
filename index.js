const {execSync} = require('child_process')

const e = (...args) => {
  try {
    return execSync(...args).toString().trim()
  } catch (e) {
    console.log(e.stdout.toString())
    console.log(e.stderr.toString())
  }
}

const jsFiles = dir => e(`find ./${dir} -name "*.js" -not -path "./node_modules/*"`)
const typingFiles = dir => e(`find ./${dir} -name "*.d.ts" -not -path "./node_modules/*"`)
const rmTypings = dir => {
  const filesToRemove = typingFiles(dir).split("\n").join(' ')
  console.log(
    e(`rm -rf ${filesToRemove}`)
  )
}

// warning: mutates array!
const makeBatches = (array, batchSize) => {
  const result = []
  while (array.length > 0) {
    result.push(
      array.splice(0, batchSize)
    )
  }
  return result
}

const addTypings = ({ dir, exclusions = new Set()}) => {
  rmTypings(dir)
  const files = jsFiles(dir).split("\n").filter(f => !exclusions.has(f))
  const batches = makeBatches(files, 1000) // process 1000 files at a time
  for (const batch of batches) {
    console.log(
      e(`yarn tsc --allowJs --emitDeclarationOnly --declaration --outfile out --bundledPackageName ${dir} --module commonjs ${batch.join(' ')}`)
    )
  }
}

const [,, ...packages] = process.argv

for (pkg of packages) {
  console.log(`adding typings for package: ${pkg}`)
  addTypings({
    dir: pkg
  })
}
