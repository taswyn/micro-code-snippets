//TODO: [COPE-213] create [x] pools of promise chains
		// Array of x size, allocate in order into it until end
		// reduce each pool as a chain
		// register an aborthandler for each with https://developer.mozilla.org/en-US/docs/Web/API/AbortController/abort
		/* ##################### */

		/**
		 * Returns a Fetch result for an individual page scan 
		 * (work on the response, see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
		 * @param {String} pageURL 
		 * @returns {Promise}
		 */
         const scanPage = (pageURL) => {
			let endPoint = "";
			let callURI = endPoint + "" + pageURL;
			return fetch(callURI, {
				// params for the fetch go here
			});
		}

		/**
		 * 
		 * @param {Array} pagesList 
		 */
		const scanPagesInSequence = (pagesList) => {
			return pagesList.reduce(
				(promisedAccumulator, currentPage, pagesIndex) => {
					// if you do any branch logic here, BOTH branches ALWAYS have to return
					// the promisedAccumulator, as that feeds the reducer
					return promisedAccumulator
						.then(() => {
							return scanPage(currentPage)
								// use then chaining for handling: 
								// make sure the FINAL return is always a Promise of some kind
								// (if the final step in the chain returns a promise that will resolve, that's fine)
								.then((response) => {return response.json()})
								.then((responseJSON) => handlePageScan(responseJSON))
								.then(() => Promise.resolve());
						}).catch((error) => {
							// this prevents errors from crashing the chain
							// note that 500s, 404s, etc are NOT errors for fetch()
							console.error(error);
							return true;
						});
				}, Promise.resolve() // this is KEY: the initialValue is a resolved promise
			);

		}

		/**
		 *  (use this to replace the $.each below)
		 * @param {Array} pagesList 
		 */
		const scanPages = (pagesList) => {
			const poolsSize = 4;
			let poolsPageScanners = new Array(poolSize);
			// partition the pagesList into the pool as {poolSize} sub-arrays

			// for each pool, run a Promise reducer
			// the for loop does not wait for the reducer to finish, so it starts
			// each pool simultaneously
			for (const pool in poolsPageScanners) {
				scanPagesInSequence(pool);
			}

		}


		/* ##################### */