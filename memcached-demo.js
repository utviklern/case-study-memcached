const Memcached = require('memcached');

// Connect to Memcached server
const memcached = new Memcached('localhost:11211');

function demonstrateMemcached() {
  const key = 'exampleKey';
  const value = 'Hello from Memcached!';

  // step 1: set a value
  memcached.set(key, value, 10, (err) => {
    if (err) {
      console.error('Error setting value:', err);
      return;
    }
    console.log(`Step 1: Set Key "${key}" with Value "${value}"`);

    // step 2: get the value
    memcached.get(key, (err, data) => {
      if (err) {
        console.error('Error getting value:', err);
        return;
      }
      console.log(`Step 2: Got Key "${key}" with Value "${data}"`);

      // step 3: delete the value
      memcached.del(key, (err) => {
        if (err) {
          console.error('Error deleting value:', err);
          return;
        }
        console.log(`Step 3: Deleted Key "${key}"`);

        // step 4: confirm deletion
        memcached.get(key, (err, data) => {
          if (err) {
            console.error('Error fetching value:', err);
            return;
          }
          console.log(`Step 4: Key "${key}" after deletion:`, data || 'Not found (as expected)');
          memcached.end();
        });
      });
    });
  });
}

demonstrateMemcached();